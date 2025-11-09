import { WebSocketServer } from "ws";

let clients = [];

export const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("Cliente conectado");
    ws.userId = null;

    ws.on("message", (msg) => {
      try {
        const data = JSON.parse(msg);

        if (data.type === "auth") {
          ws.userId = data.userId;
          console.log(`Cliente autenticado como ${ws.userId}`);

          // 🔹 Cerrar conexiones anteriores del mismo userId
          clients.forEach((client) => {
            if (
              client !== ws &&
              client.userId === ws.userId &&
              client.readyState === ws.OPEN
            ) {
              console.log("Cerrando conexión anterior de:", ws.userId);
              client.close();
            }
          });

          // 🔹 Enviar confirmación opcional
          ws.send(JSON.stringify({ type: "auth_ack", userId: ws.userId }));
        }
      } catch (err) {
        console.error("Error al procesar mensaje WebSocket:", err);
      }
    });

    ws.on("close", () => {
      clients = clients.filter((c) => c !== ws);
      console.log("Cliente desconectado");
    });

    clients.push(ws);
  });
};

// ✅ Función global para enviar eventos solo al usuario autenticado
export const broadcastEvent = (event, userId) => {
  const json = JSON.stringify(event);
  clients.forEach((client) => {
    if (client.readyState === 1 && client.userId === userId) {
      client.send(json);
    }
  });
};