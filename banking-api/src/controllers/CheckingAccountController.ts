import { NextFunction, Request, Response } from "express"
import { CheckingAccountService } from "../services/CheckingAccountService"

class CheckingAccountController {

    private checkingAccountService: CheckingAccountService

    constructor() {
        this.checkingAccountService = new CheckingAccountService
    }

    create = async (req: Request, res: Response) => {
        try {
            const { name, email, number } = req.body

            const validation = this.isValidNameAndEmailAndNumber(name, email, number)
            if (!validation.isValid) {
                return res.status(400).json({ error: validation.msg })
            }

            const checkingAccount = await this.checkingAccountService.create(name, email, number)
            return res.status(201).json(checkingAccount)
        } catch (error) {
            this.handleError(res, error, "Error creating checkingAccount.")
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const idCheckingAccount = req.params.id
            const { name, email, number } = req.body

            const validation = this.isValidNameAndEmailAndNumber(name, email, number)
            if (!validation.isValid) {
                return res.status(400).json({ error: validation.msg })
            }

            const checkingAccount = await this.checkingAccountService.update(idCheckingAccount, name, email, number)
            return res.status(200).json(checkingAccount)
        } catch (error) {
            this.handleError(res, error, "Error updating checkingAccount.")
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const idCheckingAccount = req.params.id
            await this.checkingAccountService.delete(idCheckingAccount)
            return res.status(204).json({ msg: "Successfully removed!" })
        } catch (error) {
            this.handleError(res, error, "Error deleting checkingAccount")
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const checkingAccount = await this.checkingAccountService.getAll()
            return res.status(200).json(checkingAccount)
        } catch (error) {
            this.handleError(res, error, "Error fetching checkingAccount.")
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const idCheckingAccount = req.params.id
            const checkingAccount = await this.checkingAccountService.getById(idCheckingAccount)

            if (!checkingAccount) {
                return res.status(404).json({ error: "CheckingAccount not found!" })
            }

            return res.status(200).json(checkingAccount)
        } catch (error) {
            this.handleError(res, error, "Error fetching get by id checkingAccount")
        }
    }

    verifyIfExist = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id

            const checkingAccount = await this.checkingAccountService.getById(id)

            if(!checkingAccount) {
                return res.status(404).json({error: "CheckingAccount not found."})
            }
            return next()
        } catch (error) {
            this.handleError(res, error, "Error on verify if exists checkingAccount")
        }
    }

    private isValidNameAndEmailAndNumber(name: any, email: any, number: any) {
        if (typeof name !== "string" || name.trim().length == 0) {
            return { isValid: false, msg: "Invalid name: must be a non empty string." }
        }
        if (typeof email !== "string" || email.trim().length == 0) {
            return { isValid: false, msg: "Invalid email: must be a non empty string." }
        }
        if (typeof number !== "string" || number.trim.length == 0) {
            return { isValid: false, msg: "Invalid number: must be a non empty string." }
        }
        return { isValid: true }
    }

    private handleError(res: Response, error: unknown, message: string) {
        if (error instanceof Error) {
            console.error(`${message}. ${error.message}`)
            return res.status(400).json({ error: error.message })
        } else {
            console.error(`Unexpected errro: ${error}`)
            return res.status(500).json({ error: "An unexpected error corrured." })
        }
    }
}

export { CheckingAccountController }