const num1Ele = document.getElementById('num1') as HTMLInputElement;
const num2Ele = document.getElementById('num2') as HTMLInputElement;
const buttonElement = document.querySelector('button');
const para = document.getElementById('para') as HTMLElement;

// type Aliases and interfaces

 type Result = {val:number ; timeStamps: Date};
 type numorString = number | string

 interface ResultObj{
  val:number
  timeStamps:Date
 }




function add(num1:numorString ,num2:numorString){
  if(typeof num1 == 'number' && typeof num2=='number')
    return num1 + num2;
  else if(typeof num1 == 'string' && typeof num2=='string')return num1+''+num2;
}
let numsResults: number[] = [];
let textResults: string[] = [];
function printResult(resultObj:ResultObj){
  console.log(resultObj.val);
}
buttonElement?.addEventListener('click',()=>{
  const num1= num1Ele?.value;
  const num2= num2Ele?.value;
  const result = add(+num1, +num2);
  numsResults.push(result as number);
  const stringResult = add(num1,num2);
  textResults.push(stringResult as string);
  printResult({val:result as number,timeStamps:new Date()})
  para.innerHTML = JSON.stringify(result);
  printResult({val:result as number , timeStamps:new Date()});
  console.log(numsResults,textResults);
})

