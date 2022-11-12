const jwt = require('jsonwebtoken')
const User = require('../Models/User')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split('')[1]
        const decode = jwt.verify(token, 'secret')

        req.user = decode
        next()
    }
    catch(error){
        res.json({
            message: 'Authentification Failed'
        })
    }
}

const GOOGLE_CLIENT_ID = '110400442623-phn1epmn04absp9uvffoppevu19ug0s2.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET ='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'

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

passport.serializeUser(function(user, done){
    done(null,user);
})


module.exports = { authenticate }