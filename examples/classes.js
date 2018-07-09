/* Classes */
// If you need inheritance (probably not), prefer ES6 classes if the object is complex. Is not, small functions should do the work

// Bad: Breaks DRY principle by: validating instaceof at every class, faking the inheritance between classes.
const Animal = function (age) {
    if (!(this instanceof Animal)) {
        throw new Error('Instantiate Animal with `new`');
    }

    this.age = age;
};

Animal.prototype.move = function move() {
    console.log("Moving!");
}

const Mammal = function(age, furColor) {
    if (!(this instanceof Mammal)) {
      throw new Error('Instantiate Mammal with `new`');
    }

    Animal.call(this, age);
    this.furColor = furColor;
};

Mammal.prototype = Object.create(Animal);
Mammal.prototype.constructor = Mammal;

Mammal.prototype.changeFur = function changeFur() {
    this.furColor = 'none';
};

const Human = function (age, furColor, languageSpoken) {
    if (!(this instanceof Human)) {
        throw new Error('Instantiate Human with `new`');
    }

    Mammal.call(this, age, furColor);
    this.languageSpoken = languageSpoken;
};

Human.prototype = Object.create(Mammal.prototype);
Human.prototype.constructor = Human;
Human.prototype.speak = function speak() {
    console.log("Hello I'm a human and I can speak!");
};

// Good: Better syntax. 'extends', super(), constructor()
class AnimalX {
    constructor(age) {
        this.age = age;
    }

    move() {
        console.log("Moving");
    }
}

class MammalX extends Animal {
    constructor(age, furColor) {
        super(age);
        this.furColor = furColor;
    }

    changeFur() {
        this.furColor = 'none';
    }
}

class HumanX extends Mammal {
    constructor(age, furColor, languageSpoken) {
        super(age, furColor);
        this.languageSpoken = languageSpoken;
    }

    speak() {
        console.log("Hello I'm a human and I can speak!");
    };
}

/* Method Chaining */
// Allow expresive less verbose code, provides a resource for cleaner code. Returning 'this' keyword at every function and you can chain methods

// Bad: standard constructor(), setters and methods
class Car {
    constructor(make, model, color) {
        this.make = make;
        this.model = model;
        this.color = color;
    }

    setMake(make) {
        this.make = make;
    }

    setModel(model) {
        this.model = model;
    }

    setColor(color) {
        this.color = color;
    }

    save() {
        console.log(this.make, this.model, this.color);
    }
}

const car = new Car('Ford','F-150','Yellow');
car.setColor('Blue');
car.save(); // Ford F-150 Blue

// Good: returning 'this' in every method for chaining the instance of the object
class CarX {
    constructor(make, model, color) {
        this.make = make;
        this.model = model;
        this.color = color;
    }

    setMake(make) {
        this.make = make;
        return this;
    }

    setModel(model) {
        this.model = model;
        return this;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    save() {
        console.log(this.make, this.model, this.color);
        return this;
    }
}

const carX = new CarX("Chevrolet", "Sonic", "Gray").setColor("Red").save(); // Chevrolet Sonic Red

/* Composition over Inheritance */
// Trying to model the problem as a composition relation "has-a" instead of inheritance "is-a"

// Bad: Employees "have" tax data. EmployeeTazData is not a type of Employee
class Employee {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}

class EmployeeTaxData extends Employee {
    constructor(ssn, salary) {
        super();
        this.ssn = ssn;
        this.salary = salary;
    }
}

// Good: define a "has-a" relationship with setTaxData method that calls the class EmployeeTaxData
class EmployeeTaxData {
    constructor(ssn, salary) {
        this.ssn = ssn;
        this.salary = salary;
    }
}

class Employee {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    setTaxData(ssn, salary) {
        this.taxData = new EmployeeTaxData(ssn, salary);
    }
}