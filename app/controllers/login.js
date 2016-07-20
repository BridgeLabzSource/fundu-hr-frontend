/** login controller to post the mobile */
angular.module('attendanceApp').controller('loginCtrl',submit);

function submit($scope,$state,$http,localStorageService,restService) {

    $scope.dataLoaded = false;

    $scope.logIn = function () {

        var credentials = {
            mobile: "+91" + $scope.mobile
        };

        localStorageService.set('mobile', credentials.mobile);
        console.log(localStorageService.get('mobile'));
        $scope.dataLoaded = true;
        $scope.log.$invalid = true;

        function cb(data,error) {
            $scope.dataLoaded = false;
            $scope.log.$invalid = false;
            console.log(data);
            if(data != null) {
                if (data.error) {
                    alert('Number does not exist');
                    $state.go('Login');
                }
                else {
                    $state.go('OTP')
                }
            }
        }

        restService.postRequest('sms/otp', credentials, cb);

    }
}
