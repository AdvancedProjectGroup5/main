import jwt from "jsonwebtoken";
import { isBlacklisted } from "../helper/blacklist.js";
import { ApiError } from "../helper/apiError.js";

const { verify } = jwt;
const authorizationRequired = "Authorization required.";
const invalidCredentials = "Invalid credentials.";

const auth = (req, res, next) => {
  let decodedUser = null;
  if (!req.headers.authorization || !req.cookies["refreshToken"])
    return next(new ApiError(authorizationRequired, 401));
  try {
    const authHeader = req.headers.authorization;
    const access_token = authHeader.split(" ")[1];
    if (isBlacklisted(access_token))
      return next(new ApiError(invalidCredentials, 403));
    decodedUser = verify(access_token, process.env.JWT_SECRET_KEY);
    req.user = decodedUser;
  } catch (err) {
    try {
      const refresh_token = req.cookies["refreshToken"];
      decodedUser = verify(refresh_token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      next(new ApiError(invalidCredentials, 403));
    }
  } finally {
    res.exposeHeaders();
    res.authorizationHeader(decodedUser.email);
    next();
  }
};

export { auth };
