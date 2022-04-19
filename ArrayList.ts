export class ArrayList<T> {
  private INITIAL_SIZE = 10;
  private list: (T | null)[];
  private size: number;

  constructor(capacity?: number) {
    this.list = new Array<T | null>(capacity || this.INITIAL_SIZE).fill(null);
    this.size = 0;
  }

  public resize = (): (T | null)[] => {
    const oldArray = this.list;
    this.list = new Array<T | null>(this.size * 2).fill(null);

    for (let i = 0; i < oldArray.length; i++) {
      this.list[i] = oldArray[i];
    }

    return this.list;
  };

  public addAtIndex = (index: number, item: T): void => {
    if (this.size === this.list.length) this.resize();

    for (let i = this.size; i > index; i--) {
      this.list[i] = this.list[i - 1];
    }

    this.list[index] = item;
    this.size++;
  };

  public addToFront = (item: T): void => {
    this.addAtIndex(0, item);
  };

  public addToBack = (item: T): void => {
    this.addAtIndex(this.size, item);
  };

  public removeAtIndex = (index: number): T => {
    const data = this.list[index];

    if (data === null) throw new Error("Data found is null");

    while (index < this.size && this.list[index + 1] !== null) {
      this.list[index] = this.list[index + 1];
      index++;
    }

    this.list[index] = null;
    this.size--;

    return data;
  };

  public removeFromFront = (): T => {
    return this.removeAtIndex(0);
  };

  public removeFromBack = (): T => {
    return this.removeAtIndex(this.size - 1);
  };

  public get = (index: number) => {
    return this.list[index];
  };

  public join = (glue: string): string => {
    let str = "";

    for (let i = 0; i < this.list.length; i++) {
      if (i === this.list.length - 1) str += this.list[i];
      else str += this.list[i] + glue;
    }

    return str;
  };

  public toString = (): string => {
    return `[${this.join(", ")}]`;
  };
}
