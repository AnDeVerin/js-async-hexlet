// последовательное выполнение списка асинхронных функций

const waterfall = (functions, callback) => {
  if (functions.length === 0) {
    return callback();
  }

  const next = ([head, ...rest], previousResult) => {
    const cb = (err, ...args) => {
      if (err) {
        callback(err, args);
        return;
      }
      if (rest.length === 0) {
        callback(err, args);
        return;
      }
      next(rest, args);
    };
    head(...previousResult, cb);
  };

  return next(functions, []);
};

export default waterfall;

const ff = [
  cb => cb(null),
  cb => cb(null, 'one'),
  (r1, cb) => cb(null, r1, 'two'),
  (r1, r2, cb) => cb(null, r2, r1),
];

waterfall(ff, (err, result) => console.log(result));

console.log('end');
