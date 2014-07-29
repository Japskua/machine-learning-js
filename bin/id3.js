/**
 * Created by Janne on 28.7.2014.
 */

var  _ = require('underscore');
var math = require('mathjs');
var helpers = require('./helpers.js');


/**
 * The ID3 Decission Tree algorithm for classifying values
 * @param {List} data The dataset to classify
 * @param {String} target The target to search the match for
 * @param {List} features List of features used in the decision making process
 * @constructor
 */
function ID3 (data, target, features) {
    if ((data === null) || (data.length === 0) || (data === undefined)) {
        throw new Error("The dataset is empty");
    }
    if ((target === null) || (target === undefined)) {
        throw new Error("The target is missing!");
    }
    if ((features === null) || (features.length === 0) || (features === undefined)) {
        throw new Error("The features list is empty");
    }
    // Get the data, target and features
    this.data = data;
    this.target = target;
    this.features = features;
    // Then, construct the tree
    this.model = helpers.createTree(data, target, features);

}


ID3.prototype = {

    /**
     * Predicts how the given sample should be classified
     * @param {String} sample The sample value to classify
     * @returns {String} The value to which class it belongs to
     */
    predict : function (sample) {
        // Make the model to be root
        var node = this.model;

        // Then, loop until you find the result node
        while (node.type !== "result") {
            // Get the attribute name
            var attribute = node.name;
            // Get the sample value of the node
            var sampleValue = sample[attribute];
            // Find the child node
            var childNode = _.find(node.values, function (x) {
                // And return the child node matching the sample value
                return x.name == sampleValue;
            });
            // And set the child to be the new "root"
            node = childNode.child;
        }

        // Once we hit the root.type === "result"
        // Return the value
        return node.value;

    }, // End of predict()

    /**
     * Evaluates the correctness of the decission tree
     * @param {List} samples List of samples to use with the Decission tree
     * @returns {number} The classification percentage of correct/total
     */
    evaluate : function (samples) {
        // Set this to be the instance
        var instance = this;
        // And get the target
        var target = this.target;

        // Amount of samples gone through
        var total = 0;
        // Amount of correct answers predicted
        var correct = 0;

        // loop through all the samples
        _.each(samples, function(sample) {
            // Increment the amount of samples processed
            total++;

            // Predict the class for the sample
            var prediction = instance.predict(sample);
            // Get the actual class for the sample
            var actual = sample[target];
            // Compare the two
            if (prediction === actual) {
                // One more correct!
                correct++;
            }
        }); // End of _.each(...)

        // Return the correct ratio
        return correct / total;

    } // End of evaluate()

};


module.exports = ID3;