const jwt = require("jsonwebtoken");

const generateJWTToken = (user) => {
  const payload = {
    sub: user.id,
    email: user.email,
    name: user.name,
  };
  const secret = process.env.TOKEN_SECRET;
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secret, options);
};

module.exports = { generateJWTToken };
