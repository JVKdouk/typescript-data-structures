export class MinHeap<T> {
  private INITIAL_CAPACITY: number = 10;

  private backingArray: (T | null)[];
  private size;

  constructor(initialArray?: T[]) {
    if (initialArray) {
      this.backingArray = [null, ...initialArray];
      this.size = initialArray.length;
      this.buildHeap();
    } else {
      this.backingArray = new Array<T | null>(this.INITIAL_CAPACITY).fill(null);
      this.size = 0;
    }
  }

  private buildHeap() {
    for (let i = Math.ceil(this.size / 2); i > 0; i--) {
      this.downHeap(i);
    }
  }

  private resize() {
    const newArray = new Array<T | null>(this.backingArray.length * 2).fill(
      null
    );

    for (let i = 0; i < this.backingArray.length; i++) {
      newArray[i] = this.backingArray[i];
    }

    return newArray;
  }

  private upHeap(index: number) {
    const data = this.backingArray[index]!;
    const parentIndex = Math.floor(index / 2);
    const parent = this.backingArray[parentIndex]!;

    if (index < 1) return;

    if (data < parent) {
      this.backingArray[parentIndex] = data;
      this.backingArray[index] = parent;
      this.upHeap(parentIndex);
    }
  }

  private downHeap(index: number) {
    const data = this.backingArray[index]!;
    if (index * 2 > this.size + 1) return;

    const childLeft = this.backingArray[index * 2]!;
    const childRight = this.backingArray[index * 2 + 1]!;
    const hasRight = childRight !== undefined;
    const isLeftSmaller = childLeft < childRight;

    if ((!hasRight && childLeft < data) || (hasRight && isLeftSmaller)) {
      this.backingArray[index * 2] = data;
      this.backingArray[index] = childLeft;
      this.downHeap(index * 2);
    } else if (hasRight && childRight < data) {
      this.backingArray[index * 2 + 1] = data;
      this.backingArray[index] = childRight;
      this.downHeap(index * 2 + 1);
    }
  }

  public add(data: T) {
    if (this.size + 1 === this.backingArray.length) this.resize();

    this.backingArray[this.size + 1] = data;
    this.size++;

    this.upHeap(this.size);
  }

  public remove() {
    const data = this.backingArray[1];
    this.backingArray[1] = this.backingArray[this.size];
    this.backingArray[this.size] = null;
    this.downHeap(1);

    return data;
  }

  public toString() {
    return this.backingArray;
  }
}
