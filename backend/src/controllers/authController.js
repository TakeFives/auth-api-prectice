import { User } from "../models/userModels.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { createTokens, convertExpiryToMilliseconds } from "../utils/jwt.js";

const register = async (req, res) => {
  // NOTE: we know we have validated the body request
  // in our middleware! So this endpoint is reserved for
  // 'registering a user' logic.
  try {
    const hashedPassword = await hashPassword(req.body.password);

    User.create({
      username: req.body.username,
      // always store the hashedPassword!
      password: hashedPassword,
      email: req.body.email,
    });
  } catch (error) {
    console.error(error);
    // client sent bad request and not expected in the server!
    return res.status(400).json({
      message: "User name already exits",
    });
  }

  res.status(201).json({
    message: "user has been registered!",
  });

  //NOTE: We could have sent a token now but SEPARATION OF CONCERNS. This
  //endpoint is only for registering users.
  //Client should now send a request to `auth/login` to get a valid token
};

const login = async (req, res) => {
  try {
    const { username, password: potentialUserPassword } = req.body;

    console.log("Login request received with body: ", username, potentialUserPassword);
    // NOTE: We are mocking up a database with an arry in models. Later
    // when MongoDB is setup, this should be an async function
    // await User.findOne();
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        message: "invalid credentials",
      });
    }

    const passwordMatched = await verifyPassword(
      potentialUserPassword,
      user.password,
    );

    if (!passwordMatched) {
      return res.status(401).json({
        message: "invalid credentials",
      });
    }

    // NOTE: we got an user and a password matched!

    const tokens = createTokens(user);

    // making sure the refresh token is stored in our database!
    user.refreshToken = tokens.refreshToken;

    setTokenCookies(res, tokens);

    res.status(200).json({
      token: tokens.accessToken,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error(error);
    // Server error 500
    res.status(500).json({
      message: "login failed",
    });
  }
};

const setTokenCookies = (res, { accessToken, refreshToken }) => {
  const accessTokenExpiresMS = convertExpiryToMilliseconds(
    process.env.JWT_EXPIRES_IN,
  );
  const refreshTokenRefreshExpiresMS = convertExpiryToMilliseconds(
    process.env.JWT_REFRESH_EXPIRES_IN,
  );

  // NOTE: Get confortable sending cookies.
  // Altough we can't have sameSite right now
  // Make some notes what are these headers and
  // how you could make use of them.
  res.cookie("accessToken", accessToken, {
    // NOTE: This cookie CAN'T be accessed with javascript on the client
    // NOTE:  when making a request, the client will automatically send any cookies
    // we attach here in the response header.
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: accessTokenExpiresMS,
  });

  // NOTE: This should not work for now, since the client and the server
  // are not same origin.
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/auth/refresh", // only to be sent to refresh endpoint
    maxAge: refreshTokenRefreshExpiresMS,
  });
};

const refresh = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const tokens = createTokens(user);

    user.refreshToken = tokens.refreshToken;
    await user.save();

    setTokenCookies(res, tokens);

    res.status(200).json({
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: "Failed to refresh token" });
  }
};

export { login, register, refresh };
