/** SOLID **/

/* Single Responsability Principle (SRP) */
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

/* Open/Closed Principle (OCP) */
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