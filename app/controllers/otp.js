angular.module('attendanceApp').controller('otpCtrl',function($state,$scope,$http,localStorageService,restService,ngDialog) {

    $scope.dataLoaded = false;

    $scope.verifyOT = function () {

        // console.log(localStorageService.get('mobile'));

        var otpVerify = {

            mobile: localStorageService.get('mobile'),
            otp: $scope.otp

        };

        $scope.dataLoaded = true;
        $scope.otp2.$invalid = true;

        restService.postRequest('sms/verify', otpVerify, cb);
        function cb(data,error){
            $scope.dataLoaded = false;
            $scope.otp2.$invalid = false;
            // console.log(data.data);
            if (data.data) {
                // console.log(otpVerify);
                ngDialog.open({
                    template: "<h2>Welcome to BridgeLabz!!</h2>",
                    className: 'ngdialog-theme-default',
                    plain: true,
                    overlay: true
                });
                $state.go('home');

            } else if(data.err || data.data == null) {
                ngDialog.open({
                    template: "<h3 style='color: sandybrown'>Number is not found in DB</h3>",
                    className: 'ngdialog-theme-default',
                    plain: true,
                    overlay: true
                });
                $state.go('registration');
            }else{
                ngDialog.open({
                    template: "<h3 style='color: brown'>Incorrect OTP</h3>",
                    className: 'ngdialog-theme-default',
                    plain: true,
                    overlay: true
                });
                $state.go('OTP');
            }
        }
    };
});