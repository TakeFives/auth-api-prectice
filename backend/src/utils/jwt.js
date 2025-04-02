import jwt from "jsonwebtoken";

export const createTokens = (user) => {

  const payload = {
    id: user.id,
    username: user.username,
  };

  // NOTE: sync sign since we are not passing a callback. Not passing a callback
  // indicates to jwt.sign we want to to sign synchrounously!
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // to reload a session when accessToken expires
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });

  return { accessToken, refreshToken };
};

export const verifyJWT = (token, JWT_SECRET, opts) => {
  return jwt.verify(token, JWT_SECRET, opts);
};

export const convertExpiryToMilliseconds = (expiry) => {
  const timeUnitMap = {
    s: 1000, // seconds to milliseconds
    m: 60 * 1000, // minutes to milliseconds
    h: 60 * 60 * 1000, // hours to milliseconds
    d: 24 * 60 * 60 * 1000, // days to milliseconds
    w: 7 * 24 * 60 * 60 * 1000, // weeks to milliseconds
  };

  const match = expiry.match(/^(\d+)([smhdw])$/);
  if (!match) {
    throw new Error(`Invalid expiry format: ${expiry}`);
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  return value * timeUnitMap[unit];
};
