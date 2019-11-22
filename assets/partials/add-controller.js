angular.module("contactMsg")  

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