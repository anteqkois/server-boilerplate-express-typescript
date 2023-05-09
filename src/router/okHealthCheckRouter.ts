import { Router } from 'express'
import { checkHealthCheck } from '../controllers/checkHealthCheck'
import { catchErrors } from '../utils/errors/handleErrorMiddlewares'

const okHealthCheckRouter = Router()

okHealthCheckRouter.get('/', catchErrors(checkHealthCheck))

export { okHealthCheckRouter }
