//@ts-ignore
import SinglyLinkedList from "../SinglyLinkedList.ts";

/**
 * Least Significant Digit Radix Sort implemented with TypeScript
 * Best Case: O(kn)
 * Average Case: O(kn)
 * Worst Case: O(kn)
 * Stable: Yes
 * Adaptive: No
 * Place: Out
 */
export class LSDRadixSort {
  public sort(list: number[]) {
    const buckets: SinglyLinkedList<number>[] = [];

    const k = this.getNumberOfDigits(list);

    for (let i = 0; i < 19; i++) {
      buckets[i] = new SinglyLinkedList();
    }

    for (let i = 0; i < k; i++) {
      for (let j = 0; j < list.length; j++) {
        let digit = Math.floor((list[j] / 10 ** i) % 10);
        buckets[digit + 9].addAtTail(list[j]);
      }

      let index = 0;

      for (let j = 0; j < buckets.length; j++) {
        const bucket = buckets[j];
        while (!bucket.isEmpty()) {
          list[index] = bucket.removeAtHead();
          index++;
        }
      }
    }

    return list;
  }

  private getNumberOfDigits(list: number[]) {
    let maxNumber = 0;

    for (let i = 0; i < list.length; i++) {
      if (list[i] > maxNumber) maxNumber = list[i];
    }

    let numberOfDigits = 0;

    while (maxNumber > 1) {
      maxNumber /= 10;
      numberOfDigits++;
    }

    return numberOfDigits;
  }
}

const lsd = new LSDRadixSort();
console.log(lsd.sort([1, 8, 2, 2, 7, 123, 1, 2, 9, 9, 12]));