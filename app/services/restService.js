angular.module('attendanceApp').service('restService',restService);

function restService($http){
    //set baseUrl
    var baseUrl = "https://funduhr-backend.herokuapp.com";

    //getRequest function
    this.getRequest = function (path,query){    
        console.log('In getRequest');
        var getR = $http.get(baseUrl+"/"+path,query);
        console.log(getR);
        return getR;
    };

    //postRequest function
    this.postRequest = function(path,data,headers){
        console.log('inside post');
        var postR = $http.post(baseUrl+"/"+path,data);
        return postR;
    };
}