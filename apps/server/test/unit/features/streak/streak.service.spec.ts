import { Test, TestingModule } from '@nestjs/testing'
import { StreakService } from 'src/features/streak/streak.service'

describe('StreakService', () => {
  let service: StreakService

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [StreakService],
    }).compile()

    service = testModule.get<StreakService>(StreakService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
