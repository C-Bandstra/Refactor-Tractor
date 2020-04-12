import fetchData from './allData.js'
import UserRepository from './UserRepository';
import dom from './dom.js';

const data = {
  user: null,
  userData: null,
  activityData: null,
  hydrationData: null,
  sleepData: null,
  userRepository: null,
  todayDate: null
}

fetchData().then(response => {
  data.userData = response.userData;
  data.activityData = response.activityData;
  data.hydrationData = response.hydrationData;
  data.sleepData = response.sleepData;
})
  .then( () => {
    data.userRepository = new UserRepository(data)
    data.userRepository.populateUser();
    generateUser();
    createTodayDate();
    dom.load(data);
  })
  .catch(err => console.log(err))

let generateUser = () => {
  let random = Math.floor(Math.random() * data.userRepository.users.length)
  data.user = data.userRepository.users[random]
  data.user.calculateAverageHoursThisWeek(data.todayDate);
}

let createTodayDate = () => {
  let randomIndex = Math.floor(Math.random() * data.activityData.length);
  data.todayDate = data.activityData[randomIndex].date;
}
