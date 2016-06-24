angular.module('attendanceApp').controller('attendanceCtrl',['$scope', function($scope){
    $scope.isActive = true;
    $scope.showLog = true;
    $scope.showLo = function(){
        if($scope.name.toLowerCase() == "log >"){
            $scope.showLog = false;
        }else if($scope.name.toLowerCase() == "clear"){
            $scope.showLog = true;
        }
    };
}]);
