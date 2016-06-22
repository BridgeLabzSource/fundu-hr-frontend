angular.module('attendanceApp').directive('autoManager', function () {
    var options = {
        'up_class': 'moveUp'
    };
    var dict = ["apple maple", "boy", "cat", "pranali", "sharz", "apolo", "ashes", "apop", "praju"];
    var show = new Set();

    return {
        restrict: 'A',
        scope: {
            list: '&'
        },
        controller: function ($rootScope, $scope) {
            $rootScope.data = dict;
            console.log($rootScope);
            //$scope.$watch('list',function(ne,ol){
            //    alert("watch "+ $rootScope.listA);
            //})
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
                if (input.length >= 2) {
                    search_input(input);
                }
            });
            //search from array and returns matched values
            function search_input(str) {
                console.log(str);
                //var show = new Set();
                for (var i = 0; i < dict.length; i++) {
                    for (var j = 0; j < str.length; j++) {
                        if (dict[i].toLowerCase().charAt(j) == str.toLowerCase().charAt(j))
                            show.add(dict[i]);
                        else
                            show.delete(dict[i]);
                    }

                }
                //console.log(show);
                $scope.p = Array.from(show);
                //for(var i = 0;i<show.length;i++){
                //    p.push(setIter.next().value);
                //}
                console.log($scope.p);

            }
        }
    };

});


