const express = require('express');
const router = express.Router();
const recipeData = require("../advanced_mongo");

router.get("/:id", (req, res) => {
    recipeData.getRecipe(req.params.id).then((recipe) => {
        res.json(recipe);
    }).catch(() => {
    res.status(404).json({ error: "Post not found" });
    });
});

router.get("/", (req, res) => {
    recipeData.getAllRecipes().then((recipeList) => {
        let recipes = [];
        recipeList.forEach(function(recipe) {
            recipes.push({"_id": recipe._id, "title": recipe.title});
        });
        res.json(recipes);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

router.post("/", (req, res) => {
    let recipePostData = req.body;

    recipeData.addRecipe(recipePostData.title, recipePostData.ingredients, recipePostData.steps, recipePostData.comments)
        .then((newRecipe) => {
            res.json(newRecipe);
        }).catch((e) => {
            res.status(500).json({ error: e });
        });
});

router.put("/:id", (req, res) => {
    let updatedData = req.body;
    let getRecipe = recipeData.getRecipe(req.params.id);
    if (!updatedData) {
        res.status(400).json({ error: "You must provide data to update a recipe" });
        return;
    }

    getRecipe.then(() => {
        return recipeData.updateRecipe(req.params.id, updatedData)
            .then((updatedRecipe) => {
                res.json(updatedRecipe);                
            }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch(() => {
        res.status(404).json({ error: "Post not found" });
    });

});

router.delete("/:id", (req, res) => {
    let getRecipe = recipeData.getRecipe(req.params.id);

    getRecipe.then(() => {
        return recipeData.removeRecipe(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch(() => {
        res.status(404).json({ error: "Post not found" });
    });
});

module.exports = router;