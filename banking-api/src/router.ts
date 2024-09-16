import { Router } from "express"
import { CheckingAccountController } from "./controllers/CheckingAccountController"
import { StatementController } from "./controllers/StatementController"

const router = Router()

const checkingAccountController = new CheckingAccountController
const statementController = new StatementController

const path = "/checkingaccount"

router.get(path, checkingAccountController.getAll)

router.get(`${path}/:id`, checkingAccountController.getById)

router.post(path, checkingAccountController.create)

router.put(`${path}/:id`, checkingAccountController.verifyIfExist, checkingAccountController.update)

router.delete(`${path}/:id`, checkingAccountController.verifyIfExist, checkingAccountController.delete)

router.post(`${path}/:id/deposit`, checkingAccountController.verifyIfExist, statementController.deposit)

router.get(`${path}/:id/statement`, checkingAccountController.verifyIfExist, statementController.printAllStatements)

router.post(`${path}/:id/withdraw`, checkingAccountController.verifyIfExist, statementController.withdraw)

router.get(`${path}/:id/balance`, checkingAccountController.verifyIfExist, statementController.getBalance)

router.get(`${path}/:id/statement/period`, checkingAccountController.verifyIfExist, statementController.getByPeriod)

router.post(`${path}/:id/pix`, checkingAccountController.verifyIfExist, statementController.pix)

router.post(`${path}/:id/ted`, checkingAccountController.verifyIfExist, statementController.ted)
export { router }