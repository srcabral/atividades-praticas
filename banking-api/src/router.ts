import { Router } from "express"
import { CheckingAccountController } from "./controllers/CheckingAccountController"
import { StatementController } from "./controllers/StatementController"

const router = Router()

const checkingAccountController = new CheckingAccountController
const statementController = new StatementController

const path = "/checkingaccount"

router.get(path, checkingAccountController.findAll)

router.get(`${path}/:id`, checkingAccountController.findById)

router.post(path, checkingAccountController.create)

router.put(`${path}/:id`, checkingAccountController.verifyIfExists, checkingAccountController.update)

router.delete(`${path}/:id`, checkingAccountController.verifyIfExists, checkingAccountController.delete)

router.post(`${path}/:id/deposit`, checkingAccountController.verifyIfExists, statementController.deposit)

router.get(`${path}/:id/statement`, checkingAccountController.verifyIfExists, statementController.printAllStatements)

router.post(`${path}/:id/withdraw`, checkingAccountController.verifyIfExists, statementController.withdraw)

export { router }