import axios from 'axios'
import { FirebaseUserHarness } from '../../../harnesses/firebaseUserHarness'

describe('tests token', function() {
  jest.setTimeout(10000)
  it('should get token', async function () {
    const userHarness = new FirebaseUserHarness({userEmail: 'team@bagelhouse.co', userPassword: 'somepass'})
    await userHarness.init()
    // const { data } = await axios.get( 'http://localhost:3999/bagelhouse-mileaday-staging/us-central1/api/user/user-info', {
    //   headers: {
    //     'Authorization': `Bearer ${userHarness.getUserIdToken()}`
    //   }
    // })
    console.log(userHarness.getUserRecord())

  })
})