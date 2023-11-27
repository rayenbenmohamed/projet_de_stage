
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router({ products: DATA }); // Utilise directement tes données
const middlewares = jsonServer.defaults();

const PORT = 3001;

server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
  console.log(`API Server is running on port ${PORT}`);
});
  