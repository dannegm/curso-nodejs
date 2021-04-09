import { listAllUsers, createUser } from '../controllers/users'

export const usersRoutes = (app) => {
  app.get('/users', listAllUsers)
  app.post('/users', createUser)
};
