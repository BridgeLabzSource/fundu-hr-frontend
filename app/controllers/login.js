/**
 * Login controller
 */
angular.module('attendanceApp').controller('loginCtrl',submit);

function submit($scope,$state,$http,localStorageService,restService,ngDialog,$auth,$location) {


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
            mobile: "+91" + $scope.mobile,
            password : $scope.pwd,

        };

        // var token = {'token':localStorageService.get('token')};
        localStorageService.set('mobile', credentials.mobile);
        $scope.dataLoaded = true;
        $scope.log.$invalid = true;

        $auth.login(credentials)
            .then(function(data) {
                console.log(data);
                $scope.dataLoaded = false;
                $scope.log.$invalid = false;
                console.log('login',data);
                console.log('You have successfully signed in!');
                $auth.isAuthenticated = true;
                $state.go('home',{});
            })
            .catch(function(error) {
                console.log(error.data.message, error.status);
            });


            // function cb(data,error) {
            //     $scope.dataLoaded = false;
            //     $scope.log.$invalid = false;
            //     // console.log(data);
            //     if(data != null) {
            //         if (data.err) {
            //             alert(data.err);
            //             $state.go('Login');
            //         }
            //         else {
            //             $state.go('home',{});
            //             ngDialog.open({
            //                 template: '<h1>Welcome to BridgeLabz!!</h1>',
            //                 className: 'ngdialog-theme-default',
            //                 plain: true,
            //                 overlay: true
            //             });
            //         }
            //     }else{
            //         alert('Server Problem!!');
            //     }
            // }
            // /**
            //  * REST call to POST login credentials
            //  */
            // restService.postRequest('registration/login', credentials, cb);

    };

    //This is a function to authenticate user using social media sites like facebook,twitter,github etc
    $scope.authenticate = function (provider) {
        console.log("github Login");
        console.log(provider);
        $auth.authenticate(provider)
            .then(function (data) {
                console.log("git data - ",data);
                $auth.setToken(data);
                console.log("logged innn");
                console.log("git log - ",$auth.getToken());
                //If authenticated then goto dashboard
                $state.go('home',{});
            })
            .catch(function (error) {
                console.log('error ',error);
                if (error.error) {

                    // Popup error - invalid redirect_uri, pressed cancel button, etc.
                    alert("invalid redirected uri");
                    console.log("client error ");
                } else if (error.data) {
                    // HTTP response error from server
                    alert("server error");
                } else {
                    alert("another server error")
                }
            });
    };

}
