import { FirebasePreauthMiddleware } from '../../../../src/features/user/auth.middleware'
import { FirebaseUserHarness } from '../../../harnesses/firebaseUserHarness'
import { Request, response } from 'express'
import sinon from 'sinon'
describe('Features/User/Middleware', () => {
  let sampleRequest: any  = {
    headers: {
      authorization: ''
    }
  }
  it('use - should decode token', async function () {
    jest.setTimeout(10000)
    const userHarness = new FirebaseUserHarness({
      userEmail: 'team@bagelhouse.co',
      userPassword: 'somepass'})
    await userHarness.init()
    const middleware = new FirebasePreauthMiddleware()
    sinon.stub(response, 'status').returns(() => {return 403})
    const next = () => {return true}
    sampleRequest.headers.authorization = `Bearer ${userHarness.getUserIdToken()}`
    middleware.use(sampleRequest as Request, response as any, next)
    console.log(response)
    })
})