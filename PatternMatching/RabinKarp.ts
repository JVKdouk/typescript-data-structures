export class RabinKarp {
  /**
   * Executes Rabin-Karp Pattern Matching. 
   * @param text Text to be matched against
   * @param pattern Pattern to match
   * @param single Single Occurrence
   * @returns First occurrence if single is true, else all occurrences
   */
  public match(text: string, pattern: string, single: boolean = true) {
    const patternHashAndPower = this.hash(pattern);
    
    const patternHash = patternHashAndPower.hash;
    const biggestPower = patternHashAndPower.power;
    
    const matches = [];

    let textHash = this.hash(text.substring(0, pattern.length)).hash;
    
    let i = 0;
    let j = 0;

    while (i <= text.length - pattern.length) {
      if (textHash === patternHash) {
        if (pattern[j] === text[i + j]) {
          if (j === pattern.length - 1) {
            if (single) {
              return i;
            } else {
              matches.push(i);
              textHash = this.shift(text, pattern, i, textHash, biggestPower);
              i++;
              j = 0;
            }
          } else {
            j++;
            continue;
          }
        } else {
          i++;
          j = 0;
        }
      }

      
      textHash = this.shift(text, pattern, i, textHash, biggestPower);
      i++
    }

    return matches;
  }

  private BASE = 19;

  private shift(text: string, pattern: string, i: number, textHash: number, biggestPower: number) {
    const oldCharValue = text.charCodeAt(i);
    const newCharValue = text.charCodeAt(i + pattern.length);
    const newTextHash = (textHash - oldCharValue * biggestPower) * this.BASE + newCharValue;
    return newTextHash;
  }

  private hash(text: string) {
    let currentMultiply = 1;
    let sum = 0;
    
    for (let i = text.length - 1; i >= 0; i--) {
      sum += text.charCodeAt(i) * currentMultiply;
      currentMultiply *= this.BASE;
    }

    return { hash: sum, power: currentMultiply / this.BASE };
  }
}