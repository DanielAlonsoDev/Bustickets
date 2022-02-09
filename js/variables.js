let dataSet = [];
//************ SCHEDULE VARIABLES ************
let scheduleList = [];
let scheduleData = JSON.parse(sessionStorage.getItem('scheduleDataSetJSON'));
//INPUTS
const scheduleInputsList = [ '#scheduleNameInput','#scheduleCheckInInput', '#scheduleDepartureInput'];
//VALIDATED INPUTS
let scheduleNameValidated;
let scheduleCheckInValidated;
let scheduleDepartureValidated;


//************ VEHICLE VARIABLES ************
let vehicleList = [];
let vehicleData = JSON.parse(sessionStorage.getItem('vehicleDataSetJSON'));
//INPUTS
const vehicleInputsList = [ '#vehicleBrandInput','#vehicleModelInput', '#vehiclePlatesInput', '#vehicleSeatsInput', '#vehicleStaffInput', '#vehicleCapacityInput'];
//VALIDATED INPUTS
let vehiclePlatesValidated;
let vehicleBrandValidated;
let vehicleModelValidated;
let vehicleSeatsValidated;
let vehicleStaffValidated;


//************ ROUTES VARIABLES ************
let routeList = [];
let routeData = JSON.parse(sessionStorage.getItem('routeDataSetJSON'));
//INPUTS
const routeInputsList = [ '#routeNameInput','#routedDepartureNameInput', '#routeDepartureCodeInput', '#routeDestinationNameInput', '#routeDestinationCodeInput', '#routeDistanceInput', '#routeHoursInput', '#routeMinutesInput'];
//VALIDATED INPUTS
let routeNameValidated;
let routeDepartureNameValidated;
let routeDepartureCodeValidated;
let routeDestinationNameValidated;
let routeDestinationCodeValidated;
let routeDistanceValidated;


//************ TRIPS VARIABLES ************
let tripList = [];
tripKeysList = [];
let tripData = JSON.parse(sessionStorage.getItem('tripDataSetJSON'));
//INPUTS
const tripInputsList = ['#tripNameInput', '#route-selector' , '#schedule-selector', '#vehicle-selector', '#tripCostInput'];
//VALIDATED INPUTS
let tripRouteValidated;
let tripScheduleValidated;
let tripVehicleValidated;
let tripCostValidated;

let notificationCount = 1;