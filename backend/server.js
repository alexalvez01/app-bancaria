import express from "express";
import cors from "cors";
import http from "http";
import { setupWebSocket } from "./websocket/gateway.js";
import transactionsRouter from "./routes/transactions.js";

const app = express();
app.use(cors());
app.use(express.json());


app.use("/transactions", transactionsRouter);

const server = http.createServer(app);


setupWebSocket(server);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});