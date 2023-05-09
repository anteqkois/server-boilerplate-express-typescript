import axios from 'axios'
import dayjs from 'dayjs'
import { IUsersCacheData } from '../../types/user'
import { createApiError } from '../../utils/errors/ApiError'

export class UsersCacheFetcher {
  userId: number

  constructor(userId: number) {
    this.userId = userId
  }

  async fetch(): Promise<Omit<IUsersCacheData, 'cacheCreatedAt'> | null> {
    try {
      const response = await axios.get(`${process.env.CRM_URL}/api/users`, {
        data: {
          id: this.userId,
        },
        headers: {
          'api-key': 'M7clpHbuHXxcYZZNPIMPOvd35YPUUe2bcQ9KVXW',
          Accept: 'application/json',
        },
      })
      if (!response || !response.data) return null

      if (response.data.message == 'Customer not found') return null

      return {
        userId: this.userId,
        plan: response.data.plan,
        planCreatedAt: response.data.created_at,
        isActive: response.data.expired_at > dayjs().unix(),
        planSubscriptionExp: response.data.expired_at,
      }

    } catch (err: unknown) {
      return null
      // if (axios.isAxiosError(err)) {
      //   if (err.response?.status === 404) {
      //     createApiError('Access denied: Cannot get user data from CRM.', 404)
      //   }
      // }
    }
    return null
  }
}
