const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const { JWT_SECRET_KEY } = require('../configs');

const userDao = require('../daos/user');

const generateAccessToken = async (user) => {
  const accessToken = await jwt.sign(
    {
      user: {
        id: user.id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    },
    JWT_SECRET_KEY,
    {},
  );
  return accessToken;
};

const login = async ({ username, password }) => {
  const user = await userDao.findUser({ username }, true);
  if (!user) throw new CustomError(errorCodes.USER_NOT_FOUND);

  const isCorrectPassword = await compareBcrypt(password, user.password);
  if (!isCorrectPassword) throw new CustomError(errorCodes.WRONG_PASSWORD);

  const accessToken = await generateAccessToken(user);

  return { user, accessToken };
};

const verifyAccessToken = async (accessToken) => {
  const data = await jwt.verify(accessToken, JWT_SECRET_KEY);

  const { user: userInToken } = data;
  if (!userInToken || !userInToken.id)
    throw new CustomError(errorCodes.UNAUTHORIZED);

  const user = await userDao.findUser(user.id);
  if (!user) throw new CustomError(errorCodes.USER_NOT_FOUND);

  return user;
};

const generateSalt = (rounds) => {
  return bcrypt.genSaltSync(rounds);
};

const hashBcrypt = (text, salt) => {
  const hashedBcrypt = new Promise((resolve, reject) => {
    bcrypt.hash(text, salt, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
  return hashedBcrypt;
};

const compareBcrypt = async (data, hashed) => {
  const isCorrect = await new Promise((resolve, reject) => {
    bcrypt.compare(data, hashed, (err, same) => {
      if (err) reject(err);
      resolve(same);
    });
  });
  return isCorrect;
};

const register = async ({
  username,
  password,
  email,
  phoneNumber,
  ...data
}) => {
  const userExist = await Promise.all([
    await userDao.findUser({ username }),
    await userDao.findUser({ email }),
    await userDao.findUser({ phoneNumber }),
  ]);

  if (userExist[0]) throw new CustomError(errorCodes.USER_NAME_EXIST);
  if (userExist[1]) throw new CustomError(errorCodes.EMAIL_EXIST);
  if (userExist[2]) throw new CustomError(errorCodes.PHONE_NUMBER_EXIST);

  const salt = generateSalt(10);
  password = await hashBcrypt(password, salt);

  let user = await userDao.createUser({
    username,
    password,
    email,
    phoneNumber,
    ...data,
  });

  user = await userDao.findUser(user.id);
  const accessToken = await generateAccessToken(user);

  return { user, accessToken };
};

module.exports = {
  verifyAccessToken,
  login,
  register,
};
