angular.module('attendanceApp').directive('tableGenerator', function (retrieveService) {

    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: 'pages/table.html',
        link: function ($scope, element, attribute) {
            $scope.conf = {
                data : {}
            };
            for (var i = 0; i < $scope.data.data.length; i++) {
                $scope.conf.data[i] = $scope.data.data[i];
                // console.log($scope.conf.data[i]);
            }

            retrieveService.setDatax($scope.conf);
        }
    }

});