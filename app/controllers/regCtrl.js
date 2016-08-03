angular.module('attendanceApp').controller('regCtrl',function($state,$scope,$http,localStorageService,restService,ngDialog) {

    $scope.dataLoaded = false;

    $scope.register = function () {
        var regData = {
            mobile : '+91'+$scope.mobile,
            email : $scope.email,
            password : $scope.pwd,
            repassword : $scope.repwd
        };
        // console.log(regData);
        // console.log('Inside Reg');
        $scope.dataLoaded = true;
        $scope.reg1.$invalid = true;

        function cb(data,error) {
            $scope.dataLoaded = false;
            $scope.reg1.$invalid = false;
            // console.log(data);
            if(data != null) {
                if (data.error) {
                    ngDialog.open({
                        template: "<h3 style='color: brown'>Please enter valid Data!!</h3>",
                        className: 'ngdialog-theme-default',
                        plain: true,
                        overlay: true
                    });
                    $state.go('registration');
                }
                else {
                    // console.log('sent - ',regData);
                    $state.go('Login')
                }
            }
        }
        restService.postRequest('registration', regData, cb);
    };
});