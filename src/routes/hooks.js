import { hookController } from '../controllers/hooks';

export const hooksRoutes = (app) => {
  app.post('/webhook', hookController);
  app.post('/webhook/*', hookController);
};
