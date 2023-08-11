const User = require('../models/user');

const findUser = async (condition, includePassword) => {
  let user = null;

  if (typeof condition === 'number') {
    user = await User.findByPk(condition);
  } else if (typeof condition === 'object' && condition != null) {
    user = await User.findOne({ where: condition });
  }

  if (user) {
    user = user.get();
    if (!includePassword) delete user.password;
  }

  return user;
};

const createUser = async (data) => {
  const user = await User.create(data);
  return user.get();
};

const updateUser = async (userId, data) => {
  const user = await User.findByIdAndUpdate(userId, data, { new: true });
  return user.get();
};

const deleteUser = async (userId) => {
  await User.findByIdAndDelete(userId);
};

module.exports = { createUser, findUser, updateUser, deleteUser };
