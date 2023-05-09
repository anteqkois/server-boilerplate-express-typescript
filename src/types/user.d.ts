export interface IAuthUser {
  iss: string
  iat: number
  exp: number
  nbf: number
  jti: string
  sub: number
  prv: string
  plan: 'trial' | 'tier-1' | 'tier-2' | 'tier-3'
  expired_at: number // When plan expired
}

export interface IUsersCacheData {
  userId: number
  plan: 'Trial' | 'Tier 1' | 'Tier 2' | 'Tier 3'
  planCreatedAt: number
  cacheCreatedAt: number
  planSubscriptionExp: number
  isActive: boolean
}
