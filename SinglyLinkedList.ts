export class SinglyLinkedNode<T> {
    private data: T;
    private next: SinglyLinkedNode<T> | null;

    constructor (data: T, next: SinglyLinkedNode<T> | null = null) {
        this.data = data;
        this.next = next;
    }

    public getData = (): T => {
        return this.data;
    }

    public setData = (data: T) => {
        this.data = data;
    }

    public getNext = (): SinglyLinkedNode<T> | null => {
        return this.next;
    }

    public setNext = (next: SinglyLinkedNode<T> | null): void => {
        this.next = next;
    }
}

export class SinglyLinkedList<T> {
    private head: SinglyLinkedNode<T> | null;
    private tail: SinglyLinkedNode<T> | null;
    private size: number;

    constructor () {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    public get = (index: number): SinglyLinkedNode<T> => {
        if (index > this.size) throw new Error("Index cannot be greater than size!");
        if (index < 0) throw new Error("Index cannot be smaller than 0");

        let current: SinglyLinkedNode<T> | null = this.head;
        let currentIndex = 0;

        while (currentIndex !== index) {
            current = current!.getNext();
            currentIndex++;
        }

        if (current === null) throw new Error("Not Found");
        return current;
    }

    public addAtIndex = (index: number, data: T) => {
        const newNode = new SinglyLinkedNode<T>(data, null);
        this.size++;

        if (this.head === null) { // Edge Case 1: Head and Tail are null
            this.head = newNode;
            this.tail = newNode;
            return;
        }

        if (index === 0) { // Edge Case 2: Add to Head (O(1))
            newNode.setNext(this.head);
            this.head = newNode;
            return;
        }

        if (index === this.size) { // Edge Case 3: Add to Tail (O(1))
            this.tail!.setNext(newNode);
            return;
        }

        const currentNode = this.get(index - 1);
        const oldNode = currentNode.getNext();
        newNode.setNext(oldNode);

        currentNode.setNext(newNode);
    }

    public addAtHead = (data: T) => {
        this.addAtIndex(0, data);
    }

    public addAtTail = (data: T) => {
        this.addAtIndex(this.size, data);
    }

    public removeAtIndex = (index: number) => {
        if (this.size === 0) throw new Error('The list is empty');
        if (index > this.size - 1) throw new Error('Index cannot be greater than index - 1');
        
        const previousNode = index > 0 ? this.get(index - 1) : null;
        const nextNode = index > 0 ? previousNode!.getNext()! : this.head;
        const data = nextNode!.getData();

        if (previousNode) {
            previousNode.setNext(nextNode!.getNext());
        }

        if (index === 0) {
            this.head = nextNode!.getNext();
        }

        if (index === this.size - 1) {
            this.tail = previousNode;
        }

        this.size--;

        if (this.size === 0) {
            this.head = null;
            this.tail = null;
        }

        return data;
    }

    public removeAtHead = (): T => {
        return this.removeAtIndex(0);
    }

    public removeAtTail = (): T => {
        return this.removeAtIndex(this.size - 1);
    }

    public isEmpty = () => {
      return this.head === null;
    }

    public toString = (): string => {
        let current = this.head;
        let str = "";

        while (current !== null) {
            str += current.getData() + ', ';
            current = current!.getNext();
        }

        return str;
    }
}