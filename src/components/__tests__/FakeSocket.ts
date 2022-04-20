export default class implements WebSocket {
  binaryType: BinaryType = "blob";
  bufferedAmount = 0;
  extensions = "";

  readonly protocol: string = "";
  readonly readyState: number = 0;
  readonly url: string = "";
  readonly CLOSED: number = 0;
  readonly CLOSING: number = 0;
  readonly CONNECTING: number = 0;
  readonly OPEN: number = 0;

  onclose(this: WebSocket, ev: CloseEvent): void {
    console.log(ev);
  }

  onerror(this: WebSocket, ev: Event): void {
    console.log(ev);
  }

  onopen(this: WebSocket, ev: Event): void {
    console.log(ev);
  }

  close(code?: number, reason?: string): void {
    console.log({ code, reason });
  }

  addEventListener<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ): void {
    console.log({ type, listener, options });
  }
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void {
    console.log({ type, listener, options });
  }

  dispatchEvent(event: Event): boolean {
    console.log(event);
    return false;
  }

  public received = [];
  public sent: (string | ArrayBufferLike | Blob | ArrayBufferView)[] = [];

  onmessage(this: WebSocket, ev: MessageEvent): MessageEvent {
    return ev;
  }

  send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    this.sent.push(JSON.parse(data as string));
  }
}
