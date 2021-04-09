import { Schema, model } from 'mongoose';

const collection = 'users';
const scheme = {
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
};

const UserModel = model(collection, new Schema(scheme));

export default UserModel;
