export class HashMapNode<T> {
  private value: T;
  private deleted: boolean = false;
  private key: string;

  constructor(key: string, value: T) {
    this.value = value;
    this.key = key;
  }

  public getKey() {
    return this.key;
  }

  public getValue() {
    return this.value;
  }

  public getDeleted() {
    return this.deleted;
  }

  public delete() {
    this.deleted = true;
  }
}

export class HashMap<T> {
  private size;
  private backingArray: (HashMapNode<T> | null)[];
  private INITIAL_CAPACITY: number = 11;
  private LOAD_FACTOR: number = 0.5;

  constructor() {
    this.backingArray = new Array<HashMapNode<T> | null>(
      this.INITIAL_CAPACITY
    ).fill(null);
    this.size = 0;
  }

  private resize() {
    const oldArray = this.backingArray;

    this.backingArray = new Array<HashMapNode<T> | null>(
      this.backingArray.length * 2 + 1
    ).fill(null);

    for (let i = 0; i < oldArray.length; i++) {
      const node = oldArray[i];
      if (node === null || node.getDeleted() === true) continue;

      this.set(node.getKey(), node.getValue());
    }
  }

  // Linear Probing
  public set(key: string, value: T) {
    if ((this.size + 1) / this.backingArray.length > this.LOAD_FACTOR) {
      this.resize();
    }

    const hash = this.hash(key);
    const compressed = hash % this.backingArray.length;

    let index = compressed;
    let currentNode = this.backingArray[index];

    while (
      currentNode !== null && // Null Spot
      currentNode.getDeleted() !== true && // Deleted Spot (DEL Marker)
      currentNode.getKey() !== key // Same Key
    ) {
      index = (index + 1) % this.backingArray.length;
      currentNode = this.backingArray[index];
    }

    if (
      this.backingArray[index] === null ||
      this.backingArray[index]!.getKey() !== key
    ) {
      this.size++;
    }

    this.backingArray[index] = new HashMapNode(key, value);
  }

  private getIndex(key: string) {
    const hash = this.hash(key);
    const compressed = hash % this.backingArray.length;

    let index = 0;
    let currentNode = this.backingArray[compressed];

    while (
      currentNode !== null &&
      (currentNode.getKey() !== key || currentNode.getDeleted() !== false) &&
      index !== this.backingArray.length
    ) {
      index++;
      currentNode =
        this.backingArray[(compressed + index) % this.backingArray.length];
    }

    return currentNode !== null
      ? (compressed + index) % this.backingArray.length
      : null;
  }

  public get(key: string) {
    const index = this.getIndex(key);

    if (index === null) return null;
    else return this.backingArray[index];
  }

  public remove(key: string) {
    const index = this.getIndex(key);

    if (index === null) return null;

    const node = this.backingArray[index]!;

    if (node.getDeleted() === true) return null;

    node.delete();
    this.size--;

    return node.getValue();
  }

  private hash(key: string) {
    var hash = 0,
      i,
      chr;

    for (i = 0; i < key.length; i++) {
      chr = key.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }

    return hash;
  }

  public toString() {
    return this.backingArray;
  }
}
