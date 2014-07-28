/**
 * Created by Janne on 28.7.2014.
 */

"use strict";

var math = require('mathjs');
var  _ = require('underscore');

/**
 * Calculates the 2 logarithm of the given value
 * @param {Number} n The number to calculate
 * @return {Number} A log2(n) of the given number
 */
function log2(n) {
    // Check that the given value is a number
    if (isNaN(n) === true) {
        throw new Error("The given value is not a number!");
    }
    return math.log(n, 2);
}

/**
 * Calculates the Shannon Entropy for the given values
 * @param {List} values A list of values
 * @return {Object} The reduced number for probability
 */
function entropy(values) {
    // Get all the unique values
    var uniqueValues = _.unique(values);
    // Then, calculate probabilities of every existing possibility
    var probabilities = uniqueValues.map(function(x) { return probability(x, values)});
    // Next, do the logarithmic values
    var logValues = probabilities.map(function(p) { return -p*log2(p) });
    // And then finally reduce the problem from a list of values into a single value
    return logValues.reduce(function(a, b) { return a+b}, 0);
}

/**
 * Calculates the probability of a value appearing from the total amount of values
 * For each searched value from the total list of all values
 * @param {Number} value The value to calculate probability of appearance for
 * @param {List} values A list containing ALL the values of the set
 * @return {number} The probability of searched value to appear in the set
 */
function probability(value, values) {
    // Check if the value is a number or not
    if (isNaN(value) === true) {
        throw new Error("Value is not a number!");
    }
    // Check that the length of the values is not 0
    if (values.length === 0) {
        throw new Error("The length of the values list is 0!");
    }
    var instances = _.filter(values, function(x) { return x === value}).length;
    var total = values.length;
    return instances/total;
}

module.exports = {

    log2 : log2,
    entropy : entropy,
    probability : probability

};