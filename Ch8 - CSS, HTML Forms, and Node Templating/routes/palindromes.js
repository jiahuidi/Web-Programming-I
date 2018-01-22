const express = require('express');
const router = express.Router();
const data = require("../data");
const palindromes = data.palindromes;

router.get("/static", (req, res) => {
    res.render("palindromes/static", {});
});

router.get("/server", (req, res) => {
    res.render("palindromes/server", {});
});

router.post("/server", (req, res) => {
    let phrase = req.body.phrase.toLowerCase().replace(/\W+/gi,'');
    let result = phrase.split('').reverse().join('');
    let isPalindrome = (result, phrase) => {
    	return result ===phrase;
    };

    res.render("palindromes/server", { phrase: phrase, result: result, isPalindrome: isPalindrome});
});

module.exports = router;