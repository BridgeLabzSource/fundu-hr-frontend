/**
 * @define module
 * @param {string} ngApp - parameter refers to the HTML element in which app will run
 * @param {Array} injector - loading modules through injector
 * */
angular.module('attendanceApp', ['ui.router', 'LocalStorageModule','ngDialog','satellizer'])

/** configure existing services */
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider,$authProvider) {

        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = false;
        $authProvider.loginUrl = 'http://54.86.64.100:3000/api/v3/auth/user';
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
                },
                resolve:{
                    skipIfLoggedIn : skipIfLoggedIn
                }
            })

            .state('Logout',{
                url:'/logout',
                controller: 'attendanceCtrl'
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
                },
                resolve: {
                    loginRequired : loginRequired
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

        function skipIfLoggedIn($q,$auth){
            var deferred = $q.defer();
            if($auth.isAuthenticated()){
                deferred.reject();
                console.log('already logged in');
            }
            else{
                console.log('login require');
                deferred.resolve();
            }
            return deferred.promise;
        }

        function loginRequired($q,$location,$auth){
            var deferred = $q.defer();
            if($auth.isAuthenticated()){
                deferred.resolve();
            }
            else{
                $location.path('/Login');
            }
            return deferred.promise;
        }

        /**
         * pushing interceptor to the array
         * */
        $httpProvider.interceptors.push('interceptorAt');
    });
