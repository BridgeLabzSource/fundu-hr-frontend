/**
 * autoManager directive - Input area manager
 **/
angular.module('attendanceApp').directive('autoManager', function (localStorageService) {
    var options = {
        'up_class': 'moveUp'
    };

    /**
     * socket connection to local server */
    var socket = io.connect();
    socket.emit('message');
    socket.on('server ready', function(msg){
        localStorageService.set('dict', msg);
    });

    return {
        restrict: 'A',
        scope: {
            list: '&'
        },
        controller: function ($rootScope, $scope) {
            $rootScope.data = localStorageService.get('dict');
            console.log($rootScope.data);
        },
        link: function ($scope, element) {
            var input = '';
            /**
             * moves input field up
             * */
            element.bind('focus', function (event) {
                $scope.isDisabled = true;
                $(element).parent().parent().addClass(options.up_class);
            });
            /**
             * inputs entered value on each keyup
             * */
            element.bind('keyup', function (event) {
                var input = $(element).val().toString();
            });
        }
    };

});


