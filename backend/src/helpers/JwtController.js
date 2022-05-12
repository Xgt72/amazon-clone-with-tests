const jwt = require("jsonwebtoken");

const {
  ACCESS_JWT_SECRET,
  ACCESS_JWT_EXPIRESIN,
  ACCESS_JWT_COOKIE_MAXAGE,
  ACCESS_JWT_COOKIE_SECURE,
} = process.env;

class JwtController {
  static createAccessToken = async (req, res) => {
    const { user } = req;
    const token = jwt.sign(
      { UserInfo: { username: user.username, roles: undefined } },
      ACCESS_JWT_SECRET,
      {
        expiresIn: ACCESS_JWT_EXPIRESIN,
      }
    );

    res
      .status(200)
      .cookie("accessToken", token, {
        httpOnly: true,
        maxAge: parseInt(ACCESS_JWT_COOKIE_MAXAGE, 10),
        secure: ACCESS_JWT_COOKIE_SECURE === "true",
        sameSite: "lax",
      })
      .json({
        roles: undefined,
        expiresIn: parseInt(ACCESS_JWT_COOKIE_MAXAGE, 10),
      });
  };

  static verifyAccessToken = async (req, res, next) => {
    const { token } = req.cookies;
    // console.log("accessToken: ", token);
    if (token) {
      jwt.verify(token, ACCESS_JWT_SECRET, (err, decoded) => {
        if (err) {
          // console.log("error: ", err);
          res.clearCookie("accessToken");
          res.sendStatus(403);
        } else {
          // console.log("accessToken ok");
          req.user = decoded;
          next();
        }
      });
    } else {
      res.clearCookie("accessToken");
      res.status(403).send("Unauthorized");
    }
  };
}
module.exports = JwtController;
