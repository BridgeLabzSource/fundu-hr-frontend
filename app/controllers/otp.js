/**
 * OTP controller
 */
angular.module('attendanceApp').controller('otpCtrl',function($state,$scope,$http,localStorageService,restService,ngDialog) {

    $scope.dataLoaded = false;
    /**
     * function to verify OTP
     */
    $scope.verifyOT = function () {
        var otpVerify = {
            mobile: localStorageService.get('mobile'),
            otp: $scope.otp
        };
        $scope.dataLoaded = true;
        $scope.otp2.$invalid = true;

        /** REST call to POST OTP*/
        restService.postRequest('sms/verify', otpVerify, cb);
        function cb(data,error){
            $scope.dataLoaded = false;
            $scope.otp2.$invalid = false;
            if (data.data) {
                ngDialog.open({
                    template: "<h2>Welcome to BridgeLabz!!</h2>",
                    className: 'ngdialog-theme-default',
                    plain: true,
                    overlay: true
                });
                $state.go('home');
            } else if(data.err || data.data == null) {
                ngDialog.open({
                    template: "<h3 style='color: lightgoldenrodyellow'>Number is not found in DB</h3>",
                    className: 'ngdialog-theme-default',
                    plain: true,
                    overlay: true
                });
                $state.go('registration');
            }else{
                ngDialog.open({
                    template: "<h3 style='color: #EB444A'>Incorrect OTP</h3>",
                    className: 'ngdialog-theme-default',
                    plain: true,
                    overlay: true
                });
                $state.go('OTP');
            }
        }
    };
});