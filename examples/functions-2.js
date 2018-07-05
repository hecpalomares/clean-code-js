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

/* Avoid type-checking */
// Doing typecheck of the functions to do certain functionality is a bad practice. The root fix is to have consistent APIs.

// Bad: by checking the instance of vehicle we do different functionality
function travelToLocation(vehicle, location) {
    if (vehicle instanceof Bicycle) {
        vehicle.pedal(this.currentLocation, moveToLocation(location));
    } else if (vehicle instanceof Car) {
        vehicle.drive(this.currentLocation, moveToLocation(location));
    }
}

// Good: vehicle.move method should handle this logic
function travelToLocation(vehicle, location) {
    vehicle.move(this.currentLocation, moveToLocation(location));
}

// JS requires much extra verbiage to do 'type-safety' if is really required for the project, consider use TypeScript.
function combine(val1, val2) {
    if (typeof val1 === 'number' && typeof val2 === 'number' ||
        typeof val1 === 'string' && typeof val2 === 'string') {
        return val1 + val2;
    }

    throw new Error('Must be of type String or Number');
}

function combine(val1, val2) {
    return val1 + val2;
}

/* Don't over-optimize */
// Modern browsers run a lot optimization code under the hood. By doing this manually in edge cases we are wasting effort.

// Bad: an extra declaration to take in consideration
for (let i = 0, len = list.length; i < len; i++) {
    // ...
}

// Good: moden browswers take care of the extra declaration
for (let i = 0; i < list.length; i++) {
    // ...
}

/* Remove dead code */
// As bad as duplicated code. Adds extra complexity just living there. Still safe on version control history if needed again.

// Bad:
function oldRequestModule(url) {
    // ...
}

function newRequestModule(url) {
    // ...
}

const req = newRequestModule;
inventoryTracker('apples', req, 'www.inventory.com');

// Good: delete oldRequestModule function
function newRequestModule(url) {
    // ...
}

const req = newRequestModule;
inventoryTracker('apples', req, 'www.inventory.com');