/**
 * Merge Sort implemented using TypeScript
 * Best Case: O(nlog(n))
 * Average Case: O(nlog(n))
 * Worst Case: O(nlog(n))
 * Stable: Yes
 * Adaptive: No
 * Place: Out
 * 
 * Breaks the array into halves, until reaching the base case of arrays of length 1.
 * Recursively calls sort. For every pair of halves, elements are compared, joining
 * the arrays until the whole array is back into place.
 */
export class MergeSort {
  public sort(list: number[]) {
    if (list.length === 1) { // Base Case, Sorted
      return list;
    }

    const length = list.length;
    const midIndex = Math.floor(length / 2);

    // Breaks the array into two halves. Recursively does so by calling
    // sort on the left half and right half.
    let left = list.slice(0, midIndex);
    let right = list.slice(midIndex, length);

    // Sort left and right half
    left = this.sort(left);
    right = this.sort(right);
    
    /*
      i and j run concurrently. i indexes left array while j indexes
      right array. If list[i] <= list[j], add list[i] to the new array.
      Else, add list[j] to the new array. If i deplets first, add the rest
      of j elements to the new array, else adds rest of i elements.
    */
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        list[i + j] = left[i];
        i++;
      } else {
        list[i + j] = right[j];
        j++;
      }
    }

    while (i < left.length) {
      list[i + j] = left[i];
      i++;
    }

    while (j < right.length) {
      list[i + j] = right[j];
      j++;
    }

    return list;
  }
}

const ms = new MergeSort();
console.log(ms.sort([1, 8, 2, 2, 5, 9, 10, 0, 1]));