//@ts-ignore
import Queue from "./Queue.ts";

export class BSTNode<T> {
  private left: BSTNode<T> | undefined;
  private right: BSTNode<T> | undefined;
  private value: T;

  constructor(data: T, left?: BSTNode<T>, right?: BSTNode<T>) {
    this.value = data;
    this.left = left;
    this.right = right;
  }

  public getLeft() {
    return this.left;
  }

  public getRight() {
    return this.right;
  }

  public setLeft(left?: BSTNode<T>) {
    this.left = left;
  }

  public setRight(right?: BSTNode<T>) {
    this.right = right;
  }

  public getValue() {
    return this.value;
  }

  public setValue(data: T) {
    this.value = data;
  }
}

export class BST<T> {
  private root: BSTNode<T> | undefined;

  constructor() {}

  public insert(data: T) {
    this.root = this.insertHelper(data, this.root);
  }

  private insertHelper(data: T, root?: BSTNode<T>): BSTNode<T> {
    if (root === undefined) return new BSTNode(data);

    if (data < root.getValue()) {
      const newLeft = this.insertHelper(data, root.getLeft());
      return new BSTNode(root.getValue(), newLeft, root.getRight());
    } else if (data > root.getValue()) {
      const newRight = this.insertHelper(data, root.getRight());
      return new BSTNode(root.getValue(), root.getLeft(), newRight);
    } else {
      return new BSTNode(root.getValue(), root.getLeft(), root.getRight());
    }
  }

  public preorder() {
    // Closer to Root
    return this.preorderHelper(this.root);
  }

  private preorderHelper(root: BSTNode<T> | undefined): T[] {
    if (root === undefined) return [];

    let list = [];
    list.push(root.getValue());
    list = [...this.preorderHelper(root.getLeft())];
    list = [...list, ...this.preorderHelper(root.getRight())];

    return list;
  }

  public inorder() {
    // Ordered data
    return this.inorderHelper(this.root);
  }

  private inorderHelper(root: BSTNode<T> | undefined): T[] {
    if (root === undefined) return [];

    let list = [];
    list = [...this.inorderHelper(root.getLeft())];
    list.push(root.getValue());
    list = [...list, ...this.inorderHelper(root.getRight())];

    return list;
  }

  public postorder() {
    // Closer to leaves
    return this.postorderHelper(this.root);
  }

  private postorderHelper(root: BSTNode<T> | undefined): T[] {
    if (root === undefined) return [];

    let list = [];
    list = [...this.postorderHelper(root.getLeft())];
    list = [...list, ...this.postorderHelper(root.getRight())];
    list.push(root.getValue());

    return list;
  }

  public levelorder() {
    const queue = new Queue<BSTNode<T> | undefined>();
    queue.enqueue(this.root);
    const list = [];

    while (!queue.isEmpty()) {
      const node: BSTNode<T> | undefined | null = queue.dequeue();
      if (node != undefined) {
        list.push(node.getValue());
        queue.enqueue(node.getLeft());
        queue.enqueue(node.getRight());
      }
    }

    return list;
  }

  public remove(data: T) {
    const dummyNode = new BSTNode(undefined);
    this.root = this.removeHelper(data, this.root, dummyNode);
    return dummyNode.getValue();
  }

  private removeHelper(
    data: T,
    root: BSTNode<T> | undefined,
    dummy: BSTNode<T | undefined>
  ): BSTNode<T> | undefined {
    if (root === undefined) return root;

    if (root.getValue() !== data) {
      if (data < root.getValue()) {
        const subtree = this.removeHelper(data, root.getLeft(), dummy);
        return new BSTNode(root.getValue(), subtree, root.getRight());
      } else {
        const subtree = this.removeHelper(data, root.getRight(), dummy);
        return new BSTNode(root.getValue(), root.getLeft(), subtree);
      }
    } else {
      const zeroChild =
        root.getLeft() === undefined && root.getRight() === undefined;
      const oneChildLeft =
        root.getLeft() !== undefined && root.getRight() === undefined;
      const oneChildRight =
        root.getLeft() === undefined && root.getRight() !== undefined;

      if (zeroChild) {
        return undefined;
      } else if (oneChildLeft) {
        dummy.setValue(root.getValue());
        return root.getLeft();
      } else if (oneChildRight) {
        return root.getRight();
      } else {
        const dummyPredecessor = new BSTNode<T | undefined>(undefined);

        const subtree = this.findAndRemovePredecessor(
          root.getLeft(),
          dummyPredecessor
        );

        return new BSTNode(
          dummyPredecessor.getValue()!,
          subtree,
          root.getRight()
        );
      }
    }
  }

  private findAndRemovePredecessor(
    root: BSTNode<T> | undefined,
    dummy: BSTNode<T | undefined>
  ): BSTNode<T> | undefined {
    if (root === undefined) return root;
    if (root.getRight() === undefined) return root.getLeft();

    if (root.getRight()!.getRight() !== undefined) {
      const subtree = this.findAndRemovePredecessor(root.getRight(), dummy);
      return new BSTNode(root.getValue(), root.getLeft(), subtree);
    } else {
      dummy.setValue(root.getRight()!.getValue());
      return new BSTNode(
        root.getValue(),
        root.getLeft(),
        root.getRight()!.getLeft()
      );
    }
  }

  public get(data: T) {
    return this.getHelper(data, this.root);
  }

  private getHelper(data: T, root?: BSTNode<T>): T | undefined {
    if (root === undefined) return undefined;
    else if (data < root.getValue()) {
      return this.getHelper(data, root.getLeft());
    } else if (data > root.getValue()) {
      return this.getHelper(data, root.getRight());
    } else return root.getValue();
  }

  public getHeight() {
    return this.getHeightHelper(this.root);
  }

  private getHeightHelper(root?: BSTNode<T>): number {
    if (root === undefined) return -1;

    const left = this.getHeightHelper(root.getLeft()) + 1;
    const right = this.getHeightHelper(root.getRight()) + 1;

    return left > right ? left : right;
  }
}

const bst = new BST<number>();
bst.insert(10);
bst.insert(9);
bst.insert(8);
bst.insert(15);
bst.insert(13);
bst.insert(12);
bst.insert(16);
console.log(bst.getHeight());
