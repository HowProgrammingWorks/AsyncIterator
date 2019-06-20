'use strict';

const gen = async function* () {
  yield* [0, 1, 2];
};

{
  const iterable = gen();
  const iterator = iterable[Symbol.asyncIterator]();
  const step1 = iterator.next();
  const step2 = iterator.next();
  const step3 = iterator.next();
  const step4 = iterator.next();
  Promise.all([step1, step2, step3, step4]).then(steps => {
    console.log({ steps });
  });
}

(async () => {
  const iterable = gen();
  for await (const step of iterable) {
    console.log({ step });
  }
})();
