angular.module('attendanceApp').controller('otpCtrl',function($state,$scope,$http,localStorageService,restService) {

    $scope.dataLoaded = false;

    $scope.verifyOT = function () {

        console.log(localStorageService.get('mobile'));

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
            console.log(data.data);
            if (data.data) {
                console.log(otpVerify);
                alert('Welcome to BridgeLabz');
                $state.go('home');

            } else if(data.err || data.data == null) {
                alert('Number is not found in DB');
                $state.go('registration');
            }else{
                alert('Incorrect OTP');
                $state.go('OTP');
            }
        }
    };
});