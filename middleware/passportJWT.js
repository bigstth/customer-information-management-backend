const config = require('../config/index');
const User = require('../models/user');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWT_SECRET;
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
      if (!user) {
        return done(new Error('User not found'), null);
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

module.exports.isLogin = passport.authenticate('jwt', { session: false });
