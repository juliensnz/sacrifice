export class RandomGenerator {
  private values: any;
  private lastPickedValue: any;

  constructor(values: any) {
    this.values = {}
    values.forEach((value: any) => {
      this.values[value] = 0;
    });
    this.lastPickedValue = null;
  }

  pick() {
    const minCount = Math.min.apply(Math, Object.values(this.values));
    const possibleResults: any = [];
    Object.keys(this.values).forEach((value) => {
      if (this.values[value] === minCount) {
        possibleResults.push(value);
      }
    });
    if (possibleResults.length === 1) {
      this.lastPickedValue = possibleResults[0];
      this.values[possibleResults[0]] += 1;
    } else {
      if (this.lastPickedValue) {
        const index = possibleResults.indexOf(this.lastPickedValue, 0);
        if (index > -1 && possibleResults.length > 1) {
          possibleResults.splice(index, 1);
        }
      }
      const random = Math.floor(Math.random() * possibleResults.length);
      const result = possibleResults[random];
      this.lastPickedValue = result;
      this.values[result] += 1;
    }
    return this.lastPickedValue;
  }
}
