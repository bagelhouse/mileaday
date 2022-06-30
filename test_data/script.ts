import charlieResponse1 from './data/charlie/charlieResponse1.json'
import angeloResponse1 from  './data/angelo/angeloResponse1.json'
// import charlieResponse2 from './data/charlie/charlieResponse2.json'
// import charlieResponse3 from './data/charlie/charlieResponse3.json'
// import charlieResponse4 from './data/charlie/charlieResponse4.json'
// import charlieResponse5 from './data/charlie/charlieResponse5.json'
// import charlieResponse6 from './data/charlie/charlieResponse6.json'
// import charlieResponse7 from './data/charlie/charlieResponse7.json'
import _ from 'lodash'
import moment from 'moment'

// A `main` function so that you can use async/await
async function main() { 
  const { badDates, checkedDates } = checker(charlieResponse1 as any)
  console.log('days missed:', badDates.length)
  console.log(badDates.forEach(function (el: any, i: any){ console.log(el.start_date_local, checkedDates[i])}))
}

function checker(data: typeof charlieResponse1): any {
  const format = 'MMMM Do YYYY, h:mm:ss a'
  const arrLen = data.length
  const badDates: any = []
  const datesToCheck: any = []
  data.reverse().forEach(function (el, i)  {
    if (el.type === "Run" && i !== arrLen - 1) {
      let date = data[i].start_date_local
      let compareDate = data[i+1].start_date_local
      let day1 = moment(date).startOf('day')
      let day2 = moment(compareDate).startOf('day')
      const dateDiff = moment.duration(day2.diff(day1)).asHours()
      console.log(dateDiff)
      if (dateDiff > 24) {
        console.log(true)
        badDates.push(el)
      }
      // console.log('date', dateToCheck.format(format), 'tomorrow', tomorrow.format(format))
    }
  })
  return { badDates: badDates, checkedDates: datesToCheck }
  
}
  


main()
  .catch(e => {
    throw e
  })
  .finally(async () => {

  })
