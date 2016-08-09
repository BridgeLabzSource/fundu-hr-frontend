/**
 * Login controller
 */
angular.module('attendanceApp').controller('loginCtrl',submit);

function submit($scope,$state,$http,localStorageService,restService,ngDialog,$auth,$location) {
    var vm = this;

    $scope.dataLoaded = false;
    $scope.forget = function(){
        if($scope.mobile==null){
            alert('Mobile required!!');
        }else {
            localStorageService.set('mobile', '+91'+$scope.mobile);
            $state.go('OTP');
        }
    };

    /**
     * function to login
     * */
    $scope.logIn = function () {

        var credentials = {
            mobile: "+91" + vm.mobile,
            password : vm.pwd
        };

        localStorageService.set('mobile', credentials.mobile);
        $scope.dataLoaded = true;
        $scope.log.$invalid = true;

        $auth.login(credentials).then(function(data){
           console.log('token - ',$auth.getToken());
            alert('logged in');
            $state.go();
        });

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
        /**
         * REST call to POST login credentials
         */
        restService.postRequest('registration/login', credentials, cb);

    }
}
