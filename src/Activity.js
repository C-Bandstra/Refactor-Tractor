class Activity {
  constructor(user, current) {
    this.user = user;
    this.date = current.date;
    this.steps = current.numSteps;
    this.minutesActive = current.minutesActive;
    this.flightsOfStairs = current.flightsOfStairs;
    this.milesWalked = 0;
    this.reachedStepGoal = null;
    this.doActivity();
  }

  doActivity() {
    this.user.updateActivities(this)
  }

  calculateMiles() {
    return Math.round(this.steps * this.user.strideLength / 5280).toFixed(1);
  }

  compareStepGoal() {
    this.reachedStepGoal = this.steps >= this.user.dailyStepGoal;
  }
}

export default Activity;
