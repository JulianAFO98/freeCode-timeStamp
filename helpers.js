


function validateDate(date) {
    if (isDateUnix(date)) {
        date = Number(date);
    }
    const d = new Date(date);
    return !isNaN(d.getTime());
}

function isDateUnix(date) {
    return /^\d{10,13}$/.test(date);
};



module.exports = { validateDate, isDateUnix };

