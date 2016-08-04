angular.module('attendanceApp').service('DateTime', DateTime);

function DateTime() {

    // console.log('inside DateTime service');

    this.getDate1 = function (dateTime) {

        if (dateTime == 0) {

            return 0;

        }
        else {

            var inDateTime = dateTime.split(" ");
            // console.log(inDateTime);
            // console.log("Date " + inDateTime[0]);
            // $scope.date1 = $scope.inDateTime[0];
            var date1 = inDateTime[0];
            return date1;

        }
    };

    this.getTime1 = function (dateTime) {

        if (dateTime == 0) {

            return 0;

        }
        else {

            var inDateTime = dateTime.split(" ");
            // console.log(inDateTime);
            // console.log(inDateTime[1]);
            var timeStr = inDateTime[1];
            // $scope.date1 = $scope.inDateTime[0];
            // console.log(timeStr);
            var time = timeStr;
            var time1 = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
            if (time1.length > 1) {

                time1 = time1.slice(1);
                time1[5] = +time1[0] < 12 ? ' AM' : ' PM';
                time1[0] = +time1[0] % 12 || 12;

            }

            // console.log("Time " + time1.join(''));
            return time1.join('');
        }
    };

    this.setDateTime = function (date, time) {

        if (time == 0) {

            return 0;

        }
        else {

            //time is converted in 24 hour format
            // console.log('24 hour converter');
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
            // if (minutes < 10) sMinutes = "0" + sMinutes;
            // if (seconds < 10) sSeconds = "0" + sSeconds;
            var finalTime = sHours + ":" + sMinutes + ":" + sSeconds;
            // console.log('final time - ' + finalTime);
            //String to send server with date & time
            var finalStr = date + " " + finalTime + " +05:30";
            // console.log('finalstr - ' + finalStr);
            return finalStr;

        }
    };
}



























