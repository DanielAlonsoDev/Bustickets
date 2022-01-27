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
        this.available = true;
        this.vehicleName = vehicleBrand + " - " + vehiclePlates;
    }
    vehicleCapacity(){
        return `${this.vehicleSeats - this.vehicleStaff} Pasajeros`
    }
}