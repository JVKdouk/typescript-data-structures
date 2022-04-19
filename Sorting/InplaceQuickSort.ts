/**
 * Quick Select implementation using TypeScript
 * Best Case: O(nlog(n))
 * Average Case: O(nlog(n))
 * Worst Case: O(n²) (Keeps randomly choosing pivots as start or end)
 * Stable: No
 * Adaptive: No
 * Place: In
 * First, select the pivot randomly. After that, we swap items to
 * ensure that every element to the left of the pivot is smaller and right is greater.
 * We proceed to quick sort the left side and the right side.
 */
export class InplaceQuickSort {
  public sort(list: number[]) {
    return this.sortHelper(list, 0, list.length);
  }

  private sortHelper(list: number[], start: number, end: number) {
    if (end - start < 1) {
      return list;
    }

    const pivotIndex = Math.floor(Math.random() * (end - start)) + start;
    const pivotVal = list[pivotIndex];

    list = this.swap(list, start, pivotIndex);

    let i = start + 1;
    let j = end;

    while (i <= j) {
      while (i <= j && list[i] <= pivotVal) {
        i++;
      }

      while (i <= j && list[j] >= pivotVal) {
        j--;
      }

      if (i <= j) {
        list = this.swap(list, i, j);
        i++;
        j--;
      }

      if (i > j) {
        this.swap(list, start, j);
        this.sortHelper(list, start, j - 1);
        this.sortHelper(list, j + 1, end);
      }
    }

    return list;
  }

  private swap(list: number[], i: number, j: number) {
    const data = list[i];
    list[i] = list[j];
    list[j] = data;
    return list;
  }
}

const iqs = new InplaceQuickSort();
iqs.sort([8, 3, 3, 9, 11, 2, 1, 0]);