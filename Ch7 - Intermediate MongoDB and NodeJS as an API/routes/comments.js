const express = require('express');
const router = express.Router();
const commentData = require("../advanced_mongo");

router.get("/recipe/:recipeId", (req, res) => {
    commentData.getRecipe(req.params.recipeId).then((recipe) => {
        let comments = [];
        recipe.comments.forEach(function(comment) {
            comments.push({"_id": comment._id, "recipeId": recipe._id, 
            "recipeTitle": recipe.title, "poster": comment.poster, 
            "comment": comment.comment});
        });
        res.json(comments);
    }).catch(() => {
        res.status(404).json({ error: "Post not found" });
    });
});

router.get("/:commentId", (req, res) => {
    commentData.getAllRecipes().then((recipeList) => {
        recipeList.forEach(function(recipe) {
            recipe.comments.forEach(function(comment) {
                if(comment._id === req.params.commentId)
                    res.json({"_id": comment._id, "recipeId": recipe._id, 
                        "recipeTitle": recipe.title, "poster": comment.poster, 
                        "comment": comment.comment});
            });
        });
        
    }).catch((e) => {
        res.status(500).json({ error: "Post not found" });
    });
});


router.post("/:recipeId", (req, res) => {
    let commentPostData = req.body;

    commentData.addComment(req.params.recipeId, commentPostData.poster, commentPostData.comment)
        .then((newComment) => {
            res.json(newComment);
        }).catch((e) => {
            res.status(500).json({ error: e });
        });
});

router.put("/:recipeId/:commentId", (req, res) => {
    let updatedData = req.body;
    let getPost = commentData.getRecipe(req.params.recipeId);
    if (!updatedData) {
        res.status(400).json({ error: "You must provide data to update a recipe" });
        return;
    }

    getPost.then(() => {
        return commentData.updateComment(req.params.recipeId, req.params.commentId, updatedData)
            .then((updatedRecipe) => {
                console.log(`updatedRecipe: ${updatedRecipe}`);
                updatedRecipe.comments.forEach(function(comment) {
                    if(comment._id === req.params.commentId)
                        res.json({"_id": comment._id, "recipeId": updatedRecipe._id, 
                            "recipeTitle": updatedRecipe.title, "poster": comment.poster, 
                            "comment": comment.comment});
                });
            }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch(() => {
        res.status(404).json({ error: "Post not found" });
    });

});

router.delete("/:commentId", (req, res) => {
    commentData.getAllRecipes().then((recipeList) => {
        recipeList.forEach(function(recipe) {
            recipe.comments.forEach(function(comment) {
                if(comment._id === req.params.commentId){
                    return commentData.removeComment(recipe._id, comment._id)
                        .then(() => {
                            res.sendStatus(200);
                        }).catch((e) => {
                            res.status(500).json({ error: e });
                        });
                }
            });
        });
        
    }).catch((e) => {
        res.status(500).json({ error: "Post not found" });
    });
});


module.exports = router;