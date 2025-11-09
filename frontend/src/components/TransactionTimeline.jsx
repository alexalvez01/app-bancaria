export default function TransactionTimeline({ events }) {
  const getColor = (type) => {
    switch (type) {
      case "FundsReserved":
        return "border-green-500 text-green-400";
      case "FraudChecked":
        return "border-yellow-500 text-yellow-400";
      case "Committed":
        return "border-blue-500 text-blue-400";
      case "Notified":
        return "border-purple-500 text-purple-400";
      case "Reversed":
        return "border-red-500 text-red-400";
      default:
        return "border-gray-500 text-gray-300";
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-100">
        Eventos de la transacción
      </h2>

      {events.length === 0 ? (
        <p className="text-gray-500">No hay eventos todavía.</p>
      ) : (
        <ul
          className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
        >
          {events.map((e, i) => (
            <li
              key={i}
              className={`p-4 bg-gray-700 rounded-lg border-l-4 ${getColor(
                e.type
              )} shadow-md`}
            >
              <div className="flex justify-between items-center">
                <strong className="text-lg">{e.type}</strong>
                <span className="text-sm text-gray-400">
                  {new Date(e.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <pre className="text-sm text-gray-300 bg-gray-800 rounded mt-2 p-2 overflow-x-auto">
                {JSON.stringify(e.payload, null, 2)}
              </pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
