import Express from 'express';

const appInstance = Express();

const createServer = (serverPort) => {
  return appInstance.listen(serverPort, () => {
    console.log(`Listening on ${serverPort}...`);
  });
};

export { createServer };
