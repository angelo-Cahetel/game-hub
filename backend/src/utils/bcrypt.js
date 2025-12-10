import bcrypt from "bcryptjs/dist/bcrypt.js";

export const hash = async (password, rounds = 10) => {
  return await bcrypt.hash(password, rounds);
};

export const compare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export default {
  hash,
  compare,
};
