angular.module('attendanceApp').controller('attendanceCtrl', ['$scope', '$timeout', 'localStorageService', '$http', '$state',
    function ($scope, $timeout, localStorageService, $http, $state) {
        $scope.isActive = true;
        $scope.showLog = true;
        $scope.submitMsg = function () {
            var timeEntryCredentials = {
                mobile: localStorageService.get('mobile'),
                message: $scope.message
            };
            var dataTime = timeEntryCredentials;
            $http.post('http://funduhr-backend.herokuapp.com/timeEntryMsg/', dataTime).success(function (response, status) {
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
                    alert('Invalid message! Please behave like a Human...');
                }
            }).catch(function (response) {
                $scope.loading = false;
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
    }]);
