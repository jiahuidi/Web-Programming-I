const palindromesRoutes = require("./palindromes");

const constructorMethod = (app) => {
    app.use("/palindromes", palindromesRoutes);

    app.use("*", (req, res) => {
        res.redirect("/palindromes/static");
    })
};

module.exports = constructorMethod;