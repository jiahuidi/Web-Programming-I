const express = require("express");
const router = express.Router();
const aboutData = {
    name: "Huidi Jia",
    biography: "My name is Huidi Jia. I'm a graduate student in Stevens Institute of Technology and major in Computer Science.",
    favoriteShows: ["The Big Bang Theory", "Harry Potter", "Criminal Minds"],
    hobbies: ["Swimming", "Skiing", "Hiking"]
};

router.get("/", (req, res) => {
    res.json(aboutData);
    console.log("The about route:");
    console.log(aboutData);
});

router.post("/", (req, res) => {
    res.sendStatus(501);
});

module.exports = router;