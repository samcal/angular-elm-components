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
                    var app = {};
                    var cleanUp = angular.noop;
                    var isElm0_19 = scope.src.init !== undefined;

                    if (isElm0_19) {
                        app = scope.src.init({
                            node: element[0],
                            flags: scope.flags
                        });
                    }
                    else { // Elm 0.18 or lower.
                        app = scope.src.embed(element[0], scope.flags);
                    }

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
