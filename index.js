var angular = require('angular');

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

                if (scope.ports !== undefined) {
                    scope.ports(app.ports);
                }
            }
        };
    });
