angular.module("contactMsg", ['ngRoute'])
    /*-----------------------------------
    | Routes
    ------------------------------------*/
    .config(function ($routeProvider, $locationProvider) {
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

        // toggle prefix #! in the Url
        /*                 $locationProvider.html5Mode({
                            enabled: true,
                            requireBase: false
                        }); */

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
    /* Creazione di un Service personalizzato */
    .factory('contacts', function () {
        var contacts = [{
            name: 'Stephen Radford',
            phone: '0123456789',
            address: '123, Some Street\nLeicester\nLE1 2AB',
            email: 'stephen@email.com',
            website: 'stephenradford.me',
            notes: ''
        },
        {
            name: 'Declan Proud',
            phone: '91234859',
            address: '234, Some Street\nLeicester\nLE1 2AB',
            email: 'declan@declan.com',
            website: 'declanproud.me',
            notes: 'Some notes about the contact.'
        }];

        return {
            /* il metodo get restituisce l'intero array */
            get: function () {
                return contacts;
            },
            /* il metodo find accetta un indice che restituisce il contatto richiesto */
            find: function (index) {
                return contacts[index];
            }
        };
    })

    .controller('indexCtrl', function ($scope, contacts) {

        $scope.contacts = contacts.get();
        // il servizio $rootScope permette di condividere i  dati tra le viste
        
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