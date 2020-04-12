class Hydration {
  constructor(user, current) {
    this.user = user;
    this.date = current.date;
    this.ounces = current.numOunces;
    this.drink();
  }
  drink() {
    this.user.updateHydration(this.date, this.ounces)
  }
}

export default Hydration;
