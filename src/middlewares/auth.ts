import dayjs from 'dayjs'
import { NextFunction, Request, Response } from 'express'
import jwtDecode from 'jwt-decode'
import { UsersCacheFetcher } from '../cache/users/fetcher'
import { UsersCacheHandler } from '../cache/users/handler'
import { IAuthUser } from '../types/user'

export default async (request: Request, response: Response, next: NextFunction) => {
  try {
    // Get authorization data from 'authorization' header;
    const authorization = request.headers['authorization']
    if (!authorization) return response.status(401).send({ error: true, message: 'Access denied: You must login' })

    // Get token
    const token = authorization.split(' ')[1]
    if (!token) return response.status(401).send({ error: true, message: 'Access denied: Invalid token' })

    // Verify token
    const payLoad = jwtDecode(token);
    if (!payLoad) return response.status(401).send({ error: true, message: 'Access denied: Token expired' })

    // Set user token data & userId
    const userToken = payLoad as unknown as IAuthUser
    const userId = userToken.sub

    // Try find user data from cache
    const user = UsersCacheHandler.getUser(userId)

    // If found user from cache, check if cache needs refresh (cache should expire after 1 minute)
    if (
      user &&
      dayjs(user.cacheCreatedAt * 1000)
        .add(3, 'minute')
        .unix() > dayjs().unix()
    ) {
      // User subscription expired or user doesn't have Tier 3
      if (!user.isActive || user.plan != 'Tier 3')
        return response.status(401).send({ error: true, message: 'Access denied: Upgrade to Tier 3 to have access.' })
      request.user = user
      next()
      return
    }

    // Remove user from cache
    if (user) UsersCacheHandler.deleteUser(userId)

    // Create user cache and fetch his data from CRM API
    const userCache = new UsersCacheFetcher(userId)
    const userData = await userCache.fetch()

    if (!userData)
      return response.status(401).send({ error: true, message: 'Access denied: Cannot get user data from CRM.' })

    // User subscription expired or user doesn't have Tier 3
    if (!userData.isActive || userData.plan != 'Tier 3')
      return response.status(401).send({ error: true, message: 'Access denied: Upgrade to Tier 3 to have access.' })

    // Save user cache
    UsersCacheHandler.addUser(userData)

    // Set request user data
    request.user = userData

    next()
  } catch (err) {
    console.log(err)
    return response.status(401).send({ error: true, message: 'Access denied: Something went wrong.' })
  }
}
