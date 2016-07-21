angular.module('attendanceApp').directive('autoManager', function (localStorageService) {
    var options = {
        'up_class': 'moveUp'
    };
    var socket = io.connect('https://funduhr-backend.herokuapp.com');
    socket.emit('message');
    socket.on('server ready', function(msg){
        console.log('inside socket.on');
        console.log(msg);
        // localStorageService.set('dict', msg);
    });
    // var dict = "The quick brown fox jumps over the lazy dog";
    var show = new Set();
    return {
        restrict: 'A',
        scope: {
            list: '&'
        },
        controller: function ($rootScope, $scope) {

            $rootScope.data = localStorageService.get('dict');

        },
        link: function ($scope, element) {
            var input = '';
            //moves input field up
            element.bind('focus', function (event) {
                $scope.isDisabled = true;
                $(element).parent().parent().addClass(options.up_class);
            });
            //takes the entered value on each keyup

            element.bind('keyup', function (event) {
                var input = $(element).val().toString();
                
                // if (input.length >= 2) {
                //     search_input(input);
                // }
            });
            //search from array and returns matched values
            // function search_input(str) {
            //     for (var i = 0; i < data.length; i++) {
            //         for (var j = 0; j < str.length; j++) {
            //             if (dict[i].toLowerCase().charAt(j) == str.toLowerCase().charAt(j))
            //                 show.add(dict[i]);
            //             else
            //                 show.delete(dict[i]);
            //         }
            //     }
            //
            //     $scope.p = Array.from(show);
            // }
        }
    };

});


