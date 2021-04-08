import http from 'http';
import { URL } from 'url';

// Importamos librería para generar ID's
// Más información en https://zelark.github.io/nano-id-cc/
import { nanoid } from 'nanoid';

const HOSTNAME = 'localhost';
const PORT = 3000;

// Función auxiliar que nos permite regresar un error 404 cada que lo necesitemos
const notFound = (req, res) => {
  res.status(404).json({
    message: 'User Not Found',
  });
};

// Colección de usuarios en forma de diccionario
const userCollection = {
};

// Controlador que utilizamos para manejar los diferentes métodos de nuestro API
const userController = {
  // Obtener usuario(s)
  GET(req, res) {
    // Tratamos de obtener el `uid` de los parámteros de la petición
    const uid = req.query.get('uid');

    // Si no es encontrado, regresamos una lista de todos los usuarios registrados
    if (!uid) {
      res.status(200).json(userCollection);
      return;
    }

    // Buscamos el usuario en nuestro diccionario
    // Si no es encontrado regresamos 404
    if (!userCollection[uid]) {
      notFound(req, res);
      return;
    }

    // Finalmente regresamos el usuario que encontramos por medio del `uid`
    res.status(200).json(userCollection[uid]);
  },

  // Crear usuario
  POST(req, res) {
    // Creamos un `uid`
    const uid = nanoid();

    // Creamos una referencia en nuestro diccionario utilizando el `uid` como llave
    userCollection[uid] = {
      // Usando 'constructuring, creamos un nuevo objeto a partir de los datos
      // que recibimos por medio de `req.body`.
      // Para más información:
      // Operaciones de extensión
      // -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
      ...req.body,

      // Le asignamos el `uid`
      uid,

      // Le asignamos una fecha de creación
      created_at: new Date().toISOString(),
    };

    // Regresamos el nuevo usuario creado
    res.status(201).json(userCollection[uid]);
  },

  // Actualizar usuario
  PUT(req, res) {
    // Tratamos de obtener el `uid` de los parámteros de la petición
    const uid = req.query.get('uid');

    if (!userCollection[uid]) {
      notFound(req, res);
      return;
    }

    // Usando destructuring, obtenemos la fecha de creación de nuestro usuario para
    // utilizarla más adelante
    const { created_at } = userCollection[uid];

    userCollection[uid] = {
      // Utilizamos constructuring para reemplazar el objeto pero mantener
      // propiedades que no queremos cambiar
      ...req.body,

      // conservamos `uid`
      uid,
      // conservamos `created_at`
      created_at,

      // Añadimos una nueva propiedad que nos permite saber cuándo se modificó el usuario
      updated_at: new Date().toISOString(),
    };

    // Regresamos la nueva estructura de nuestro usuario
    res.status(200).json(userCollection[uid]);
  },

  // Actualizamos propiedades específicas de nuestro usuario
  PATCH(req, res) {
    const uid = req.query.get('uid');

    if (!userCollection[uid]) {
      notFound(req, res);
      return;
    }

    // Creamos una lista de las propiedades que queremos proteger para no ser modifcadas
    const protectedKeys = ['uid', 'created_at', 'updated_at'];

    // Obtenemos una lista de las propiedades que vamos a modificar
    // Para más información:
    // Obtener un arreglo de las llaves de un objeto
    // -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values
    const properties = Object.keys(req.body);

    // Comprobamos si alguna de las propiedades está protegida
    // Para más información:
    // Evaluar si uno o más elementos del arreglo cumplen una condición
    // -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    // Evaluar si un arreglo contiene un valor en específico
    // -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
    if (properties.some((key) => protectedKeys.includes(key))) {
      // En caso de tratar de modificar propiedades protegidas notifiacamos a nuestro cliente
      // con un error y una lista de las propiedades que no podemos modificar
      res.status(400).json({
        protectedKeys,
        message: `You can't modify protected keys`,
      });
      return;
    }

    // Recorremos todas las propiedades que queremos modificar
    properties.forEach((key) => {
      // Comprobamos si la propiedad a modificar existe
      if (!userCollection[uid][key]) {
        // En caso de no existir, notificamos a nuestro cliente con un error
        res.status(400).json({
          message: `'${key}' is not a valid User property`,
        });
        return;
      }

      // Asignamos el nuevo valor a nuestra propiedad desde `req.body`
      userCollection[uid][key] = req.body[key];
    });

    // Actualizamos la fecha en que el usuario se modificó
    userCollection[uid].updated_at = new Date().toISOString();

    // Regresamos los cambios hechos al usuario
    res.status(200).json(userCollection[uid]);
  },

  DELETE(req, res) {
    const uid = req.query.get('uid');

    if (!userCollection[uid]) {
      notFound(req, res);
      return;
    }

    // Eliminamos una llave de nuestro diccionario
    // Para más información
    // Eliminar una propiedad de un objeto
    // -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
    delete userCollection[uid];

    // No tenemos contenido qué mostrar por lo tanto regresamos un 204 Not Content
    res.status(204).end();
  },
};


// Rutas / Endpoints
const routes = {
  // Creamos un endpoint con el cuál vamos a estar escuchando las peticiones
  '/users': (req, res) => {
    // Ejecutamos los métodos de nuestro diccionario controlador utilizando `req.method`
    // y ejecutándolo como una función
    userController[req.method](req, res);
  },
};

// Creamos un administrador de peticiones

const handleRequest = (req, res) => {
  // Estabecemos que todas nuestras peiticiones soportan JSON
  res.setHeader('Content-Type', 'application/json');

  // Extendemos nuestro `response` con la funcionalidad de establecer su status code
  // y de encadenar otras funciones referentes a res
  res.status = function (status) {
    this.statusCode = status;
    return this;
  };

  // Descomponemos el URL para obtener ciertos datos
  const requestUrl = new URL(req.url, `http://${HOSTNAME}:${PORT}`);

  // Verificamos si el endpoint recivido existe
  if (!routes[requestUrl.pathname]) {
    // En caso de no existir, regresamos un 404
    notFound(req, res);
    return;
  }

  // Leemos los datos proporcionados en el body de nuestro request
  let data = [];
  req.on('data', (chunk) => {
    data.push(chunk);
  });

  // Una vez se terminen de leer los datos
  req.on('end', () => {
    // Si obtenemos datos mandados desde el cliente, los guardamos como un objeto JSON
    // dentro de `req.body` para tener los datos disponibles más adelante
    if (data.length) req.body = JSON.parse(data);

    // Creamos la llave `query` dentro de `req` para tenerla disponible más adelante con
    // los parámteros que son enviados desde el cliente
    req.query = requestUrl.searchParams;

    // Creamos una función dentro de `res` que nos permite regresar una respuesta en formato JSON
    res.json = (data) => res.end(JSON.stringify(data));

    // Ejecutamos el endpoint recibido con las modificaciones que previamente le hicimos a `res`
    routes[requestUrl.pathname](req, res);
  });
};

// Se crea el servidor utilizando nuestro administrador
const server = http.createServer(handleRequest);

// Ponemos el servidor en escucha
server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
