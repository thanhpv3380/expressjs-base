const { DataTypes } = require('sequelize');
const sequelize = require('.');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'phone_number',
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    active: {
      type: DataTypes.TINYINT(1),
      defaultValue: 1,
    },
    isEmailVerified: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
      field: 'is_email_verified',
    },
    loginMethod: {
      type: DataTypes.STRING(50),
      defaultValue: 'NORMAL',
      field: 'login_method',
    },
  },
  {
    timestamps: true,
    underscored: true,
    tableName: 'users',
  },
);

module.exports = User;
