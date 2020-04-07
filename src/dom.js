import './css/base.scss';
import './css/styles.scss';

const dom = {

  load(data) {
    this.changeText(data);

  },
  changeText(data) {
    console.log(data.sleepData)
  }
}

// let user = userRepository.users[0];
// let todayDate = "2019/09/22";
// user.findFriendsNames(userRepository.users);

// //JQuery to taget elements

// let dailyOz = document.querySelectorAll('.daily-oz');
// let dropdownFriendsStepsContainer = document.querySelector('#dropdown-friends-steps-container');
// let dropdownGoal = document.querySelector('#dropdown-goal');
// let hydrationCalendarCard = document.querySelector('#hydration-calendar-card');
// let hydrationFriendsCard = document.querySelector('#hydration-friends-card');
// let hydrationInfoCard = document.querySelector('#hydration-info-card');
// let hydrationMainCard = document.querySelector('#hydration-main-card');
// let mainPage = document.querySelector('main');
// let profileButton = document.querySelector('#profile-button');
// let sleepCalendarCard = document.querySelector('#sleep-calendar-card');
// let sleepFriendsCard = document.querySelector('#sleep-friends-card');
// let sleepInfoCard = document.querySelector('#sleep-info-card');
// let sleepMainCard = document.querySelector('#sleep-main-card');
// let sortedHydrationDataByDate = user.ouncesRecord.sort((a, b) => {
//   if (Object.keys(a)[0] > Object.keys(b)[0]) {
//     return -1;
//   }
//   if (Object.keys(a)[0] < Object.keys(b)[0]) {
//     return 1;
//   }
//   return 0;
// });
// let stairsCalendarCard = document.querySelector('#stairs-calendar-card');
// let stepsMainCard = document.querySelector('#steps-main-card');
// let stepsInfoCard = document.querySelector('#steps-info-card');
// let stepsFriendsCard = document.querySelector('#steps-friends-card');
// let stepsTrendingCard = document.querySelector('#steps-trending-card');
// let stepsCalendarCard = document.querySelector('#steps-calendar-card');
// let stairsFriendsCard = document.querySelector('#stairs-friends-card');
// let stairsInfoCard = document.querySelector('#stairs-info-card');
// let stairsMainCard = document.querySelector('#stairs-main-card');
// let stairsTrendingButton = document.querySelector('.stairs-trending-button');
// let stairsTrendingCard = document.querySelector('#stairs-trending-card');
// let trendingStepsPhraseContainer = document.querySelector('.trending-steps-phrase-container');
// let userInfoDropdown = document.querySelector('#user-info-dropdown');

// //JQuery on click to invoke functions

// mainPage.addEventListener('click', showInfo);
// profileButton.addEventListener('click', showDropdown);

// function flipCard(cardToHide, cardToShow) {
//   cardToHide.classList.add('hide');
//   cardToShow.classList.remove('hide');
// }

// //Refactor and find reduncancies

// function showInfo() {
//   if (event.target.classList.contains('steps-info-button')) {
//     flipCard(stepsMainCard, stepsInfoCard);
//   }
//   if (event.target.classList.contains('steps-friends-button')) {
//     flipCard(stepsMainCard, stepsFriendsCard);
//   }
//   if (event.target.classList.contains('steps-trending-button')) {
//     flipCard(stepsMainCard, stepsTrendingCard);
//   }
//   if (event.target.classList.contains('steps-calendar-button')) {
//     flipCard(stepsMainCard, stepsCalendarCard);
//   }
//   if (event.target.classList.contains('hydration-info-button')) {
//     flipCard(hydrationMainCard, hydrationInfoCard);
//   }
//   if (event.target.classList.contains('hydration-friends-button')) {
//     flipCard(hydrationMainCard, hydrationFriendsCard);
//   }
//   if (event.target.classList.contains('hydration-calendar-button')) {
//     flipCard(hydrationMainCard, hydrationCalendarCard);
//   }
//   if (event.target.classList.contains('stairs-info-button')) {
//     flipCard(stairsMainCard, stairsInfoCard);
//   }
//   if (event.target.classList.contains('stairs-friends-button')) {
//     flipCard(stairsMainCard, stairsFriendsCard);
//   }
//   if (event.target.classList.contains('stairs-trending-button')) {
//     flipCard(stairsMainCard, stairsTrendingCard);
//   }
//   if (event.target.classList.contains('stairs-calendar-button')) {
//     flipCard(stairsMainCard, stairsCalendarCard);
//   }
//   if (event.target.classList.contains('sleep-info-button')) {
//     flipCard(sleepMainCard, sleepInfoCard);
//   }
//   if (event.target.classList.contains('sleep-friends-button')) {
//     flipCard(sleepMainCard, sleepFriendsCard);
//   }
//   if (event.target.classList.contains('sleep-calendar-button')) {
//     flipCard(sleepMainCard, sleepCalendarCard);
//   }
//   if (event.target.classList.contains('steps-go-back-button')) {
//     flipCard(event.target.parentNode, stepsMainCard);
//   }
//   if (event.target.classList.contains('hydration-go-back-button')) {
//     flipCard(event.target.parentNode, hydrationMainCard);
//   }
//   if (event.target.classList.contains('stairs-go-back-button')) {
//     flipCard(event.target.parentNode, stairsMainCard);
//   }
//   if (event.target.classList.contains('sleep-go-back-button')) {
//     flipCard(event.target.parentNode, sleepMainCard);
//   }
// }

// //Add current class and pass in current class as parameter.

// // function updateTrendingStairsDays() {
// //   user.findTrendingStairsDays();
// //   trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
// // }

// // function updateTrendingStepDays() {
// //   user.findTrendingStepDays();
// //   trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
// // }

// dropdownGoal.innerText = `DAILY STEP GOAL | ${user.dailyStepGoal}`;

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
// $('#sleep-calendar-hours-average-weekly').text(user.calculateAverageHoursThisWeek(todayDate));
// $('#sleep-calendar-quality-average-weekly').text(user.calculateAverageQualityThisWeek(todayDate))
// $('#sleep-friend-longest-sleeper').text(userRepository.users.find(user => {
//     return user.id === userRepository.getLongestSleepers(todayDate)
//   }).getFirstName());
// $('#sleep-friend-worst-sleeper').text(userRepository.users.find(user => {
//   return user.id === userRepository.getWorstSleepers(todayDate)
// }).getFirstName());
// $('#sleep-info-hours-average-alltime').text(user.hoursSleptAverage);
// $('#steps-info-miles-walked-today').text(user.activityRecord.find(activity => {
//   return (activity.date === todayDate && activity.userId === user.id)
// }).calculateMiles(userRepository));
// $('#sleep-info-quality-average-alltime').text(user.sleepQualityAverage);
// $('#sleep-info-quality-today').text(sleepData.find(sleep => {
//     return sleep.userID === user.id && sleep.date === todayDate;
//   }).sleepQuality)
// $('#sleep-user-hours-today').text(sleepData.find(sleep => {
//     return sleep.userID === user.id && sleep.date === todayDate;
//   }).hoursSlept)
// $('#stairs-calendar-flights-average-weekly').text(user.calculateAverageFlightsThisWeek(todayDate));
// $('#stairs-calendar-stairs-average-weekly').text((user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0));
// $('#stairs-friend-flights-average-today').text((userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1));
// $('#stairs-info-flights-today').text(activityData.find(activity => {
//     return activity.userID === user.id && activity.date === todayDate;
//   }).flightsOfStairs);
// $('#stairs-user-stairs-today').text(activityData.find(activity => {
//     return activity.userID === user.id && activity.date === todayDate;
//   }).flightsOfStairs * 12);
// $('#steps-calendar-total-active-minutes-weekly').text(user.calculateAverageMinutesActiveThisWeek(todayDate));
// $('#steps-calendar-total-steps-weekly').text(user.calculateAverageStepsThisWeek(todayDate));
// $('.stairs-trending-button').on('click', function() {
//   user.findTrendingStairsDays();
//   $('.trending-stairs-phrase-container').html(`<p class='trend-line'>${user.trendingStairsDays[0]}</p>`);
//   });
// $('.steps-trending-button').on('click', function() {
//   user.findTrendingStepDays();
//   $('.trending-steps-phrase-container').html(`<p class='trend-line'>${user.trendingStepDays[0]}</p>`);
//   });
// $('#steps-friend-active-min-avg-today').text(userRepository.calculateAverageMinutesActive(todayDate));
// $('#steps-friend-average-step-goal').text(`${userRepository.calculateAverageStepGoal()}`);
// $('#steps-friend-avg-today').text(userRepository.calculateAverageSteps(todayDate));
// $('#steps-info-active-minutes-today').text(activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).minutesActive);
// $('#user-steps-today').text(activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).numSteps);

// user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);

// user.friendsActivityRecords.forEach(friend => {
//   dropdownFriendsStepsContainer.innerHTML += `
//   <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>
//   `;
// });

// let friendsStepsParagraphs = document.querySelectorAll('.friends-steps');

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