function sum() {
  console.log(1);
  return [].reduce.call(arguments, (acc, el) => acc+=el);
}

const prom = x => new Promise(res => {
  console.log(2);
  setTimeout(res,2000,x);
})

function pow() {
  console.log(3);
  return [].reduce.call(arguments, (acc, el) => acc*=el);
}

const arr = [1,2,3,4]

function *gen() {
  const a = yield sum.bind(null, ...arr);
  const b = yield prom(a);
  const c = yield pow.bind(null, ...arr);
  const d = yield arr;
  console.log(a + b + c + d)
  yield a + b + c + d;
}
function checker(value, resArray){
  if(typeof value === 'function'){
    resArray.push(value);
    return value();
    }else if(value === undefined){
      return;
    }else if(value instanceof Promise){
       value.then(data => {
        resArray.push(data);
        return value;
       });
    }else{
      resArray.push(value);
      return value;
    }
}

async function runnerFunction(arg){
  const resArray = [];
  let nextIteretion = arg.next();
  let flag = nextIteretion.done;
  let value = await nextIteretion.value;
  let res = checker(value, resArray);
  while(flag === false){
    await value;
    nextIteretion = arg.next(res);
    flag = nextIteretion.done;
    value = await nextIteretion.value;
    res = checker(value, resArray);
  }
  return resArray;
}

runnerFunction(gen()).then(data => console.log(data.pop() === '441,2,3,4' ? "Good Job" : "You are fail this task"));