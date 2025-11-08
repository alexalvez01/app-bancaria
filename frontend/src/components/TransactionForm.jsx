import { useState } from "react";


export default function TransactionForm({ onStart }) {
  const [form, setForm] = useState({
    fromAccount: "",
    toAccount: "",
    amount: "",
    currency: "USD",
    userId: "", 
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    onStart(form); 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm mx-auto pb-12">
      <h2 className="text-xl font-semibold text-gray-100 mb-2 text-center py-5">
        Datos de Transacción
      </h2>

      <input
        type="text"
        name="userId"
        placeholder="Usuario (userId)"
        className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
        value={form.userId}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="fromAccount"
        placeholder="Cuenta origen"
        className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
        value={form.fromAccount}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="toAccount"
        placeholder="Cuenta destino"
        className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
        value={form.toAccount}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="amount"
        placeholder="Monto"
        className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
        value={form.amount}
        onChange={handleChange}
        required
      />

      <select
        name="currency"
        value={form.currency}
        onChange={handleChange}
        className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
      >
        <option value="USD">USD</option>
        <option value="ARS">ARS</option>
        <option value="EUR">EUR</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
      >
        Enviar
      </button>
    </form>
  );
}
