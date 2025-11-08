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
  setTimeout(() => sendEvent("FundsReserved", { ok: true, holdId: "H123", amount: transaction.amount }), 1000);
  setTimeout(() => sendEvent("FraudChecked", { risk: "LOW" }), 2000);
  setTimeout(() => sendEvent("Committed", { ledgerTxId: `TXN-${transactionId}` }), 3000);
  setTimeout(() => sendEvent("Notified", { channels: ["email"] }), 4000);
};
