import './config/module-alias'
import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()

import { setupRoutes } from '@/config/routes'
import { startApolloServer } from '@/config/apollo-server'
import env from '@/config/env'

const app = express()
startApolloServer(app)
setupRoutes(app)

app.listen(env.port, () =>
  console.log(`Server running at: http://localhost:${env.port}`)
)
