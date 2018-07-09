/** SOLID **/

/* Single Responsability (SRP) */
// Functions should seek for high cohesion, all the elements of a module should belong together. By breaking breaking up the functionalities of single responsability the code will be understadable, maintable and testable.

// Bad: function UserSettings is in change of both creating and authenticate/verify the user
class UserSettings {
    constuctor(user) {
        this.user = user;
    }

    changeSettings(settings) {
        if(this.verifyCredentials()) {
            console.log("verified")
        }
    }

    verifyCredentials() {
        return true;
    }
}

// Good: single function of authenticate/verify and a single second function for create the user
class UserAuth {
    constuctor(user) {
        this.user = user;
    }

    verifyCredentials() {
        return true;
    }
}

class UserSettings {
    constuctor(user) {
        this.user = user;
        this.auth = new UserAuth(user);
    }

    changeSettings(settings) {
        if(this.auth.verifyCredentials()){
            console.log("verified")
        }
    }
}

/* Open/Closed (OCP) */
// Allow users to add new functionalities without changing existing code

// Bad
class AjaxAdapter extends Adapter {
    constuctor() {
        super();
        this.name = 'ajaxAdapter';
    }
}

class NodeAdapter extends Adapter {
  constructor() {
    super();
    this.name = 'nodeAdapter';
  }
}

function makeAjaxCall(url) {
  // request and return promise
}

function makeHttpCall(url) {
  // request and return promise
}

// bad, since if we try to add a new adapter, we need to change the httpRequester class
class httpRequester {
  constructor(adapter) {
    this.adapter = adapter;
  }

  fetch(url) {
    if (this.adapter.name === 'ajaxAdapter') {
      return makeAjaxCall(url).then(response => {
        // transform response and return
      });
    } else if(this.adapter.name === 'httpNodeAdapter') {
      return makeHttpCall(url).then(response => {
        // transform response and return
      });
    }
  }
}

// Good: by adding the request method to their respective class we can create new classes without modifying the httpRequester
class AjaxAdapter extends Adapter {
    constuctor() {
        super();
        this.name = 'ajaxAdapter';
    }

    request(url) {
        // request and return promise
    }
}

class NodeAdapter extends Adapter {
  constructor() {
    super();
    this.name = 'nodeAdapter';
  }

  request(url) {
        // request and return promise
    }
}

class httpRequester {
    constructor(adapter) {
        this.adapter = adapter;
    }

    fetch(url) {
        this.adapter.fetch(url).then(response => {
            console.log(response);
        });
    }
}

/* Liskov Substitution (LSP) */
// If you have a parent class and a child class, then the base class and child class can be used interchangeably without getting incorrect results.

// Bad:
class Rectangle {
    constructor() {
        this.width = 0;
        this.height = 0;
    }

    setColor(color) {
        // ...
    }

    render(area) {
        // ...
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    getArea() {
        return this.width * this.height;
    }
}

class Square extends Rectangle {
    setWidth(width) {
    this.width = width;
    this.height = width;
  }

  setHeight(height) {
    this.width = height;
    this.height = height;
  }
}

function renderRectangles(rectangles) {
  rectangles.forEach((rectangle) => {
    rectangle.setWidth(4);
    rectangle.setHeight(5);
    const area = rectangle.getArea(); // bad, Returns 25 for Square. Should be 20.
    rectangle.render(area);
  });
}

const rectangles = [new Rectangle(), new Rectangle(), new Square()];
renderRectangles(rectangles);

// Good:
class Shape {
    setColor(color) {
        // ...
    }

    render(area) {
        // ...
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    getArea() {
        return this.width * this.height;
    }
}

class Square extends Shape {
    constructor(length) {
        super();
        this.length = length;
    }

    getArea() {
        return this.length * this.length;
    }
}

function renderShapes(shapes) {
  shapes.forEach((shape) => {
    const area = shape.getArea();
    shape.render(area);
  });
}

const shapes = [new Rectangle(2, 3), new Rectangle(1, 5), new Square(3)];
renderShapes(shapes);

/* Interface Segregation (ISP) */
// JS doesn't have interfaces.

/* Dependency Inversion (DIP) */ 
// High-level modules should not depend on low-level modules. Buth should depend on abstractions.
// Abstractions should not depend on detials. Details should depend on abstractions.
