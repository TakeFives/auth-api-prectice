const validateRegister = (req, res, next) => {
  // NOTE: NEVER Trust the client. Assume NOTHING!
  const { username, password, email } = req.body;

  // NOTE: Lines you may use to check if the req.body is complete.
  // if not, then we should respond to the client with 400.
  // !username
  // !password
  // !email
  if (!username || !password || !email) {
    return res.status(400).json({ message: "bad request" });
  }

  // TODO:
  // check more complex validation logic here like:

  // - Check password length
  // - Validate email format using a regular expression
  // - Check if username contains invalid characters

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    return res
      .status(400)
      .json({
        message: "Username can only contain letters, numbers, and underscores",
      });
  }

  // TODO:
  // Req.body sanitation
  // https://article.arunangshudas.com/how-do-you-ensure-request-validation-and-data-sanitization-in-a-production-express-js-application-90ab32fdab94
  // NOTE: explore express-validator to validate incoming data
  req.body.username = username.trim();
  req.body.email = email.trim();
  req.body.password = password.trim();

  // if every check passes we ensure that next middleware or route gets called!
  next();
};

const validateLogin = (req, res, next) => {
  const { username, password } = req.body;

  console.log("login req.body", req.body);
  //TODO: Complete the validateLogin

  // NOTE: Lines you may use to check if the req.body is complete.
  // if not, then we should respond to the client with 400.
  // !username
  // !password
  // return res
  //   .status(400)
  //   .json({ message: "Please provide username and password" });

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username and password" });
  }

  // checking for more complex validation logic here like
  // - checking username format
  // - password format
  // TODO: We can create some util functions that check for common errors!

  // if every check passes we ensure that next middleware or route gets called!
  next();
};

export { validateRegister, validateLogin };
