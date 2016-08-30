/**
 * Registration controller
 * */
angular.module('attendanceApp').controller('regCtrl',function($state,$scope,$auth,$http,localStorageService,restService,ngDialog) {

    $scope.dataLoaded = false;

    /**
     * function register the user*/
    $scope.register = function () {
        var regData = {
            mobile : '+91'+$scope.mobile,
            email : $scope.email,
            password : $scope.pwd,
            repassword : $scope.repwd,
        };
        // console.log(regData);
        // console.log('Inside Reg');
        $scope.dataLoaded = true;
        $scope.reg1.$invalid = true;

        $auth.signup(regData)
            .then(function(response) {
                $auth.setToken(response);
                $location.path('/');
                console.log('You have successfully created a new account and have been signed-in');
            })
            .catch(function(response) {
                console.log(response.data.message);
            });
        // function cb(data,error) {
        //     $scope.dataLoaded = false;
        //     $scope.reg1.$invalid = false;
        //     // console.log(data);
        //     if(data != null) {
        //         if (data.error) {
        //             ngDialog.open({
        //                 template: "<h3 style='color: #EB444A'>Please enter valid Data!!</h3>",
        //                 className: 'ngdialog-theme-default',
        //                 plain: true,
        //                 overlay: true
        //             });
        //             $state.go('registration');
        //         }
        //         else {
        //             // console.log('sent - ',regData);
        //             $state.go('Login')
        //         }
        //     }
        // }
        // /**REST call to POST registration credentials*/
        // restService.postRequest('registration', regData, cb);
    };
});