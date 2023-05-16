import bcrypt from 'bcrypt';

export const hashPassword = async (pswd, saltRounds) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const password = await bcrypt.hash(pswd, salt);
  return password;
};
