// асинхронная фильтрация списка

export default (coll, fn, cb) => {
  if (coll.length === 0) {
    cb([]);
    return;
  }

  const iter = (acc, [head, ...rest]) => {
    const newAcc = (fn(head)) ? [...acc, head] : acc;

    if (rest.length === 0) {
      cb(newAcc);
      return;
    }
    setTimeout(iter, 0, newAcc, rest);
  };
  iter([], coll);
};
