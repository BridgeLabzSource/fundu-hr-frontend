angular.module('attendanceApp').controller('attendanceCtrl', submitAttnd);

    function submitAttnd($scope,localStorageService,$state,restService) {

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

            restService.postRequest('timeEntryMsg',dataTime, cb);

                function cb(data,error) {
                    $scope.dataLoaded = false;

                    if(data) {
                        if (data.data) {
                            console.log(data);
                            console.log(data.userId);
                            alert('Message has been sent..');
                            $scope.message = '';
                            localStorageService.set('userId', data.data.userId);
                            localStorageService.set('inTime', data.data.inTime);
                            localStorageService.set('outTime', data.data.outTime);
                            localStorageService.set('totalTime', data.data.totalTime);
                            $state.go('home.timeEntry');

                        } else if (data.err == "You are already enter time ") {

                            $state.go('home');
                            alert('Time entry has already done!');

                        }
                    }
                    else{
                        alert('try again later!!');
                    }
                }
            // if($scope.message.toLowerCase() == "log >"){
            //     $timeout(function() {
            //         $scope.showLog = false;
            //     }, 1000);
            // }else if($scope.message.toLowerCase() == "clear"){
            //     $timeout(function() {
            //         $scope.showLog = true;
            //     }, 800);
            // }
        }
    }
