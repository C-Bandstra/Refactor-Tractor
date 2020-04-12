import sleepData from './data/sleep';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';

class UserRepository {
  constructor(data) {
    this.users = [];
    this.activityData = data.activityData;
    this.hydrationData = data.hydrationData;
    this.sleepData = data.sleepData;
    this.userData = data.userData;
  }

  populateUser() {
    this.userData.forEach(user => {
      let newUser = new User(user)
      this.create(Activity, this.activityData, newUser)
      this.create(Hydration, this.hydrationData, newUser)
      this.create(Sleep, this.sleepData, newUser)
      this.users.push(newUser)
    })
  }

  create(file, data, newUser) {
    let current = data.filter(activity => newUser.id == activity.userID)
    current.forEach(match => {
      new file(newUser, match)
    })
  }

  find(record, date) {
    return record.filter(item => {
      return item.date === date;
    })
  }

  activityAverage(act, date) {
    let allRecords = this.users.map(user => {
      return this.find(user.activityRecord, date)
    })
    let sumOfAct = allRecords.reduce((actSum, activityCollection) => {
      activityCollection.forEach(activity => {
        actSum += activity[act];
      })
      return actSum;
    }, 0);
    return Math.round(sumOfAct / allRecords.length);
  }

  calculateAverageStepGoal() {
    let goals = this.users.map(function(user) {
      return user.dailyStepGoal;
    });
    let total = goals.reduce(function(sum, goal) {
      sum += goal;
      return sum;
    }, 0);
    return total / this.users.length;
  }

  calculateAverageSleepQuality() {
    let totalSleepQuality = this.users.reduce((sum, user) => {
      sum += user.sleepQualityAverage;
      return sum;
    }, 0);
    return totalSleepQuality / this.users.length;
  }

  calculateAverageDailyWater(date) {
    let todaysDrinkers = this.users.filter(user => {
      return user.addDailyOunces(date) > 0;
    });
    
    let sumDrankOnDate = todaysDrinkers.reduce((sum, drinker) => {
      return sum += drinker.addDailyOunces(date);
    }, 0)
    return Math.floor(sumDrankOnDate / todaysDrinkers.length);
  }

  findBestSleepers(date) {
    return this.users.filter(user => {
      return user.calculateAverageQualityThisWeek(date) > 3;
    })
  }

  getLongestSleepers(date) {
    return this.find(sleepData, date)
      .sort((a, b) => {
        return b.hoursSlept - a.hoursSlept;
      })[0].userID;
  }

  getWorstSleepers(date) {
    return this.find(sleepData, date)
      .sort((a, b) => {
        return a.hoursSlept - b.hoursSlept;
      })[0].userID;
  }
}

export default UserRepository;
