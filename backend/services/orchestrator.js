import { broadcastEvent } from "../websocket/gateway.js";

export const orchestrateTransaction = (transactionId, transaction) => {
  const { userId } = transaction; 
  const sendEvent = (type, payload) => {
    const event = {
      transactionId,
      userId, 
      type,
      payload,
      timestamp: new Date().toISOString(),
    };
    console.log("Evento emitido:", type);
    broadcastEvent(event, userId);
  };

  sendEvent("TransactionInitiated", transaction);
   setTimeout(() => {
    sendEvent("FundsReserved", { ok: true, holdId: "H123", amount: transaction.amount });

    setTimeout(() => {
      const risk = Math.random() < 0.7 ? "LOW" : "HIGH";

      sendEvent("FraudChecked", { risk });

      if (risk === "LOW") {
        setTimeout(() => {
          sendEvent("Committed", { ledgerTxId: `TXN-${transactionId}` });
          setTimeout(() => {
            sendEvent("Notified", { channels: ["email"] });
          }, 1000);
        }, 1000);
      } else {
        setTimeout(() => {
          sendEvent("Reversed", { reason: "High risk detected" });
        }, 1000);
      }

    }, 1000);

  }, 1000);
}