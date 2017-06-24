"use strict"
const angular = require("angular");
const $ = require("jquery");
const bootstrap = require('bootstrap');
const bs = require('bootstrap/dist/css/bootstrap.css');
// const bs = require('bootstrap/dist/css/bootstrap.css');
const ngModule = angular.module("app", []);

const generalCss = require("./directives/general.css");


require('./directives/workSpace')(ngModule)

// console.log(ngModule);
