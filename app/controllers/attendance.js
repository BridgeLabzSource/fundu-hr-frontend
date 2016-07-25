angular.module('attendanceApp').controller('attendanceCtrl', submitAttnd);

function submitAttnd($scope, localStorageService, $state, restService, retrieveService) {

    $scope.dataLoaded = false;
    $scope.isActive = true;
    $scope.showLog = true;

    $scope.submitMsg = function () {

        $scope.dataLoaded = true;

        var timeEntryCredentials = {
            mobile: localStorageService.get('mobile'),
            message: $scope.message,
        };
        var dataTime = timeEntryCredentials;
        console.log(dataTime);
        restService.postRequest('message', dataTime, cb);

        function cb(data, error) {
            $scope.dataLoaded = false;
            if (data) {
                console.log('data.data - ', data.data);
                console.log('data.err - ', data.err);
                if (data.err) {
                    alert('Time entry has already done!');
                    $state.go('home');
                } else if (data.data.userId) {
                    alert('Message has been sent..');
                    $scope.message = '';
                    retrieveService.setDatax(data);
                    console.log('retrieve data set in attendance controller');
                    $state.go('home.timeEntry');
                }
                else if (data.data == "please try again...") {
                    alert('Invalid statement, try something else..');
                    $state.go('home');
                }
            }
            else{
                alert('try again later!!');
            }

            // if($scope.message.toLowerCase() == "log >"){
            //     $timeout(function() {
            //         $scope.showLog = false;
            //     }, 1000);
            // }else if($scope.message.toLowerCase() == "clear"){
            //     $timeout(function() {
            //         $scope.showLog = true;
            //     }, 800);
            // }

        }
    }
}
