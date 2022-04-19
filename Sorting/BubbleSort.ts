/**
 * Bubble Sort implementation in TypeScript
 * Best Case: O(n) (At least one run to check if it is already sorted)
 * Average Case: O(n^2) (Many iterations to sort)
 * Worst Case: O(n^2) (List is inverted)
 * Stable: Yes (Every swap is done in sequential elements)
 * Adaptive: Yes (Can check if the list is already sorted)
 * Place: In (no need to create one or more new arrays to store elements)
 * 
 * Compare n with n + 1, n times, as many times needed. If n > n + 1, swap. If not, continue.
 */
export class BubbleSort {
  public sort(list: number[]) {
    let didSwap = true;
    let lastSwap = list.length - 1;

    while (didSwap) {
      didSwap = false;

      for (let i = 0; i < lastSwap; i++) {
        const data = list[i];
        
        if (data > list[i + 1]) {
          list[i] = list[i + 1];
          list[i + 1] = data;
        }
      }
    }

    return list;
  }
}

const bs = new BubbleSort();
console.log(bs.sort([2, 7, 3, 9, 8, 8]));