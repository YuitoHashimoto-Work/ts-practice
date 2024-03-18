let string = "100";
let num = 0;

num = Number(string);


const CalcFunc = (num1:number, num2:number):number => {
  return num1 + num2;
}

console.log(CalcFunc(1, 1));

enum ColList {
  RED = "red",
  BLUE = "blue",
  GREEN = "green"
}

const human = {
  "name": "北西",
  "col": ColList.RED
}