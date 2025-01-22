
function validateDate(date) {
    return /^\d{4}-\d{2}-\d{2}$|^\d{10,13}$/.test(date);
};

function isDateUnix(date) {
    return /^\d{10,13}$/.test(date);
};

module.exports = { validateDate, isDateUnix };
