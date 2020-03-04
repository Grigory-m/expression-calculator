function eval() {
    // Do not use eval!!!
    return;
}

class ExpressionError extends Error {
    constructor(message) {
      super(message); 
      this.name = "ExpressionError";
    }
  }

function expressionCalculator(expr) {
    let arr = [];
    expr = expr.replace(/\s/g, '');
    let open, close;
    if (expr.match(/\(/g) === null) {
        open = 0;
    }   else open = expr.match(/\(/g).length;
    if (expr.match(/\)/g) === null) {
        close = 0;
    }   else close = expr.match(/\)/g).length;
    if (open > close || close > open) {
        throw new ExpressionError('ExpressionError: Brackets must be paired')
    } 
    for (let j = 0; j <= open; j++) {
        if (expr.split('').includes('(')) {
            arr = lineBreak(expr);
        }   else {
            return Math.round(result(expr)*10000)/10000;
            }
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] === '(' && arr[i][arr[i].length - 1] === ')') arr[i] = result(arr[i]);
        }
        expr = arr.join(''); 
        if (!expr.split('').includes('(') ) {
            if (Math.abs(result(expr)) > 300000000000) return Math.round(result(expr)*1000000)/1000000;
            return Math.round(result(expr)*10000)/10000;    
        }     
    }    
    
    function lineBreak(str) {
        let arr = str.split('');
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === '(') arr[i] = '\n' + arr[i]; 
            if (arr[i] === ')') arr[i] = arr[i] + '\n'; 
        }
        return arr.join('').match(/^((.)+)$/gm);
      }
  
    function result(str) {
        let arr = str.match(/-?\d+(\.\d+)?|\+|\-|\(|\)|\*|\//g);
    
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == '(' || arr[i] === ')') arr.splice(i, 1);
        }
  
        for (let i = 0; i < arr.length; i++) if (arr[i] == '/') {
            if (+arr[i+1] === 0) throw new TypeError('TypeError: Division by zero.');
            arr.splice(i-1, 3, +arr[i-1] / +arr[i+1]);i=0;
        }
    
        for (let i = 0; i < arr.length; i++) if (arr[i] == '*') {arr.splice(i-1, 3, +arr[i-1] * +arr[i+1]);i=0;}
        for (let i = 0; i < arr.length; i++) if (arr[i] == '+') {arr.splice(i-1, 3, +arr[i-1] + +arr[i+1]);i=0;}
        for (let i = 0; i < arr.length; i++) if (arr[i] == '-') {arr.splice(i-1, 3, +arr[i-1] - +arr[i+1]);i=0;}
            
        if (!arr.includes('+') && !arr.includes('-') && !arr.includes('*') && !arr.includes('/')) {
            return Math.round(arr.reduce((sum, i) => sum + +i, 0 )*1000000000000000)/1000000000000000;
        }  
        return Math.round(arr[0]*1000000000000000)/1000000000000000;
    } 
}

module.exports = {
    expressionCalculator
}