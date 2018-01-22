let MongoClient = require('mongodb').MongoClient,
    runStartup = require("./advanced_startup_docs.js"),
    settings = require('./config.js');
    uuidV1 = require('uuid/v1');

let fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;

runStartup().then(function(allRecipes) {
    console.log("After the advanced document setup has been complete, we have the following recipes:");
    console.log(allRecipes);
});

MongoClient.connect(fullMongoUrl)
    .then(function(db) {
        let recipeCollection = db.collection("advancedRecipes");

        exports.getAllRecipes = function() {
            return recipeCollection.find().toArray();
        };

        exports.getRecipe = function(id) {
            if (id === undefined) return Promise.reject("You must provide an ID");

            return recipeCollection.find({ _id: id }).limit(1).toArray().then(function(listOfRecipes) {
                if (listOfRecipes.length === 0) throw "Could not find recipe with id of " + id;
                return listOfRecipes[0];
            });
        };

        exports.addRecipe = function(title, ingredients, steps, comments) {
            if (typeof title !== "string")
                return Promise.reject("No title provided");

            if (!Array.isArray(ingredients)) {
                ingredients = [];
            }
            if (!Array.isArray(steps)) {
                ingredients = [];
            }
            if (!Array.isArray(comments)) {
                comments = [];
            }

            let newRecipe = {
                _id: uuidV1().toString(),
                title: title,
                ingredients: ingredients,
                steps: steps,
                comments: comments
            };

            return recipeCollection.insertOne(newRecipe).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
                }).then((newId) => {
                    return this.getRecipe(newId);
                });
        };

        exports.updateRecipe = function(id, updatedRecipe) {
            if (id === undefined) return Promise.reject("No id provided");

            let recipe;
            if (updatedRecipe.title) {
                //updatedRecipeData.title = updatedRecipe.title;
                recipeCollection.update({ _id: id }, { $set: { "title": updatedRecipe.title } });
            }
            
            if (updatedRecipe.ingredients && updatedRecipe.steps) {
                //updatedRecipeData.ingredients = updatedRecipe.ingredients;
                let ingredients = updatedRecipe.ingredients;
                let steps = updatedRecipe.steps
                ingredients.forEach(function(ingredient) {
                    steps.forEach(function(step) {
                        recipeCollection.update({ _id: id }, { $addToSet: { "ingredients": ingredient, "steps": step } });
                    });
                });
            }

            if (updatedRecipe.ingredients && !updatedRecipe.steps) {
                //updatedRecipeData.ingredients = updatedRecipe.ingredients;
                let ingredients = updatedRecipe.ingredients;
                let steps = updatedRecipe.steps
                ingredients.forEach(function(ingredient) {
                    steps.forEach(function(step) {
                        recipeCollection.update({ _id: id }, { $addToSet: { "ingredients": ingredient } });
                    });
                });
            }

            if (!updatedRecipe.ingredients && updatedRecipe.steps) {
                //updatedRecipeData.ingredients = updatedRecipe.ingredients;
                let ingredients = updatedRecipe.ingredients;
                let steps = updatedRecipe.steps
                ingredients.forEach(function(ingredient) {
                    steps.forEach(function(step) {
                        recipeCollection.update({ _id: id }, { $addToSet: { "steps": step } });
                    });
                });
            }

            return exports.getRecipe(id);
        };

        exports.removeRecipe = function(id) {
            if (id === undefined) return Promise.reject("No id provided");

            return recipeCollection.removeOne({ _id: id }).then((deletionInfo) => {
                    if (deletionInfo.deletedCount === 0) {
                        throw(`Could not delete recipe with id of ${id}`)
                    }
            });
        };

        exports.addComment = function(id, poster, comment) {
            console.log(`this is the add comment: ${comment}`);
            if (typeof poster !== "string")
                return Promise.reject("No poster provided");

            if (typeof comment !== "string")
                return Promise.reject("No comment provided");

            let newComment = {
                    _id: uuidV1().toString(),
                    poster: poster,
                    comment: comment
                };
            
            return recipeCollection.update({ _id: id }, { $addToSet: { "comments": newComment } }).then(function() {
                return newComment;
            });
        };

        exports.updateComment = function(id, commentId, updatedComment) {
            if (id === undefined) return Promise.reject("No id provided");
            console.log("this is the update comment");

            if (updatedComment.poster && updatedComment.comment) {
                console.log(`updatedComment.poster: ${updatedComment.poster}`);
                return recipeCollection.update({ _id: id , comments: {$elemMatch: { _id: commentId }}}, 
                    { $set: { "comments.$.poster": updatedComment.poster, "comments.$.comment": updatedComment.comment } }).then(function() {
                    return exports.getRecipe(id);
                });
            }

            if (updatedComment.poster && !updatedComment.comment) {
                console.log(`updatedComment.poster: ${updatedComment.poster}`);
                return recipeCollection.update({ _id: id , comments: {$elemMatch: { _id: commentId }}}, 
                    { $set: { "comments.$.poster": updatedComment.poster } }).then(function() {
                    return exports.getRecipe(id);
                });
            }

            if (!updatedComment.poster && updatedComment.comment) {
                console.log(`updatedComment.poster: ${updatedComment.poster}`);
                return recipeCollection.update({ _id: id , comments: {$elemMatch: { _id: commentId }}}, 
                    { $set: { "comments.$.comment": updatedComment.comment } }).then(function() {
                    return exports.getRecipe(id);
                });
            }
        };

        exports.removeComment = function(id, commentId) {
            if (id === undefined) return Promise.reject("No id provided");
            if (!commentId) return Promise.reject("No commentId provided");

            return recipeCollection.update({ _id: id }, { $pull: { "comments": { _id: commentId } } }).then(function() {
                return exports.getRecipe(id);
            });
        };
    });