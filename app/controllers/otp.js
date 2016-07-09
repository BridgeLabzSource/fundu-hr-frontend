angular.module('attendanceApp').controller('otpCtrl',function($state,$scope,$http,loginService){
    $scope.verify = function() {
        var otpVerify = {
            otp: $scope.otp
        };
        console.log(otpVerify);
        var verifyData = otpVerify;
        loginService.postOtp(verifyData).then(function (response) {
            console.log('inside otp controller');
            console.log(verifyData);
            if (response.data == 'seccessfully register...') {
                alert('Welcome to BridgeLabz');
                $state.go('Attendance')
            } else {
                $state.go('Login');
                alert('Incorrect OTP');
            }
        });
    };
    //     $http.post('http://funduhr-backend.herokuapp.com/verify/',verifyData).success(function(response,status){
    //         console.log(response);
    //         if(response.data !== verifyData.otp){
    //             $state.go('Login');
    //             alert('Incorrect OTP');
    //         }else {
    //             alert('Welcome to BridgeLabz');
    //             $state.go('Attendance')
    //         }
    //     }).catch(function(response){
    //         $scope.loading = false;
    //         alert('Sorry!! something went wrong....');
    //     })
    // };
});