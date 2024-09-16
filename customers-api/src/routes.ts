import { Router } from "express"
import { CustomerController } from "./controller/CustomerController"


const router = Router()

const customerController = new CustomerController()

router.get("/customers", customerController.findAll) 
 
router.get("/customers/:id", customerController.verifyIfExist, customerController.findById)

router.post("/customers", customerController.create)

router.delete("/customers/:id", customerController.verifyIfExist, customerController.delete)

router.put("/customers/:id", customerController.verifyIfExist, customerController.update)

export { router }