'use strict';

class Counter {
  constructor(begin, end, step = 1) {
    this.begin = begin;
    this.end = end;
    this.step = step;
  }

  [Symbol.asyncIterator]() {
    const end = this.end;
    let i = this.begin;
    const step = this.step;
    const iterator = {
      async next() {
        const item = {
          value: i,
          done: i >= end,
        };
        i += step;
        return item;
      },
    };
    return iterator;
  }
}

// Usage

const iterable = new Counter(0, 3);

const iterator = iterable[Symbol.asyncIterator]();
const step1 = iterator.next();
const step2 = iterator.next();
const step3 = iterator.next();
const step4 = iterator.next();
console.log({ step1, step2, step3, step4 });

const main = async () => {
  for await (const step of iterable) {
    console.log({ step });
  }
};

main();
