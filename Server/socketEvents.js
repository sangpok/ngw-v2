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
const onSocketMessage = async (socket, data) => {
  console.log(`${socket.id}가 보냄: `, data);

  try {
    const createdMessage = await createComment(data);

    socketInstance.emit(EVENT_TYPE.MESSAGE, Object.assign({}, data, createdMessage.toJSON()));
  } catch (error) {
    console.log(error);
  }
};

/**
 * @param {Socket} socket
 * @param {*} data
 */
const onSocketMessageUpdate = async (socket, { messageId, emojiId }) => {
  console.log(`${socket.id}가 보냄: `, messageId, emojiId);

  try {
    const updatedMessage = await updateComment(messageId, emojiId);

    socketInstance.emit(
      EVENT_TYPE.MESSAGE_UPDATE,
      Object.assign({}, { socketId: socket.id }, updatedMessage.toJSON())
    );
    // return comment
  } catch (error) {
    console.log(error);
  }
};

/**
 * @param {Socket} socket
 * @param {*} messageId
 */
const onSocketMessageDelete = async (socket, messageId) => {
  console.log(`${socket.id}의 메시지 삭제 요청: `, messageId);

  try {
    const messageHistory = await deleteComment(messageId);

    socketInstance.emit(EVENT_TYPE.MESSAGE_DELETE, messageHistory.toJSON());
  } catch (error) {
    console.log(error);
  }
};

/**
 * @param {Socket} socket
 * @param {*} data
 */
const onSocketHistoryLoad = async (socket, { currentPage, newCount }) => {
  console.log(`${socket.id}의 히스토리 로드 요청: `, currentPage);

  try {
    const messageHistory = await getCommentsByPage(currentPage, newCount);

    socket.emit(EVENT_TYPE.HISTORY_LOAD, messageHistory.comments);
  } catch (error) {
    console.log(error);
  }
};

/**
 * @param {Socket} socket
 * @param {*} data
 */
const onSocketPasswordCompare = async (socket, data) => {
  console.log(`${socket.id}의 비밀번호 비교 요청: `, data);

  try {
    const compareResult = await compareCommentPassword(data.messageId, data.inputPassword);
    socket.emit(EVENT_TYPE.PASSWORD_COMPARE, compareResult);
  } catch (error) {
    console.log(error);
  }
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
