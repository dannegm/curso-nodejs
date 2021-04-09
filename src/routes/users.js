import { listAllUsers, getUser, createUser, loginUser, authMiddleware } from '../controllers/users';

export const usersRoutes = (app) => {
  app.get('/users', listAllUsers);
  app.post('/users', createUser);

  app.get('/user', authMiddleware, getUser);


  app.get('/supersecret', authMiddleware, (req, res) => {
    res.status(200).json({ msg: 'hola' })
  });

  app.post('/login', loginUser);
};
