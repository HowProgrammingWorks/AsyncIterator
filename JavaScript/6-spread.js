'use strict';

/*
  'Spread operator' and 'Destructuring assignment' do not work.
  But you can do something similar using a synchronous Iterable,
  returning a Promise in `value`. However, `done` must be
  synchronous, otherwise the iteration will never end.

  'Spread оператор' и 'Деструктурирующее присваивание' не работают.
  Но можно сделать что-то похожее, используя синхнонный Iterable,
  возвращающий Promise в `value`. При этом, `done` должен быть
  синхронным, иначе итерация никогда не закончится.
*/

const iterable = {
  [Symbol.iterator]() {
    let i = 0;
    const iterator = {
      next() {
        const res = i;
        return {
          value: new Promise((resolve) => {
            setTimeout(() => {
              resolve(res);
            }, 500);
          }),
          done: ++i > 3,
        };
      },
    };
    return iterator;
  },
};

// Spread operator
{
  Promise.all([...iterable]).then(console.log.bind(null, 'spread:'));
}

// Destructuring assignment
{
  const [step1, step2, step3] = [...iterable];
  step1.then(console.log.bind(null, 'DA:'));
  step2.then(console.log.bind(null, 'DA:'));
  step3.then(console.log.bind(null, 'DA:'));
}

// Other tests

// for-await works fine
(async () => {
  for await (const step of iterable) {
    console.log('for-await:', { step });
  }
})();

// yield* works fine too
(async () => {
  const gen = async function* () {
    yield* iterable;
  };
  const genIter = gen();

  for await (const step of genIter) {
    console.log('yield*:', { step });
  }
})();

// next() works but with a hack
(async () => {
  const iterator = iterable[Symbol.iterator]();
  let done = false;

  do {
    // `await iterator.next()` does't work, because only `value` is Promise
    const step = iterator.next();

    // Use await or step.value.then() here
    const value = await step.value;

    done = step.done;
    console.log('next:', { value, done });
  } while (!done);
})();
