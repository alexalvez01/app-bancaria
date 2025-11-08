let socket;

export const connectWebSocket = (onMessage, userId) => {
  socket = new WebSocket("ws://localhost:3000");

  socket.onopen = () => {
    console.log("Conectado al WebSocket");

    if (userId) {
      const authMessage = JSON.stringify({ type: "auth", userId });
      socket.send(authMessage);
      console.log("Enviado userId al servidor:", userId);
    }
  };

  socket.onmessage = (event) => onMessage(JSON.parse(event.data));
  socket.onclose = () => console.log("Desconectado del WebSocket");
};
