import { UserService } from "../services/UserService"
import { Request, Response, NextFunction } from "express"


class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    create = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body
            const user = await this.userService.create(name, email, password)
            return res.status(201).json(user)
        } catch (error) {
            this.handleError(res, error, "Error creating user.")
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.getAll()
            return res.status(200).json(user)
        } catch (error) {
            this.handleError(res, error, "Error fetching users.")
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            if (!this.validateId(id)) {
                return res.status(404).json({error: "User not found."})
            }
            const user = await this.userService.getByid(id)
            if (!user) {
                res.status(404).json({ error: "User not found!" })
            }
            return res.status(200).json(user)
        } catch (error) {
            this.handleError(res, error, "Error fetching user by id")
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const { name, email, password } = req.body
            const user = await this.userService.update(id, name, email, password)
            if (!user) {
                res.status(404).json({ error: "User not found!" })
            }
            return res.status(200).json(user)
        } catch (error) {
            this.handleError(res, error, "Error updating user.")
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            await this.userService.delete(id)
            return res.status(204).json()
        } catch (error) {
            this.handleError(res, error, "Error deleting user.")
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id
            if (!this.validateId(id)) {
                return res.status(404).json({error: "User not found."})
            }
            const user = await this.userService.getByid(id)
            if (!user) {
                res.status(404).json({ error: "User not found!" })
            }
            return next()
        } catch (error) {
            this.handleError(res, error, "Error verify if exists user.")
        }
    }

    private validateId(id: string) {
        return id.length === 24
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


export { UserController }