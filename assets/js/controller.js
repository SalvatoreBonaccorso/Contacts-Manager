angular.module("contactMsg", ['ngRoute', 'ngSanitize'])
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

    .controller("AppCtrl", function ($scope, $location) {
        /* Questa funzione permette di modificare il percorso corrente nella vista index 
           e si attiva non appena inizieremo a digitare nella casella di ricerca(direttiva ng-keyup) */
        $scope.startSearch = function () {
            $location.path('/');
        };
        /* Questa funzione verifica se il percorso corrente è lo stesso di quello che è stato passato */
        $scope.pageClass = function (path) {
            return (path == $location.path()) ? 'active' : '';
        };

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
            },
            /* il metodo create aggiunge un nuovo contatto  */
            create: function (contact) {
                contacts.push(contact);
            }
        };
    })

    .controller('indexCtrl', function ($scope, contacts) {

        $scope.contacts = contacts.get();
    })

    .controller('addCtrl', function ($scope, contacts) {

        $scope.submit = function () {
            // abbiamo passato il contatto al servizio,
            contacts.create($scope.contact);
            // reimpostato il modello del contatto
            $scope.contact = null;
            // definito un modello che possiamo verificare per fornire il feedback.
            $scope.added = true;
        }

    })
    // inserisco il servizio $routeParams che ci permette di accedere ai parametri della route come oggetti
    // inserisco anche il servizio personalizzato "contacts"
    .controller('contactCtrl', function ($scope, $routeParams, contacts) {

        $scope.contact = contacts.find($routeParams.id);
    })

    /* direttiva personalizzata */
    .directive('gravatar', function () {
        return {
            restrict: 'AE',
            template: '<img ng-src="{{img}}" class="{{class}}">',
            replace: true,
            // gli attributi passati alla funzione sono semplici oggetti ai quali possiamo accedere
            link: function (scope, elem, attrs) {
                // a attrs.size applico un operatore ternario 
                // se c'è attrs.size assegnalo alla variabile size se no assegna 64
                var size = (attrs.size) ? attrs.size : 64;
                scope.img = 'http://gravatar.com/avatar/' + (attrs.email) + '?s=' + size;
                // abbiamo associato le classi assegnate all'elemento
                scope.class = attrs.class;
            }
        }
    })

    .directive('editable', function () {
        return {
            restrict: 'AE',
            templateUrl: '/assets/partials/editable.html',
            // creiamo uno scope isolato
            scope: {
                /*  ('=' legame bidirezionale) possiamo legare un modello dello scope
                    genitore allo scope della direttiva. Non dobbiamo quindi utilizzare la sintassi {{}} e
                    possiamo approfittare del binding dei dati bidirezionale. */
                value: '=editable',
                /*  ('@' legame unidirezionale) la direttiva utilizzerà il valore letterale dell’attributo.
                    Possiamo utilizzare la sintassi {{}} per passare il valore di un modello o immettere
                    una stringa. Quando utilizziamo il simbolo @ nessun modello è collegato. */
                field: '@fieldType'
            },
            controller: function ($scope) {
                $scope.editor = {
                    showing: false,
                    value: $scope.value
                }
                // funzione per mostrare o nascondere l'editor
                $scope.toggleEditor = function () {
                    $scope.editor.showing = !$scope.editor.showing;
                    // se in modalità edit non apporto le modifiche premendo 'cancel' il valore
                    // si ripristina all'originale 
                    $scope.editor.value = $scope.value;
                }
                
                $scope.field = ($scope.field) ? $scope.field : 'text';

                $scope.save = function() {
                    $scope.value = $scope.editor.value;
                    $scope.toggleEditor();
                }
            }
        };
    })

    .filter("paragraph", function () {
        return function (input) {
            return (input) ? input.replace(/\n/g, "<br />") : input;
        };
    })

    .filter('truncate', function () {
        return function (input, limit) {
            return (input.length > limit) ? input.substr(0, limit) + '-' : input;
        };
    })