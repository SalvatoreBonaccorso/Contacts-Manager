angular.module("contactMsg", ['ngRoute', 'ngSanitize', 'mgcrea.ngStrap', 'mgcrea.ngStrap'])
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

    .controller("AppCtrl", function ($scope, $location, $alert) {
        /* Questa funzione permette di modificare il percorso corrente nella vista index 
           e si attiva non appena inizieremo a digitare nella casella di ricerca(direttiva ng-keyup) */
        $scope.startSearch = function () {
            $location.path('/');
        };
        /* Questa funzione verifica se il percorso corrente è lo stesso di quello che è stato passato */
        $scope.pageClass = function (path) {
            return (path == $location.path()) ? 'active' : '';
        };

        var alert = $alert({
            title: 'Alert Title!',
            content: "Here\'s some content.",
            type: 'danger',
            container: '#alertContainer',
            show: false
        })

        $scope.showAlert = alert.show;

    })