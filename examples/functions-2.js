/** Functions Part 2 **/

// Favor functional programming over imperative programming. Can be cleaner and easier to test.
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

// Bad:
let totalOutput = 0;
for (let i = 0; i < programmerOutput.length; i++) {
    totalOutput += programmerOutput[i].linesOfCode;
}

// Good: 
const totalOutputFunctional = programmerOutput.map(output => output.linesOfCode).reduce((totalLines, lines) => totalLines + lines);

