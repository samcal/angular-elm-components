# Write Angular components in Elm

This package makes it easy to turn Elm code into Angular directives/components.
It works just like Evan Czaplicki's [react-elm-components](https://github.com/evancz/react-elm-components).

## Usage

In your main file:
```js
// app/main.js
var angular = require('angular');
require('angular-elm-components');

var app = angular.module('app', [ 'angularElmComponents' ]);
```

Now, you will have access to the `elmComponent` directive:

```js
// app/components/example_controller.js
$scope.elmTodoComponent = require('../../dist/elm/todomvc.js');
```

```html
<!-- app/components/example.html -->
<elm-component src="elmTodoComponent">
</elm-component>
```
