angular.module('attendanceApp').controller('otpCtrl',function($state,$scope,$http,localStorageService,restService){

    $scope.dataLoaded = false;

    $scope.verifyOT = function(){

        console.log(localStorageService.get('mobile'));

        var otpVerify = {

            mobile: localStorageService.get('mobile'),
            otp : $scope.otp

        };

        var verifyData = otpVerify;
        $scope.dataLoaded = true;
        $scope.otp2.$invalid = true;

        restService.postRequest('verify/',verifyData,null).success(function(response,status){

            $scope.dataLoaded = false;
            $scope.otp2.$invalid = false;
            console.log(verifyData);

            if(response.data == 'seccessfully register...' && status==200){

                console.log(response);
                alert('Welcome to BridgeLabz');
                $state.go('Attendance');

            }else {

                alert('Incorrect OTP');
                $state.go('Login');

            }

        }).catch(function(response){

            $scope.dataLoaded = false;
            $scope.otp2.$invalid = false;
            alert('Sorry!! something went wrong....');

        })
    };
});