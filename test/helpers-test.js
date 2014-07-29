/**
 * Created by Janne on 28.7.2014.
 */

var assert = require("assert");
var expect = require("expect.js");
var helpers = require('./../bin/helpers.js');
var _ = require("underscore");

describe("helpers.js", function() {


    describe("Testing how the functions work", function() {

        it("Should calculate the log2(n) correctly for the given numbers", function() {

            // Basic calculation checks
            expect(helpers.log2(3)).to.eql(1.5849625007211563);
            expect(helpers.log2(895)).to.eql(9.80574387215162);

            // Error checking
            expect( function() {
                helpers.log2("asg") })
                .to.throwError(new Error("The given value is not a number!"));

        });

        it("Should test the probability functions correctly", function() {

            // Normal calculation
            expect(helpers.probability(1, [1,2,3,1])).to.eql(0.5);
            // Case of just having that one thing in the list
            expect(helpers.probability(1, [1,1,1,1,1,1,1,1,1,1])).to.eql(1);
            // Case of not existing in the list
            expect(helpers.probability(0, [1,2,3,40])).to.eql(0);

            // Some error checks

            // Case of not having a list
            expect( function() {
                helpers.probability(9, []) })
                .to.throwError(new Error("The length of the values list is 0!"));

        });

        it("Should test the calculation of entropies correctly", function() {

            // Some entropy tests
            expect(helpers.entropy([1,2,3,4,3,2])).to.eql(1.9182958340544893);
            // Empty entropy list
            expect(helpers.entropy([])).to.eql(0);
            // Entropy should be 0
            expect(helpers.entropy([1])).to.eql(0);
            // Entropy should be 1
            expect(helpers.entropy([1, 2])).to.eql(1);


        });

        var features = ["color", "shape"];
        var dataSet =
            [
                {"color":"blue", "shape":"square", "liked":false},
                {"color":"red", "shape":"square", "liked":false},
                {"color":"blue", "shape":"circle", "liked":true},
                {"color":"red", "shape":"circle", "liked":true},
                {"color":"blue", "shape":"hexagon", "liked":false},
                {"color":"red", "shape":"hexagon", "liked":false},
                {"color":"yellow", "shape":"hexagon", "liked":true},
                {"color":"yellow", "shape":"circle", "liked":true}

            ];


        it("Should test the information gain of the helpers", function() {

            var target = "liked";

            // Check that we get the proper values for separate gains
            expect(helpers.gain(dataSet, target, "color")).to.eql(0.31127812445913283);
            expect(helpers.gain(dataSet, target, "shape")).to.eql(0.6556390622295665);
            expect(helpers.gain(dataSet, target, "liked")).to.eql(1);

            // And then test some on maximum gain
            expect(helpers.maxGain(dataSet, target, features)).to.eql("shape");

            expect(helpers.maxGain(dataSet, "shape", features)).to.eql("shape");
        });


    });

});