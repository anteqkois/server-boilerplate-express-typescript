import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser';
import 'dotenv/config'
import { mainRouter } from './router'
import { handleErrors, notFound } from './utils/errors/handleErrorMiddlewares'

export const getExpressServer = () => {
  // Setup express
  const app = express()

  // Config
  app.set('trust proxy', true)
  app.use(cors())
  
  app.set('json spaces', 2)
  app.use(express.json({ limit: '1mb' }))
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use('*', (req, res, next) => {
    console.log({
      method: req.method,
      baseUrl: req.baseUrl,
      data: req.body,
    })

    next()
  })

  // register main router
  app.use('/api', mainRouter);

  // handling errors
  app.use(notFound);
  app.use(handleErrors);


  return app
}
