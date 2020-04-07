import './css/base.scss';
import './css/styles.scss';
import $ from "jQuery"

const dom = {

  load(data) {
    this.changeSteps(data);
    this.changeSleep(data);
  },

  changeSteps(data) {
    this.addUserSteps(data);
    this.addStepCalendar(data);
    this.addStepTrending(data);
    this.addStepInfo(data);
    this.stepFriendsInfo(data);
  },

  addUserSteps(data) {
    $('#user-steps-today').text(data.activityData.find(activity => {
      return activity.userID === data.user.id && activity.date === data.todayDate;
    }).numSteps);
  },

  addStepCalendar(data) {
    $('#steps-calendar-total-active-minutes-weekly').text(data.user.calculateAverageMinutesActiveThisWeek(data.todayDate));
    $('#steps-calendar-total-steps-weekly').text(data.user.calculateAverageStepsThisWeek(data.todayDate));
  },

  addStepTrending(data) {
    $('.steps-trending-button').on('click', function() {
      data.user.findTrendingStepDays();
      $('.trending-steps-phrase-container').html(`<p class='trend-line'>${data.user.trendingStepDays[0]}</p>`)
    });
  },

  addStepInfo(data) {
    $('#steps-info-miles-walked-today').text(data.user.activityRecord.find(activity => {
     return (activity.date === data.todayDate && activity.userId === data.user.id)
    }))
    $('#steps-info-active-minutes-today').text(data.activityData.find(activity => {
     return activity.userID === data.user.id && activity.date === data.todayDate;
    }).minutesActive);
  },

  stepFriendsInfo(data) {
    $('#steps-friend-active-min-avg-today').text(data.userRepository.calculateAverageMinutesActive(data.todayDate));
    $('#steps-friend-average-step-goal').text(`${data.userRepository.calculateAverageStepGoal()}`);
    $('#steps-friend-avg-today').text(data.userRepository.calculateAverageSteps(data.todayDate));
    data.user.findFriendsTotalStepsForWeek(data.userRepository.users, data.todayDate);
  },

  changeSleep(data) {
    this.addUserSleep(data);
    this.addSleepCalendar(data);
    this.addSleepInfo(data);
    this.addFriendSleepInfo(data);
  },

  addUserSleep(data) {
    $('#sleep-info-quality-today').text(data.sleepData.find(sleep => {
      return sleep.userID === data.user.id && sleep.date === data.todayDate;
    }).sleepQuality)
    $('#sleep-user-hours-today').text(data.sleepData.find(sleep => {
      return sleep.userID === data.user.id && sleep.date === data.todayDate;
    }).hoursSlept)
  },

  addSleepCalendar(data) {
    $('#sleep-calendar-hours-average-weekly').text(data.user.calculateAverageHoursThisWeek(data.todayDate));
    $('#sleep-calendar-quality-average-weekly').text(data.user.calculateAverageQualityThisWeek(data.todayDate));
  },

  addSleepInfo(data) {
    //maybe we need to invoke the updateSleep method in User class, which is invokes
    //in sleep class in sleep(userRep) method but don't know where that's invoked
    console.log($('#sleep-info-hours-average-alltime').text(data.user.hoursSleptAverage));
    $('#sleep-info-hours-average-alltime').text(data.user.hoursSleptAverage);
    $('#sleep-info-quality-average-alltime').text(data.user.sleepQualityAverage);
  },

  addFriendSleepInfo(data) {
    $('#sleep-friend-longest-sleeper').text(data.userRepository.users.find(user => {
        return user.id === data.userRepository.getLongestSleepers(data.todayDate)
      }).getFirstName());
    $('#sleep-friend-worst-sleeper').text(data.userRepository.users.find(user => {
      return user.id === data.userRepository.getWorstSleepers(data.todayDate)
    }).getFirstName());
  }

}

changeHydration(data) {
  this.addUserHydration(data);
  // this.addHydrationCalendar(data);
  // this.addHydrationInfo(data);
  this.addUserGlasses(data);
  this.addFriendHydration(data);
},


addUserHydration(data) {
  $('#hydration-user-ounces-today').text(data.hydrationData.find(hydration => {
    return hydration.userID === data.user.id && hydration.date === data.todayDate;
  }).numOunces);
},

// addHydrationCalendar(data) {

// },
//
// addHydrationInfo(data) {

//   },

addUserGlasses(data) {
  $('#hydration-info-glasses-today').text(data.hydrationData.find(hydration => {
    return hydration.userID === data.user.id && hydration.date === data.todayDate;
  }).numOunces / 8)
},

addFriendHydration(data) {
  $('#hydration-friend-ounces-today').text(data.userRepository.calculateAverageDailyWater(data.todayDate));
},

// let user = userRepository.users[0];
// let todayDate = "2019/09/22";
// user.findFriendsNames(userRepository.users);

// //JQuery to taget elements

let dailyOz = document.querySelectorAll('.daily-oz');
let dropdownFriendsStepsContainer = document.querySelector('#dropdown-friends-steps-container');
let dropdownGoal = document.querySelector('#dropdown-goal');
let hydrationCalendarCard = document.querySelector('#hydration-calendar-card');
let hydrationFriendsCard = document.querySelector('#hydration-friends-card');
let hydrationInfoCard = document.querySelector('#hydration-info-card');
let hydrationMainCard = document.querySelector('#hydration-main-card');
let mainPage = document.querySelector('main');
let profileButton = document.querySelector('#profile-button');
let sleepCalendarCard = document.querySelector('#sleep-calendar-card');
let sleepFriendsCard = document.querySelector('#sleep-friends-card');
let sleepInfoCard = document.querySelector('#sleep-info-card');
let sleepMainCard = document.querySelector('#sleep-main-card');
// let sortedHydrationDataByDate = user.ouncesRecord.sort((a, b) => {
//   if (Object.keys(a)[0] > Object.keys(b)[0]) {
//     return -1;
//   }
//   if (Object.keys(a)[0] < Object.keys(b)[0]) {
//     return 1;
//   }
//   return 0;
// });
let stairsCalendarCard = document.querySelector('#stairs-calendar-card');
let stepsMainCard = document.querySelector('#steps-main-card');
let stepsInfoCard = document.querySelector('#steps-info-card');
let stepsFriendsCard = document.querySelector('#steps-friends-card');
let stepsTrendingCard = document.querySelector('#steps-trending-card');
let stepsCalendarCard = document.querySelector('#steps-calendar-card');
let stairsFriendsCard = document.querySelector('#stairs-friends-card');
let stairsInfoCard = document.querySelector('#stairs-info-card');
let stairsMainCard = document.querySelector('#stairs-main-card');
let stairsTrendingButton = document.querySelector('.stairs-trending-button');
let stairsTrendingCard = document.querySelector('#stairs-trending-card');
let trendingStepsPhraseContainer = document.querySelector('.trending-steps-phrase-container');
let userInfoDropdown = document.querySelector('#user-info-dropdown');

//JQuery on click to invoke functions

mainPage.addEventListener('click', showInfo);
// profileButton.addEventListener('click', showDropdown);

function flipCard(cardToHide, cardToShow) {
  cardToHide.classList.add('hide');
  cardToShow.classList.remove('hide');
}

//Refactor and find reduncancies

function showInfo() {
  if (event.target.classList.contains('steps-info-button')) {
    flipCard(stepsMainCard, stepsInfoCard);
  }
  if (event.target.classList.contains('steps-friends-button')) {
    flipCard(stepsMainCard, stepsFriendsCard);
  }
  if (event.target.classList.contains('steps-trending-button')) {
    flipCard(stepsMainCard, stepsTrendingCard);
  }
  if (event.target.classList.contains('steps-calendar-button')) {
    flipCard(stepsMainCard, stepsCalendarCard);
  }
  if (event.target.classList.contains('hydration-info-button')) {
    flipCard(hydrationMainCard, hydrationInfoCard);
  }
  if (event.target.classList.contains('hydration-friends-button')) {
    flipCard(hydrationMainCard, hydrationFriendsCard);
  }
  if (event.target.classList.contains('hydration-calendar-button')) {
    flipCard(hydrationMainCard, hydrationCalendarCard);
  }
  if (event.target.classList.contains('stairs-info-button')) {
    flipCard(stairsMainCard, stairsInfoCard);
  }
  if (event.target.classList.contains('stairs-friends-button')) {
    flipCard(stairsMainCard, stairsFriendsCard);
  }
  if (event.target.classList.contains('stairs-trending-button')) {
    flipCard(stairsMainCard, stairsTrendingCard);
  }
  if (event.target.classList.contains('stairs-calendar-button')) {
    flipCard(stairsMainCard, stairsCalendarCard);
  }
  if (event.target.classList.contains('sleep-info-button')) {
    flipCard(sleepMainCard, sleepInfoCard);
  }
  if (event.target.classList.contains('sleep-friends-button')) {
    flipCard(sleepMainCard, sleepFriendsCard);
  }
  if (event.target.classList.contains('sleep-calendar-button')) {
    flipCard(sleepMainCard, sleepCalendarCard);
  }
  if (event.target.classList.contains('steps-go-back-button')) {
    flipCard(event.target.parentNode, stepsMainCard);
  }
  if (event.target.classList.contains('hydration-go-back-button')) {
    flipCard(event.target.parentNode, hydrationMainCard);
  }
  if (event.target.classList.contains('stairs-go-back-button')) {
    flipCard(event.target.parentNode, stairsMainCard);
  }
  if (event.target.classList.contains('sleep-go-back-button')) {
    flipCard(event.target.parentNode, sleepMainCard);
  }
}

//Add current class and pass in current class as parameter.

// function updateTrendingStairsDays() {
//   user.findTrendingStairsDays();
//   trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
// }

// function updateTrendingStepDays() {
//   user.findTrendingStepDays();
//   trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
// }

// dropdownGoal.innerText = `DAILY STEP GOAL | ${user.dailyStepGoal}`;
//
// $('#dropdown-email').text(`EMAIL | ${user.email}`)
// $('#dropdown-name').text(`${user.name.toUpperCase()}`)
// $('#header-name').text(`${user.getFirstName()}'S `)
// $('#hydration-user-ounces-today').text(hydrationData.find(hydration => {
//   return hydration.userID === user.id && hydration.date === todayDate;
// }).numOunces);
// $('#hydration-friend-ounces-today').text(userRepository.calculateAverageDailyWater(todayDate));
// $('#hydration-info-glasses-today').text(hydrationData.find(hydration => {
//     return hydration.userID === user.id && hydration.date === todayDate;
//   }).numOunces / 8)
//
//
// $('#stairs-calendar-flights-average-weekly').text(user.calculateAverageFlightsThisWeek(todayDate));
// $('#stairs-calendar-stairs-average-weekly').text((user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0));
// $('#stairs-friend-flights-average-today').text((userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1));
// $('#stairs-info-flights-today').text(data.activityData.find(activity => {
//     return activity.userID === user.id && activity.date === todayDate;
//   }).flightsOfStairs);
// $('#stairs-user-stairs-today').text(data.activityData.find(activity => {
//     return activity.userID === user.id && activity.date === todayDate;
//   }).flightsOfStairs * 12);
// $('.stairs-trending-button').on('click', function() {
//   user.findTrendingStairsDays();
//   $('.trending-stairs-phrase-container').html(`<p class='trend-line'>${user.trendingStairsDays[0]}</p>`);
//   });

//
// user.friendsActivityRecords.forEach(friend => {
//   dropdownFriendsStepsContainer.innerHTML += `
//   <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>
//   `;
// });

// let friendsStepsParagraphs = document.querySelectorAll('.friends-steps');
//
// friendsStepsParagraphs.forEach(paragraph => {
//   if (friendsStepsParagraphs[0] === paragraph) {
//     paragraph.classList.add('green-text');
//   }
//   if (friendsStepsParagraphs[friendsStepsParagraphs.length - 1] === paragraph) {
//     paragraph.classList.add('red-text');
//   }
//   if (paragraph.innerText.includes('YOU')) {
//     paragraph.classList.add('yellow-text');
//   }
// });


export default dom;
