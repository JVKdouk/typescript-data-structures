/**
 * Implementation of Insertion Sort using TypeScript
 * Best Case: O(n)
 * Average Case: O(n²)
 * Worst Case: O(n²)
 * Stable: Yes
 * Adaptive: Yes
 * Place: In
 * 
 * Divide the array into two segments: Sorted and Unsorted
 * Initially, sorted is the first element. Unsorted is the rest.
 * Iteratively, compare the head of the unsorted array with the tail of the sorted array
 * making a bubble sort into the sorted array. At the end, Unsorted array length will be 0.
 */
export class InsertionSort {
  public sort(list: number[]) {
    let unsortedStart = 1;
    let i = unsortedStart;

    while (unsortedStart < list.length) {
      const data = list[i];
      if (data < list[i - 1]) {
        list[i] = list[i - 1];
        list[i - 1] = data;
        i--;
      } else {
        unsortedStart++;
        i = unsortedStart;
      }
    }

    return list;
  }
}