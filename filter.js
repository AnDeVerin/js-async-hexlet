/*
Реализуйте и экспортируйте по умолчанию функцию filter.
Отфильтрованная коллекция должна сохранять порядок элементов.

filter(['file1', 'file2', 'file3'], (filePath, callback) => {
  fs.access(filePath, err => {
      callback(null, !err)
  });
}, (err, results) => {
  // results now equals an array of the existing files
});

*/

const noop = () => {};

const once = (fn) => {
  let called = false;

  return (...args) => {
    if (called) return;
    called = true;
    fn(...args);
  };
};

const each = (coll, iteratee, callback = noop) => {
  const oncedCallback = once(callback);
  let completed = 0;
  if (coll.length === 0) {
    callback(null);
    return;
  }

  const cb = (err) => {
    if (err) {
      oncedCallback(err);
      return;
    }
    completed += 1;
    if (completed === coll.length) {
      // перед вызовом нужно обработать результат !!!

      oncedCallback(null);
    }
  };

  coll.forEach((item, index) => iteratee(index, item, cb));
};

export default (coll, fn, callback) => {
  let result = [];
  each(coll, (index, item, cb) => {
    fn(item, (err, y) => {
      result = [...result, [index, item, y]];
      cb(err, result);
    });
  }, (err) => {
    callback(err, result);
  });
};
