export class DoublyLinkedNode<T> {
    private data: T;
    private next: DoublyLinkedNode<T> | null;
    private previous: DoublyLinkedNode<T> | null;

    constructor (data: T, next: DoublyLinkedNode<T> | null = null, previous: DoublyLinkedNode<T> | null = null) {
        this.data = data;
        this.next = next;
        this.previous = previous;
    }

    public getData = (): T => {
        return this.data;
    }

    public setData = (data: T) => {
        this.data = data;
    }

    public getNext = (): DoublyLinkedNode<T> | null => {
        return this.next;
    }

    public setNext = (next: DoublyLinkedNode<T> | null): void => {
        this.next = next;
    }

    public getPrevious = (): DoublyLinkedNode<T> | null => {
        return this.previous;
    }

    public setPrevious = (previous: DoublyLinkedNode<T> | null): void => {
        this.previous = previous;
    }
}

export class DoublyLinkedList<T> {
    private head: DoublyLinkedNode<T> | null;
    private tail: DoublyLinkedNode<T> | null;
    private size: number;

    constructor () {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    public get = (index: number): DoublyLinkedNode<T> => {
        if (index > this.size) throw new Error("Index cannot be greater than size!");
        if (index < 0) throw new Error("Index cannot be smaller than 0");

        const isTailCloser: boolean = index > Math.floor(this.size / 2);

        let current: DoublyLinkedNode<T> | null = isTailCloser ? this.tail : this.head;
        let currentIndex = isTailCloser ? this.size - 1 : 0;

        while (currentIndex !== index) {
            current = isTailCloser ? current!.getPrevious() : current!.getNext();
            isTailCloser ? currentIndex-- : currentIndex++;
        }

        if (current === null) throw new Error("Not Found");
        return current;
    }

    public addAtIndex = (index: number, data: T) => {
        const newNode = new DoublyLinkedNode<T>(data, null, null);

        if (this.head === null) { // Edge Case 1: Head and Tail are null
            this.head = newNode;
            this.tail = newNode;

            this.size++;
            return;
        }

        if (index === this.size) { // Edge Case 2: Add to tail
            const tailNode = this.tail;

            newNode.setPrevious(tailNode);
            tailNode!.setNext(newNode);
            this.tail = newNode;

            this.size++;
            return;
        }

        const currentNode = this.get(index)!;
        const previousNode = currentNode.getPrevious();

        newNode.setPrevious(previousNode);
        newNode.setNext(currentNode);

        if (currentNode) currentNode.setPrevious(newNode);
        if (previousNode) previousNode.setNext(newNode);

        if (index === 0) {
            this.head = newNode;
        }

        if (index === this.size) {
            this.tail = newNode;
        }

        this.size++;
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
        
        const currentNode = this.get(index)!;
        const previousNode = currentNode.getPrevious();
        const nextNode = currentNode.getNext();
        
        const data = currentNode!.getData();

        if (previousNode) previousNode.setNext(nextNode);
        if (nextNode) nextNode.setPrevious(previousNode);

        if (index === 0) {
            this.head = nextNode;
        }

        if (index === this.size - 1) {
            this.tail = previousNode;
        }

        return data;
    }

    public removeAtHead = (): T => {
        return this.removeAtIndex(0);
    }

    public removeAtTail = (): T => {
        return this.removeAtIndex(this.size - 1);
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