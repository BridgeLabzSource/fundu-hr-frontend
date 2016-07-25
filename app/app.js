/**
 * @define module
 * @param {string} ngApp - parameter refers to the HTML element in which app will run
 * @param {Array} injector - loading modules through injector
 * */
angular.module('attendanceApp', ['ui.router', 'LocalStorageModule'])

/** configure existing services */
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

        /**
         * @default Login
         */
        $urlRouterProvider.otherwise('/Login');

        /** @define states */
        $stateProvider
        /** Login state */
            .state('Login', {
                url: '/Login',
                templateUrl: 'pages/login.html',
                controller: 'loginCtrl',
                onEnter: function () {
                    // console.log('login');
                }
            })

            /** Registration state */
            .state('registration', {
                url: '/sign_up',
                templateUrl: 'pages/register.html',
                controller: 'regCtrl',
                onEnter: function () {
                    // console.log('Registration');
                }
            })

            /** OTP state */
            .state('OTP', {
                url: '/OTP',
                templateUrl: 'pages/otp.html',
                controller: 'otpCtrl',
                onEnter: function () {
                    // console.log('OTP verification');
                }
            })

            /** home state */
            .state('home', {
                url: '/home',
                templateUrl: 'pages/attendance.html',
                controller: 'attendanceCtrl',
                onEnter: function () {
                    // console.log('Time Entry Message');
                }
            })
            .state('home.timeEntry', {
                url: '/',
                templateUrl: 'pages/confirmTime.html',
                controller: 'timeConfirmCtrl',
                onEnter: function () {
                    // console.log('Time entry confirmation');
                }
            });

        /**
         * pushing interceptor to the array
         * */
        $httpProvider.interceptors.push('interceptorAt');
    });
