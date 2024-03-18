"use strict";
var Person = (function () {
    function Person(initName) {
        this.name = initName;
    }
    return Person;
}());
var quil = new Person("Quill");
console.log(quil);
