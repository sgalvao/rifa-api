import { Express } from 'express'

export const setupRoutes = (app: Express): void => {
  app.get('/api', (_, res) => {
    res.send('API online!')
  })
}
