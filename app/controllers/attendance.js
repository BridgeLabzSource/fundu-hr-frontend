angular.module('attendanceApp').controller('attendanceCtrl',['$scope','$timeout',function($scope,$timeout){
    $scope.isActive = true;
    $scope.showLog = true;
    $scope.showLo = function(){
        if($scope.name.toLowerCase() == "log >"){
            $timeout(function() {
                $scope.showLog = false;
            }, 1000);
        }else if($scope.name.toLowerCase() == "clear"){
            $timeout(function() {
                $scope.showLog = true;
            }, 800);
        }
    };
}]);
