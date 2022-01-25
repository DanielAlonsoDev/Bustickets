class Schedule {
    constructor(scheduleName, scheduleCheckIn, scheduleDeparture) {
        this.scheduleName = scheduleName;
        this.scheduleCheckIn = scheduleCheckIn;
        this.scheduleDeparture = scheduleDeparture;
    }
}

class Vehicle {
    constructor(plates, brand, model, seats, staff) {
        this.plates = plates;
        this.brand = brand;
        this.model = model;
        this.seats = seats;
        this.staff = staff;
        this.available = true;
    }
    getCapacity(){
        return `${this.seats - this.staff} Pasajeros`
    }
}