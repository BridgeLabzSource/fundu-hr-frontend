angular.module('attendanceApp').controller('loginCtrl',function($state,$scope,$http){
    $scope.logIn = function(){
        var credentials = {
            mobile: $scope.mobile
        };
        $scope.$broadcast('parent', credentials);
        var data = credentials;
        // loginService.postMobile(data).then(function(response){
        //     console.log('inside login controller');
        //     console.log(data);
        //     if(response.error && status==200){
        //         alert('Number does not exist');
        //         $state.go('Login');
        //     }else if(response.data){
        //         console.log(response);
        //         console.log(response.data);
        //         $state.go('OTP')
        //     }else{
        //         alert('Sorry!! something went wrong....');
        //         console.log('Server Problem');
        //     }
        // });

        $http.post('http://funduhr-backend.herokuapp.com/otp/',data).success(function(response,status){
             console.log(data);
            if(response.error){
                alert('Number does not exist');
                $state.go('Login');
            }else {
                console.log(response);
                console.log(response.data);
                $state.go('OTP')
            }
        }).catch(function(response){
            $scope.loading = false;
            alert('Sorry!! something went wrong....');
        })
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