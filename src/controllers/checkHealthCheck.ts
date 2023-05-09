import dayjs from 'dayjs'
import { Request, Response } from 'express'

export const checkHealthCheck = (req: Request, res: Response) => {
  return res.status(200).send({
    ok: true,
    timestamp: dayjs().unix(),
  })
}
