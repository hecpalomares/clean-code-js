/* Concurrency */

// Promises > Callbacks
// Callbacks are not clean, they cause nesting. ES6 promises are a good replacement.
import { get } from 'request';
import { writeFile } from 'fs';
import { setTimeout } from 'timers';

// bad:
get('https://en.wikipedia.org/wiki/Cristiano_Ronaldo', (requestErr, response) => {
    if(requestErr) {
        console.error(requestErr);
    } else {
        writeFile('article.html', response.body, (writeErr) => {
            if(writeErr) {
                console.error(writeErr);
            } else {
                console.log('File Written');
            }
        });
    }
});

// good:
get('https://en.wikipedia.org/wiki/Cristiano_Ronaldo')
.then(response => {
    return writeFile('article.html', response);
})
.then(() => {
    console.log('File Written');
})
.catch(err => {
    console.log(err);
});

// async/await > promises
// Prefix a function with 'async' keyword, no need to use 'then' inside the function.

// good: refactoring top promises function
async function getCleanCodeArticle() {
    try {
        const response = await get('https://en.wikipedia.org/wiki/Cristiano_Ronaldo');
        await writeFile('article.html', response);
        console.log('File Written');
    } catch(err) {
        console.log(err);
    }
}

example 1
function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            let status = 'resolved...';
            resolve(status);
        }, 2000);
    });
}

async function asyncCalling() {
    console.log('calling');
    let result = await resolveAfter2Seconds();
    console.log(result);
}

asyncCalling(); // calling... resolved...

// example 2
console.time("timer 1");
function incrementAfter1Second(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            x++;
            resolve(x);
        }, 1000);
    });
}

async function addLinear(x) {
    const a = await incrementAfter1Second(2);   // trigger first 'await', suspend operation for 1 second
    const b = await incrementAfter1Second(3);   // trigger second 'await', suspend operation for 1 second after first 'await' ends
    return x + a + b ;
}

addLinear(5).then(sum => {
    console.log(sum);            // 5 + 3 + 4 = 12
    console.timeEnd("timer 1");  // timer 1: 2011.940ms
});

console.time("timer 2");
async function addParallel(x) {
    const a = incrementAfter1Second(4);
    const b = incrementAfter1Second(5);
    return x + await a + await b;          // trigger first 'await' and second 'await', suspend operation for 1 second
}

addParallel(5).then(sum => {
    console.log(sum);            // 5 + 5 + 6 = 16
    console.timeEnd("timer 2");  // timer 2: 1009.967ms
});