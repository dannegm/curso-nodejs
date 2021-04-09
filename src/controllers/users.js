import UserModel from '../models/users';

export const listAllUsers = (req, res) => {
  res.json({
    data: {
      message: 'Hola a todos los usuarios',
    },
  });
};

export const createUser = async (req, res) => {
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
