angular.module('attendanceApp', ['ui.router','LocalStorageModule'])
    .config(function($stateProvider, $urlRouterProvider,$httpProvider) {
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
            .state('home', {
                url: '/home',
                templateUrl: 'pages/attendance.html',
                controller: 'attendanceCtrl',
                onEnter : function() {
                    console.log('Time Entry Message');
                }
            })
            .state('home.timeEntry', {
                url: '/',
                templateUrl: 'pages/confirmTime.html',
                controller: 'timeConfirmCtrl',
                onEnter : function() {
                    console.log('Time entry confirmation');
                }
            })
            .state('succeed',{
                url: '/succeed',
                templateUrl: 'pages/succeed.html',
                onEnter : function(){
                    console.log('success')
                }
            });
        $httpProvider.interceptors.push('interceptorAt');
    });
