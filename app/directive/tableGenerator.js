angular.module('attendanceApp').directive('tableGenerator', function (retrieveService) {
    console.log('inside table generator');
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: 'pages/table.html',
        link: function ($scope, element, attribute) {
            console.log('inside link()');
            console.log('resouce data - ',$scope.data);
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