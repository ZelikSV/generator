function sum(a, b) {
return a + b;
}
const val = 33;

const val2 = {name: 'ivan'};

const p = new Promise((res, rej) => {
  setTimeout(() => {
   res(1);
  }, 10);
});


function *gen() {
  const a = yield sum(1, 2);
  const b = yield p;
  const c = yield val2;
  const d = yield val;

  console.log(a + b + c + d);
}
const iterator = gen();

async function runnerFunction(arg){
 const resArray = [];

}
runnerFunction(iterator);

// runnerFunction(gen()).then(data => console.log(data.pop() === '441,2,3,4' ? "Good Job" : "You are fail this task"));
