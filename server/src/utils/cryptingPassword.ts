import bcrypt from "bcrypt";

export const encryptPassword: (password: string) => Promise<string> = async (
  password: string
) => {
  const saltRounds = Math.round(Math.random() * (10 - 2) + 2);
  const result = await bcrypt.genSalt(saltRounds).then((salt) => {
    return bcrypt.hash(password, salt);
  });
  return saltRounds + "-" + result;
};

export const decryptPassword: (
  password: string,
  hash: string
) => Promise<boolean> = (password: string, hash: string) => {
  const [saltRounds, pass] = hash.split("-");
  const result = bcrypt.compare(password, pass).then((res) => {
    return res; // return true
  });
  return result;
};
