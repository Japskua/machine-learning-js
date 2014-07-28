/**
 * Created by Janne on 28.7.2014.
 */

"use strict";

var  _ = require('underscore');
var math = require('mathjs');
var helpers = require('./helpers.js');


function ID3 (data, target, features) {
    this.data = data;
    this.target = target;
    this.features = features;

    console.log("Done!");
}

module.exports = ID3;