import { Request, Response } from "express";
import { prisma } from "../prisma";

class StatementController {

    // checkingaccount/:id/deposit
    // {amount, description}
    async deposit(req: Request, res: Response) {
        try {
            const idCheckingAccount = req.params.id;
            const { amount, description } = req.body
            if (amount <= 0) {
                return res.status(400).json({ msg: "Invalid amount!" })
            }
            const statement = await prisma.statement.create({
                data: {
                    idCheckingAccount,
                    amount,
                    description,
                    type: "credit"
                }
            })
            return res.status(201).json(statement)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }

    async printAllStatements(req: Request, res: Response) {
        try {
            const idCheckingAccount = req.params.id
            const statement = await prisma.statement.findMany({
                where: { idCheckingAccount }
            })
            return res.status(200).json(statement)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }

    async withdraw(req: Request, res: Response) {
        try {
            const idCheckingAccount = req.params.id
            const { amount, description } = req.body
            if (amount <= 0) {
                return res.status(400).json({ msg: "Invalid amount!" })
            }
            const statement = await prisma.statement.create({
                data: {
                    idCheckingAccount,
                    amount: amount * -1,
                    description,
                    type: "debit"
                }
            })
            return res.status(201).json(statement)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }
}

export { StatementController }