const User = require('../models/user');

const createUser = async (data) => {
  const user = await User.create(data);
  return user;
};

const findUser = async (condition, includePassword) => {
  // const options = {
  //   attributes: { exclude: !includePassword ? ['password'] : [] },
  // };
  // if (!includePassword) {

  // }

  if (typeof condition === 'number') {
    const user = await User.findByPk(condition);
    return user;
  }

  if (typeof condition === 'object' && condition == null) {
    const user = await User.findOne({ where: condition });
    return user;
  }

  return null;
};

const updateUser = async (userId, data) => {
  const user = await User.findByIdAndUpdate(userId, data, { new: true });
  return user;
};

const deleteUser = async (userId) => {
  await User.findByIdAndDelete(userId);
};

module.exports = { createUser, findUser, updateUser, deleteUser };
