class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.address = userData.address;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.totalStepsThisWeek = 0;
    this.friends = userData.friends;
    this.ouncesAverage = 0;
    this.ouncesRecord = [];
    this.hoursSleptAverage = 0;
    this.sleepQualityAverage = 0;
    this.sleepHoursRecord = [];
    this.sleepQualityRecord = [];
    this.activityRecord = [];
    this.accomplishedDays = [];
    this.trendingStepDays = [];
    this.trendingStairsDays = [];
    this.friendsNames = [];
    this.friendsActivityRecords = []
  }

  getFirstName() {
    var names = this.name.split(' ');
    return names[0].toUpperCase();
  }

  updateHydration(date, amount) {
    this.ouncesRecord.unshift({[date]: amount});
    if (this.ouncesRecord.length) {
      this.ouncesAverage = Math.round((amount + (this.ouncesAverage * (this.ouncesRecord.length - 1))) / this.ouncesRecord.length);
    } else {
      this.ouncesAverage = amount;
    }
  }

  addDailyOunces(date) {
    return this.ouncesRecord.reduce((sum, record) => {
      let amount = record[date];
      if (amount) {
        sum += amount
      }
      return sum
    }, 0)
  }

  updateSleep(date, hours, quality) {
    this.sleepHoursRecord.unshift({date, hours});
    this.sleepQualityRecord.unshift({date, quality});
    this.updateSleepAverage(this.sleepHoursRecord, 'hoursSleptAverage', hours)
    this.updateSleepAverage(this.sleepQualityRecord, 'sleepQualityAverage', quality)
  }

  updateSleepAverage(record, average, unit) {
    if (record.length) {
      this[average] = ((unit + (this[average] * (record.length - 1))) / record.length).toFixed(1);
    } else {
      this[average] = unit;
    }
  }

  updateActivities(activity) {
    this.activityRecord.unshift(activity);
    if (activity.numSteps >= this.dailyStepGoal) {
      this.accomplishedDays.unshift(activity.date);
    }
  }

  findClimbingRecord() {
    return this.activityRecord.sort((a, b) => {
      return b.flightsOfStairs - a.flightsOfStairs;
    })[0].flightsOfStairs;
  }

  calculateDailyCalories(date) {
    let totalMinutes = this.activityRecord.filter(activity => {
      return activity.date === date
    }).reduce((sumMinutes, activity) => {
      return sumMinutes += activity.minutesActive
    }, 0);
    return Math.round(totalMinutes * 7.6);
  }

  calculateWeeklyAverage(record, unit, todayDate) {
    return (record.reduce((sum, item) => {
      let index = record.indexOf(record.find(item => item.date === todayDate));
      if (index <= record.indexOf(item) && record.indexOf(item) <= (index + 6)) {
        sum += item[unit];
      }
      return sum;
    }, 0) / 7).toFixed(0);
  }

  findTrending(trending, unit, act) {
    let positiveDays = [];
    for (var i = 0; i < this.activityRecord.length; i++) {
      if (this.activityRecord[i + 1] && this.activityRecord[i][unit] > this.activityRecord[i + 1][unit]) {
        positiveDays.unshift(this.activityRecord[i].date);
      } else if (positiveDays.length > 2) {
        this[trending].push(`Your most recent positive ${act} streak was ${positiveDays[0]} - ${positiveDays[positiveDays.length - 1]}!`);
        positiveDays = [];
      }
    }
  }

  findFriendsNames(users) {
    this.friends.forEach(friend => {
      this.friendsNames.push(users.find(user => user.id === friend).getFirstName());
    })
  }

  calculateTotalStepsThisWeek(todayDate) {
    return this.totalStepsThisWeek = (this.activityRecord.reduce((sum, activity) => {
      let index = this.activityRecord.indexOf(this.activityRecord.find(activity => activity.date === todayDate));
      if (index <= this.activityRecord.indexOf(activity) && this.activityRecord.indexOf(activity) <= (index + 6)) {
        sum += activity.steps;
      }
      return sum;
    }, 0));
  }

  findFriendsTotalStepsForWeek(users, date) {
    this.friends.forEach(friendId => {
      let friend = users[friendId - 1]
      let steps = {'name': friend.name, 'steps': friend.calculateTotalStepsThisWeek(date)}
      this.friendsActivityRecords.push(steps)
    })
    return this.friendsActivityRecords.sort((a, b) => b.steps - a.steps)
  }
}

export default User;
