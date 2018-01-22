var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

const data = require('../data');
const User = data.users;

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
     
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use('local', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function(req, username, password, done) {

            User.getUser(username).then((user) => {
                bcrypt.compare(password, user.password, function (err, res) {
                    if (err)
                        return Promise.reject("Error");
                    else {
                        if (res === true)
                            return done(null, user);
                        else
                            return done(null, false, req.flash('loginMessage', 'Incorrect Password!'));
                    }
                });
            }).catch((error) => {
                console.log(error);
                return done(null, false, req.flash('loginMessage', 'Invalid Username!'));
            });
        }
    ));
}