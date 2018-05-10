// асинхронное чтение 2-х файлов на колбеках

import fs from 'fs';

const compare = (data1, data2) => {
  const lines1 = data1.split('\n').slice(0, -1);
  const lines2 = data2.split('\n').slice(0, -1);

  // BEGIN (write your solution here)
  const longestData = (lines1.length >= lines2.length) ? lines1 : lines2;
  const result = longestData.map((item, i) => {
    if (lines1[i] === lines2[i]) return null;
    if (lines1[i] === undefined) return [null, lines2[i]];
    if (lines2[i] === undefined) return [lines1[i], null];
    return [lines1[i], lines2[i]];
  });
  return result.filter(x => x);
  // END

  // *** решение учителя ***
  // const biggestFile = lines1.length > lines2.length ? lines1 : lines2;

  // return biggestFile.reduce((acc, line, index) => {
  //   if (lines1[index] === lines2[index]) {
  //     return acc;
  //   }

  //   return [...acc, [lines1[index], lines2[index]].map(x => (x === undefined ? null : x))];
  // }, []);
};

// BEGIN (write your solution here)
export default (path1, path2, cb) => {
  fs.readFile(path1, 'utf8', (err1, data1) => {
    if (err1) {
      cb(err1);
      return;
    }

    fs.readFile(path2, 'utf8', (err2, data2) => {
      if (err2) {
        cb(err2);
        return;
      }

      const result = compare(data1, data2);
      cb(null, result);
    });
  });
};
// END
