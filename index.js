function sum() {
  console.log(1);
  return [].reduce.call(arguments, (acc, el) => (acc += el));
}

const prom = x =>
  new Promise(res => {
    console.log(2);
    setTimeout(res, 2000, x);
  });

function pow() {
  console.log(3);
  return [].reduce.call(arguments, (acc, el) => (acc *= el));
}

const arr = [1, 2, 3, 4];

function* gen() {
  const a = yield sum.bind(null, ...arr);
  const b = yield prom(a);
  const c = yield pow.bind(null, ...arr);
  const d = yield arr;
  console.log(a + b + c + d);
  yield a + b + c + d;
}

function runnerFunction(arg) {
  const resArray = [];

  return new Promise(resolve => {
    function executer(iterator, prevValue) {
      const nextIteretion = iterator.next(prevValue);
      let { value, done } = nextIteretion;

      if (!done) {
        if (typeof value === "function") {
          resArray.push(value());
          return executer(iterator, value());
        } else if (value instanceof Promise) {
          return value.then(res => {
            resArray.push(res);
            executer(iterator, res);
          });
        } else {
          resArray.push(value);
          return executer(iterator, value);
        }
      }
      return resolve(resArray);
    }
    executer(arg);
  });
}

runnerFunction(gen()).then(data =>
  console.log(
    data.pop() === "441,2,3,4" ? "Good Job" : "You are fail this task"
  )
);
