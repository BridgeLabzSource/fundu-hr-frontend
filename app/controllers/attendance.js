angular.module('attendanceApp').controller('attendanceCtrl', submitAttnd);

function submitAttnd($scope, localStorageService, $state, restService, retrieveService,$timeout,ngDialog) {

    $scope.dataLoaded = false;
    $scope.isActive = true;
    $scope.showLog = true;

    $scope.submitMsg = function () {
        if($scope.message.toLowerCase() == "log out"){
            $timeout(function() {
                $state.go('Login');
            }, 500);
        }else {
            $scope.dataLoaded = true;
            var timeEntryCredentials = {
                mobile: localStorageService.get('mobile'),
                message: $scope.message
            };
            var dataTime = timeEntryCredentials;
            // console.log(dataTime);
            restService.postRequest('message', dataTime, cb);

            function cb(data, error) {
                $scope.dataLoaded = false;
                if (data) {
                    // console.log('data.data - ', data.data);
                    // console.log('data.err - ', data.err);
                    if (data.err) {
                        ngDialog.open({
                            template: "<h3 style='color: #EB444A'>"+data.err+"</h3>",
                            className: 'ngdialog-theme-default',
                            plain: true,
                            overlay: true
                        });
                        $state.go('home');
                    } else if (data.data.userId) {
                        ngDialog.open({
                            template: "<h3 style='color: #4CBD50'>Message has been sent..</h3>",
                            className: 'ngdialog-theme-default',
                            plain: true,
                            overlay: true
                        });
                        $scope.message = '';
                        retrieveService.setDatax(data);
                        // console.log('retrieve data set in attendance controller');
                        $state.go('home.timeEntry');
                    }
                    else if (data.data == "please try again...") {
                        ngDialog.open({
                            template: "<h3 style='color: #EB444A'>Invalid statement, try something else..</h3>",
                            className: 'ngdialog-theme-default',
                            plain: true,
                            overlay: true
                        });
                        $state.go('home');
                    }
                }
                else {
                    ngDialog.open({
                        template: "<h3 style='color:sandybrown'>Try again later..</h3>",
                        className: 'ngdialog-theme-default',
                        plain: true,
                        overlay: true
                    });
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

    }
}
