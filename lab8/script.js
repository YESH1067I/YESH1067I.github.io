function a(){
    let too = document.getElementById("input").placeholder
    document.getElementById("input").placeholder = too+"1";
}

function b(){
    let too = document.getElementById("input").placeholder
    document.getElementById("input").placeholder = too+"2";
}

function c(){
    let too = document.getElementById("input").placeholder
    document.getElementById("input").placeholder = too+"3";
}

function d(){
    let too = document.getElementById("input").placeholder
    document.getElementById("input").placeholder = too+"4";
}


function e(){
    let too = document.getElementById("input").placeholder
    document.getElementById("input").placeholder = too+"5";
}

function f(){
    let too = document.getElementById("input").placeholder
    document.getElementById("input").placeholder = too+"6";
}

function g(){
    let too = document.getElementById("input").placeholder
    document.getElementById("input").placeholder = too+"7";
}

function h(){
    let too = document.getElementById("input").placeholder
    document.getElementById("input").placeholder = too+"8";
}

function i(){
    let too = document.getElementById("input").placeholder
    document.getElementById("input").placeholder = too+"9";
}

function j(){
    let too = document.getElementById("input").placeholder
    if(too.includes(".") || !(too.includes('0'))) document.getElementById("input").placeholder = too+"0";
}

function k(){
    let too = document.getElementById("input").placeholder
    if(!too.includes(".")) document.getElementById("input").placeholder = too+".";
}

function remove(){
    let too = document.getElementById("input").placeholder
    document.getElementById("input").placeholder = too.slice(0, too.length-1);
}

function clr(){
    document.getElementById("input").placeholder
    document.getElementById("input").placeholder = "";
}



function calculate(){
    let too = parseFloat(document.getElementById("input").placeholder)
    let exchangeArray = [
        { name: 'USD', value: 1 },
        { name: 'EUR', value: 0.88 },
        { name: 'POUND', value: 0.75 },
        { name: 'WON', value: 1433 },
        { name: 'YEN', value: 142 },
        { name: 'YAN', value: 7.31 },
        { name: 'MNT', value: 3537 }
    ];

    let from = document.getElementById("currencyCur").value
    let to = document.getElementById("currencyToExchange").value
    document.getElementById("input").placeholder = too*exchangeArray[from].value*exchangeArray[to].value
}


