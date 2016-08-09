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
$scope.elmTodoComponent = require('../../dist/elm/todomvc.js').Todo;
```

```html
<!-- app/components/example.html -->
<elm-component
  src="elmTodoComponent">
</elm-component>
```

### Flags

In order to give your elm app some flags on startup to initialize its state, use the `flags` attribute on the `elm-component` directive. It takes an object:

```js
// app/componenets/example_controller.js
$scope.elmTodoComponent = require('../../dist/elm/todomvc.js').Todo;
$scope.elmTodoFlags = { todos: ['Get Milk', 'Do Laundry'] };
```

```html
<!-- app/components/example.html -->
<elm-component
  src="elmTodoComponent"
  flags="elmTodoFlags">
</elm-component>
```

These flags give you the flexibility to set up an initial state in Javascript first.

### Ports

Changes to the `flags` attribute after the Elm component has been initialized will **not** affect the component in any way. In order to interop between your Javascript and Elm, use `ports` instead. Ports allow your Javascript to send values to, and subscribe to values from, your Elm component.

```js
// app/componenets/example_controller.js
$scope.elmTodoComponent = require('../../dist/elm/todomvc.js').Todo;
$scope.elmTodoFlags = { todos: ['Get Milk', 'Do Laundry'] };
$scope.elmTodoSetupPorts = function (ports) {
    ports.numActiveTodos.subscribe(function (n) {
        console.log(n);
    });

    ports.todos.send("Invent the Universe");
    ports.todos.send("Bake an Apple Pie");
};
```

```html
<!-- app/components/example.html -->
<elm-component
  src="elmTodoComponent"
  flags="elmTodoFlags"
  ports="elmTodoSetupPorts(ports)">
</elm-component>
```
