import { Router } from "express"
import { CheckingAccountController } from "./controllers/CheckingAccountController"
import { StatementController } from "./controllers/StatementController"
import { AuthController } from "./controllers/AuthController"

const router = Router()

const checkingAccountController = new CheckingAccountController
const statementController = new StatementController
const authController = new AuthController


const path = "/checkingaccount"

router.get(path, checkingAccountController.getAll)

router.get(`${path}/:id`, authController.authMiddleware, checkingAccountController.getById)

router.post(path, authController.authMiddleware, checkingAccountController.create)

router.put(`${path}/:id`, authController.authMiddleware, checkingAccountController.verifyIfExist, checkingAccountController.update)

router.delete(`${path}/:id`, authController.authMiddleware, checkingAccountController.verifyIfExist, checkingAccountController.delete)

router.post(`${path}/:id/deposit`, authController.authMiddleware, checkingAccountController.verifyIfExist, statementController.deposit)

router.get(`${path}/:id/statement`, authController.authMiddleware, checkingAccountController.verifyIfExist, statementController.printAllStatements)

router.post(`${path}/:id/withdraw`, authController.authMiddleware, checkingAccountController.verifyIfExist, statementController.withdraw)

router.get(`${path}/:id/balance`, authController.authMiddleware, checkingAccountController.verifyIfExist, statementController.getBalance)

router.get(`${path}/:id/statement/period`, authController.authMiddleware, checkingAccountController.verifyIfExist, statementController.getByPeriod)

router.post(`${path}/:id/pix`, authController.authMiddleware, checkingAccountController.verifyIfExist, statementController.pix)

router.post(`${path}/:id/ted`, authController.authMiddleware, checkingAccountController.verifyIfExist, statementController.ted)
export { router }