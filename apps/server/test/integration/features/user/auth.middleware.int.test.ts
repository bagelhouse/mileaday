import { FirebasePreauthMiddleware } from 'src/features/user/auth.middleware'
import { FirebaseUserHarness } from 'test/harnesses/firebaseUserHarness'
import {
  Controller,
  Get,
  INestApplication,
  MiddlewareConsumer,
  RequestMethod,
  Module,
} from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest';
import { UserModule } from 'src/features/user/user.module'
import axios from 'axios'

const RETURN_VALUE = 'user'

@Controller()
class TestController {
  @Get('user')
  test() {
    return RETURN_VALUE
  }
}

@Module({
  imports: [UserModule],
  controllers: [TestController],
})
class TestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FirebasePreauthMiddleware)
      .forRoutes({path: 'user/*', method: RequestMethod.ALL})
  }
}

describe('User - FirebasePreauthMiddleware', () => {
  let app: INestApplication
  let userHarness = new FirebaseUserHarness({
    userEmail: 'team@bagelhouse.co',
    userPassword: 'somepass'})

  beforeEach(async () => {
    app = (
      await Test.createTestingModule({
        imports: [TestModule],
      }).compile()
    ).createNestApplication()
    await app.init()
    await userHarness.init()

  })
  it(`forRoutes(user/*)`, async () => {
    return request(app.getHttpServer()).get('/user').set('Authorization', `Bearer ${userHarness.getUserIdToken()}`).expect(200, RETURN_VALUE)
  })
  it(`forRoutes(TestController)`, () => {
    return request(app.getHttpServer()).get('/anotheroute').expect(404)
  })
  afterEach(async () => {
    await app.close()
  })
})

describe('User - FirebasePreauthMiddleware - E2E', () => {
  let userHarness = new FirebaseUserHarness({
    userEmail: 'team@bagelhouse.co',
    userPassword: 'somepass'})

    beforeEach(async () => {
    await userHarness.init()
    })
  it(`tests basic auth`, async () => {
    expect((await axios.get('http://localhost:3999/bagelhouse-mileaday-staging/us-central1/api/user/user-record', {
      headers: {'Authorization': `Bearer ${userHarness.getUserIdToken()}`}
    })).data).toBeTruthy()
  })
  it(`should reject`, async () => {
    try {
      await axios.get('http://localhost:3999/bagelhouse-mileaday-staging/us-central1/api/user/user-record')
    } catch (e) {
      expect(e.response.status).toBe(401)
    }
  })
})
