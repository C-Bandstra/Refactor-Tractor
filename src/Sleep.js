class Sleep { // instance for the user's sleep each day
  constructor(data, user) {
    this.user = user;
    this.date = data.date;
    this.hoursSlept = data.hoursSlept;
    this.sleepQuality = data.sleepQuality;
    this.sleep();
  }
  sleep() {
    this.user.updateSleep(this.date, this.hoursSlept, this.sleepQuality);
  }
}

export default Sleep;
