angular.module('attendanceApp').controller('timeConfirmCtrl', confirm);

function confirm($scope, restService, $state, localStorageService, DateTime) {

    $scope.dataLoaded = false;

    $scope.confirmAll = {

        userId: localStorageService.get('userId'),
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
            userId: $scope.confirmAll.userId,
            inTime: $scope.inTimeFinal,
            outTime: $scope.outTimeFinal,
            totalTime: $scope.confirmAll.totalTime,
            check: "true"
        };

        var data = confirmAttdc;

        restService.postRequest('timeEntryConform/',data,null).success(function (response, status) {

            $scope.dataLoaded = false;
            $scope.conf = false;
            console.log(data);

            if (response.error) {
                alert('Please enter valid data....');
                $state.go('Attendance');
            } else {

                console.log(response);
                console.log(response.data);
                alert('Saved!!');
                $state.go('succeed');
            }
        })
            .catch(function (response) {
                $scope.dataLoaded = false;
                $scope.conf = false;
                alert('Sorry!! something went wrong....');
            })
    };
    // localStorageService.clearAll();
}