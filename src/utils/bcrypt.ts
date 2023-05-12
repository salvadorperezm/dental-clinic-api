import * as bcrypt from 'bcrypt';

export const hashPassword = (plaintextPassword: string): string => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(plaintextPassword, salt);
  return hash;
};

export const comparePasswords = (
  plaintextPassword: string,
  hashedPassword: string,
): boolean => {
  return bcrypt.compareSync(plaintextPassword, hashedPassword);
};
