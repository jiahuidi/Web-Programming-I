var MongoClient = require('mongodb').MongoClient,
    settings = require('./config.js'),
    uuidV1 = require('uuid/v1');

var fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;

function runSetup() {
    return MongoClient.connect(fullMongoUrl)
        .then(function(db) {
            return db.collection("advancedRecipes").drop().then(function() {
                return db;
            }, function() {
                // We can recover from this; if it can't drop the collection, it's because
                // the collection does not exist yet!
                return db;
            });
        }).then(function(db) {
            // We've either dropped it or it doesn't exist at all; either way, let's make 
            // a new version of the collection
            return db.createCollection("advancedRecipes");
        }).then(function(recipeCollection) {
            var makeDoc = function(title) {
                return {
                    _id: uuidV1().toString(),
                    title: title,
                    ingredients: [],
                    steps: [],
                    comments: []
                }
            };

            var addComment = function(recipe, poster, comment) {
                var newComment = {
                    _id: uuidV1().toString(),
                    poster: poster,
                    comment: comment
                };

                recipe.comments.push(newComment);
            };

            var listOfRecipes = [];

            var friedEggs = makeDoc("Fried Eggs");
            friedEggs.ingredients.push({name: "Egg", amount: "2 eggs"}, {name: "Olive Oil", amount: "2 tbsp"});
            friedEggs.steps.push("First, heat a non-stick pan on medium-high until hot", "Add the oil to the pan and allow oil to warm; it is ready the oil immediately sizzles upon contact with a drop of water.", "Crack the egg and place the egg and yolk in a small prep bowl; do not crack the yolk!", "Gently pour the egg from the bowl onto the oil", "Wait for egg white to turn bubbly and completely opaque (approx 2 min)", "Using a spatula, flip the egg onto its uncooked side until it is completely cooked (approx 2 min)", "Remove from oil and plate", "Repeat for second egg");
            addComment(friedEggs, "Gordan Ramsay", "These eggs are delicious!");
            addComment(friedEggs, "Timothy Spall", "Really good!");
            addComment(friedEggs, "Koyuki", "Perfect");

            var friedEgg = makeDoc("Fried Egg");
            friedEgg.ingredients.push({name: "Egg", amount: "1 eggs"}, {name: "Olive Oil", amount: "1 tbsp"});
            friedEgg.steps.push("First, heat a non-stick pan on medium-high until hot", "Add the oil to the pan and allow oil to warm; it is ready the oil immediately sizzles upon contact with a drop of water.", "Repeat for second egg");
            addComment(friedEgg, "Gordan Ramsay", "These eggs are delicious!");
            addComment(friedEgg, "Timothy Spall", "Really good!");

            listOfRecipes.push(friedEggs, friedEgg);

            // we can use insertMany to insert an array of documents!
            return recipeCollection.insertMany(listOfRecipes).then(function() {
                return recipeCollection.find().toArray();
            });
        });
}

// By exporting a function, we can run 
var exports = module.exports = runSetup;