/** login controller to post the mobile */
angular.module('attendanceApp').controller('loginCtrl',submit);

function submit($scope,$state,$http,localStorageService,restService,ngDialog) {

    $scope.dataLoaded = false;
    $scope.forget = function(){
        if($scope.mobile==null){
            alert('Mobile required!!');
        }else {
            localStorageService.set('mobile', '+91'+$scope.mobile);
            $state.go('OTP');
        }
    };
    $scope.logIn = function () {

        var credentials = {
            mobile: "+91" + $scope.mobile,
            password : $scope.pwd
        };
        localStorageService.set('mobile', credentials.mobile);
        // console.log(localStorageService.get('mobile'));
        $scope.dataLoaded = true;
        $scope.log.$invalid = true;

        function cb(data,error) {
            $scope.dataLoaded = false;
            $scope.log.$invalid = false;
            // console.log(data);
            if(data != null) {
                if (data.err) {
                    alert(data.err);
                    $state.go('Login');
                }
                else {
                    $state.go('home');
                    ngDialog.open({
                        template: '<h1>Welcome to BridgeLabz!!</h1>',
                        className: 'ngdialog-theme-default',
                        plain: true,
                        overlay: true
                    });
                }
            }else{
                alert('Server Problem!!');
            }
        }

        restService.postRequest('registration/login', credentials, cb);

    }
}
