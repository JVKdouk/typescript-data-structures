/**
 * Cocktail Shaker Sort implemented using TypeScript
 * Best Case: O(n)
 * Average Case: O(n²)
 * Worst Case: O(n²)
 * Stable: Yes
 * Adaptive: Yes
 * Place: In
 * 
 */
export class CocktailShakerSort {
  public sort(list: number[]) {
    let lastMinSwap = 0;
    let lastMaxSwap = list.length - 1;
    let didSwap = true;

    while (didSwap) {
      let tempLastMaxSwap = 0;
      let tempLastMinSwap = 0;
      didSwap = false;

      for (let i = lastMinSwap; i < lastMaxSwap; i++) {
        if (list[i] > list[i + 1]) {
          const data = list[i];
          list[i] = list[i + 1];
          list[i + 1] = data;
          didSwap = true;
          tempLastMaxSwap = i;
        }
      }

      if (didSwap) lastMaxSwap = tempLastMaxSwap;

      if (!didSwap) break;
      didSwap = false;

      for (let i = lastMaxSwap; i > 0; i--) {
        if (list[i] < list[i - 1]) {
          const data = list[i];
          list[i] = list[i - 1];
          list[i - 1] = data;
          didSwap = true;
          tempLastMinSwap = i;
        }
      }

      if (didSwap) lastMinSwap = tempLastMinSwap;
    }

    return list;
  }
}

const css = new CocktailShakerSort();
console.log(css.sort([1, 8, 2, 2, 9, 1, 3, 9]));