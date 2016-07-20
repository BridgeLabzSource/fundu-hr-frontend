angular.module('attendanceApp').controller('attendanceCtrl', submitAttnd);

    function submitAttnd($scope,localStorageService,$state,restService,retrieveService) {

        $scope.dataLoaded = false;
        $scope.isActive = true;
        $scope.showLog = true;

        $scope.submitMsg = function () {

            $scope.dataLoaded = true;

            var timeEntryCredentials = {
                mobile: localStorageService.get('mobile'),
                message: $scope.message,
                intent : 'attendance'
            };
            var dataTime = timeEntryCredentials;
            console.log(dataTime);
            restService.postRequest('message',dataTime, cb);

                function cb(data,error) {
                    $scope.dataLoaded = false;
                    if(data) {
                        if (data.userId) {
                            console.log(data);
                            alert('Message has been sent..');
                            $scope.message = '';
                            retrieveService.setDatax(data);
                            $state.go('home.timeEntry');
                        }
                        else if (data == "You are already enter time ") {

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
