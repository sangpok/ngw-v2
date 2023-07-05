const Express = require('express');

const app = new Express();

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
