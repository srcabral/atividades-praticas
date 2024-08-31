import { NextFunction, Request, Response } from "express"
import { prisma } from "../prisma/index"

class CheckingAccountController {

    async create(req: Request, res: Response) {
        try {
            const { name, email, number } = req.body
            const checkingAccount = await prisma.checkingAccount.create({
                data: {
                    name,
                    email,
                    number
                }
            })
            return res.status(201).json(checkingAccount)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = req.params.id
            const { name, email, number } = req.body
            const checkingAccount = await prisma.checkingAccount.update({
                where: { id },
                data: {
                    name,
                    email,
                    number
                }
            })
            return res.status(200).json(checkingAccount)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id
            await prisma.checkingAccount.delete({
                where: { id }
            })
            return res.status(204).json({ msg: "Removido com sucesso!" })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const checkingAccount = await prisma.checkingAccount.findMany()
            return res.status(200).json(checkingAccount)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id = req.params.id
            const checkingAccount = await prisma.checkingAccount.findUnique({
                where: { id }
            })
            if(checkingAccount == null) {
                return res.status(404).json({msg: "Not found!"})
            }
            return res.status(200).json(checkingAccount)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }

    async verifyIfExists(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const checkingAccount = await prisma.checkingAccount.findUnique({
                where: { id }
            })
            if (checkingAccount == null) {
                return res.status(404).json({ menssage: "Not found!" })
            }
            return next()
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }
}

export { CheckingAccountController }