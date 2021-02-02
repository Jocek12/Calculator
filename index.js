const display1Element = document.querySelector('.display-1');
const display2Element = document.querySelector('.display-2');
const tempResultElement = document.querySelector('.temp-result');
const numbersElement = document.querySelectorAll('.number');
const operationsElement = document.querySelectorAll('.operation');
const equalElement = document.querySelector('.equal');
const clearElement = document.querySelector('.all-clear');
const clearLastElement = document.querySelector('.last-entity-clear');

let dis1Num = '';
let dis2Num = '';
let result = null;
let lastOperation = '';
let haveDot = false;

numbersElement.forEach( number => {
    number.addEventListener('click', (e)=> {
        if( e.target.innerText === '.' && !haveDot ) {
            haveDot = true;
        } else if( e.target.innerText === '.' && haveDot ) {
            return;
        }
        dis2Num += e.target.innerText;
        display2Element.innerText = dis2Num;
    })
});

operationsElement.forEach( operation => {
    operation.addEventListener('click', (e)=> {
        if ( !dis2Num ) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if ( dis1Num && dis2Num && lastOperation ) {
            mathOperation();
        } else {
            result = parseFloat(dis2Num);
        }
        clearVar(operationName);
        lastOperation = operationName;
    })
});

equalElement.addEventListener('click', (e)=> {
    if( !dis1Num || !dis2Num ) return; 
    haveDot = false;
    mathOperation();
    clearVar();
    display2Element.innerText = result;
    tempResultElement.innerText = '';
    dis2Num = result;
    dis1Num = '';
});

clearElement.addEventListener('click', (e)=> {
    display1Element.innerText = '';
    display2Element.innerText = '0';
    tempResultElement.innerText = '';
    dis1Num = '';
    dis2Num = '';
    result = '';
});

clearLastElement.addEventListener('click', (e)=> {
    display2Element.innerText = '';
    dis2Num = '';
});

window.addEventListener('keydown', (e)=> {
    if(
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.'
    ){
        clickButtonElement(e.key);
    } else if( 
        e.key === '+' ||
        e.key === '-' ||
        e.key === '/' ||
        e.key === '%'
     ){
         clickOperation(e.key);
     } else if( e.key === '*' ){
         clickOperation('X');
     } else if( e.key === 'Enter' || e.key === '='){
         clickEqual();
     }
});


function clickEqual(){
    equalElement.click();
}

function clickOperation(key){
    operationsElement.forEach(button => {
        if( button.innerText === key ){
            button.click();
        }
    })
};

function clickButtonElement(key){
    numbersElement.forEach( button => {
        if( button.innerText === key ) {
            button.click();
        }
    })
};

function clearVar(name = ''){
    dis1Num += dis2Num + ' ' + name + ' ';
    display1Element.innerText = dis1Num;
    display2Element.innerText = '';
    dis2Num = '';
    tempResultElement.innerText = result;
};

function mathOperation(){
    if( lastOperation === 'X' ){
        result = parseFloat(result) * parseFloat(dis2Num);
    }
    else if ( lastOperation === '+'){
        result = parseFloat(result) + parseFloat(dis2Num);
    }
    else if ( lastOperation === '-'){
        result = parseFloat(result) - parseFloat(dis2Num);
    }
    else if ( lastOperation === '/'){
        result = parseFloat(result) / parseFloat(dis2Num);
    }
    else if ( lastOperation === '%'){
        result = parseFloat(result) % parseFloat(dis2Num);
    }
};