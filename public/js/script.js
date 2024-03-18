"use strict";
var string = "100";
var num = 0;
num = Number(string);
var CalcFunc = function (num1, num2) {
    return num1 + num2;
};
console.log(CalcFunc(1, 1));
var ColList;
(function (ColList) {
    ColList["RED"] = "red";
    ColList["BLUE"] = "blue";
    ColList["GREEN"] = "green";
})(ColList || (ColList = {}));
var human = {
    "name": "北西",
    "col": ColList.RED
};
