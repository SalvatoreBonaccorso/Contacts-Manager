angular.module("contactMsg")

    .controller('indexCtrl', function ($scope, contacts, $alert) {

        var deletionAlert = $alert({
            title: 'Success!',
            content: "The contact was deleted successfully.",
            type: 'success',
            container: '#alertContainer',
            show: false
        });

        $scope.contacts = contacts.get();

        $scope.delete = function (index) {
            contacts.destroy(index);
            deletionAlert.show();
        }

    })