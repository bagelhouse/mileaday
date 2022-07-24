import { shouldRefreshToken } from 'src/features/strava/strava.utils'

describe('strava utils', () => {
  describe('shouldRefreshToken', () => {
    it('should return false if not expired', () =>{
      const testDate = 1658695667
      const now = 1658676915964
      const test = shouldRefreshToken(now, testDate)
      expect(test).toBe(false)
    })
    it('should return true if expired', () => {
      const testDate = 1658600000
      const now = 1658676915964 
      const test = shouldRefreshToken(now, testDate)
      expect(test).toBe(true)
    })
    it('should return true if less than an hour', () => {
      const testDate = 1658674667
      const now = 1658676915964 
      const test = shouldRefreshToken(now, testDate)
      expect(test).toBe(true)
    })
    it('should work even if string', () => {
      const testDate = "1658674667"
      const now = 1658676915964 
      const test = shouldRefreshToken(now, testDate)
      expect(test).toBe(true)
    })
  })
})