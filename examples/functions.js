/** Functions **/
// Limiting parameters
// Use an object if you are finding yourself needing a lot of arguments.
// Bad
function createMenu(title, body, buttonText, cancellable) {
    console.log(title, body, buttonText, cancellable);  // Title 1 Body 1 Button 1 false
}

createMenu("Title 1", "Body 1", "Button 1", false);

// Good
function createMenuObj({title, body, buttonText, cancellable}) {
    console.log(title, body, buttonText, cancellable);  // Title 2 Body 2 Button 2 true 
}

createMenuObj({
    title: 'Title 2',
    body: 'Body 2',
    buttonText: 'Button 2',
    cancellable: true
});

// One level of abstraction
// Functions should had only one level of abstraction, split functions for reusability and testing
// Bad: parseJS has two clear inner-functions
function parseJS(code) {
    const REGEXES = [
        // ...
    ];

    const statements = code.split(' ');
    const tokens = [];
    REGEXES.forEach((REGEX) => {
        statements.forEach((statement) => {
            // ...
        });
    });

    const ast = [];
    tokens.forEach((token) => {
        // lex...
    });

    ast.forEach((node) => {
        // parse...
    });
}

// Good: parseBetterJSAlternative: calls outside functions tokenize / lexer
function parseJS(code) {
    const tokens = tokenize(code);
    const ast = lexer(tokens);
    ast.forEach((node) => {
        // parse...
    });
}

function tokenize(code) {
    const REGEXES = [
        // ...
    ];

    const statements = code.split(' ');
    const tokens = [];
    REGEXES.forEach((REGEX) => {
        statements.forEach((statement) => {
            tokens.push( /* ... */ );
        });
    });

    return tokens;
}

function lexer(tokens) {
    const ast = [];

    tokens.forEach((token) => {
        ast.push( /* ... */ );
    });

    return ast;
}