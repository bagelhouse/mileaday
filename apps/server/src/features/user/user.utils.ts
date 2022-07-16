
export const strictVerifyAllParams = (objToCheck): boolean | string=> {
  for (const [key] of Object.entries(objToCheck)) {
    if(!objToCheck[key]){
      return key
    }
  }
  return true
}