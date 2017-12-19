(function angularElmComponents(angular) {
    angular.module('angularElmComponents', [])
        .directive('elmComponent', function () {
            return {
                template: '<div></div>',
                scope: {
                    src: '=',
                    flags: '=',
                    ports: '&'
                },
                link: function (scope, element) {
                    var app = scope.src.embed(element[0], scope.flags);
                    var cleanUp = angular.noop;

                    if (scope.ports !== undefined) {
                        cleanUp = scope.ports({ ports: app.ports });
                    }

                    scope.$on('$destroy', function cleanUpPorts() {
                        if (angular.isFunction(cleanUp)) {
                            cleanUp();
                        }
                    });
                }
            };
        });
})(angular || require('angular'));
