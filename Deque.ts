export class Deque<T> {
  private backingArray: (T | null)[];
  private size: number;
  private front: number;
  private back: number;
  private INITIAL_SIZE = 10;

  constructor() {
    this.backingArray = new Array<T | null>(this.INITIAL_SIZE).fill(null);
    this.size = 0;
    this.front = 0;
    this.back = 0;
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

  public addToBack(data: T) {
    if (this.backingArray.length === this.size) this.resize();

    this.backingArray[this.back] = data;

    this.back = (this.back + 1) % this.backingArray.length;
    this.size++;
  }

  public addToFront(data: T) {
    if (this.backingArray.length === this.size) this.resize();

    this.front = this.circularAbs(this.front - 1, this.backingArray.length);
    this.backingArray[this.front] = data;

    this.size++;
  }

  public removeFromBack() {
    this.back = this.circularAbs(this.back - 1, this.backingArray.length);

    const data = this.backingArray[this.back];
    this.backingArray[this.back] = null;

    this.size--;

    return data;
  }

  public removeFromFront() {
    const data = this.backingArray[this.front];
    this.backingArray[this.front] = null;
    this.front = (this.front + 1) % this.backingArray.length;

    this.size--;

    return data;
  }

  public peekLast() {
    const back = this.circularAbs(this.back - 1, this.backingArray.length);
    return this.backingArray[back];
  }

  public peekFirst() {
    return this.backingArray[this.front];
  }

  public toString() {
    return this.backingArray;
  }

  public circularAbs(value: number, mod: number) {
    if (value >= 0) return value % mod;
    return mod + value;
  }
}
