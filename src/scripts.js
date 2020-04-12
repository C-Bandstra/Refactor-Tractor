import fetchData from './allData.js'
import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import dom from './dom.js';
import $ from "jQuery"
// import styles from './css/styles.scss';
// import './css/base.scss';
import './css/base.scss';

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
    generateUser();
    createUserActivities();
    createUserHydration();
    createUserSleep();
    createTodayDate();
    dom.load(data);
  })
  .catch(err => console.log(err))

let generateUser = () => {
  let random = Math.floor(Math.random() * data.userRepository.users.length)
  data.user = new User(data.userRepository.users[random])
  data.user.calculateAverageHoursThisWeek(data.todayDate);
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
    data.sleep = new Sleep(sleep, data.user);
  })
}

let createTodayDate = () => {
  let randomIndex = Math.floor(Math.random() * data.activityData.length);
  data.todayDate = data.activityData[randomIndex].date;
}

// event listeners ---------

$('.switch-field').on('click', function(event) {
  if (event.target.id === 'sleep') {
    $('.sleep-input').removeClass('hide')
    $('.activity-input').addClass('hide')
    $('.hydration-input').addClass('hide')
  }
   if (event.target.id === 'activity') {
    $('.sleep-input').addClass('hide')
    $('.activity-input').removeClass('hide')
    $('.hydration-input').addClass('hide')
  }
   if (event.target.id === 'hydration') {
    $('.sleep-input').addClass('hide')
    $('.activity-input').addClass('hide')
    $('.hydration-input').removeClass('hide')
  }
})

// submit sleep data ------

$('.sleep-submit-btn').on('click', function() {
  console.log(data.user.id);
  console.log($('#sleep-date').val());
  console.log($('#sleep-hours').val());
  console.log($('#sleep-quality').val());
//  console.log(
//    fetch("https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData", {
//   method: 'POST',
//   headers: {
//   	'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     "userID": data.user.id,
//     "date": $('#sleep-date').val(),
//     "hoursSlept": $('#sleep-hours').val(),
//     "sleepQuality": $('#sleep-quality').val()
//   }),
// })
//   .then(response => response.json())
//   .then(json => console.log('Request success: ', json))
//   .catch(err => console.log('Request failure: ', error));
//  )
})

$('.activity-submit-btn').on('click', function() {
  console.log(data.user.id);
  console.log($('#activity-date').val());
  console.log($('#total-steps').val());
  console.log($('#stair-flights').val());
  console.log($('#minutes-active').val());
//  console.log(
//   fetch("https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData", {
//   method: 'POST',
//   headers: {
//   	'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     "userID": data.user.id,
//     "date": $('#activity-date').val(),
//     "numSteps": $('#total-steps').val(),
//     "minutesActive": $('#minutes-active').val(),
//     "flightsOfStairs": $('#stair-flights').val()
//   }),
// })
//   .then(response => response.json())
//   .then(json => console.log('Request success: ', json))
//   .catch(err => console.log('Request failure: ', error));
//  )
})

$('.hydration-submit-btn').on('click', function() {
  console.log(data.user.id);
  console.log($('#total-ounces').val());
  console.log($('#hydration-date').val());
//  console.log(
//   fetch("https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData", {
//   method: 'POST',
//   headers: {
//   	'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//       "userID": data.user.id,
//       "date": $('#hydration-date').val(),
//       "numOunces": $('#total-ounces').val()
//   }),
// })
//   .then(response => response.json())
//   .then(json => console.log('Request success: ', json))
//   .catch(err => console.log('Request failure: ', error));
//  )
})
