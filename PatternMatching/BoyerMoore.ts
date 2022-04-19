import randomWords from 'random-words';
import fs from 'fs';

export class BoyerMoore {
  /**
   * Last occurrence table. Iterates through pattern and generates
   * a Hash Map containing what is the last index each character is found.
   * This is later used to skip portions of the text when matcing.
   * @param pattern Pattern to iterate
   * @returns Last Occurrence Table
   */
  public generateLastTable(pattern: string) {
    const m = pattern.length;
    const last: { [key: string]: number } = {};

    // Iterates through pattern, adding the character and its occurrence
    // for every iteration.
    for (let i = 0; i < m; i++) {
      last[pattern[i]] = i;
    }

    return last;
  }

  /**
   * Booyer-Moore Pattern Matching in TypeScript. Best for long alphabets.
   * 
   * Best Case:
   * No Occurrence: O(m + n/m)
   * Single Occurrence: O(m)
   * All Occurrences: O(m + n/m)
   * 
   * Worst Case:
   * No Occurrence: O(mn)
   * Single Occurrence: O(mn)
   * All Occurrences: O(mn)
   * @param text Text to search for Pattern
   * @param pattern Pattern for matching
   * @param single Should return one or all occurrences?
   * @returns One occurrence if single, all if not single.
   */
  public match(text: string, pattern: string, single: boolean = true) {
    const lastTable = this.generateLastTable(pattern);
    const matches = [];
    
    // Text iterator
    let i = 0;

    const n = text.length;
    const m = pattern.length;

    while (i <= n - m) {
      /*
        While j >= 0, check every character from back to front. If there is
        a match, j will become -1. If not, it will remain >= 0.

        If j = -1, then match found, return i.
        Else match not found, realign with lastTable, key is text character at i + j (where the mismatch occurred):
          If shift < j: Shift i by i + j - shift
          Else just increment i (no backward movement)
      */

      // Pattern iterator
      let j = m - 1;

      while (j >= 0 && text[i + j] === pattern[j]) {
        j = j - 1;
      }

      if (j === -1) { // Match found
        if (single) {
          return i;
        } else {
          matches.push(i);
          i++;
        }
      } else {
        const shift = lastTable[text[i + j]];
        
        if (shift < j) {
          i = i + j - shift;
        } else {
          i++;
        }
      }
    }

    return matches;
  }
}

const BM = new BoyerMoore();
const word = randomWords({ exactly: 1, maxLength: 10 })[0];
console.log(word);

const table = BM.generateLastTable(word);

const keys = Object.keys(table);
const values = Object.values(table);
fs.writeFileSync('./result.txt', keys.join(' ') + '\n' + values.join(' '));
