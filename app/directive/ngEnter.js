var $scop
angular.module('attendanceApp').directive('ngEnter', function () {

    return function ($scope, element, attrs) {
        $scope.chngClass = function(){
            $scope.isActive = !$scope.isActive;
            $scope.isDisabled = !$scope.isDisabled;
            var data = {
                newValue: $scope.newValue
            };
            console.log(data.newValue);
        };
        //element.bind("keydown keypress", function (event) {
        //    if(event.which === 13) {
        //        scope.$apply(function (){
        //            scope.$eval(attrs.ngEnter);
        //        });
        //        event.preventDefault();
        //    }
        //});

    };
});

