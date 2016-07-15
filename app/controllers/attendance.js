angular.module('attendanceApp').controller('attendanceCtrl', submitAttnd);

    function submitAttnd($scope,localStorageService,$state,restService) {

        var socket = io.connect('https://funduhr-backend.herokuapp.com');
        $scope.dataLoaded = false;
        $scope.isActive = true;
        $scope.showLog = true;

        $scope.submitMsg = function () {
            $scope.dataLoaded = true;

            var timeEntryCredentials = {
                mobile: localStorageService.get('mobile'),
                message: $scope.message
            };

            var dataTime = timeEntryCredentials;

            restService.postRequest('timeEntryMsg/',dataTime, null).success(function (response, status) {

                $scope.dataLoaded = false;
                console.log(dataTime);

                if (response.data && status == 200) {

                    console.log(response);
                    console.log(response.data.userId);
                    alert('Message has been sent..');
                    $scope.message = '';
                    localStorageService.set('userId', response.data.userId);
                    localStorageService.set('inTime', response.data.inTime);
                    localStorageService.set('outTime', response.data.outTime);
                    localStorageService.set('totalTime', response.data.totalTime);
                    $state.go('Attendance.timeEntry');

                } else {

                    $state.go('Attendance');
                    alert('Error!! Try again..');

                }

            }).catch(function (response) {

                $scope.dataLoaded = false;
                alert('Sorry!! something went wrong....');

            });
            // if($scope.message.toLowerCase() == "log >"){
            //     $timeout(function() {
            //         $scope.showLog = false;
            //     }, 1000);
            // }else if($scope.message.toLowerCase() == "clear"){
            //     $timeout(function() {
            //         $scope.showLog = true;
            //     }, 800);
            // }
        };
    }
