let socket = null;

export const connectWebSocket = (onMessage, userId) => {
  // Cerrar socket anterior
  if (socket) {
    console.log("Cerrando conexión WebSocket anterior...");
    socket.onmessage = null;
    socket.onclose = null;
    socket.close();
    socket = null;
  }

  // Devolvemos una Promesa que se resuelve cuando llega el auth_ack
  return new Promise((resolve) => {
    socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => {
      console.log("Conectado al WebSocket");
      if (userId) {
        const authMessage = JSON.stringify({ type: "auth", userId });
        socket.send(authMessage);
        console.log("Enviado userId al servidor:", userId);
      }
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // 🔹 Ignorar el mensaje técnico de autenticación en el timeline
      if (data.type === "auth_ack") {
        console.log("Autenticación confirmada:", data.userId);
        resolve(); // 👈 se resuelve la Promesa recién ahora
        return;
      }

      onMessage(data);
    };

    socket.onclose = () => {
      console.log("Desconectado del WebSocket");
      socket = null;
    };
  });
};