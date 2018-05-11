/*
Реализуйте и экспортируйте по умолчанию функцию concat.
Эта функция применяется в том случае, когда асинхронная операция возвращает коллекцию,
а на выходе нужно получить массив, состоящий из всех элементов коллекций,
которые вернула каждая асинхронная операция.

concat(['dir1', 'dir2', 'dir3'], fs.readdir, (err, files) => {
  // files is now a list of filenames that exist in the 3 directories
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

export default (col, fn, callback = noop) => {
  const oncedCallback = once(callback);

  if (col.length === 0) {
    return callback(null);
  }

  let completed = 0;
  let result = [];

  const cb = (err, data) => {
    if (err) {
      oncedCallback(err);
      return;
    }
    result = [...result, ...data];
    completed += 1;
    if (completed === col.length) {
      oncedCallback(null, result);
    }
  };

  return col.forEach(element => fn(element, cb));
};

// *** решение учителя ************************************
/*

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
      oncedCallback(null);
    }
  };

  coll.forEach(item => iteratee(item, cb));
};

export default (coll, fn, callback) => {
  let result = [];
  each(coll, (item, cb) => {
    fn(item, (err, y) => {
      result = result.concat(y || []);
      cb(err);
    });
  }, (err) => {
    callback(err, result);
  });
};

*/
