import fetchData from './allData.js'
import UserRepository from './UserRepository';
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
    data.userRepository = new UserRepository(data)
    data.userRepository.populateUser();
    generateUser();
    createTodayDate();
    dom.load(data);
  })
  .catch(err => console.log(err))

let generateUser = () => {
  let random = Math.floor(Math.random() * 50)
  data.user = data.userRepository.users[random]
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

// submit sleep, activity and hydration data ------

$('.sleep-submit-btn').on('click', function() {
  event.preventDefault();
  if ($('#sleep-date').val().length === 10 && $('#sleep-hours').val().length >= 1 &&
    $('#sleep-quality').val().length >= 1 && $('#sleep-quality').val() <= 5) {
    fetch("https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData", {
      method: 'POST',
      headers: {
      	'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "userID": data.user.id,
        "date": $('#sleep-date').val().split('-').join('/'),
        "hoursSlept": parseInt($('#sleep-hours').val()),
        "sleepQuality": parseInt($('#sleep-quality').val())
      }),
    })
      .then(response => response.json())
      .then(json => {
        console.log('Request success: ', json)
        $('.sleep-input').find('input').val('')
      })
      .catch(err => console.log('Request failure: ', error));
      window.alert('Your info has been submitted!');
  } else {
    window.alert('Please use the correct input format');
  }
})

$('.activity-submit-btn').on('click', function() {
  event.preventDefault();
  if ($('#activity-date').val().length === 10 && $('#total-steps').val().length >= 1 &&
    $('#minutes-active').val().length >= 1 && $('#stair-flights').val().length >= 1) {
    fetch("https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData", {
      method: 'POST',
      headers: {
      	'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "userID": data.user.id,
        "date": $('#activity-date').val().split('-').join('/'),
        "numSteps": parseInt($('#total-steps').val()),
        "minutesActive": parseInt($('#minutes-active').val()),
        "flightsOfStairs": parseInt($('#stair-flights').val())
      }),
    })
    .then(response => response.json())
    .then(json => {
      console.log('Request success: ', json)
      $('.activity-input').find('input').val('')
    })
    .catch(err => console.log('Request failure: ', error));
    window.alert('Your info has been submitted!');
  } else {
    window.alert('Please use the correct input format');
  }
})

$('.hydration-submit-btn').on('click', function() {
   event.preventDefault();
  if ($('#hydrate-date').val().length === 10 &&
    $('#total-ounces').val().length >= 1) {
    fetch("https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData", {
      method: 'POST',
      headers: {
      	'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "userID": data.user.id,
          "date": $('#hydrate-date').val().split('-').join('/'),
          "numOunces": parseInt($('#total-ounces').val())
      }),
    })
    .then(response => response.json())
    .then(json => {
      console.log('Request success: ', json)
      $('.hydration-input').find('input').val('')
    })
    .catch(err => console.log('Request failure: ', error));
    window.alert('Your info has been submitted!');
  } else {
    window.alert('Please use the correct input format');
  }
})

/// ------ profile dropdown and card button events

$('#profile-button').on('click', function(event) {
  $('#user-info-dropdown').toggleClass('hide');
  })

function flipCard(cardToHide, cardToShow) {
  cardToHide.classList.add('hide');
  cardToShow.classList.remove('hide');
}

$('.main').on('click', function(event) {
  if (event.target.parentNode.parentNode.id === 'stairs-main-card' ||
    $(event.target).hasClass('go-back-button')) {
    clickStairsCard(event);
  }
  if (event.target.parentNode.parentNode.id === 'steps-main-card' ||
    $(event.target).hasClass('go-back-button')) {
    clickStepsCard(event);
  }
  if (event.target.parentNode.parentNode.id === 'hydration-main-card' ||
    $(event.target).hasClass('go-back-button')) {
    clickHydrationCard(event);
  }
  if (event.target.parentNode.parentNode.id === 'sleep-main-card' ||
    $(event.target).hasClass('go-back-button')) {
    clickSleepCard(event);
  }
})

function clickStairsCard(event) {
  let stairsMainCard = $('#stairs-main-card');
  let buttonCard = $(`#${event.target.dataset.card}-card`);
  if ($(event.target).hasClass(`${event.target.dataset.card}-button`) &&
    event.target.dataset.card !== 'go-back') {
    flipCard(stairsMainCard[0], buttonCard[0]);
  }
  if ($(event.target).hasClass('stairs-go-back-button')) {
    flipCard(event.target.parentNode, stairsMainCard[0]);
  }
}

function clickStepsCard(event) {
  let stepsMainCard = $('#steps-main-card');
  let buttonCard = $(`#${event.target.dataset.card}-card`);
  if ($(event.target).hasClass(`${event.target.dataset.card}-button`) &&
    event.target.dataset.card !== 'go-back') {
    flipCard(stepsMainCard[0], buttonCard[0]);
  }
  if ($(event.target).hasClass('steps-go-back-button')) {
    flipCard(event.target.parentNode, stepsMainCard[0]);
  }
}

function clickHydrationCard(event) {
  let hydrationMainCard = $('#hydration-main-card');
  let buttonCard = $(`#${event.target.dataset.card}-card`);
  if ($(event.target).hasClass(`${event.target.dataset.card}-button`) &&
    event.target.dataset.card !== 'go-back') {
    flipCard(hydrationMainCard[0], buttonCard[0]);
  }
  if ($(event.target).hasClass('hydration-go-back-button'))  {
    flipCard(event.target.parentNode, hydrationMainCard[0]);
  }
}

function clickSleepCard(event) {
  let sleepMainCard = $('#sleep-main-card');
  let buttonCard = $(`#${event.target.dataset.card}-card`);
  if ($(event.target).hasClass(`${event.target.dataset.card}-button`) &&
    event.target.dataset.card !== 'go-back') {
    flipCard(sleepMainCard[0], buttonCard[0]);
  }
  if ($(event.target).hasClass('sleep-go-back-button')) {
    flipCard(event.target.parentNode, sleepMainCard[0]);
  }
}
