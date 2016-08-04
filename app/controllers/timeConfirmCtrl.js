angular.module('attendanceApp').controller('timeConfirmCtrl', confirm);

function confirm($scope, restService, $state, localStorageService, DateTime, retrieveService,ngDialog) {
    
    $scope.dataLoaded = false;
    $scope.dataXX = retrieveService.getDataX();

    var confirmAll = {
        mobile: $scope.dataXX.userId,
        inTime: $scope.dataXX.inTime,
        outTime: $scope.dataXX.outTime,
        totalTime: $scope.dataXX.totalTime
    };

    // $scope.disIn = function (e) {
    //     var hide = true;
    //     if (confirmAll.outTime == 0) {
    //         hide = false;
    //     }
    //     return hide;
    // };
    //
    // $scope.disOut = function (e) {
    //     var hide = false;
    //     if (confirmAll.outTime == 0) {
    //         hide = true;
    //     }
    //     return hide;
    // };
    
    $scope.resource = {
        data: [{
            Date : DateTime.getDate1(confirmAll.inTime),
            In : DateTime.getTime1(confirmAll.inTime),
            Out: DateTime.getTime1(confirmAll.outTime)
        }]
    };

    $scope.confirmTime = function () {

        $scope.dataLoaded = true;
        $scope.conf = true;
        $scope.inTimeFinal = DateTime.setDateTime($scope.resource.data[0].Date, $scope.resource.data[0].In);
        // console.log($scope.inTimeFinal);
        $scope.outTimeFinal = DateTime.setDateTime($scope.resource.data[0].Date, $scope.resource.data[0].Out);
        // console.log($scope.outTimeFinal);

        var confirmAttdc = {
            mobile: confirmAll.mobile,
            inTime: $scope.inTimeFinal,
            outTime: $scope.outTimeFinal,
            totalTime: confirmAll.totalTime,
            check: "true"
        };
        // console.log('post - ',confirmAttdc);
        restService.postRequest('message/timeEntryConform', confirmAttdc, cb);

        function cb(data, error) {
            $scope.dataLoaded = false;
            $scope.conf = false;
            // console.log(data);

            if (data.err) {
                ngDialog.open({
                    template: "<h3 style='color:#EB444A'>"+data.err+"</h3>",
                    className: 'ngdialog-theme-default',
                    plain: true,
                    overlay: true
                });
                $state.go('home');
            } else {
                ngDialog.open({
                    template: "<h3 style='color: #4CBD50'>Saved!! Time Entry has done successfully..</h3>",
                    className: 'ngdialog-theme-default',
                    plain: true,
                    overlay: true
                });
                $state.go('home');
            }
        }

        // localStorageService.clearAll();
    }
}