import { strictVerifyAllParams } from "../../../../src/features/user/user.utils"

describe('User Utils - strictVerifyAllParams', function() {
  it('should return true if every key present', function () {
    const testObj = { randomKey: 'test', otherrandomKey: 'test2'}
    expect(strictVerifyAllParams(testObj)).toBe(true)
  })
  it('should return key if key is NOT present', function () {
    const testObj = { randomKey: 'test', otherrandomKey: undefined}
    expect(strictVerifyAllParams(testObj)).toBe('otherrandomKey')
  })
})