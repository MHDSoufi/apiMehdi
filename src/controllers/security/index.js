const token = require("./../../middleware/security/index");

module.exports = {
  giveToken : (req, res) => {
    return token.generateToken(req , res);
  }
}
