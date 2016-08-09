/**
 * DateTime service - provides time formats
*/
angular.module('attendanceApp').service('DateTime', DateTime);

function DateTime() {

    /**
     * get date from the response
     * */
    this.getDate1 = function (dateTime) {

        if (dateTime == 0) {
            return 0;
        }
        else {
            var inDateTime = dateTime.split(" ");
            var date1 = inDateTime[0];
            return date1;
        }
    };

    /**
     * get time from response and convert in 12 hour format
     * */
    this.getTime1 = function (dateTime) {

        if (dateTime == 0) {
            return 0;
        }
        else {

            var inDateTime = dateTime.split(" ");
            var timeStr = inDateTime[1];
            var time = timeStr;
            var time1 = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
            if (time1.length > 1) {
                time1 = time1.slice(1);
                time1[5] = +time1[0] < 12 ? ' AM' : ' PM';
                time1[0] = +time1[0] % 12 || 12;
            }
            return time1.join('');
        }
    };

    /**
     * convert 12 hour time format to 24 hour
     * */
    this.setDateTime = function (date, time) {
        if (time == 0) {
            return 0;
        }
        else {
            var time = time;
            var tt = time.split(':');
            var rightTime = tt[0].split('');

            if(rightTime[0]==0){
                tt[0] = rightTime[1];
            }

            var hours = tt[0];
            var minutes = tt[1];
            var sT = tt[2].split(' ');
            var seconds = sT[0];
            var AMPM = sT[1];

            if (AMPM == "PM" && hours < 12) {
                hours = Number(tt[0]) + 12;
            }
            if (AMPM == "AM" && hours == 12) {
                hours = Number(tt[0]) - 12;
            }

            var sHours = hours.toString();
            var sMinutes = minutes.toString();
            var sSeconds = seconds.toString();

            if (hours < 10) sHours = "0" + sHours;

            var finalTime = sHours + ":" + sMinutes + ":" + sSeconds;
            var finalStr = date + " " + finalTime + " +05:30";

            return finalStr;
        }
    };
}



























