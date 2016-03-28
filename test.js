"use strict";
QUnit.module('Is', function() {
  QUnit.test('Is::a()', function(a) {
    a.equal(Is.a(1, "number"), true);
    a.equal(Is.a("s", "string"), true);
    a.equal(Is.a([], "object"), true);
    a.equal(Is.a(function(){}, "function"), true);
    a.equal(Is.a(undefined, 'undefined'), true);
    
    a.equal(Is.a([], Array), true);
    a.equal(Is.a([], Object), true);
    a.equal(Is.a(function(){}, Function), true);
    
    a.equal(Is.a(Function, Function), true);
    
    a.equal(Is.a([], 'function'), false);
    a.equal(Is.a([], Function), false);    
    
    a.equal(Is.a([], 'string'), false);
    a.equal(Is.a(1, Array), false);
    a.equal(Is.a(1, 'unknown_type'), false);
    
    a.throws(() => Is.a());
    a.throws(() => Is.a(1));
    a.throws(() => Is.a(1, 1));
  });
  
  QUnit.test('Is::some()', function(a) {
    a.equal(Is.some(1, 'string', 'number'), true);
    a.equal(Is.some([], 'string', Array), true);
    
    a.equal(Is.some(undefined, 'string', 'number'), false);
    a.equal(Is.some([], 'string', 'number'), false);
    
    a.throws(() => Is.some());
    a.throws(() => Is.some('a'));
  });
  
  QUnit.test('Is::all()', function(a) {
    a.equal(Is.all([], Array, Object, "object"), true);
    
    a.equal(Is.all(-1, 'number', Number), false);
    a.equal(Is.all([], 'object', 'function'), false);
    a.equal(Is.all([], Array, Number), false);
    
    a.throws(() => Is.all());
    a.throws(() => Is.all('a'));
  });
  
  QUnit.test('Aliases', function(a) {
    a.equal(Is.all(1, 'integer', 'positive'), true);
    a.equal(Is.a(0, 'integer'), true);
    [new Image(1,1), document.createElement('canvas'), document.createElement('video')].forEach(
      (v) => a.equal(Is.a(v, 'HTMLCanvasSource'), true)
    );
    
    a.equal(Is.a(-1, 'negative'), false);
    Is.registerAlias('negative', (v) => v < 0);
    a.equal(Is.a(-1, 'negative'), true);
    
    a.equal(Is.some(-0.5, 'integer', 'positive'), false);
  });
});