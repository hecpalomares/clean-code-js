/* Getters and Setters */
// Easier validation for 'set'. Encapsulates internal representation. Easy to add logging and error handling when getting and setting. Easier to add code to object properties.
// Bad:
function makeBankAccount(id) {
    return {
        id: id,
        balance: 0,
    };
}

const account = makeBankAccount('232AX');
account.balance = 250;
console.log(account);   // { id: '232AX', balance: 250 }

// Good:
function makeBankAccount2(id) {
    // private balance
    let balance = 0;

    // a 'getter' method, made public via returned object
    function getBalance() {
        return balance;
    }

    // a 'setter' method, made public via returned object
    function setBalance(amount) {
        balance = amount;
    }

    return {
        id: id,
        getBalance,
        setBalance
    };
}

const account2 = makeBankAccount2('572BM');
account2.setBalance(745);
console.log(account2.getBalance());   // { 745 }

/* Make objects have private members */
// Accomplished through closures
// Bad:
const Employee = function(name) {
    this.name = name;
};

Employee.prototype.getName = function getName() {
    return this.name;
};

const employee = new Employee('Matz Ser');
console.log(`Employee name: ${employee.getName()}`); // Employee name: Matz Ser
delete employee.name;
console.log(`Employee name: ${employee.getName()}`); // Employee name: undefined

// Good
function makeEmployee(name) {
    return {
        getName() {
            return name;
        },
    }; 
}

const employee2 = makeEmployee('Matz Ser');
console.log(`Employee name: ${employee2.getName()}`); // Employee name: Matz Ser
delete employee2.name;
console.log(`Employee name: ${employee2.getName()}`); // Employee name: Matz Ser