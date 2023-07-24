export default class Stack<T> {
  private data: Array<T> = [];

  public push(item: T) {
    this.data.push(item);
  }

  public pop(): T | undefined {
    return this.data.pop();
  }

  public clear() {
    this.data = [];
  }

  get elements(): T[] {
    return this.data;
  }

  get size(): number {
    return this.data.length;
  }
  
 }