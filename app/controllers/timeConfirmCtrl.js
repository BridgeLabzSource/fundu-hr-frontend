angular.module('attendanceApp').controller('timeConfirmCtrl',confirm);
function confirm($scope,$http,$state,localStorageService) {
    var confirmAll = {
        userId: localStorageService.get('userId'),
        inTime: localStorageService.get('inTime'),
        outTime: localStorageService.get('outTime'),
        totalTime: localStorageService.get('totalTime')
    };
    var inDateTime = confirmAll.inTime.split("T");
    console.log(inDateTime[0]);

        var date = inDateTime[0].split("-");
        var day = date[2];
        var month = date[1];
        var year = date[0];
        console.log(day+":"+month+":"+year);


    $scope.confirmTime = function(){
        
    }
}