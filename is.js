"use strict";

/**
 * Thomas Simmons, 2016
 * Is.js - small type-checking library that features type/instance aliasing
 * Note: Is.js uses instanceof checks, not typeof == [object Name] (since the class functionality is more important than the name)
 * tomasimmons@gmail.com
 * Free to use and distribute with the stipulation that this header is included
 **/

class Is {
  /**
   * Is.a(v, type)
   * Test if v is typeof type, instanceof type, or an aliased type.
   */
  static a(v, type) {
    if (arguments.length < 2) {
      throw new Error("Missing arguments");
    } else if (typeof type !== 'string' && !(type instanceof Array || type instanceof Object)) {
      throw new TypeError("Invalid type '"+type+"': must be (string, Function, Object)");
    }

    // Aliased type test
    if (type in Is.prototype.aliases && Is.prototype.aliases[type](v)) {
      return true;
    }

    // Type Test
    if (typeof v === type) {
      return true;
    }
    
    // Instance test
    if (['function', 'object'].indexOf(typeof type) >= 0 && ['function', 'object'].indexOf(typeof v) >= 0 && v instanceof type) {
      return true;
    }
    
    return false;
  }
  
  /**
   * Test if v is.a() for at least one of types
   */
  static some(v, ...types) {
    if (!types.length) {
      throw new Error("Missing arguments");
    }
    
    for (let type of types) {
      try {
        if (Is.a(v, type)) {
          return true;
        }
      } catch (e) {
        throw e;
      }
    }
    
    return false;
  }
  
  /**
   * Test if v Is.a() for all elements in types
   */
  static all(v, ...types) {
    if (!types.length) {
      throw new Error("Missing arguments");
    }
    
    for (let type of types) {
      try {
        if (Is.a(v, type)) {
          continue;
        }
        
        return false;
      } catch (e) {
        throw e;
      }
    }
    
    return true;
  }
  
  /**
   * Register a function under the alias 'key' that can be used to check types.
   * fn should return boolean (only === true results satisfy Is checks).
   */
  static registerAlias(key, fn) {
    if (!Is.some(key, 'integer', 'string')) {
      throw new TypeError('Integer or String expected for parameter 1');
    }
    
    if (!Is.a(fn, 'function')) {
      throw new TypeError('Function expected for parameter 2');
    }
    
    Is.prototype.aliases[key] = fn;
  }
}

Is.prototype.aliases = {
  'HTMLCanvasSource': (v) => Is.some(v, ...[HTMLImageElement, HTMLVideoElement, HTMLCanvasElement, ImageBitmap]),
  
  'integer': Number.isInteger,  
  'positive': (v) => v > 0
}