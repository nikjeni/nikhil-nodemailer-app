var today = new Date();

var dd = String(today.getDate()).padStart(2,'0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

var getCurrentDate = () => {
    var todaysDate = mm + '/' + dd + '/' + yyyy;
    return todaysDate;
};

var getTodaysDate = () => {
return dd;
};

var getCurrentMonth = () => {
return mm;
};

module.exports.date = {
    getCurrentDate: getCurrentDate,
    getTodassDate: getTodaysDate,
    getCurrentMonth: getCurrentMonth
};