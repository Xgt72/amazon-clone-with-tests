const jwt = require("jsonwebtoken");

const {
  ACCESS_JWT_SECRET,
  ACCESS_JWT_EXPIRESIN,
  ACCESS_JWT_COOKIE_MAXAGE,
  ACCESS_JWT_COOKIE_SECURE,
  REFRESH_JWT_SECRET,
  REFRESH_JWT_EXPIRESIN,
  REFRESH_JWT_COOKIE_MAXAGE,
  REFRESH_JWT_COOKIE_SECURE,
} = process.env;

class JwtController {
  static createAccessAndRefreshToken = async (req, res) => {
    const { user } = req;
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          roles:
            typeof user.roles[0] !== "number"
              ? user.roles.map((role) => role.code)
              : user.roles,
        },
      },
      ACCESS_JWT_SECRET,
      {
        expiresIn: ACCESS_JWT_EXPIRESIN,
      }
    );

    const refreshToken = jwt.sign(
      {
        user: {
          username: user.username,
          roles:
            typeof user.roles[0] !== "number"
              ? user.roles.map((role) => role.code)
              : user.roles,
        },
      },
      REFRESH_JWT_SECRET,
      {
        expiresIn: REFRESH_JWT_EXPIRESIN,
      }
    );

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: parseInt(REFRESH_JWT_COOKIE_MAXAGE, 10),
        secure: REFRESH_JWT_COOKIE_SECURE === "true",
        sameSite: "lax",
      })
      .json({
        username: user.username,
        roles:
          typeof user.roles[0] !== "number"
            ? user.roles.map((role) => role.code)
            : user.roles,
        accessToken,
      });
  };

  static verifyAccessToken = async (req, res, next) => {
    const { accessToken } = req.body;
    // console.log("accessToken: ", token);
    if (accessToken) {
      jwt.verify(accessToken, ACCESS_JWT_SECRET, (err, decoded) => {
        if (err) {
          // console.log("error: ", err);
          res.sendStatus(403);
        } else {
          req.user = decoded;
          next();
        }
      });
    } else {
      res.status(403).send("Unauthorized");
    }
  };

  static verifyRefreshToken = async (req, res, next) => {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      jwt.verify(refreshToken, REFRESH_JWT_SECRET, (err, decoded) => {
        if (err) {
          res.clearCookie("refreshToken");
          res.sendStatus(403);
        } else {
          req.user = decoded.user;
          next();
        }
      });
    } else {
      res.clearCookie("refreshToken");
      res.status(403).send("Unauthorized");
    }
  };
}
module.exports = JwtController;
