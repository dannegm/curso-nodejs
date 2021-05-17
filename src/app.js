import 'dotenv/config';

import registerRoutes from './routes';

const server = (app) => {
  registerRoutes(app);

  const PORT = process.env.PORT || 3000;

  console.log(`Tu servidor ha iniciado en el puerto ${PORT}`);
  app.listen(PORT);
};

export default server;
