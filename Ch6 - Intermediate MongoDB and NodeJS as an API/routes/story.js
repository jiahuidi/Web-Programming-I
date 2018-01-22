const express = require("express");
const router = express.Router();
const storyData = {
    storyTitle: "One day in New York City",
    story: "I went to New York City several times to visit some famous interests. And here is one day of my trip.The first interests I visited was Grand Central terminal. Always a buzz of activity, this stately building is one of my favorite places in all of New York. Not only is it fascinating to stop and watch all the comings and goings, but the structure itself is simply spectacular, with its ornate chandeliers and soaring zodiac ceiling.Then I went to Empire State Building. This glowing beacon on the Manhattan skyline has long screamed \"New York,\" often in technicolor. The second-tallest building in the city (after One World Trade Center), it can be seen from all around, and journeys to the top, while pricey, are pretty special, especially if you grew up watching magical Hollywood moments up here.After that was New York Public Library. I'm a book nerd. But you don't have to be one to feel a sense of awe when you walk into this magnificent building. From the lions who guard its entrance to its exhibitions of beloved books and artifacts, this building is a treasure. One of my favorite spots to read or work is the ornate Rose Reading Room, and you shouldn't miss the Map Room either.."
};

router.get("/", (req, res) => {
    res.json(storyData);
    console.log("The story route:");
    console.log(storyData);
});

router.post("/", (req, res) => {
    res.sendStatus(501);
});

module.exports = router;