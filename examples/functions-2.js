/** Functions Part 2 **/

/** Favor functional programming over imperative programming **/
// Cleaner and easier to test
const programmerOutput = [{
    name: 'Uncle Bobby',
    linesOfCode: 500
}, {
    name: 'Suzie Q',
    linesOfCode: 1500
}, {
    name: 'Jimmy Gosling',
    linesOfCode: 150
}, {
    name: 'Gracie Hopper',
    linesOfCode: 1000
}];

// Bad
let totalOutput = 0;
for (let i = 0; i < programmerOutput.length; i++) {
    totalOutput += programmerOutput[i].linesOfCode;
}

// Good
const totalOutputFunctional = programmerOutput.map(output => output.linesOfCode).reduce((totalLines, lines) => totalLines + lines);

/** Encapsulate conditionals **/
// Encapsulate the conditionals and give it a meaningful name about the functionality
function doSomething() {
    console.log('1 2, 3');
}

// Bad
if (request.state === 'fetching' && isEmpty(nodeList)) {
    doSomething();
}

// Good: 
function shouldShowSpinner(request, nodeList) {
    return request.state === 'fetching' && isEmpty(nodeList);
}

if (isRequestLoadingAndNodeEmpty(request, nodeList)) {
    doSomething();
}

/** Avoid negative conditionals **/
// Stop forcing a Morgan Theorem with double negative checking on the functions
// Bad
function isDOMNodeNotPresent(node) {
    // ...
}

if (!isDOMNodeNotPresent(node)) { // Double negative,
    // ...
}

// Good
function isDOMNodePresent(node) {
    // ...
}

if (isDOMNodePresent(node)) {
    // ..
}

/** Avoid conditionals **/
// Use polymorphic code to achieve the same task in many cases. Force to a function do only one thing. When functions have 'if / switch' statements it means that it does more than one thing.

// Bad: Inside the main class 'Airplane', depending the airplane.type, the method getCruisingAltitude return different calculations
class Airplane {
    constructor(type) {
        this.type = type;
    }

    getCruisingAltitude() {
        switch (this.type) {
            case '777':
                return this.getMaxAltitude() - this.getPassengerCount();
            case 'Air Force One':
                return this.getMaxAltitude();
            case 'Cessna':
                return this.getMaxAltitude() - this.getFuelExpenditure();
        }
    }
}

// Good: depending on the instance of the plane, it returns the calculation
class Airplane {
    constructor(type) {
        this.type = type;
    }
}

class Boeing777 extends Airplane {
    getCruisingAltitude() {
        return this.getMaxAltitude() - this.getPassengerCount();
    }
}

class AirForceOne extends Airplane {
    getCruisingAltitude() {
        return this.getMaxAltitude();
    }
}

class Cessna extends Airplane {
    getCruisingAltitude() {
        return this.getMaxAltitude() - this.getFuelExpenditure();
    }
}