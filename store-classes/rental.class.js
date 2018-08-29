class Rental {
  constructor(data) {
    this._data = data;
  }

  get daysRented() {
    return this._data.daysRented;
  }
  
  
  get movie() {
    return this._data.movie;
  }
}

module.exports = {Rental};
