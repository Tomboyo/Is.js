# Is.js
A small validation class for checking types and inheritance quickly.
This library is not suitable for cross-frame type-checking.

#####boolean Is.a(vararg v, string|class type)
Returns true if `v` matches `type` or an alias registered under `type` with `Is::registerAlias` (see below). Returns false otherwis (if a string `type` is invalid, `Is::a` will also return false). This conglomerates `typeof` and `instanceof` checks, so bear in mind it is not suitable for cross-frame checks.
```
Is.a([], 'object');       // true
Is.a([], Array);          // true
Is.a(1, 'object');        // false
Is.a(1, 'invalid_type');  // false
```


#####boolean Is.all(vararg v, string|class type [, string|class type [, ... ]])
Returns true if `Is.a(v, type)` is true for each `type` given. Returns false otherwise.
```
Is.all([], 'object', Array);  // true
Is.all([], 'number', Array);  // false
```


#####boolean Is.some(vararg v, string|class type [, string|class type [, ... ]])
Returns true if `Is::a(v, type)` is true for at least one `type` provided. Returns false otherwise.
```
Is.some(1, 'string', 'number');   // true
Is.some('a', 'number', 'object'); // false
```


#####void Is.registerAlias(string alias, function fn)
Creates a pseudo-type under the name `alias`. The user-defined function `fn` should return true when `Is::a` should return true, and false otherwise. Is.js type tests may check against the alias after it has been registered.

This can be used to create convenience types, like `Positive` or `HTMLCanvasSource`.
```
Is.a(1, 'natural_number');  // false; natural_number is not a known type
Is.registerAlias('natural_number', (v) => Is.a(v, 'integer') && v > 0); // natural_number is registered by Is
Is.a(1, 'natural_number');  // true
```
