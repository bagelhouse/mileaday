
import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from 'src/features/user/user.service'

describe('UserService', () => {
  let service: UserService

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile()

    service = testModule.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
