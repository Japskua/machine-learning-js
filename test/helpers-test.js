/**
 * Created by Janne on 28.7.2014.
 */

var assert = require("assert");
var expect = require("expect.js");
var helpers = require('./../bin/helpers.js');

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
            // Not being a number
            expect( function() {
                helpers.probability("Afs", [0,2,3,40]) })
                .to.throwError(new Error("Value is not a number!"));

            // Case of not having a list
            expect( function() {
                helpers.probability(9, []) })
                .to.throwError(new Error("The length of the values list is 0!"));

        });

        it("Should test the calculation of entropies correctly", function() {

            // Some entropy tests
            expect(helpers.entropy([1,2,3,4,3,2])).to.eql(1.9182958340544893);


        });

    });

});