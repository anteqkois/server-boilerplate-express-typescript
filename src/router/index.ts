import { Router } from 'express'
import { okHealthCheckRouter } from './okHealthCheckRouter'
import { versionRouter } from './version'

const mainRouter = Router()

// Setup routers
mainRouter.use('/ok', okHealthCheckRouter)
mainRouter.use('/v1/version', versionRouter)

export { mainRouter }
