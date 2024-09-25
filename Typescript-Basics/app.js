var num1Ele = document.getElementById('num1');
var num2Ele = document.getElementById('num2');
var buttonElement = document.querySelector('button');
var para = document.getElementById('para');
function add(num1, num2) {
    if (typeof num1 == 'number' && typeof num2 == 'number')
        return num1 + num2;
    else if (typeof num1 == 'string' && typeof num2 == 'string')
        return num1 + '' + num2;
}
var numsResults = [];
var textResults = [];
function printResult(resultObj) {
    console.log(resultObj.val);
}
buttonElement === null || buttonElement === void 0 ? void 0 : buttonElement.addEventListener('click', function () {
    var num1 = num1Ele === null || num1Ele === void 0 ? void 0 : num1Ele.value;
    var num2 = num2Ele === null || num2Ele === void 0 ? void 0 : num2Ele.value;
    var result = add(+num1, +num2);
    numsResults.push(result);
    var stringResult = add(num1, num2);
    textResults.push(stringResult);
    printResult({ val: result, timeStamps: new Date() });
    para.innerHTML = JSON.stringify(result);
    printResult({ val: result, timeStamps: new Date() });
    console.log(numsResults, textResults);
});
