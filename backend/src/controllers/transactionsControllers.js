import { sql } from "../config/db.js";

 

export async function getTransactionByUserId(req,res){
 try {
     const {userId} = req.params;
     const transactions = await sql`SELECT * FROM transactions WHERE user_id = ${userId}`;
     res.status(200).json(transactions);
 } catch (error) {
     console.error("Error getting transactions:", error);
     res.status(500).send("Error getting transactions");
 }
     
}
export async function deleteTransactionsById(req,res){
 
        try {
            const {id} = req.params;
            const result = await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;
            if(result.length === 0){
                return res.status(404).send({
                    message:"Transaction not found"
                }); 
            }
            res.status(200).json({
                message:"Transaction deleted successfully"
            });  
        } catch (error) {
            console.error("Error deleting transaction:", error);
            res.status(500).send("Error deleting transaction");
        }
     
}

export async function createTransaction(req, res){ 
    const { user_id, title, amount, category } = req.body;
  
    try {
      const transaction=await sql`INSERT INTO transactions (user_id, title, amount, category) 
                VALUES (${user_id}, ${title}, ${amount}, ${category})
                RETURNING * 
      `;
      res.status(201).json(transaction);
    } catch (error) {
      console.error("Error adding transaction:", error);
      res.status(500).send("Error adding transaction");
    }
    
}

export async function getTransactionSummary(req, res) {
    try {
        const {userId} = req.params;
        const balanceResult = await sql`SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId}`;

        const incomeResult = await sql`SELECT COALESCE(SUM(amount), 0) as income FROM transactions WHERE user_id = ${userId} AND amount > 0`;

        const expensesResult = await sql`SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions WHERE user_id = ${userId} AND amount < 0`;

        res.status(200).json({
            balance: balanceResult[0].balance,
            income: incomeResult[0].income,
            expenses: expensesResult[0].expenses
        });
    } catch (error) {
        console.error("Error getting transactions summary:", error);
        res.status(500).send("Error getting transactions summary");
    }
  }