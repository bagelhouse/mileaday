import { objectToString } from "src/utils/common"

describe('general utils', ()=>{
  describe('toString', ()=>{
    it('should convert obj to string', () => {
      const testObj = {
        random: 'test',
        random2: 40923,
        random3: undefined,
        random4: null
      }
      expect(objectToString(testObj)).toStrictEqual({
        random: 'test',
        random2: 40923,
        random3: undefined,
        random4: null
      })
    })
  })
})