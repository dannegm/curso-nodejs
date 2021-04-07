import http from 'http';
import { URL } from 'url';

import { nanoid } from 'nanoid';

const HOSTNAME = 'localhost';
const PORT = 3000;

const userCollection = {};

const notFound = (req, res) => {
  res.status(404).json({
    message: 'User Not Found',
  });
};

const userController = {
  GET(req, res) {
    const uid = req.query.get('uid');

    if (!uid) {
      res.status(200).json(userCollection);
      return;
    }

    if (!userCollection[uid]) {
      notFound(req, res);
      return;
    }

    res.status(200).json(userCollection[uid]);
  },

  POST(req, res) {
    const uid = nanoid();

    userCollection[uid] = {
      ...req.body,
      uid,
      created_at: new Date().toISOString(),
    };

    res.status(201).json(userCollection[uid]);
  },

  PUT(req, res) {
    const uid = req.query.get('uid');

    if (!userCollection[uid]) {
      notFound(req, res);
      return;
    }

    const { created_at } = userCollection[uid];

    userCollection[uid] = {
      ...req.body,
      uid,
      created_at,
      updated_at: new Date().toISOString(),
    };

    res.status(200).json(userCollection[uid]);
  },

  PATCH(req, res) {
    const uid = req.query.get('uid');

    if (!userCollection[uid]) {
      notFound(req, res);
      return;
    }

    const protectedKeys = ['uid', 'created_at', 'updated_at'];

    const properties = Object.keys(req.body);

    if (properties.some((key) => protectedKeys.includes(key))) {
      res.status(400).json({
        protectedKeys,
        message: `You can't modify protected keys`,
      });
      return;
    }

    properties.forEach((key) => {
      if (!userCollection[uid][key]) {
        res.status(400).json({
          message: `'${key}' is not a valid User property`,
        });
        return;
      }

      userCollection[uid][key] = req.body[key];
    });

    userCollection[uid].updated_at = new Date().toISOString();

    res.status(200).json(userCollection[uid]);
  },

  // Eliminar
  DELETE(req, res) {
    const uid = req.query.get('uid');

    if (!userCollection[uid]) {
      notFound(req, res);
      return;
    }

    delete userCollection[uid];

    res.status(204).end();
  },
};

const routes = {
  '/users': (req, res) => {
    userController[req.method](req, res);
  },
};

const handleRequest = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  res.status = function (status) {
    this.statusCode = status;
    return this;
  };

  const requestUrl = new URL(req.url, `http://${HOSTNAME}:${PORT}`);

  if (!routes[requestUrl.pathname]) {
    notFound(req, res);
    return;
  }

  let data = [];
  req.on('data', (chunk) => {
    data.push(chunk);
  });

  req.on('end', () => {
    if (data.length) req.body = JSON.parse(data);

    req.query = requestUrl.searchParams;
    res.json = (data) => res.end(JSON.stringify(data));

    routes[requestUrl.pathname](req, res);
  });
};

const server = http.createServer(handleRequest);

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
