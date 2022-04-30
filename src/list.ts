type Node<T> = {
  next: Node<T> | undefined;
  prev: Node<T> | undefined;
  data: T;
};

type Callback = () => void;

export default class<T> {
  tail: Node<T> | undefined;
  curr: Node<T> | undefined;
  listeners: Callback[] = [];

  constructor() {
    this.tail = undefined;
    this.curr = this.tail;
  }

  prev(): T | undefined {
    if (this.curr?.prev) {
      this.curr = this.curr?.prev;
    }
    return this.curr?.data;
  }

  next(): T | undefined {
    if (this.curr?.next) {
      this.curr = this.curr?.next;
    }
    return this.curr?.data;
  }

  peek(): T | undefined {
    if (!this.curr) {
      return undefined;
    }
    return this.curr.data;
  }

  clear() {
    this.tail = undefined;
    this.curr = this.tail;
  }

  push(data: T) {
    const node: Node<T> = {
      data,
      next: undefined,
      prev: undefined,
    };

    if (this.tail) {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    } else {
      this.tail = node;
    }

    this.curr = this.tail;
    this.notify();
  }

  pop(): T | undefined {
    const node = this.tail;
    this.tail = this.tail?.prev;
    this.curr = this.tail;

    return node?.data;
  }

  subscribe(callback: Callback) {
    this.listeners.push(callback);
  }

  notify() {
    for (const cb of this.listeners) {
      cb();
    }
  }
}
