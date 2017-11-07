let store = { drivers: [], passengers: [], trips: []} ;

let driverIds = 0;
let passengerIds = 0;
let tripIds = 0;


//has many trips, has many passengers through trips
class Driver {
  constructor(name){

    this.id = ++driverIds;
    this.name = name;
    store.drivers.push(this);
  }

  trips(){
    return store.trips.filter(trip => {
      return trip.driverId === this.id;
    });
  }

  passengers(){
    return this.trips().map(trip => {
      return trip.passenger();
    });
  }
}


//has many trips, has many dirvers through trips
class Passenger {
  constructor(name){
  this.id = ++passengerIds;
  this.name = name;

  store.passengers.push(this);
  }
  trips(){
    return store.trips.filter(trip => {
      return trip.passengerId === this.id;
    });
  }
  drivers(){
    return this.trips().map(trip => {
      return trip.driver();
    });
  }
}

//belongs to passengers, trips
class Trip {
  constructor(driver, passenger) {
  this.id = ++tripIds;
  if(driver){
    this.driverId = driver.id
  };
   if(passenger){
     this.passengerId = passenger.id
   };

  store.trips.push(this);
  }

  passenger(){
    return store.passengers.find(passenger => {
      return passenger.id === this.passengerId;
    });
  }
  driver(){
    return store.drivers.find(driver => {
      return driver.id === this.driverId;
    });
  }
}
