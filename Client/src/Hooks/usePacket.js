import { EVENT_TYPE, socket } from '@Utils/socket';
import { useEffect } from 'react';

export const usePacket = () => {
  useEffect(() => {
    socket.on(EVENT_TYPE.MESSAGE);
  }, []);

  const sendPacket = (packetType, data, callback) => {
    const hasEvent = socket.hasListeners(packetType);

    if (!hasEvent) {
    }
  };

  return { sendPacket };
};
