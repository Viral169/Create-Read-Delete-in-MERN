const jwt = require("jsonwebtoken");
const userAuth = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.json({
      message: "Unauthorized HTTP token not provided",
    });
  }
  const jwtToken = token.replace("Bearer", "").trim();
  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = isVerified;
    next();
  } catch (error) {
    return res.json({message: error || "Unauthorized. Invalid token,"});
  }
};
module.exports = userAuth;
