export type Callback = (payload: Record<string, unknown>) => void;

export interface Server {
  send(type: string, data: Record<string, unknown>): void;
  on(event: string, callback: Callback): void;
}

export default class implements Server {
  private socket: WebSocket;
  private listeners: Record<string, Callback[]>;

  constructor(socket: WebSocket) {
    this.listeners = {};
    this.socket = socket;
    this.socket.onmessage = this.dispatch.bind(this);
  }

  private dispatch(event: MessageEvent) {
    const { type, payload } = JSON.parse(event.data);
    const listeners = this.listeners[type];

    if (listeners) {
      for (const listener of listeners) {
        listener(payload);
      }
    }
  }

  on(event: string, callback: Callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  send(type: string, payload: Record<string, unknown>) {
    this.socket.send(JSON.stringify({ type, payload }));
  }
}
