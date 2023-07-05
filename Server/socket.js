import { Server } from 'socket.io';
import { socketEventInit } from './socketEvents.js';

let socketInstance = null;

const createSocketWithServer = (serverInstance) => {
  socketInstance = new Server(serverInstance, {
    cors: {
      origin: '*',
    },
  });

  socketEventInit(socketInstance);
};

export { createSocketWithServer };
