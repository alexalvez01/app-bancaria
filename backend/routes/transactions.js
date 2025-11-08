import express from "express";
import { orchestrateTransaction } from "../services/orchestrator.js";
import { v4 as uuidv4 } from "uuid"; 

const router = express.Router();

router.post("/", (req, res) => {
  const transaction = req.body;
  const transactionId = uuidv4();

  console.log("Nueva transacción recibida:", transaction);

  orchestrateTransaction(transactionId, transaction);

  res.json({
    transactionId,
    status: "INITIATED",
    message: "Transacción iniciada correctamente",
  });
});

export default router;