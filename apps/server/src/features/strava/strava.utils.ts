import moment from 'moment'
import { REFRESH_TOKEN_HOURS_TO_SUBTRACT } from './constants'
export function shouldRefreshToken(
  now: number,
  expires_at: number | string
): boolean {
  let expiresAt
  if (typeof expires_at === 'string') expiresAt = parseInt(expires_at)
  else expiresAt = expires_at
  const currentDate = moment(now)
  const compareDate = moment
    .unix(expiresAt)
    .subtract(REFRESH_TOKEN_HOURS_TO_SUBTRACT)
  if (currentDate.isAfter(compareDate)) return true
  else return false
}
