/**
 * retrieveService - shares data between controllers and directives
 * */
angular.module('attendanceApp').service('retrieveService', retrieveService);

function retrieveService() {

    var dataX = {};

    return {
        /**
         * this function get Data
         * @return {datax}
         * */
        getDataX: function () {
            return dataX;
        },
        /**
         * this function set Data
         * @param {val}
         * */
        setDatax: function (val) {
            dataX = val.data;
            // console.log('dataXd',dataX);
        }
    }
}