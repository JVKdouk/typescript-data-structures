/**
 * Selection Sort Implementation in TypeScript. Minimizes necessary swaps
 * Best Case: O(n²)
 * Average Case: O(n²)
 * Worst Case: O(n²)
 * Stable: No (Swipes elements far away)
 * Adaptive: No (No special case for lists that are already sorted)
 * Place: In
 * 
 * Iterate through the list from tail to head. For every iteration, iterate
 * once again to find the largest element, from 0 to n (inclusive, outer loop index). 
 * Swipe the largest element with element at n.
 */
export class SelectionSort {
  public sort(list: number[]) {

    for (let i = list.length - 1; i > 0; i--) {
      let maxIndex = 0;

      for (let j = 0; j <= i; j++) {
        if (list[maxIndex] <= list[j]) {
          maxIndex = j;
        }
      }

      const data = list[maxIndex];
      list[maxIndex] = list[i];
      list[i] = data;
    }

    return list;
  }
}

const list = new SelectionSort();
console.log(list.sort([9, 2, 2, 7, 1, 0, 10]));