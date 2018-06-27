/** Functions **/

/* Limiting parameters */
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

/* Functions should do one thing! */
// Isolate functions to just one action, easier to refactor and a much cleaner reading. This is the most important rule in software engineering.

// Bad: iterate over a list of clients, get the records of an individual client, check in the record if the client is active, send a email to th client. This function does 2 purposes, check if the individual client is active and send an email to the client.
function emailClients(clients) {
    clients.forEach((client) => {
        const clientRecord = client.record;
        if(clientRecord.isActive()) {
            email(client);
        }
    });
}


// Good: separate the concnerns of checking if the client is active with its own function isActiveClient(), filter those clients and email those who pass that filter. 2 functions clearly separated
function emailActiveClients(clients) {
    clients
    .filter(isActiveClient(client))
    .map(client => email(client));
}

function isActiveClient(client) {
    const clientRecord = client.record;
    return clientRecord.isActive();
}

/* One level of abstraction */
// Functions should had only one level of abstraction, split functions for reusability and testing

// Bad: parseJS has two clear inner-functions
function parseJS(code) {
    const REGEXES = [
        // ...
    ];

    // Possible function 1
    const statements = code.split(' ');
    const tokens = [];
    REGEXES.forEach((REGEX) => {
        statements.forEach((statement) => {
            // ...
        });
    });

    // Possible function 2
    const lexerStringTokens = [];
    tokens.forEach((token) => {
        // lex...
    });

    lexerStringTokens.forEach((node) => {
        // parse...
    });
}

// Good: parseBetterJSAlternative: calls outside functions tokenize / lexer
function parseJS(code) {
    const tokens = tokenize(code);
    const lexerStringTokens = lexer(tokens);
    lexerStringTokens.forEach((node) => {
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
    const lexerStringTokens = [];

    tokens.forEach((token) => {
        lexerStringTokens.push( /* ... */ );
    });

    return lexerStringTokens;
}

/* Remove duplicate code */
//  It means that will be multiple places to update in change if something needs to be altered. To remove duplicated code create an abstraction that can handle little differences between duplicated functions / classes. 

// Bad: two functions that do almost the same, iterate over a list of employees, get some properties and render the data
function showDeveloperList(developers) {
    developers.forEach((developer) => {
      const expectedSalary = developer.calculateExpectedSalary();
      const experience = developer.getExperience();
      const githubLink = developer.getGithubLink();
      const data = {
        expectedSalary,
        experience,
        githubLink
      };
  
      render(data);
    });
  }
  
function showManagerList(managers) {
    managers.forEach((manager) => {
        const expectedSalary = manager.calculateExpectedSalary();
        const experience = manager.getExperience();
        const portfolio = manager.getMBAProjects();
        const data = {
            expectedSalary,
            experience,
            portfolio
        };

        render(data);
    });
}

// Good: one function that receive a list of employees, iterate over the list, abstract similar properties, get the differences and render the data
function showEmployeeList(employees) {
    employees.forEach((employee) => {
        const expectedSalary = employee.calculateExpectedSalary();
        const experience = employee.getExperience();

        const data = {
            expectedSalary,
            experience
        };

        switch(employee.type) {
            case 'manager':
                data.portfolio = employee.getMBAProjects();
                break;
            case 'developer':
                data.portfolio = employee.getGithubLink();
                break;
        }
    
        render(data);
    });
}

showEmployeeList(developerList);
showEmployeeList(managerList);