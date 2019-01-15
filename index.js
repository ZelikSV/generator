function *some(){
  const a = yield () => sum(1,2);
  const c = yield val2;
  const b = yield prom;
  const d = yield val;
  // console.log(a, b, c, d);
}
const prom = new Promise((res)=>{
setTimeout(() => {
  res(4);
}, 1000);
})
function sum(a, b) {
  return a + b;
}
const val2 = 30;
const val = { name: 'ivan'};

const iterator = some();

async function runnerFunction(arg){
  const resArray = [];
  let nextIteretion = arg.next();
  let flag = nextIteretion.done;
  let value = nextIteretion.value;
  await value;
  if(typeof value === 'function'){
    value = value();
    resArray.push(value);
    }else if(value === undefined){
      
    }else if(value instanceof Promise){
      value.then(data => { 
        value = data;
        resArray.push(data);
       });
    }else{
      resArray.push(value);
    }
  while(flag === false){
    nextIteretion = arg.next(value);
    flag = nextIteretion.done;
    value = nextIteretion.value;
    await value;
    if(typeof value === 'function'){
    resArray.push(value);
    }else if(value === undefined){
      
    }else if(value instanceof Promise){
       value.then(data => {
        resArray.push(data);
       });
    }else{
      resArray.push(value);
    }
  }
  return resArray;
  // console.log(resArray);
  
  
}
runnerFunction(iterator).then(data => console.log(data));