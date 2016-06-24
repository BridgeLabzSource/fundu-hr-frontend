angular.module('attendanceApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/Login');

        $stateProvider
            .state('Login', {
                url: '/Login',
                templateUrl: 'pages/login.html',
                onEnter : function() {
                    console.log('loginy');
                }
            })
            .state('OTP', {
                url: '/OTP',
                templateUrl: 'pages/otp.html'
            })
            .state('Attendance', {
                url: '/Attendance',
                templateUrl: 'pages/attendance.html',
                controller: 'attendanceCtrl'
            })
            .state('Attendance.log', {
                url: '/log',
                templateUrl: 'pages/table.html'
            })
    });
