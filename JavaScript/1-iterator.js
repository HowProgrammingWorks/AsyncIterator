'use strict';

const asyncIterator = {
  counter: 0,
  async next() {
    return {
      value: this.counter++, // current value
      done: this.counter > 3 // boolean
    };
  }
};

const step1 = asyncIterator.next();
const step2 = asyncIterator.next();
const step3 = asyncIterator.next();
const step4 = asyncIterator.next();
console.log({ step1, step2, step3, step4 });
