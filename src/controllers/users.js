import UserModel from '../models/users';

const UserModel = require('../models/users');

const listAllUsers = (req, res) => {
  res.json({
    data: {
      message: 'Hola a todos los usuarios',
    },
  });
};

const createUser = async (req, res) => {
  const defaultUser = {
    name: 'default',
    email: 'default@mail.com',
    password: 'deafult',
  };

  const userData = {
    ...defaultUser,
    ...req.body,
  };

  const model = new UserModel(userData);

  try {
    await model.save();
    res.status(201).json({
      data: model,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      status: 500,
      error: err,
    });
  }
};

module.exports = {
  listAllUsers,
  createUser
}
