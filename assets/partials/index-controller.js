angular.module("contactMsg")

    .controller('indexCtrl', function ($scope, contacts) {

        $scope.contacts = contacts.get();
    })