//@ts-ignore
import ArrayList from "./arrayList.ts";

export class Stack<T> {
  private size = 0;
  private backingArray: ArrayList<T>;
  private INITIAL_CAPACITY = 10;

  constructor() {
    this.size = 0;
    this.backingArray = new ArrayList<T>(this.INITIAL_CAPACITY);
  }

  public push = (data: T) => {
    this.backingArray.addToBack(data);
    this.size++;
  };

  public pop = () => {
    this.size--;
    return this.backingArray.removeFromBack();
  };

  public peek = (): T => {
    return this.backingArray.get(this.size - 1);
  };

  public clear = () => {
    this.size = 0;
    this.backingArray = new ArrayList<T>(this.INITIAL_CAPACITY);
  };

  public isEmpty = () => {
    return this.size === 0;
  };

  public getArray = () => {
    return this.backingArray.toString();
  };
}
