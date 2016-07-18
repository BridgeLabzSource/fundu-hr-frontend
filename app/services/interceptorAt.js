angular.module('attendanceApp').factory('interceptorAt',interceptorAt);

function interceptorAt($q){

    return{

        request : function(config) {
            console.log('request has been sent..');
            return config || $q.when(config);
        },

        requestError : function(config){

            console.log('Client side error..');
            return $q.reject(config);

        },

        response : function(res){
            if(res.err == "already update time"){
                $state.go('Attendance');
            }
            return res;
        },

        responseError : function(res){

            if(res.error) {
                alert('Error');
                console.log('Error');
                $state.go('Attendance');
            }
            console.log('Error occured');
            return $q.reject(res);
        }
    }

}