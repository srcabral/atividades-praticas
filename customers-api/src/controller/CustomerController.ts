import { NextFunction, Request, Response } from "express"
import { prisma } from "../prisma/init"


class CustomerController {

    async create(req: Request, res: Response) {
        try {
            const { name, email, document } = req.body
            const customer = await prisma.customers.create({
                data: {
                    name,
                    email,
                    document
                }
            })
            return res.status(201).json(customer)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = req.params.id
            const { name, email, document } = req.body

            const customerUpdated = await prisma.customers.update({
                where: { id },
                data: {
                    name,
                    email,
                    document
                }
            })

            return res.status(200).json(customerUpdated)

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id
            
            await prisma.customers.findUnique({
                where: { id }
            })

            await prisma.customers.delete({
                where: { id }
            })

            return res.status(204).json()
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const customer = await prisma.customers.findMany()
            res.json(customer)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id = req.params.id
            
            const customer = await prisma.customers.findUnique({
                where: { id }
            })

            return res.status(200).json(customer)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }

    async verifyIfExist(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const customer = await prisma.customers.findUnique({
                where: { id }
            })

            if (customer == null) {
                return res.status(404).json({ msg: "Not found!" })
            }
            return next()
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }
}

export { CustomerController }