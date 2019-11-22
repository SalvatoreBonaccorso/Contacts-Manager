angular.module("contactMsg")

    // inserisco il servizio $routeParams che ci permette di accedere ai parametri della route come oggetti
    // inserisco anche il servizio personalizzato "contacts"
    .controller('contactCtrl', function ($scope, $routeParams, contacts) {

        $scope.contact = contacts.find($routeParams.id);
    })