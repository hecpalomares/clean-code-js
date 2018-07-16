/* Error Handling */

/* Don't ignore caught errors on functions */
// Log caught errors on a console.error function to easily recognize an error. Report it to an notify function or a service.
// Bad:
try {
    doSomething();
} catch (error) {
    console.log(error);
}

// Good:
try {
    doSomething()
} catch(error) {
    // noiser, than console.log
    console.error(error)
    // notify to a logger function (write the error log on a .txt file)
    errorHandlerLog(error);
    // notify to a service function (slack bot)
    errorHandlerService(error);
}

/* Don't ignore rejected promises */
// Same reasons as error on functions
// Bad:
getdata()
    .then((data) => {
        functionThatMightThrow(data);
    })
    .catch((error) => {
        console.log(error);
    });

// Good:
getdata()
    .then((data) => {
        functionThatMightThrow(data);
    })
    .catch((error) => {
        // noiser, than console.log
        console.error(error)
        // notify to a logger function (write the error log on a .txt file)
        errorHandlerLog(error);
        // notify to a service function (slack bot)
        errorHandlerService(error);
    });