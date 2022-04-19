export class sCircularlyLinkedNode<T> {
    private data: T;
    private next: sCircularlyLinkedNode<T> | null;

    constructor (data: T, next: sCircularlyLinkedNode<T> | null = null) {
        this.data = data;
        this.next = next;
    }

    public getData = (): T => {
        return this.data;
    }

    public setData = (data: T) => {
        this.data = data;
    }

    public getNext = (): sCircularlyLinkedNode<T> | null => {
        return this.next;
    }

    public setNext = (next: sCircularlyLinkedNode<T> | null): void => {
        this.next = next;
    }
}

export class sCircularlyLinkedList<T> {
    private head: sCircularlyLinkedNode<T> | null;
    private size: number;

    constructor () {
        this.head = null;
        this.size = 0;
    }

    public get = (index: number): sCircularlyLinkedNode<T> => {
        if (index < 0) throw new Error("Index cannot be smaller than 0");

        let current: sCircularlyLinkedNode<T> | null = this.head;
        let currentIndex = 0;

        while (currentIndex !== index) {
            current = current!.getNext();
            currentIndex++;
        }

        if (current === null) throw new Error("Not Found");
        return current;
    }

    public addAtIndex = (index: number, data: T) => {
        const newNode = new sCircularlyLinkedNode<T>(data, null);
        this.size++;

        if (this.head === null) { // Edge Case 1: Head and Tail are null
            this.head = newNode;
            newNode.setNext(this.head);
            return;
        }

        if (index === 0) { // Edge Case 2: Add to Head (O(1))
            newNode.setNext(this.head);
            this.head = newNode;
            return;
        }

        const currentNode = this.get(index - 1);
        const oldNode = currentNode.getNext();
        
        newNode.setNext(oldNode);

        if (index === this.size) {
            newNode.setNext(this.head);
        }

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
        const currentNode = index > 0 ? previousNode!.getNext()! : this.head;
        const data = currentNode!.getData();

        if (previousNode) {
            previousNode.setNext(currentNode!.getNext());
        }

        if (index === 0) {
            this.head = currentNode!.getNext();
        }

        this.size--;

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

        for (let i = 0; i < this.size; i++) {
            str += current!.getData() + ', ';
            current = current!.getNext();
        }

        return str;
    }
}

const myList = new sCircularlyLinkedList();
myList.addAtHead(2);
myList.addAtHead(7);
console.log(myList.toString());
console.log(myList.get(2));