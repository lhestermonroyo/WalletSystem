const LocalStrategy = require("passport-local").Strategy;
const crypt = require("bcryptjs");
const Accounts = require("../models/accounts");
const config = require("../config/database");

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      (username, password, done) => {
        let query = {
          email: username
        };
        Accounts.findOne(query, (err, account) => {
          if (err) {
            console.log(err);
          }

          if (!account) {
            return done(null, false, {
              message: "E-mail not registered. Please sign up first."
            });
          }
          crypt.compare(password, account.password, (err, match) => {
            if (err) {
              console.log(err);
            }

            if (match) {
              return done(null, account);
            } else {
              return done(null, false, {
                message: "Password incorrect. Please try again."
              });
            }
          });
        });
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    Accounts.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
