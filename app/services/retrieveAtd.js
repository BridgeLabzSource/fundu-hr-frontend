angular.module('attendanceApp').service('retrieveService',retrieveService);

function retrieveService(){

    var dataX = {};

    return {
        getDataX : function(){
            return dataX;
        },
        setDatax : function(val){
            dataX = val;
        }
    }
}