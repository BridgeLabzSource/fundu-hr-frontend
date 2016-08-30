/**
 * Attendance controller
 */
angular.module('attendanceApp').controller('attendanceCtrl', submitAttnd);

function submitAttnd($scope, localStorageService, $state, restService, retrieveService,$timeout,ngDialog,$auth,$location) {

    $scope.dataLoaded = false;
    $scope.isActive = true;
    $scope.showLog = true;

    /**
     * function to send message for attendance
     * */
    $scope.submitMsg = function () {
        if($scope.message.toLowerCase() == "log out"){
            $timeout(function() {
                if (!$auth.isAuthenticated()) { return; }
                $auth.logout()
                    .then(function() {
                        alert("LogOut");
                        $state.go('Login');
                    });
            }, 200);
        }else {
            $scope.dataLoaded = true;
            var timeEntryCredentials = {
                mobile: localStorageService.get('mobile'),
                message: $scope.message
            };
            var dataTime = timeEntryCredentials;

            /**
             * REST call to POST message
             * */
            restService.postRequest('message', dataTime, cb);

            function cb(data, error) {
                $scope.dataLoaded = false;
                console.log('data - ',data);
                if (data) {

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
                        template: "<h3 style='color:lightgoldenrodyellow'>Try again later..</h3>",
                        className: 'ngdialog-theme-default',
                        plain: true,
                        overlay: true
                    });
                }
            }
        }

    }
}
