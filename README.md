express-dependency-injector
===========================

[![Build Status](https://secure.travis-ci.org/trwalker/express-dependency-injector.png?branch=master)](https://travis-ci.org/trwalker/express-dependency-injector)

Dependency injector for Express using di.js (https://github.com/angular/di.js).

### NPM Location

https://www.npmjs.org/package/express-dependency-injector

### Binding Dependencies

> var express = require('express');
>
> var application = express();
>
> require('express-dependency-injector')(application);
>
> application.bind(MyObject, [Dependency1, Dependency2], 'singleton')

### Resolving Dependencies

> var myObject = req.dependencyInjector.get(MyObject);

### Valid Scopes
> // singleton, webrequest, transient
>
> application.bind(MyObject, [Dependency1, Dependency2], 'singleton');
>
> application.bind(MyObject, [Dependency1, Dependency2], 'webrequest');
>
> application.bind(MyObject, [Dependency1, Dependency2], 'transient');

### Dependency Objects

All objects and dependencies must follow the constructor pattern.  The di.js library makes new instances of these objects when they are requested.  You use the scope parameter on the bind function to control how often a new instance is created when you request your object.

See the following link for details and examples of the constructor pattern: http://addyosmani.com/resources/essentialjsdesignpatterns/book/#constructorpatternjavascript

### Example Project

https://github.com/trwalker/express-dependency-injector-example

### Run Tests Command

> npm test
