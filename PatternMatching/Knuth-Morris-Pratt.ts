export class KMP {
  /**
   * Goal is to find prefixes that are also suffixes for f[0 .. j]
   *  R  E  V  A  R  A  R  E  V
   * [0, 0, 0, 0, 1, 0, 1, 2, 3]
   * @param pattern Matching pattern
   * @returns Failure Table
   */
  public generateFailureTable (pattern: string) {
    const fTable = [0];
    const m = pattern.length;

    // Longest Suffix length so far
    let i = 0;

    // Position on patter. Ends when j >= pattern.length. Only moves forward.
    let j = 1;

    while (j < m) {
      /*
        If p[i] = p[j] => Suffix found, add its size to fTable
        If p[i] != p[j] and i === 0 => No suffix found, add 0
        Else There may still be a hidden suffix following, reduce i and try again 
      */
      if (pattern[i] === pattern[j]) {
        fTable[j] = i + 1;
        i++;
        j++;
      } else if (pattern[i] !== pattern[j] && i === 0) {
        fTable[j] = 0;
        j++;
      } else {
        i = fTable[i - 1];
      }
    }

    return fTable;
  }

  /**
   * Find occurences of pattern in text
   * Best Case:
   * No Occurrences: O(m + n) (Iterate though the entire text)
   * Single Occurence: O(m) (First occurrence)
   * All Occurrence: O(m + n) (Iterate through the text anyway)
   * Worst Case:
   * No Occurrences: O(m + n) (Iterate through the entire text)
   * Single Occurrence: O(m + n) (Last occurrence)
   * All Occurrence: O(m + n) (Iterate through the entire text)
   * @param text Text to be searched
   * @param pattern Matching pattern
   * @param single All occurences or single occurence
   * @returns All occurrences if single set to false, else first occurence
   */
  public match(text: string, pattern: string, single: boolean = true) {
    const fTable = this.generateFailureTable(pattern);

    const matches = [];
    
    const n = text.length;
    const m = pattern.length;

    let j = 0;
    let k = 0;

    while (k < n) {
      /*
        If p[j] = t[k]:
          If j at end of pattern, return (k - j) (match found) (start of match)
          Else continue checking until a mismatch occurs or j reaches end of pattern
        If p[j] != t[k] and j === 0, increase k and continue search
        Else realign j with its predecessor in failureTable f(j - 1) until j becomes 0 or a match is found
      */
     console.log(pattern[j], text[k], j, k);
      if (pattern[j] == text[k]) {
        if (j === m - 1) {
          if (single) {
            return k - j;
          } else {
            matches.push(k - j);
            j = fTable[j];
            k++;
          } 
        } else {
          j++;
          k++;
        }
      } else if (pattern[j] !== text[k] && j === 0) {
        k++
      } else {
        j = fTable[j - 1];
      }
    }

    return matches;
  }
}

const kmp = new KMP();
kmp.match('abadfbaabcbabcb', 'abcba', false);