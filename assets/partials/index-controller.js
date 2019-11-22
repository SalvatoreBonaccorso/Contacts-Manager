angular.module("contactMsg")

    .controller('indexCtrl', function ($scope, contacts) {

        $scope.contacts = contacts.get();

        $scope.delete = function(index){
            contacts.destroy(index);
        }
    })