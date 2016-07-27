angular.module('attendanceApp').service('restService',restService);

function restService($http){
    //set baseUrl
    var baseUrl = "https://funduhr-backend.herokuapp.com/";
    // var baseUrl = "http://localhost:3009/";

    //getRequest function
    this.getRequest = function (path,query,cb){

        var getR = $http.get(baseUrl + path,query).success(function(data){
            cb(data,null);
        }).error(function(err){
            cb(null,err);
        });
        return getR;
    };

    //postRequest function
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