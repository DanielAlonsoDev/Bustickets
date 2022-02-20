class Schedule {
    constructor(scheduleName, scheduleCheckIn, scheduleDeparture) {
        this.scheduleName = scheduleName;
        this.scheduleCheckIn = scheduleCheckIn;
        this.scheduleDeparture = scheduleDeparture;
    }
}

class Vehicle {
    constructor(vehicleBrand, vehicleModel, vehiclePlates, vehicleSeats, vehicleStaff) {
        this.vehicleBrand = vehicleBrand;
        this.vehicleModel = vehicleModel;
        this.vehiclePlates = vehiclePlates;
        this.vehicleSeats = vehicleSeats;
        this.vehicleStaff = vehicleStaff;
        this.vehicleName = vehicleBrand + " - " + vehiclePlates;
    }
    vehicleCapacity() {
        return `${this.vehicleSeats - this.vehicleStaff} Pasajeros`
    }
}

class Route {
    constructor(codeDeparture, codeDestination, departure, destination, distance) {
        this.codeDeparture = codeDeparture;
        this.codeDestination = codeDestination;
        this.routeName = codeDeparture + "-" + codeDestination;
        this.departure = departure;
        this.destination = destination;
        this.distance = distance;
    }
    getEta() {
        let aproxSpeed = 80;
        let tempResult = (this.distance / aproxSpeed) * 60;
        let counter = 0;

        while (tempResult >= 60) {
            tempResult = tempResult - 60;
            counter++;
        }

        let minutes = parseInt(tempResult);
        let hours = counter;

        if (minutes == 0) {
            minutes = "00";
            return [hours, minutes];
        }

        else {
            return [hours, minutes];
        }
    }
}

class ScheduledTrip {
    constructor(tripDate, tripRoute, tripVehicle, tripSchedule, tripCost) {
        this.tripRoute = tripRoute;
        this.tripVehicle = tripVehicle;
        this.tripSchedule = tripSchedule;
        this.tripCost = tripCost;
        this.tripDate = tripDate;
        this.available = true;
    }
}

class TripKeys {
    constructor(tripDate, routeKey, vehicleKey, scheduleKey, tripCost) {
        this.tripDate = tripDate;
        this.routeKey = routeKey;
        this.vehicleKey = vehicleKey;
        this.scheduleKey = scheduleKey;
        this.tripCost = tripCost;
        this.tripColumnName = tripDate +  " - " + routeKey +  " - " + scheduleKey + " - " + vehicleKey;
    }
}

class TicketKeys {
    constructor( userName, userLastName, userId, tripKey, ticketNumber){
        this.userName = userName;
        this.userLastName = userLastName;
        this.userId = userId;
        this.tripKey = tripKey;
        this.ticketNumber = ticketNumber;
    }
}

class Ticket {
    constructor( userName, userLastName, userId, trip, ticketNumber){
        this.userName = userName;
        this.userLastName = userLastName;
        this.userId = userId;
        this.trip = trip;
        this.ticketNumber = ticketNumber;
    }
}
