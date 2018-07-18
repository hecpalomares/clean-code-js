/* Formatting */
// Do not argue about formatting. Automate tools are good for this (indentation, tabs vs spaces, double vs single quotes etc.)

/* Use consistent capitalization */
// Javascript is untyped, capitalization tells context about variables, functions, etc.

// Bad:
const DAYS_IN_A_WEEK = 7;
const daysInAMonth = 30;

const songs = ['Back In Black', 'Stairway to Heaven', 'Hey Jude'];
const Artists = ['ACDC', 'Led Zeppelin', 'The Beatles'];

function eraseDatabase() {}
function delete_database() {}
function databaseGet() {}

class human {}
class Person {}

// Good: consistency. constants are all capital letters with _ between words. functions are all camelCase, starting with verb+Noun. classes start capitalized.
const DAYS_IN_A_WEEK = 7;
const DAYS_IN_A_MONTH = 30;

const SONGS = ['Back In Black', 'Stairway to Heaven', 'Hey Jude'];
const ARTISTS = ['ACDC', 'Led Zeppelin', 'The Beatles'];

function eraseDatabase() {}
function deleteDatabase() {}
function getDatabase() {}

class Human {}
class Person {}

/* Function callers and callees should be close */
// If a function calls another, keep those functions vertically close in the source file. Ideally caller above the callee.

// Bad:
class PerformanceReview {
    constructor(employee) {
        this.employee = employee;
    }

    lookupPeers() {
        return db.lookup(this.employee, 'peers');
    }

    lookupManager() {
        return db.lookup(this.employee, 'manager');
    }

    getPeerReviews() {
        const peers = this.lookupPeers();
        // ...
    }

    perfReview() {
        this.getPeerReviews();
        this.getManagerReview();
        this.getSelfReview();
    }

    getManagerReview() {
        const manager = this.lookupManager();
    }

    getSelfReview() {
        // ...
    }
}

const review = new PerformanceReview(employee);
review.perfReview();

// Good: caller -> callee, caller -> calle, caller -> calle
class PerformanceReview {
    constructor(employee) {
        this.employee = employee;
    }

    perfReview() {
        this.getPeerReviews();
        this.getManagerReview();
        this.getSelfReview();
    }

    getPeerReviews() {
        const peers = this.lookupPeers();
    }

    lookupPeers() {
        return db.lookup(this.employee, 'peers');
    }

    getManagerReview() {
        const manager = this.lookupManager();
    }

    lookupManager() {
        return db.lookup(this.employee, 'manager');
    }

    getSelfReview() {
        const selfReview = this.lookupSelfReview();
    }

    lookupSelfReview() {
        return db.lookup(this.employee, 'self');
    }
}

const review = new PerformanceReview(employee);
review.perfReview();