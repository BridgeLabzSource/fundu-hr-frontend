angular.module('attendanceApp').controller('otpCtrl',function($state,$scope,$http,localStorageService){
    $scope.dataLoaded = false;
    $scope.verifyOT = function(){
        console.log(localStorageService.get('mobile'));
        var otpVerify = {
            mobile: localStorageService.get('mobile'),
            otp : $scope.otp
        };
        var verifyData = otpVerify;
        $scope.dataLoaded = true;
        $scope.otp.$invalid = true;
        $http.post('http://funduhr-backend.herokuapp.com/verify/',verifyData).success(function(response,status){
            $scope.dataLoaded = false;
            $scope.otp.$invalid = false;
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
            $scope.dataLoaded = false;
            $scope.otp.$invalid = false;
            alert('Sorry!! something went wrong....');
        })
    };
});