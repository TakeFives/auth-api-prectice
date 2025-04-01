import bycrypt from "bcryptjs";

// cryptography
export const hashPassword = async (password) => {
  // NOTE: how much time is needed to calculate a single hash
  // BCrypt hash.
  // COST FACTOR!
  // const saltRounds = 10;

  const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

  // returns a promise (async function)
  return bycrypt.hash(password, saltRounds);
};

export const verifyPassword = async (password, hashPassword) => {
  return bycrypt.compare(password, hashPassword);
};
