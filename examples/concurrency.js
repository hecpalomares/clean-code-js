/* Concurrency */

// Promises > Callbacks
// Callbacks are not clean, they cause nesting. ES6 promises are a good replacement.
import { get } from 'request';
import { writeFile } from 'fs';

// bad:
get('https://en.wikipedia.org/wiki/Cristiano_Ronaldo', (requestErr, response) => {
    if(requestErr) {
        console.error(requestErr);
    } else {
        writeFile('article.html', response.body, (writeErr) => {
            if(writeErr) {
                console.error(writeErr);
            } else {
                console.log("File Written");
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
    console.log("File Written");
})
.catch(err => {
    console.log(err);
});