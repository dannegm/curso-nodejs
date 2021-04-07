
const delay = (ms, txt) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(txt)
      resolve();
    }, ms);
  });
};

delay(100, '1')
.then(() => delay(300, '2'))
.then(() => delay(300, '3'));
