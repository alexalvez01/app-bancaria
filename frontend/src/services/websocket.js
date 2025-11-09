let socket = null;

export const connectWebSocket = (onMessage, userId) => {
  
  if (socket) {
    console.log("Cerrando conexión WebSocket anterior...");
    socket.onmessage = null;
    socket.onclose = null;
    socket.close();
    socket = null;
  }


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

      
      if (data.type === "auth_ack") {
        console.log("Autenticación confirmada:", data.userId);
        resolve(); 
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