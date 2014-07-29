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
 * Calculates the Entropy of all the values in the given list
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

    // Check that the length of the values is not 0
    if (values.length === 0) {
        throw new Error("The length of the values list is 0!");
    }
    var instances = _.filter(values, function(x) { return x === value}).length;
    var total = values.length;
    return instances/total;
}

function createTree(dataSet, target, features) {
    // Get the targets from the data set & make sure the targets are all unique
    var targets = _.unique(_.pluck(dataSet, target));

    // If we only get targets with length 1
    if (targets.length === 1) {
        return {
            type : "result",
            val : targets[0],
            name : targets[0],
            alias : targets[0] + randomTag()
        };
    }

    // If the features we got are 0
    if (features.length === 0) {
        // Get the most common feature
        var topTarget = mostCommon(targets);
        return {
            type : "result",
            val : topTarget,
            name : topTarget,
            alias : topTarget + randomTag()
        };
    }

    // Okay, now to the business
    // Find the maximum gain from the set with the given terms
    var bestFeature = maxGain(dataSet, target, features);
    // Then, remove the best feature from the features set
    var remainingFeatures = _.without(features, bestFeature);
    // Then, get the possible values from the dataset, and take only the unique values
    var possibleValues = _.unique(_.pluck(dataSet, bestFeature));

    // Now, start creating a node
    var node = {
        name : bestFeature,
        alias : bestFeature + randomTag(),
        type : "feature"
    };

    // Then, populate the values for the node in question
    node.values = _.map(possibleValues, function(value) {
        // Create a branch for the given value
        var newSet = dataSet.filter(function(x) {
            // Return the best feature of the whole list
            return x[bestFeature] == value
        });

        // Then, create a child node
        var childNode = {
            name : value,
            alias : value + randomTag(),
            type : "feature_value"
        };

        // And continue creating the tree from here, using the child as the root
        childNode.chilld = createTree(newSet, target, remainingFeatures);
        // Then return the child node
        return childNode;

    });

    // Return the final node
    return node;
}

/**
 * Calculates the information gain of a given dataset with target and features
 * @param {List} dataSet A list containing the whole dataset to check
 * @param {*} target The target to search for
 * @param {*} feature The feature to use in the search
 * @returns {number} The amount of information gain
 */
function gain(dataSet, target, feature) {
    // First, Get all the unique the values of each of the features
    var attributeValues = _.unique(_.pluck(dataSet, feature));
    // Then, calculate the entropy for each set
    var setEntropy = entropy(_.pluck(dataSet, target));
    // Get the size of the whole set
    var setSize = _.size(dataSet);
    // Then, map all the entropies together
    var entropies = attributeValues.map(function(value) {
        // Get the subset of each feature from the data set
        var subset = dataSet.filter(function(x) {
            return x[feature] === value;
        });
        // And then calculate the entropies from the whole bunch
        return (subset.length/setSize)*entropy(_.pluck(subset, target));
    });

    // Then, calculate the total sum of all entropies
    var sumOfEntropies = entropies.reduce(function(a,b) { return a+b}, 0);
    // And then return the difference between the whole entropy and the entropy of the given set
    return setEntropy - sumOfEntropies;

}

function maxGain(dataSet, target, features) {

    // Return the feature that brings the maximum gain from the complete data set
    return _.max(features, function(value) {
        return gain(dataSet, target, value);
    });

}



/**
 * Just creates a random tag to help alias function
 * @returns {string} A random string tag to be used as a somewhat unique identifier
 */
function randomTag() {
    return "_r" + Math.round(Math.random()*100000).toString();
}

/**
 * Finds the most common value in the given list of values
 * @param {List} valueList list containing bunch of values
 * @returns {Number} The value that appears in the list the most
 */
function mostCommon(valueList) {
    // Find the most common value in the given list
    return _.sortBy(valueList, function (value) {
        return count(value, valueList);
    }).reverse()[0];

}

/**
 * Get the count of certain values in the given list
 * @param {Number} value The value to look for in the list
 * @param {List} valueList The list of values to search for
 * @returns {*}
 */
function count(value, valueList) {
    return _.filter(valueList, function (foundValue) {
        return foundValue === value;
    }).length;
}

module.exports = {

    log2 : log2,
    entropy : entropy,
    probability : probability,
    createTree : createTree,
    gain : gain,
    maxGain : maxGain

};