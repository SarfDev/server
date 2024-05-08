const {createServer} = require("node:http")
const next = require("next")
const {Server} = require("socket.io")

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  // Creazione del io per il socket
  const io = new Server(httpServer, {
    cors: {
      origin: "*", // Questo è solo per sviluppo, usa una lista di origin valide in produzione
      methods: ["GET", "POST"],
    },
  });

  //quando l'utente accede al server accade questo
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.on("chat message", (msg) => {
      console.log("Message received:", msg);
    })
  })

  //creazione del server
  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});