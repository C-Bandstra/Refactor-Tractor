function fetchData() {
  let userData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/users/userData')
    .then(data => data.json())
    .then(response => {
      return response.userData
    })

  let activityData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData')
    .then(data => data.json())
    .then(response => {
      return response.activityData
    })

  let hydrationData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData')
    .then(data => data.json())
    .then(response => {
      return response.hydrationData
    })

  let sleepData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData')
    .then(data => data.json())
    .then(response => {
      return response.sleepData
    })
   

  return Promise.all([userData, activityData, hydrationData, sleepData]).then(data => {

    let allData = {}

    allData.userData = data[0]
    allData.activityData = data[1]
    allData.hydrationData = data[2]
    allData.sleepData = data[3]
    
    return allData
  })
}

export default fetchData