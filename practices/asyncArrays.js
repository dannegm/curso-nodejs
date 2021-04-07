const { curry } = require("lodash");

const delay = (ms, step, isFailed) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isFailed ? reject('falló en ' + step) : resolve('ok en ' + step);
    }, ms);
  });
};

const FAILED = true

const arr = [
  delay(300, 1),
  delay(500, 2),
  delay(100, 3),
]

const asynPromiseAll = async (arr) => {
  for (i = 0; i < arr.length; i++) {
    console.log(await arr[i])
  }
}

asynPromiseAll(arr)
