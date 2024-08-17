export class SeededRandom {
  private seed: number;

  constructor(seed: string | number) {
    this.seed = this.hash(seed.toString());
  }

  private hash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }

  next(): number {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  nextColor(): string {
    return `#${Math.floor(this.next() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
  }
}
