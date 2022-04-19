export class Queue<T> {
  private size: number;
  private back: number;
  private front: number;
  private backingArray: (T | null)[];
  private INITIAL_CAPACITY = 10;

  constructor() {
    this.front = 0;
    this.back = 0;
    this.size = 0;
    this.backingArray = new Array<T | null>(this.INITIAL_CAPACITY).fill(null);
  }

  private resize() {
    const newArray = new Array<T | null>(this.backingArray.length * 2).fill(
      null
    );

    for (let i = 0; i < this.backingArray.length; i++) {
      newArray[i] =
        this.backingArray[(this.front + i) % this.backingArray.length];
    }

    this.front = 0;
    this.back = this.size;
    this.backingArray = newArray;
  }

  public enqueue(data: T) {
    if (this.backingArray.length === this.size) this.resize();
    this.backingArray[this.back] = data;

    this.back = (this.back + 1) % this.backingArray.length;
    this.size++;
  }

  public dequeue() {
    const data = this.backingArray[this.front];
    this.backingArray[this.front] = null;

    this.front = (this.front + 1) % this.backingArray.length;
    this.size--;

    return data;
  }

  public peek() {
    return this.backingArray[this.front];
  }

  public isEmpty() {
    return this.size === 0;
  }

  public clear() {
    this.backingArray = new Array<T | null>(this.INITIAL_CAPACITY).fill(null);
    this.size = 0;
    this.front = 0;
    this.back = 0;
  }

  public toString() {
    return this.backingArray;
  }
}
