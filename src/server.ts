import "./config/module-alias"
import express from "express"
import * as dotenv from "dotenv"
dotenv.config()
process.env.TZ = "UTC"

import { setupRoutes } from "@/config/routes"
import { startApolloServer } from "@/config/apollo-server"
import cors from "cors"
import http from "http"
import { SocketProvider } from "./infra/providers/socket-provider"

const app = express()
app.use(express.json())

const corsOptions = {
	origin: "*", // Defina o domínio correto do seu cliente aqui
	methods: ["GET", "POST"],
	allowedHeaders: "Access-Control-Allow-Origin",
}

app.use(cors(corsOptions))

const server = http.createServer(app)

SocketProvider(server)

startApolloServer(app)
setupRoutes(app)

const port = process.env.PORT || 9000

server.listen(port, () => {
	console.log(`Server Running at: ${port}`)
})
