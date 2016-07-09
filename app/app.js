angular.module('attendanceApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/Login');

        $stateProvider
            .state('Login', {
                url: '/Login',
                templateUrl: 'pages/login.html',
                controller: 'loginCtrl',
                onEnter : function() {
                    console.log('login');
                }
            })
            .state('OTP', {
                url: '/OTP',
                templateUrl: 'pages/otp.html',
                controller: 'otpCtrl',
                onEnter : function() {
                    console.log('OTP verification');
                }
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
