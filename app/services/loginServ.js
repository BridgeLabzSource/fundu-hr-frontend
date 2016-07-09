angular.module('attendanceApp').service('loginService',function($http,$q){
    var user = {};
        var credens = [];
        baseUrl = "http://funduhr-backend.herokuapp.com/";
        var deferred = $q.defer();
        this.postMobile = function(credMob){
            console.log('in Mobile service');
            return $http.post(baseUrl+'otp/',credMob).then(function(response) {
                user = response;
                deferred.resolve(user);
                credens.push(credMob);
                return deferred.promise
            },function(error){
                deferred.reject(error);
                return deferred.promise
            });
        };
        this.postOtp = function(credOTP){
            console.log('in OTP service');
            console.log('credens : '+credens);
            console.log('credOTP : '+credOTP);
            var dataOtp = {
                mobile: credens.mobile,
                otp : credOTP.otp
            };
            return $http.post(baseUrl+'verify/',dataOtp).then(function(response){
                console.log(dataOtp);
                user = response;
                deferred.resolve(user);
                return deferred.promise
            },function(error){
                deferred.reject(error);
                return deferred.promise
            });
        };

});