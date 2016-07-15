angular.module('attendanceApp').controller('loginCtrl',submit);

function submit($scope,$state,$http,localStorageService,restService){
    $scope.dataLoaded = false;

    $scope.logIn = function(){

        var credentials = {
            mobile: "+91"+$scope.mobile
        };

        localStorageService.set('mobile', credentials.mobile);
        console.log(localStorageService.get('mobile'));
        var data = credentials;
        $scope.dataLoaded = true;
        $scope.log.$invalid = true;

        restService.postRequest('otp/',data,null).success(function(response,status){

            $scope.dataLoaded = false;
            $scope.log.$invalid = false;
             console.log(data);

            if(response.error){

                alert('Number does not exist');
                $state.go('Login');
            }
            else {
                
                console.log(response);
                console.log(response.data);
                $state.go('OTP')
            }
        })
            .catch(function(response){
            $scope.dataLoaded = false;
            $scope.log.$invalid = false;
            alert('Sorry!! something went wrong....');
        })
    };
}
