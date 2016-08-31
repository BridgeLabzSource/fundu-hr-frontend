/**
 * retrieveService - shares data between controllers and directives
 * */
angular.module('attendanceApp').service('retrieveService', retrieveService);

function retrieveService() {

    var dataX = {};

    return {
        /**
         * this function returns the dataX
         * @return {datax}
         * */
        getDataX: function () {
            return dataX;
        },
        /**
         * this function set the value to the dataX
         * @param {val}
         * */
        setDatax: function (val) {
            dataX = val.data;
            // console.log('dataXd',dataX);
        }
    }
}