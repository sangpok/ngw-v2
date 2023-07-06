import { Socket, Server } from 'socket.io';

import {
  getAllComments,
  getCommentsByPage,
  createComment,
  getComment,
  updateComment,
  deleteComment,
  compareCommentPassword,
} from './controllers/comments.js';

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

let socketInstance = null;

/**
 * @param {Socket} socket
 * @param {*} data
 */
const onSocketMessage = (socket, data) => {
  console.log(`${socket.id}가 보냄: `, data);

  // socket.broadcast.emit(EVENT_TYPE.MESSAGE, data);
  socketInstance.emit(EVENT_TYPE.MESSAGE, data);
};

/**
 * @param {Socket} socket
 * @param {*} data
 */
const onSocketMessageUpdate = (socket, data) => {
  console.log(`${socket.id}가 보냄: `, data);

  socket.broadcast.emit(EVENT_TYPE.MESSAGE_UPDATE, data);
};

/**
 * @param {Socket} socket
 * @param {*} data
 */
const onSocketMessageDelete = async (socket, data) => {
  console.log(`${socket.id}가 보냄: `, data);

  // try {
  //   const compareResult = await compareCommentPassword(data.messageID, data.inputPassword);
  //   console.log(compareResult);
  // } catch (error) {
  //   console.log(error);
  // }
  socket.broadcast.emit(EVENT_TYPE.MESSAGE_DELETE, data);
};

/**
 * @param {Socket} socket
 * @param {*} data
 */
const onSocketHistoryLoad = async (socket, { currentPage }) => {
  console.log(`${socket.id}가 보냄: `, currentPage);

  try {
    const messageHistory = await getCommentsByPage(currentPage);

    console.log(messageHistory);

    socket.emit(EVENT_TYPE.HISTORY_LOAD, messageHistory);
  } catch (error) {
    console.log(error);
  }

  // socket.broadcast.emit(EVENT_TYPE.HISTORY_LOAD, data);
};

/**
 * @param {Socket} socket
 * @param {*} data
 */
const onSocketPasswordCompare = async (socket, data) => {
  console.log(`${socket.id}가 보냄: `, data);

  try {
    const compareResult = await compareCommentPassword(data.messageId, data.inputPassword);
    console.log(compareResult);
    socket.emit(EVENT_TYPE.PASSWORD_COMPARE, compareResult);
  } catch (error) {
    console.log(error);
  }

  // socket.broadcast.emit(EVENT_TYPE.PASSWORD_COMPARE, data);
};

/** @param {Socket} socket */
const onSocketDisconnect = (socket) => {
  console.log('User Leaved: ', socket.id);

  socket.broadcast.emit(EVENT_TYPE.USER_LEAVE, socket.id);
};

/** @param {Socket} socket */
const onConnection = (socket) => {
  console.log('User Entered: ', socket.id);

  socket.broadcast.emit(EVENT_TYPE.USER_ENTER, socket.id);

  socket.on(EVENT_TYPE.MESSAGE, (data) => onSocketMessage(socket, data));
  socket.on(EVENT_TYPE.MESSAGE_UPDATE, (data) => onSocketMessageUpdate(socket, data));
  socket.on(EVENT_TYPE.MESSAGE_DELETE, (data) => onSocketMessageDelete(socket, data));
  socket.on(EVENT_TYPE.HISTORY_LOAD, (data) => onSocketHistoryLoad(socket, data));
  socket.on(EVENT_TYPE.PASSWORD_COMPARE, (data) => onSocketPasswordCompare(socket, data));

  socket.on(EVENT_TYPE.DISCONNET, () => onSocketDisconnect(socket));
};

/** @param {Server} socketInstance */
const socketEventInit = (tmpSocketInstance) => {
  socketInstance = tmpSocketInstance;
  socketInstance.on(EVENT_TYPE.CONNECT, onConnection);
};

export { socketEventInit };
