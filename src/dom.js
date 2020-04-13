import './css/base.scss';
import $ from "jQuery"

const dom = {

  load(data) {
    this.hideInputs();
    this.changeSteps(data);
    this.changeSleep(data);
    this.changeHydration(data);
    this.changeStairs(data);
    this.populateNavBar(data);
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
    $('#steps-calendar-total-active-minutes-weekly').text(data.user.calculateWeeklyAverage(data.user.activityRecord, 'minutesActive', data.todayDate));
    $('#steps-calendar-total-steps-weekly').text(data.user.calculateWeeklyAverage(data.user.activityRecord, 'steps', data.todayDate));
  },

  addStepTrending(data) {
    $('.steps-trending-button').on('click', function() {
      data.user.findTrending('trendingStepDays', 'steps', 'step');
      $('.trending-steps-phrase-container').html(`<p class='trend-line'>${data.user.trendingStepDays[0]}</p>`)
    });
  },

  addStepInfo(data) {
    $('#steps-info-miles-walked-today').text(data.user.activityRecord.find(activity => {
      return (activity.date === data.todayDate && activity.user.id === data.user.id)
    }).calculateMiles())
    $('#steps-info-active-minutes-today').text(data.activityData.find(activity => {
      return activity.userID === data.user.id && activity.date === data.todayDate;
    }).minutesActive);
  },

  stepFriendsInfo(data) {
    $('#steps-friend-active-min-avg-today').text(data.userRepository.activityAverage('steps', data.todayDate));
    $('#steps-friend-average-step-goal').text(`${data.userRepository.calculateAverageStepGoal()}`);
    $('#steps-friend-avg-today').text(data.userRepository.activityAverage('steps', data.todayDate));
    data.user.findFriendsTotalStepsForWeek(data.userRepository.users, data.todayDate);
  },

  changeSleep(data) {
    this.addUserSleep(data);
    this.addFriendSleepInfo(data);
    this.addSleepInfo(data);
    this.addSleepCalendar(data);
  },

  addUserSleep(data) {
    $('#sleep-info-quality-today').text(data.sleepData.find(sleep => {
      return sleep.userID === data.user.id && sleep.date === data.todayDate;
    }).sleepQuality)
    $('#sleep-user-hours-today').text(data.sleepData.find(sleep => {
      return sleep.userID === data.user.id && sleep.date === data.todayDate;
    }).hoursSlept)
  },

  addSleepInfo(data) {
    $('#sleep-info-hours-average-alltime').text(data.user.hoursSleptAverage);
    $('#sleep-info-quality-average-alltime').text(data.user.sleepQualityAverage);
  },

  addSleepCalendar(data) {
    $('#sleep-calendar-hours-average-weekly').text(data.user.calculateWeeklyAverage(data.user.sleepHoursRecord, 'hours', data.todayDate));
    $('#sleep-calendar-quality-average-weekly').text(data.user.calculateWeeklyAverage(data.user.sleepQualityRecord, 'quality', data.todayDate));
  },

  addFriendSleepInfo(data) {
    $('#sleep-friend-longest-sleeper').text(data.userRepository.users.find(user => {
      return user.id === data.userRepository.getLongestSleepers(data.todayDate)
    }).getFirstName());
    $('#sleep-friend-worst-sleeper').text(data.userRepository.users.find(user => {
      return user.id === data.userRepository.getWorstSleepers(data.todayDate)
    }).getFirstName());
  },

  changeHydration(data) {
    this.addUserHydration(data);
    this.addHydrationCalendar(data);
    this.addUserGlasses(data);
    this.addFriendHydration(data);
  },

  addUserHydration(data) {
    $('#hydration-user-ounces-today').text(data.hydrationData.find(hydration => {
      return hydration.userID === data.user.id && hydration.date === data.todayDate;
    }).numOunces);
  },

  addHydrationCalendar(data) {
    let todayOz = data.user.ouncesRecord.filter(date => date[data.todayDate]);
    let index = data.user.ouncesRecord.indexOf(todayOz[0])
    let lastIndex = index + 7
    let weekAmts = data.user.ouncesRecord.slice(index + 1, lastIndex)
    this.displayHydrationCalendar(weekAmts);
  },

  displayHydrationCalendar(weekAmts) {
    weekAmts.forEach(amt => {
      let day = weekAmts.indexOf(amt) + 1
      let keys = Object.keys(amt);
      $('#hydration-calendar-card').append(`<div class='hydration-data-line'>
      <p class='hydration-weekly-label'>${day} DAYS AGO: </p>
      <h4 class='hydration-weekly-amount'><span class='daily-oz' id='hydration-calendar-ounces-1day'></span>${amt[keys[0]]} oz</h4>
      </div>`)
    })
  },

  addUserGlasses(data) {
    $('#hydration-info-glasses-today').text(data.hydrationData.find(hydration => {
      return hydration.userID === data.user.id && hydration.date === data.todayDate;
    }).numOunces / 8)
  },

  addFriendHydration(data) {
    $('#hydration-friend-ounces-today').text(data.userRepository.calculateAverageDailyWater(data.todayDate));
  },

  changeStairs(data) {
    this.addUserStairs(data);
    this.addStairCalendar(data);
    this.addStairTrending(data);
    this.stairFriendsInfo(data);
    this.addStairInfo(data);
  },

  addUserStairs(data) {
    $('#stairs-user-stairs-today').text(data.activityData.find(activity => {
      return activity.userID === data.user.id && activity.date === data.todayDate;
    }).flightsOfStairs * 12);
  },

  addStairCalendar(data) {
    $('#stairs-calendar-flights-average-weekly').text(data.user.calculateWeeklyAverage(data.user.activityRecord, 'flightsOfStairs', data.todayDate));
    $('#stairs-calendar-stairs-average-weekly').text((data.user.calculateWeeklyAverage(data.user.activityRecord, 'flightsOfStairs', data.todayDate) * 12).toFixed(0))
  },

  addStairTrending(data) {
    $('.stairs-trending-button').on('click', function() {
      data.user.findTrending('trendingStairsDays', 'flightsOfStairs', 'climbing');
      $('.trending-stairs-phrase-container').html(`<p class='trend-line'>${data.user.trendingStairsDays[0]}</p>`);
    });
  },

  stairFriendsInfo(data) {
    $('#stairs-friend-flights-average-today').text((data.userRepository.activityAverage('flightsOfStairs', data.todayDate) / 12).toFixed(1));
  },

  addStairInfo(data) {
    $('#stairs-info-flights-today').text(data.activityData.find(activity => {
      return activity.userID === data.user.id && activity.date === data.todayDate;
    }).flightsOfStairs);
  },

  populateNavBar(data) {
    $('#header-name').text(`${data.user.getFirstName()}'S `)
    $('#dropdown-goal').text(`DAILY STEP GOAL | ${data.user.dailyStepGoal}`);
    $('#dropdown-email').text(`EMAIL | ${data.user.email}`)
    $('#dropdown-name').text(`${data.user.name.toUpperCase()}`)
    this.addProfileStats(data);
    this.changeDropdownColor();
  },

  addProfileStats(data) {
    data.user.friendsActivityRecords.forEach(friend => {
      $('#dropdown-friends-steps-container').append(`
    <p class='dropdown-p friends-steps'>${friend.name} |  ${friend.steps}</p>
    `);
    });
    data.user.calculateTotalStepsThisWeek(data.todayDate);
    $('#dropdown-friends-steps-container').prepend(`
    <p class='dropdown-p friends-steps'>YOU |  ${data.user.totalStepsThisWeek}</p>
  `);
  },

  hideInputs() {
    $('.activity-input').addClass('hide')
    $('.hydration-input').addClass('hide')
  },

  changeDropdownColor() {
    let friendsStepsParagraphs = $('#dropdown-friends-steps-container').children();
    friendsStepsParagraphs[0].classList.add('yellow-text');
    friendsStepsParagraphs[1].classList.add('red-text');
    friendsStepsParagraphs[(friendsStepsParagraphs.length - 1)].classList.add('green-text');
  }

};


export default dom;
