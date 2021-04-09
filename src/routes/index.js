import { usersRoutes } from './users'

const buildRoutes = (app) => {
  usersRoutes(app);
}

export default buildRoutes;
