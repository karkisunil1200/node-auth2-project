const server = require('./api/server');

const port = 5000;

server.listen(port, () => console.log(`Running server on port:${port}`));
