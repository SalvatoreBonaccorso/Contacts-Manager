angular.module("contactMsg")

    .directive('editable', function () {
        return {
            restrict: 'AE',
            templateUrl: '/assets/common/directive/editable.html',
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

                $scope.save = function () {
                    $scope.value = $scope.editor.value;
                    $scope.toggleEditor();
                }
            }
        };
    })