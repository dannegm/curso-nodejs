const buildSockets = (app, io) => {
  console.log(io)
  io.on('connection', (socket) => {
    console.log('Se han conectado')
    socket.emit('connected', { msg: 'Has logrado conectarte al servidor por medio de sockets' });
  });

};

export default buildSockets
