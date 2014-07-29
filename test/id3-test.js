/**
 * Created by Janne on 28.7.2014.
 */

var assert = require("assert");
var expect = require("expect.js");
var ID3 = require('./../bin/id3.js');
var _ = require("underscore");

describe("ID3", function() {


    describe("Creating tree", function() {

        it("Should throw some errors, as there are faulty input values", function() {

            // Faulty constructors
            expect( function() {
                new ID3() })
                .to.throwError(new Error());

            expect( function() {
                new ID3(["a", "b", "ab", "a"]) })
                .to.throwError(new Error());

            expect( function() {
                new ID3(["a", "b", "ab", "a"], "a") })
                .to.throwError(new Error());

            expect( function() {
                new ID3(["a", "b", "ab", "a"], null, ["a"]) })
                .to.throwError(new Error());
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

        it("Should return true when things start correctly", function() {

            // Create a new ID3 tree
            var id3 = new ID3(dataSet, "liked", features);

            // Check that the tree is okay
            expect(id3).to.ok();

            // Check that the model is okay
            expect(id3.model).to.ok();

            // Predict a sample data
            var sample = dataSet[0];
            console.log("Starting to predict", sample);
            var predictedClass = id3.predict(sample);
            var actualClass = sample["liked"];

            console.log("predictedClass is:", predictedClass);
            console.log("And actual class is:", actualClass);

            expect(predictedClass).to.eql(actualClass);

            var accuracy = id3.evaluate(dataSet);
            expect(accuracy).to.eql(1);

        });

    });

});