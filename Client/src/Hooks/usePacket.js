import { EVENT_TYPE, socket } from '@Utils/socket';

/**
 * @param {EVENT_TYPE} eventName
 * @returns {boolean}
 */
const hasEvent = (eventName) => socket.hasListeners(eventName);

export const usePacket = () => {
  /**
   * @param {EVENT_TYPE} packetType
   * @param {Function} callback
   */
  const alwaysOn = (packetType, callback) => {
    if (!hasEvent(packetType)) {
      socket.on(packetType, callback);
    }
  };

  /**
   * @param {EVENT_TYPE} packetType
   * @param {*} data
   * @param {Function} callback
   */
  const onceOn = (packetType, data, callback) => {
    if (!hasEvent(packetType)) {
      socket.once(packetType, callback);
    }

    socket.emit(packetType, data);
  };

  /**
   * @param {EVENT_TYPE} packetType
   * @param {*} data
   */
  const sendPacket = (packetType, data) => {
    socket.emit(packetType, data);
  };

  return { alwaysOn, onceOn, sendPacket };
};
