import { hookController, hookHistory, hookSingle } from '../controllers/hooks';

export const hooksRoutes = (app) => {
  app.post('/hooks', hookController);
  app.post('/hooks/*', hookController);

  app.get('/hooks', hookHistory);
  app.get('/hooks/:hookID', hookSingle);
};
