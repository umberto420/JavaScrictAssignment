const assert = require('assert');
const fs = require('fs')


// Implement a function that takes an object and multiply it's value by a constant and returns a promise
async function calculateItem(item) {
    if(item.value){
        if(item.value >= 0)
            return item.value*2;
        else 
            return item.value*-2;    
    }else{
        return 0;
    }
}       

// Implement a function that returns true for "settled" items
function isSettled(item) {
    let array = [];
    item.forEach(element => {
        if(element.settled === true)
            array.push(element);
    });
    
    return array;
}

function main() {
    // Load data from a json file located at the "resources" folder
    let rawdata = fs.readFileSync('./resources/data.json');
    let data = JSON.parse(rawdata);

    data = isSettled(data);
    // For each item in the array that is "settled"
    // Multiply its absolute value by 2
    // Sum up results
    let soma = 0;
    let promis = [];

    data.forEach(element => {
        promis.push(calculateItem(element));
    })

    Promise.all(promis).then(function(value){
        value.forEach(element => {
            soma += element   
        })
        const calculatedValue = soma;
        console.log('calculated value:', calculatedValue);
        
        //The final answer should be 42
        assert(calculatedValue === 42, 'Incorrect value');
    }, function(er){
        console.log(er)
    })

}

main();