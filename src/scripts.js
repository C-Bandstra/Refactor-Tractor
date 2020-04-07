import fetchData from './allData.js'
import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
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
    data.userRepository = new UserRepository()
    createUsers();
    createUserActivities();
    createUserHydration();
    createUserSleep();
    generateUser();
    createTodayDate();
    dom.load(data);
  })
  .catch(err => console.log(err))

let generateUser = () => {
  let random = Math.floor(Math.random() * data.userRepository.users.length)
  data.user = new User(data.userRepository.users[random])
}

let createUsers = () => {
  data.userData.forEach(newUser => {
    newUser = new User(newUser);
    data.userRepository.users.push(newUser)
  });
}

let createUserActivities = () => {
  data.activityData.forEach(activity => {
    activity = new Activity(activity, data.userRepository);
  });
}

let createUserHydration = () => {
  data.hydrationData.forEach(hydration => {
    hydration = new Hydration(hydration, data.userRepository);
  });
}

let createUserSleep = () => {
  data.sleepData.forEach(sleep => {
    sleep = new Sleep(sleep, data.userRepository);
  })
}

let createTodayDate = () => {
  let randomIndex = Math.floor(Math.random() * data.activityData.length);
  data.todayDate = data.activityData[randomIndex].date;
}
