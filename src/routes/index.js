import { usersRoutes } from './users'
import { hooksRoutes} from './hooks'

const buildRoutes = (app) => {
  usersRoutes(app);
  hooksRoutes(app);
}

export default buildRoutes;
