function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0] - 1, mdy[1]);
}

function daydiff(first, second) {
    return (second - first) / (1000 * 60 * 60 * 24);
}

function monthDiff(start, end) {
    var tempDate = new Date(start);
    var monthCount = 0;
    while ((tempDate.getMonth() + '' + tempDate.getFullYear()) != (end.getMonth() + '' + end.getFullYear())) {
        monthCount++;
        tempDate.setMonth(tempDate.getMonth() + 1);
    }
    return monthCount + 1;
}

function calcTime(d, offset) {
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000 * offset));
    return nd;
    // calcTime(new Date(), '+5.75');
}