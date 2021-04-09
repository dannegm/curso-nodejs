import UserModel from '../models/users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const listAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}, '-password');

    res.status(200).json({
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Something went wrong',
      status: 500,
      error: err,
    });
  }
};

export const getUser = async (req, res) => {
  const { _id } = req.user;

  if (!_id) {
    res.status(400).json({
      message: 'Invaid Id',
      status: 400,
      error: err,
    });
  }

  try {
    const [user] = await UserModel.find({ _id }, '-password');

    if (!user) {
      res.status(404).json({
        message: 'User not found',
        status: 404,
      });
    }

    res.status(200).json({
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Something went wrong',
      status: 500,
      error: err,
    });
  }
};

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 12);
  } catch (error) {
    throw error;
  }
};

export const createUser = async (req, res) => {
  const defaultUser = {
    name: 'default',
    email: 'default@mail.com',
    password: 'deafult',
  };

  try {
    const userData = {
      ...defaultUser,
      ...req.body,
      password: await hashPassword(req.body.password),
    };

    const model = new UserModel(userData);

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

const comparePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    throw err;
  }
};

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.APP_SECRET);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: 'Invalid login data',
      status: 400,
    });
  }

  try {
    const [user] = await UserModel.find({ email });
    if (!user) {
      res.status(404).json({
        message: 'User not found',
        status: 404,
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      res.status(404).json({
        message: 'Invalida password',
        status: 404,
      });
    }

    const token = generateToken({
      _id: user._id,
    });

    res.status(200).json({
      token,
      message: 'Login success',
      status: 200,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      status: 500,
      error: err,
    });
  }
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.APP_SECRET);
};

export const authMiddleware = async (req, res, next) => {
  try {
    const auth = req.get('Authorization');
    if (!auth) {
      res.status(401).json({
        message: 'No tienes una sesión',
        status: 401,
      });
    }

    const [, token] = auth.split(' ');

    const payload = verifyToken(token);

    const [user] = await UserModel.find({ _id: payload._id }, '-password');
    if (!user) {
      res.status(404).json({
        message: 'User not found',
        status: 404,
      });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      status: 500,
      error: err,
    });
  }
};
