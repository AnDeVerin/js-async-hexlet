// попытка выполнить асинхронную функцию несколько раз

export default (attempts, fn, callback) => {
  const iter = (attepmtNum) => {
    const cb = (err, body) => {
      if (!err) {
        callback(err, body);
        return;
      }
      if (err && attepmtNum < attempts) {
        iter(attepmtNum + 1);
        return;
      }
      callback(err, body);
    };
    fn(cb);
  };

  return iter(0);
};

// *** решение учителя ***
const noop = () => {};

const retry = (count, fn, callback = noop) => {
  const cb = (err, result) => {
    if (!err || count <= 1) {
      callback(err, result);
      return;
    }
    retry(count - 1, fn, callback);
  };

  fn(cb);
};

// export default retry;
