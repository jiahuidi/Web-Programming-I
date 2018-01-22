const express = require("express");
const router = express.Router();
const educationData = [
    {
        schoolName: "Beijing University of Posts and Telecommunications",
        degree: "Bachlor",
        favoriteClass: "Software Engineering ",
        favoriteMemory: "I've been the director of Entertainment Department in the Student Union for two years. It was really memorable to work with my friends and hold the parties."
    },
    {
        schoolName: "Stevens Institute of Technology",
        degree: "Master",
        favoriteClass: "Introduction to JAVA programming",
        favoriteMemory: "I went to a party held by Indian students on Halloween with my friends last semester. It was really an interesting party and we even made our own pumpkin carving."
    }
];

router.get("/", (req, res) => {
    res.json(educationData);
    console.log("The education route:");
    console.log(educationData);
});

router.post("/", (req, res) => {
    res.sendStatus(501);
});

module.exports = router;
