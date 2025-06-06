import express from "express";   
import { createTransaction, getTransactionByUserId, deleteTransactionsById, getTransactionSummary } from "../controllers/transactionsControllers.js";


const router = express.Router();

router.post("/",createTransaction); 
router.get("/:userId", getTransactionByUserId);
router.delete("/:id", deleteTransactionsById);
router.get("/summary/:userId", getTransactionSummary);

export default router;