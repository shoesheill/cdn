$(function() {
    function calc(dateString) {
        today = {};
        event = {};
        age = {};
        let currentDate = new Date();
        today.year = currentDate.getYear();
        today.month = currentDate.getMonth();
        today.day = currentDate.getDate();

        let eventDate = new Date(dateString.substring(6, 10),
            dateString.substring(0, 2) - 1,
            dateString.substring(3, 5)
        );
        event.year = eventDate.getYear();
        event.month = eventDate.getMonth();
        event.day = eventDate.getDate();
        let ageString, yearString, monthString, dayString;
        ageInYear = today.year - event.year;
        let monthAge, dateAge;
        if (today.month >= event.month)
            monthAge = today.month - event.month;
        else {
            ageInYear--;
            monthAge = 12 + today.month - event.month;
        }

        if (today.day >= event.day)
            dateAge = today.day - event.day;
        else {
            monthAge--;
            dateAge = 31 + today.day - event.day;

            if (monthAge < 0) {
                monthAge = 11;
                ageInYear--;
            }
        }

        age.years = ageInYear;
        age.months = monthAge;
        age.days = dateAge;

        if (age.years > 1) yearString = " years";
        else yearString = " year";
        if (age.months > 1) monthString = " months";
        else monthString = " month";
        if (age.days > 1) dayString = " days";
        else dayString = " day";

        if ((age.years > 0) && (age.months > 0) && (age.days > 0))
            ageString = age.years + yearString + ", " + age.months + monthString + ", and " + age.days + dayString;
        else if ((age.years == 0) && (age.months == 0) && (age.days > 0))
            ageString = "Only " + age.days + dayString;
        else if ((age.years > 0) && (age.months == 0) && (age.days == 0))
            ageString = age.years + yearString;
        else if ((age.years > 0) && (age.months > 0) && (age.days == 0))
            ageString = age.years + yearString + " and " + age.months + monthString;
        else if ((age.years == 0) && (age.months > 0) && (age.days > 0))
            ageString = age.months + monthString + " and " + age.days + dayString;
        else if ((age.years > 0) && (age.months == 0) && (age.days > 0))
            ageString = age.years + yearString + " and " + age.days + dayString;
        else if ((age.years == 0) && (age.months > 0) && (age.days == 0))
            ageString = age.months + monthString;
        else ageString = "";
        return ageString;
    }

    let work = calc('01/24/2018');
    $("#workCount").text(" for " + work);


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
    let weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let eventDay = "4/25/";
    let newDate = calcTime(new Date(), '+5.75');
    let dateToday = new Date(parseInt(newDate.getMonth() + 1) + "/" + newDate.getDate() + "/" + newDate.getFullYear());
    let eventDate = new Date(eventDay + newDate.getFullYear());
    let exactDay = "";
    let Message = "Wish me ";

    let diff = 0;
    let eventOutDated = true;

    if (eventDate >= dateToday) {
        diff = daydiff(dateToday, eventDate).toFixed();
        exactDay = weekDay[new Date(eventDay + new Date().getFullYear()).getDay()];
        eventOutDated = false;

    } else if (dateToday >= eventDate && daydiff(eventDate, dateToday).toFixed() < 7) {
        diff = daydiff(eventDate, dateToday).toFixed();
        exactDay = weekDay[new Date(eventDay + new Date().getFullYear()).getDay()];
        eventOutDated = true;
    } else {
        eventDate = new Date(eventDay + parseInt(newDate.getFullYear() + 1));
        diff = daydiff(dateToday, eventDate).toFixed();
        exactDay = weekDay[new Date(eventDay + parseInt(newDate.getFullYear() + 1)).getDay()];
        eventOutDated = false;
    }
    $("#msgBirthday").text(getMessage(diff));

    function getMessage(diff) {
        if (diff == 0)
            Message += "Today";
        else if (diff == 1 && !eventOutDated)
            Message += "Tommorow";
        else if (diff == 1 && eventOutDated)
            Message = "Yesterday was my Birthday.";
        else if (!eventOutDated && diff < 7 && diff > 1)
            Message += "on coming " + exactDay;
        else if (eventOutDated && (diff < 7 && diff > 1))
            Message = "My Birthday was on last " + exactDay;
        else if (diff > 7 && diff < 10)
            Message += "on next " + exactDay;
        else
            Message += "after " + diff + " days.";
        return Message;
    }
    $("#divResume").off().on("click", function(e) {
        e.preventDefault();
        window.open('uploads/sushil-shrestha.pdf', '_blank');
    });
});