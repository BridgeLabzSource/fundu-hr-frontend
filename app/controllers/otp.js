angular.module('attendanceApp').controller('otpCtrl',function($state,$scope,$http,localStorageService){
    $scope.verifyOT = function(){
        console.log(localStorageService.get('mobile'));
        var otpVerify = {
            mobile: localStorageService.get('mobile'),
            otp : $scope.otp
        };
        var verifyData = otpVerify;
        $http.post('http://funduhr-backend.herokuapp.com/verify/',verifyData).success(function(response,status){
            console.log(verifyData);
            if(response.data == 'seccessfully register...' && status==200){
                console.log(response);
                alert('Welcome to BridgeLabz');
                $state.go('Attendance');
            }else {
                $state.go('Login');
                alert('Incorrect OTP');
            }
        }).catch(function(response){
            $scope.loading = false;
            alert('Sorry!! something went wrong....');
        })
    };
    //     otpService.postOtp(verifyData).then(function (response) {
    //         console.log('inside otp controller');
    //         console.log(verifyData);
    //         if (response.data == 'seccessfully register...') {
    //             alert('Welcome to BridgeLabz');
    //             $state.go('Attendance')
    //         } else {
    //             $state.go('Login');
    //             alert('Incorrect OTP');
    //         }
    //     });
    // };

});