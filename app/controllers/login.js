angular.module('attendanceApp').controller('loginCtrl',function($state,$scope,$http,loginService){
    $scope.logIn = function(){
        var credentials = {
            mobile: $scope.mobile
        };
        var data = credentials;
        loginService.postMobile(data).then(function(response){
            console.log('inside login controller');
            console.log(data);
            if(response=='Number not existing ' && status==200){
                $state.go('Login');
                alert('Number does not exist');
            }else {
                console.log(response);
                console.log(response.data);
                $state.go('OTP')
            }
        });

        // $http.post('http://funduhr-backend.herokuapp.com/otp/',data).success(function(response,status){
        //      console.log(data);
        //     if(response=='Number not existing ' && status==200){
        //         $state.go('Login');
        //         alert('Number does not exist');
        //     }else {
        //         console.log(response);
        //         console.log(response.data);
        //         $state.go('OTP')
        //     }
        // }).catch(function(response){
        //     $scope.loading = false;
        //     alert('Sorry!! something went wrong....');
        // })
    };
    // $scope.verify = function(){
    //     var otpVerify = {
    //         mobile : credentials.mobile,
    //         otp : $scope.otp
    //     };
    //     var verifyData = otpVerify;
    //     $http.post('http://funduhr-backend.herokuapp.com/verify/',verifyData).success(function(response,status){
    //         console.log(verifyData);
    //         if(response.data == 'seccessfully register...' && status==200){
    //             console.log(response);
    //             alert('Welcome to BridgeLabz');
    //             $state.go('Attendance')
    //         }else {
    //             $state.go('Login');
    //             alert('Incorrect OTP');
    //         }
    //     }).catch(function(response){
    //         $scope.loading = false;
    //         alert('Sorry!! something went wrong....');
    //     })
    // };
});