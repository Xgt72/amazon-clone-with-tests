const jwt = require("jsonwebtoken");

const {
  ACCESS_JWT_SECRET,
  ACCESS_JWT_EXPIRESIN,
  ACCESS_JWT_COOKIE_MAXAGE,
  ACCESS_JWT_COOKIE_SECURE,
} = process.env;

class JwtController {
  static createAccessToken = async (req, res) => {
    const id = req.userId;
    const token = jwt.sign({ id }, ACCESS_JWT_SECRET, {
      expiresIn: ACCESS_JWT_EXPIRESIN,
    });

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: parseInt(ACCESS_JWT_COOKIE_MAXAGE, 10),
        secure: ACCESS_JWT_COOKIE_SECURE === "true",
        sameSite: "lax",
      })
      .json({ id, expiresIn: parseInt(ACCESS_JWT_COOKIE_MAXAGE, 10) });
  };

  static verifyAccessToken = async (req, res, next) => {
    const { token } = req.cookies;
    // console.log("token: ", token);
    if (token) {
      jwt.verify(token, ACCESS_JWT_SECRET, (err, decoded) => {
        if (err) {
          // console.log("error: ", err);
          res.clearCookie("token");
          res.sendStatus(403);
        } else {
          // console.log("token ok");
          req.user = decoded;
          next();
        }
      });
    } else {
      res.clearCookie("token");
      res.status(403).send("Unauthorized");
    }
  };
}
module.exports = JwtController;
