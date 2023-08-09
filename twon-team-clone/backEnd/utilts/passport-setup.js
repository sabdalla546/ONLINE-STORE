
const GoogleStrategy = require('passport-google-oauth20');
const passport = require('passport');
 passport.use(new GoogleStrategy({
    // options
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTID_SECRIT,
    callbackURL: 'http://localhost:3000/user/googleLogin',

},()=>{
    // passport callback fun
    
}));