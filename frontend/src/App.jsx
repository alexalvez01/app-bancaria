import { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionTimeline from "./components/TransactionTimeline";
import { connectWebSocket } from "./services/websocket";
import { startTransaction } from "./services/api";

export default function App() {
  const [transactionId, setTransactionId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [events, setEvents] = useState([]);

  const handleStart = async (form) => {
    setUserId(form.userId);
    setEvents([]);

    
    await connectWebSocket((event) => {
      setEvents((prev) => [...prev, event]);
    }, form.userId);

   
    const result = await startTransaction(form);
    setTransactionId(result.transactionId);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <header className="p-4 text-2xl font-bold text-center bg-gray-800 border-b border-gray-700">
        💳 Simulador de Transacciones Bancarias
      </header>

      <main className="flex flex-1 p-6 gap-6">
        <div className="w-1/3 bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 flex items-center justify-center h-fit">
          <div className="h-1/2 w-full flex items-center">
            <TransactionForm onStart={handleStart} />
          </div>
        </div>

        <div className="flex-1 bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 overflow-y-auto">
          {transactionId ? (
            <>
              <h3 className="text-lg mb-3 text-gray-300">
                Transacción ID: <span className="text-blue-400">{transactionId}</span>
              </h3>
              <TransactionTimeline events={events} />
            </>
          ) : (
            <p className="text-gray-400 text-center mt-20">
              Iniciá una transacción para ver los eventos en tiempo real 🚀
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
