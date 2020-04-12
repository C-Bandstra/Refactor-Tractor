class Sleep { // instance for the user's sleep each day
  constructor(user, current) {
    this.user = user;
    this.date = current.date;
    this.hoursSlept = current.hoursSlept;
    this.sleepQuality = current.sleepQuality;
    this.sleep();
  }
  sleep() {
    this.user.updateSleep(this.date, this.hoursSlept, this.sleepQuality);
  }
}

export default Sleep;
