import { Socket, io } from 'socket.io-client';

const EVENT_TYPE = {
  CONNECT: 'connect',
  DISCONNET: 'disconnet',
  USER_ENTER: 'user_enter',
  USER_LEAVE: 'user_leave',
  MESSAGE: 'message',
  MESSAGE_UPDATE: 'message_update',
  MESSAGE_DELETE: 'message_delete',
  HISTORY_LOAD: 'history_load',
  PASSWORD_COMPARE: 'password_compare',
};

/** @type {Socket} */
const socket = io(import.meta.env.VITE_WEBSOCKET_URL);

export { EVENT_TYPE, socket };
