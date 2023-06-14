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

