/**
 * restService - REST call with base URL*/
angular.module('attendanceApp').service('restService',restService);

function restService($http){

    var baseUrl = "https://funduhr-backend.herokuapp.com/";

    /**
     * function for GET */
    this.getRequest = function (path,query,cb){

        var getR = $http.get(baseUrl + path,query).success(function(data){
            cb(data,null);
        }).error(function(err){
            cb(null,err);
        });
        return getR;
    };

    /**
     * function to POST*/
    this.postRequest = function(path,data,cb){

        var postR = $http.post(baseUrl+path,data).success(function(data){

            cb(data,null);

        }).error(function(err){
            alert('Sorry!! something went wrong....');
            cb(null,err);
        });
        return postR;
    };
}