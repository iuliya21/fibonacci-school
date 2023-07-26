export default class Quene<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  enqueue(item: T): void { //добавить элемент в конец очереди
    this.items.push(item);
  }

  dequeue(): T | undefined { //удаляет и возвращает элемент из начала очереди
    return this.items.shift();
  }

  clear(): void {
    this.items = [];
  }

  isEmpty(): boolean { //проверка на пустую очередь
    return this.items.length === 0;
  }

  elements(): T[] {
    return this.items.slice();
  }

  head(): T | undefined { //Возвращает элемент в начале очереди без его удаления
    return this.items[0];
  }

  tail(): T | undefined { //Возвращает элемент в конце очереди без его удаления
    return this.items[this.items.length - 1];
  }
}