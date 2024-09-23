import express from "express"
import { router } from "./router"
import { userRoutes } from "./userRoutes"

const app = express()

app.use(express.json())

app.use(router)

app.use(userRoutes)

app.listen(3000, () => console.log("Server is running!"))