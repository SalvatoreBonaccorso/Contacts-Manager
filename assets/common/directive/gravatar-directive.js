angular.module('contactMsg')

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