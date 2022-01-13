class Route {
    constructor( codeDeparture, codeDestination ,departure, destination, distance, etaHour, etaMinutes) {
        this.codeDeparture = codeDeparture;
        this.codeDestination = codeDestination;
        this.routeName = codeDeparture + "-" + codeDestination;
        this.departure = departure;
        this.destination = destination;
        this.distance = distance;
    }
    getEta(){
        let aproxSpeed = 80;
        let tempResult = (this.distance/aproxSpeed)*60;
        let counter = 0;
        
        while(tempResult >= 60 ){
            tempResult = tempResult - 60;
            counter++;
        }

        let minutes = parseInt(tempResult);
        let hours = counter;

        if (minutes == 0){
            minutes = "00";
            return [hours,minutes];
        } 
        
        else {
            return [hours,minutes];
        }
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

class Schedule {
    constructor(scheduleName, checkInTime, departureTime) {
        this.scheduleName = scheduleName;
        this.checkInTime = checkInTime;
        this.departureTime = departureTime;
    }
}

class ScheduledTrip {
    constructor(route, vehicle, schedule) {
        this.route = route;
        this.vehicle = vehicle;
        this.schedule = schedule;
    }
}

class User {
    constructor(userName, userLastName, userIdNumber) {
        this.userName = userName;
        this.userLastName = userLastName;
        this.userIdNumber = userIdNumber;
    }
    getFullName(){
        return `${this.userName} ${this.userLastName}`;
    }
}

class Ticket {
    constructor(ticketId, userInfo, scheduledTrip) {
        this.ticketId = ticketId;
        this.userInfo = userInfo;
        this.scheduledTrip = scheduledTrip;
    }
    printTicket(){
        let ticketContent = `Ticket: ${this.ticketId}
        Usuario: ${this.userInfo.getFullName()}
        DNI Usuario: ${this.userInfo.userIdNumber}
        Distancia de Viaje: ${this.scheduledTrip.route.getEta()}`

        return ticketContent;
    }
}

//Funcion para crear nuevos registros de schedule
let scheduleList = [];
let addSchedule = (scheduleNameInput,scheduleCheckInInput,scheduleDepartureInput) => {
    let newSchedule = new Schedule(scheduleNameInput,scheduleCheckInInput,scheduleDepartureInput);
    scheduleList.push(newSchedule);
}

//Funcion para crear nuevos registros de rutas
let routeList = [];
let addRoute = (codeDepartureInput,codeDestinationInput,departureInput,destinationInput,distanceInput) => {
    let newRoute = new Route(codeDepartureInput,codeDestinationInput,departureInput,destinationInput,distanceInput);
    routeList.push(newRoute);
}

//Funcion para crear nuevos registros de vehiculos
let vehicleList = [];
let addVehicle = (vehiclePlatesInput,vehicleBrandInput,vehicleModelInput,vehicleSeatsInput,vehicleStaffInput) => {
    let newVehicle = new Vehicle(vehiclePlatesInput,vehicleBrandInput,vehicleModelInput,vehicleSeatsInput,vehicleStaffInput);
    vehicleList.push(newVehicle);
}

//Funcion para crear nuevos registros de viajes
let tripList = [];
let addTrip = (routeKey, vehicleKey,scheduleKey) => {
    switch (vehicleKey.available) {
        case true:
            let newTrip = new ScheduledTrip(routeKey, vehicleKey, scheduleKey);
            tripList.push(newTrip);
            vehicleKey.available = false;
            break;

        case false: 
            console.log('Vehiculo no disponible');
            break;
    }
}

//Crea un nuevo registro en la lista de usuarios
let userList = [];
let addUser = (userNameInput, userLastNameInput, userIdInput) => {
    let newUser = new User(userNameInput, userLastNameInput, userIdInput);
    userList.push(newUser);
}

//Funcion para numeros para los tickets
let ticketNumber = [];
let createTicketNumber = () => {
    //Analizamos el numero de tickets y agregamos a la posicion inicial
    let stringTicket = "T-00" + (ticketNumber.length + 1);
    ticketNumber.push(stringTicket);
}

//Crear un nuevo registro en la lista de tickets
let ticketList = [];
let addTicket = (infoUser, infoTrip) => {
    //Crear Numero
    createTicketNumber();
    let newTicket = new Ticket(ticketNumber[ticketNumber.length - 1], infoUser, infoTrip);
    ticketList.push(newTicket);
}



//####################EJECUCION DEL CODIGO####################
//INSERTAMOS INFORMACION DE PRUEBA PARA LA EJECUCION *** HORARIOS ***
let scheduleNameInput = "Tarde";
let scheduleCheckInInput = "16:15";
let scheduleDepartureInput = "16:30";
addSchedule(scheduleNameInput,scheduleCheckInInput,scheduleDepartureInput);

scheduleNameInput = "Noche";
scheduleCheckInInput = "20:30";
scheduleDepartureInput = "20:45";
addSchedule(scheduleNameInput,scheduleCheckInInput,scheduleDepartureInput);

//INSERTAMOS INFORMACION DE PRUEBA PARA LA EJECUCION *** RUTAS ***
let routeCodeDepartureInput = "stgo";
let routeCodeDestinationInput = "valp";
let routeDepartureInput = "Santiago";
let routeDestinationInput = "Valparaiso";
let routeDistanceInput = 140;
addRoute(routeCodeDepartureInput,routeDestinationInput,routeDepartureInput,routeDestinationInput,routeDistanceInput);

routeCodeDepartureInput = "stgo";
routeCodeDestinationInput = "talc";
routeDepartureInput = "Santiago";
routeDestinationInput = "Talca";
routeDistanceInput = 240;
addRoute(routeCodeDepartureInput,routeDestinationInput,routeDepartureInput,routeDestinationInput,routeDistanceInput);

//INSERTAMOS INFORMACION DE PRUEBA PARA LA EJECUCION *** VEHICULOS ***
let vehiclePlateInput = "GTF6546";
let vehicleBrandInput = "Mercedes";
let vehicleModelInput = "Mb-350";
let vehicleSeatsInput = 32;
let vehicleStaffInput = 2;
addVehicle(vehiclePlateInput,vehicleBrandInput,vehicleModelInput,vehicleSeatsInput,vehicleSeatsInput);

vehiclePlateInput = "235FRA3";
vehicleBrandInput = "Mercedes";
vehicleModelInput = "TP-180";
vehicleSeatsInput = 36;
vehicleStaffInput = 2;
addVehicle(vehiclePlateInput,vehicleBrandInput,vehicleModelInput,vehicleSeatsInput,vehicleStaffInput);

addTrip(routeList[0],vehicleList[0],scheduleList[0]);

//PRIMER TICKECT
let userNameInput = "";
let userNameLastInput = "";
let userIdInput = "";

let getUserInfo = () => {
    while(userNameInput == ""){
        userNameInput = prompt("Ingresa el nombre del usuario");
    }
    while(userNameLastInput == ""){
        userNameLastInput = prompt("Ingresa el apellido del usuario");
    }
    while(userIdInput == ""){
        userIdInput = prompt("Ingresa el id del usuario");
    }
    return [userNameInput,userNameLastInput,userIdInput];
}

let userInfo = getUserInfo();
addUser(userInfo[0],userInfo[1],userInfo[2]);

addTicket(userList[0],tripList[0]);

alert( ticketList[0].printTicket() );

