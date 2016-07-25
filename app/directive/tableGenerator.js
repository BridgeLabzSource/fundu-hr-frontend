angular.module('attendanceApp').directive('tableGenerator', function (retrieveService) {
    console.log('inside table generator');
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: 'pages/table.html',

        link: function ($scope, element, attribute) {
            // console.log('inside link()');
            $scope.conf = {
                data : {}
            };
            for (var i = 0; i < $scope.data.data.length; i++) {
                // console.log('data.data[i] - ', $scope.data.data[i]);
                $scope.conf.data[i] = $scope.data.data[i];
                // console.log($scope.conf.data[i]);
            }
            // console.log($scope.conf);
            retrieveService.setDatax($scope.conf);
            // console.log('set in table generator');

            // element.html("<table>" +
            //     "<thead>" + "<tr ng-repeat='a in dd.header'>" +
            //     "<th ng-repeat='b in a'>{{b}}</th>" + "</tr>"
            //     + "</thead>" +
            //     "<tbody>" +
            //     "<tr ng-repeat='val in dd.data'>" +
            //     "<td ng-repeat='a in val'><input value='{{a}}'></td>" +
            //     "</tr>" +
            //     "</tbody>" +
            //     "</table>"
            // );
        }
    }

});