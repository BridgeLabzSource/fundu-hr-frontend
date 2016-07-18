angular.module('attendanceApp').controller('timeConfirmCtrl', confirm);

function confirm($scope, restService, $state, localStorageService, DateTime) {

    $scope.dataLoaded = false;

    $scope.confirmAll = {

        mobile: localStorageService.get('userId'),
        inTime: localStorageService.get('inTime'),
        outTime: localStorageService.get('outTime'),
        totalTime: localStorageService.get('totalTime')

    };

    $scope.disIn = function (e) {
        if ($scope.confirmAll.outTime !== 0) {
            return true;
        }
    };

    $scope.disOut = function (e) {
        if ($scope.confirmAll.outTime == 0) {
            return true;
        }
    };

    $scope.date1 = DateTime.getDate1($scope.confirmAll.inTime);
    $scope.inTime = DateTime.getTime1($scope.confirmAll.inTime);
    $scope.outTime = DateTime.getTime1($scope.confirmAll.outTime);

    $scope.confirmTime = function () {

        $scope.dataLoaded = true;
        $scope.conf = true;
        $scope.inTimeFinal = DateTime.setDateTime($scope.date1, $scope.inTime);
        console.log($scope.inTimeFinal);
        $scope.outTimeFinal = DateTime.setDateTime($scope.date1, $scope.outTime);
        console.log($scope.outTimeFinal);

        var confirmAttdc = {
            mobile: $scope.confirmAll.mobile,
            inTime: $scope.inTimeFinal,
            outTime: $scope.outTimeFinal,
            totalTime: $scope.confirmAll.totalTime,
            check: "true"
        };

        restService.postRequest('timeEntryConform', confirmAttdc, cb);

        function cb(data, error) {
            $scope.dataLoaded = false;
            $scope.conf = false;
            console.log(data);

            if (data.err == "already update time") {
                alert('Your attendance has already logged.');
                $state.go('home');
            } else {
                console.log(data);
                console.log(data.data);
                alert('Saved!!');
                $state.go('succeed');
            }
        }

        // localStorageService.clearAll();
    }
}