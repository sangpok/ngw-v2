import dotenv from 'dotenv';

import { createServer } from './App.js';
import { createSocketWithServer } from './socket.js';

import { connectDB } from './db/connect.js';

dotenv.config();

const serverInit = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);

    console.log('DB Connected!');

    createSocketWithServer(createServer(process.env.SERVER_PORT));
  } catch (error) {
    console.log(error);
  }
};

serverInit();
