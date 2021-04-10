import 'dotenv/config';

import registerRoutes from './routes';
import registerSockets from './socket';

const server = (app, io) => {
  registerRoutes(app);
  registerSockets(app, io);

  const PORT = process.env.PORT || 3000;

  console.log(`Tu servidor ha iniciado en el puerto ${PORT}`);
  app.listen(PORT);
};

export default server;
