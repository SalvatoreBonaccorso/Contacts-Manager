angular.module("contactMsg")  

    .controller('addCtrl', function ($scope, contacts, $alert) {

        var alert = $alert({
            title: 'Success!',
            content: "The contact was added successfully.",
            type: 'success',
            container: '#alertContainer',
            show: false
        });
        
        $scope.submit = function () {
            // abbiamo passato il contatto al servizio,
            contacts.create($scope.contact);
            // reimpostato il modello del contatto
            $scope.contact = null;
            // definito un modello di alert al compimento dell'azione.
            alert.show();
        }

    })