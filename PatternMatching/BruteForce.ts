export class BruteForce {
  public match(text: string, pattern: string, single: boolean = true) {
    const m = pattern.length;
    const n = text.length;
    let i = 0;

    const matches = [];

    while (i <= n - m) {
      if (text.substring(i, i + m) === pattern) {
        if (single) {
          return i;
        } else {
          matches.push(i);
        }
      }

      i++;
    }

    return matches;
  }
}