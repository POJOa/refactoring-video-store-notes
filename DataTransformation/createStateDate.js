function createStatementData(customer, movies) {
  let result = Object.assign({}, customer);
  result.rentals = customer.rentals.map(r => createRentalData(r));
  result.totalAmount = totalAmount();
  result.totalFrequentRenterPoints = totalFrequentRenterPoints();
  return result;

  function createRentalData(rental) {
    let result = Object.assign({}, rental);
    result.title = movieFor(rental).title;
    result.amount = amountFor(rental);
    return result;
  }

  function movieFor(rental) {
    return movies[rental.movieID];
  }

  function amountFor(rental) {
    let result = 0;

    // determine amount for each movie
    switch (movieFor(rental, movies).code) {
      case 'regular':
        result = 2;
        if (rental.days > 2) {
          result += (rental.days - 2) * 1.5;
        }
        break;
      case 'new':
        result = rental.days * 3;
        break;
      case 'childrens':
        result = 1.5;
        if (rental.days > 3) {
          result += (rental.days - 3) * 1.5;
        }
        break;
    }
    return result;
  }

  function totalAmount() {
    let result = 0;
    for (let r of customer.rentals) {
      result += amountFor(r);
    }
    return result;
  }

  function totalFrequentRenterPoints() {
    let result = 0;
    for (let rental of customer.rentals) {
      result += frequentRenterPointsFor(rental, movies);
    }
    return result;
  }

  function frequentRenterPointsFor(rental) {
    // add frequent renter points
    // add bonus for a two day new release rental
    return (movieFor(rental).code === 'new' && rental.days > 2) ? 2 : 1;
  }
}

module.exports = {
  createStatementData
};
