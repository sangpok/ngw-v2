import Mongoose from 'mongoose';

const connectDB = (url) => {
  console.log('DB Connecting...');
  return Mongoose.connect(url);
};

export { connectDB };
