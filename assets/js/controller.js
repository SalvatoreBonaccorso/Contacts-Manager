angular.module("contactMsg", ['ngRoute'])
    /*-----------------------------------
    | Routes
    ------------------------------------*/
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            controller: 'indexCtrl',
            templateUrl: 'assets/partials/index.html'
        })
            .when('/add-contact', {
                controller: 'addCtrl',
                templateUrl: 'assets/partials/add.html'
            })
            // Routes con parametri
            .when('/contact/:id', {
                controller: 'contactCtrl',
                templateUrl: 'assets/partials/contact.html'
            })
            .otherwise({
                redirectTo: '/'
            });

        // $locationProvider.html5Mode(true);

    })

    .controller("AppCtrl", function ($scope, jsonFilter) {

        $scope.clickHandler = function () {
            $scope.isHidden = !$scope.isHidden;
        };

        $scope.contacts = [
            {
                name: 'John Doe',
                phone: '01234567890',
                email: 'john@example.com'
            },
            {
                name: 'Karan Bromwich',
                phone: '09876543210',
                email: 'karan@email.com'
            }
        ];

        $scope.styleDemo = function () {
            if (!$scope.styler) {
                return;
            }
            return {
                background: 'red',
                fontWeight: 'bold'
            };
        }

    })

    .controller('indexCtrl', function ($scope) {

    })
    .controller('addCtrl', function ($scope) {

    })
    // inserisco il servizio $routeParams che ci permette di accedere ai
    // parametri della route come oggetti
    .controller('contactCtrl', function ($scope, $routeParams) {
        console.log($routeParams)
    })

    .filter('truncate', function () {
        return function (input, limit) {
            return (input.length > limit) ? input.substr(0, limit) + '-' : input;
        };
    })