const jwt = require("jsonwebtoken"),
      status = require("../status/index"),
      dotenv = require("dotenv");

dotenv.config();
module.exports = {
 generateToken :  (req , res ) => {
   try {
     const user = { username: req.body.username };
     const token = jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: '2592000s' });
     //console.log(user);
     return status.sendReturn(res, 200, { error: false, token: token });
   } catch (e) {
     return status.sendReturn(res, 404, { error: true, error: e.message });
   }

 }

}
