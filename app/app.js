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
        $authProvider.loginUrl = 'http://funduhr-backend.herokuapp.com/auth/verify';
        /**
         * @default Login
         */
        $urlRouterProvider.otherwise('/home');

        /** @define states */
        $stateProvider
        /** Login state */
            .state('Login', {
                url: '/Login',
                templateUrl: 'pages/login.html',
                controller: 'loginCtrl',
                onEnter: function () {
                    console.log('login called');
                },
                resolve: {
                    skipIfLoggedIn: skipIfLoggedIn
                }
            })

            .state('logout',{
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
                    console.log('Time Entry Message');
                },
                resolve:{
                    loginRequired:loginRequired // loginRequired function will check for token.
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

        $authProvider.github({
            url:'https://funduhr-backend.herokuapp.com/auth/github',
            clientId: '24c05ec2fcd5de72a78f',
            redirectUri :'http://funduhr-frontend.herokuapp.com/#/home'
        });


        function skipIfLoggedIn($q, $auth,ngDialog) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                console.log('skipping auth true');
                ngDialog.open({
                    template: "<h3 style='color: #4CBD50'>You are already logged in!!</h3>",
                    className: 'ngdialog-theme-default',
                    plain: true,
                    overlay: true
                });
                deferred.reject();
            } else {
                console.log('auth failed');
                deferred.resolve();
            }
            return deferred.promise;
        }//end of function
        
        function loginRequired($q, $location, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                $location.path('/Login');
            }
            return deferred.promise;
        }//end of function


        /**
         * pushing interceptor to the array
         * */
        $httpProvider.interceptors.push('interceptorAt');
    });
