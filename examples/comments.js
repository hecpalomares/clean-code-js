/* Comments */

/* Only comment things that have business logic complexity. */
// Good code is self-documented.

// Bad:
function hashIt(data) {
    // The hash
    let hash = 0;

    // Length of string
    const length = data.length;

    // Loop through every character in data
    for (let i = 0; i < length; i++) {
        // Get character code.
        const char = data.charCodeAt(i);
        // Make the hash
        hash = ((hash << 5) - hash) + char;
        // Convert to 32-bit integer
        hash &= hash;
    }
}

// Good: remove obvious code, only left not so obvious(complex / obscure) pieces of code commented
function hashIt(data) {
    let hash = 0;
    const length = data.length;

    for (let i = 0; i < length; i++) {
        const char = data.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        // Convert to 32-bit integer
        hash &= hash;
    }
}

/* Don't leave commented out code in your codebase */
// If you think you may uncomment that code in the future, use the version control.

// Bad:
function add(a, b) {
    return a + b;
}

// function multiply(a, b) {
//     return a * b;
// }

let a = 5;
let b = 3;
let c = add(a, b);
// multiply();
let d = add(c, a);
let e = add (d, b);

// Good:
function add(a, b) {
    return a + b;
}

let a = 5;
let b = 3;
let c = add(a, b);
let d = add(c, a);
let e = add (d, b);

/* Don't have journal comments */

// Bad:
/**
 * 2018-07-17: Return a variable (AV)
 * 2018-05-01: Improved combine function to return directly the value, no need the varible (HP)
 */
function combine(a, b) {
    let c = a + b;
    return c;
}

// Good:
function combine(a, b) {
    let c = a + b;
    return c;
}