import { Request, Response } from 'express'
import pJson from '../../package.json'

export const onGetVersion = (req: Request, res: Response) => {
  res.status(200).send({
    name: pJson.name,
    version: pJson.version,
  })
}