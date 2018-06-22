const moment = require('moment');

/** Variables **/

// Use meaningful and pronounceable variable names
const yyyymmstr = moment().format('YYYY/MM/DD'); // Bad
const currentDate = moment().format('YYYY/MM/DD'); // Good

const ltt = 121.9; // Bad   
const lastTradeToday = 121.9; // Good

let name = ["Hector", "Palomares"];
const x = name[0]; // Bad
const first_Name = name[0]; // Good

// Use the same vocabulary for the same type of variable
// Bad
getUserInfo();
getCustomerData();
getApplicantRecords();

setApplicant();
registerApplicant();

sendPayment();
sendPaymentToBackend();
setPayment();

// Good
getUser();
registerApplicant();
setPayment();

// Use searchable names: name your variables. Avoid sending parameters as plain strings, numbers or booleans. They do not give context.
// Bad: what is 86400000, 25, true, and moment()? Whato do they rerpesent?
setTimeout(setPayment, 86400000);
startIteration(25, true, moment());

// Good:
// Declare them as capitalized named constants.
const MILLISECONDS_IN_A_DAY = 86400000;
setTimeout(setPayment, MILLISECONDS_IN_A_DAY);

const ROWS_TO_ITERATE = 25;
const SHOULD_DISPLAY_AFTER = true;
const CURRENT_TIME = moment();

startIteration(ROWS_TO_ITERATE, SHOULD_DISPLAY_AFTER, CURRENT_TIME);

// Use explanatory variables
const myName = "Héctor Palomares González";
const nameSplitted = myName.split(" ");

// Bad
setName(nameSplitted[0], nameSplitted[1], nameSplitted[2]);

// Good: explain explicitly what the element of the array represent.
const [firstName, lastName, secondLastName] = nameSplitted;
setName(firstName, lastName, secondLastName);