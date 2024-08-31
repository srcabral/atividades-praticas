import { prisma } from "../prisma"


class StatementService {

    async deposit(idCheckingAccount: string, amount: number, description: string) {
        try {
            if (amount <= 0) {
                throw new Error("Invalid amont!")
            }

            const statement = await prisma.statement.create({
                data: {
                    idCheckingAccount,
                    amount,
                    description,
                    type: "credit"
                }
            })
            return statement
        } catch (error) {
            console.error(`Error creating deposit: ${error}`)
            throw error
        }
    }

    async withdraw(idCheckingAccount: string, amount: number, description: string) {
        try {
            if (amount <= 0) {
                throw new Error("Invalid amount!")
            }

            const balance = await this.getBalance(idCheckingAccount)

            if (amount > balance) {
                throw new Error("Insufficient funds.")
            }

            const statement = await prisma.statement.create({
                data: {
                    idCheckingAccount,
                    amount: amount * -1,
                    description,
                    type: "debit"
                }
            })

            return statement
        } catch (error) {
            console.error(`Error creating withdraw: ${error}`)
            throw error
        }
    }

    async getBalance(idCheckingAccount: string) {
        try {
            // checkingAccount: currentBalance no mundo relacional para sempre ter essa inf
            // select sum(amount) from Statement Where idCheckingAccount = id (semelhante ao mundo relacional)
            const aggregate = await prisma.statement.aggregate({
                _sum: {
                    amount: true
                },
                where: { idCheckingAccount }
            })
            return aggregate._sum.amount ?? 0
        } catch (error) {
            console.error(`Error fetching balance. ${error}`)
            throw error
        }
    }

    async getAll(idCheckingAccount: string) {
        try {
            const statement = await prisma.statement.findMany({
                where: {
                    idCheckingAccount
                },
                orderBy: {
                    createdAt: "desc"
                }
            })
            return statement
        } catch (error) {
            console.error(`Error fetching statement. ${error}`)
            throw error
        }
    }
}