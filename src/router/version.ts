import { Router } from 'express'
import { onGetVersion } from '../controllers/version'
import { catchErrors } from '../utils/errors/handleErrorMiddlewares'

const versionRouter = Router()

versionRouter.get('/', catchErrors(onGetVersion))

export { versionRouter }
