import { NextFunction, Request, Response } from "express"
import { prisma } from "../prisma"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { verify } from "jsonwebtoken"

type TokenPayload = { 
    id: string
    iat: number
    exp: number
}

class AuthController {
    async authenticate(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            const user = await prisma.user.findUnique({
                where: { email }
            })

            if (!user) {
                return res.status(400).json({ error: "User or password invalid!" })
            }

            const isValuePassword = await compare(password, user.password)

            if (!isValuePassword) {
                return res.status(400).json({ error: "User or password invalid!" })
            }

            const token = sign({ id: user.id, email: user.email }, "keyword", { expiresIn: "1m" })

            return res.status(200).json({ user: { id: user.id, email }, token })
        } catch (error) {
            console.error(error)
            return res.status(500).json(error)
        }
    }

    async authMiddleware(req: Request, res: Response, next: NextFunction) {
        try {
            const { authorization } = req.headers

            // Bearer token

            if(!authorization) {
                return res.status(401).json({error: "Token not provided."})
            }

            const [, token] = authorization.split(" ")

            const decode = verify(token, "keyword")

            const { id } = decode as TokenPayload
            console.log(`ID: ${id}`)

            return next()

        } catch (error) {
            res.status(401).json({erro: "Token invalid."})
        }
    }
}

export { AuthController }

