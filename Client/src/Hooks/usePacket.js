import { EVENT_TYPE, socket } from '@Utils/socket';
import { useEffect } from 'react';

const hasEvent = (eventName) => socket.hasListeners(eventName);

export const usePacket = () => {
  const alwaysOn = (packetType, callback) => {
    if (!hasEvent(packetType)) {
      socket.on(packetType, callback);
    }
  };

  const onceOn = (packetType, data, callback) => {
    if (!hasEvent(packetType)) {
      socket.once(packetType, callback);
    }

    socket.emit(packetType, data);
  };

  const sendPacket = (packetType, data) => {
    socket.emit(packetType, data);
  };

  return { alwaysOn, onceOn, sendPacket };
};
