import { ElementStates } from "../../types/element-states";

export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList<T> {
  private head: LinkedListNode<T> | null;
  private tail: LinkedListNode<T> | null;

  constructor(initialValues: T[] = []) {
    this.head = null;
    this.tail = null;

    for (const value of initialValues) {
      this.append(value);
    }
  }

  getLength(): number {
    let length = 0;
    let current = this.head;
    while (current !== null) {
      length++;
      current = current.next;
    }
    return length;
  }

  // Метод для добавления элемента в начало списка
  prepend(value: T): void {
    const newNode = new LinkedListNode(value);
    newNode.next = this.head;
    this.head = newNode;

    if (this.tail === null) {
      this.tail = this.head;
    }
  }

  // Метод для добавления элемента в конец списка
  append(value: T): void {
    const newNode = new LinkedListNode(value);

    if (this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  getFirstNode(): LinkedListNode<T> | null {
    return this.head;
  }

  getLastNode(): LinkedListNode<T> | null {
    return this.tail;
  }

  getNodeByIndex(index: number): LinkedListNode<T> | null {
    if (index < 0 || index >= this.getLength()) {
      return null;
    }
    let current = this.head;
    let currentIndex = 0;
    while (current !== null) {
      if (currentIndex === index) {
        return current;
      }
      current = current.next;
      currentIndex++;
    }
    return null;
  }

  // Метод для преобразования связного списка в массив
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current !== null) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  addByIndex(value: T, index: number): void {
    if (index < 0 || index > this.getLength()) {
      throw new Error("Invalid index");
    }

    const newNode = new LinkedListNode(value);

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
      if (this.tail === null) {
        this.tail = newNode;
      }
    } else {
      let current = this.head;
      let prev = null;
      let currentIndex = 0;

      while (currentIndex < index) {
        prev = current;
        current = current!.next;
        currentIndex++;
      }

      prev!.next = newNode;
      newNode.next = current;

      if (current === null) {
        this.tail = newNode;
      }
    }
  }

  deleteByIndex(index: number): void {
    if (index < 0 || index >= this.getLength()) {
      throw new Error("Invalid index");
    }

    if (this.head === null) {
      return;
    }

    if (index === 0) {
      this.head = this.head.next;
      if (this.head === null) {
        this.tail = null;
      }
      return;
    }

    let current: LinkedListNode<T> = this.head;
    let prev: LinkedListNode<T> | null = null;
    let currentIndex = 0;

    while (currentIndex < index) {
      prev = current;
      current = current.next!;
      currentIndex++;
    }

    if (prev !== null) {
      prev.next = current.next;
      if (current === this.tail) {
        this.tail = prev;
      }
    }
  }
}
