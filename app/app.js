angular.module('attendanceApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/Login');

        $stateProvider
            .state('Login', {
                url: '/Login',
                templateUrl: 'pages/login.html',
                onEnter : function() {
                    console.log('login');
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
            .state('Records', {
                url: '/Records',
                templateUrl: 'pages/record.html'
            })
    });
