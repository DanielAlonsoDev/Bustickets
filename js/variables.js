//************ SCHEDULE VARIABLES ************
let scheduleList = [];
let scheduleData = JSON.parse(sessionStorage.getItem('scheduleDataSetJSON'));
//INPUTS
const scheduleInputsList = [ 'scheduleNameInput','scheduleCheckInInput', 'scheduleDepartureInput'];
const scheduleNameInput = document.querySelector('#scheduleNameInput');
const scheduleCheckInInput =  document.querySelector('#scheduleCheckInInput');
const scheduleDepartureInput = document.querySelector('#scheduleDepartureInput');
//BUTTONS
const newScheduleBtn = document.querySelector('#new-schedule-btn');
const editScheduleBtn = document.querySelector('#edit-schedule-btn');
const saveScheduleBtn = document.querySelector('#save-schedule-btn');
//VALIDATED INPUTS
let scheduleNameValidated;
let scheduleCheckInValidated;
let scheduleDepartureValidated;


//************ VEHICLE VARIABLES ************
let vehicleList = [];
let vehicleData = JSON.parse(sessionStorage.getItem('vehicleDataSetJSON'));
//INPUTS
const vehicleInputsList = [ 'vehicleBrandInput','vehicleModelInput', 'vehiclePlatesInput', 'vehicleSeatsInput', 'vehicleStaffInput', 'vehicleCapacityInput'];
const vehicleBrandInput = document.querySelector('#vehicleBrandInput');
const vehicleModelInput =  document.querySelector('#vehicleModelInput');
const vehiclePlatesInput = document.querySelector('#vehiclePlatesInput');
const vehicleSeatsInput = document.querySelector('#vehicleSeatsInput');
const vehicleStaffInput = document.querySelector('#vehicleStaffInput');
const vehicleCapacityInput = document.querySelector('#vehicleCapacityInput');
//BUTTONS
const newVehicleBtn = document.querySelector('#new-vehicle-btn');
const editVehicleBtn = document.querySelector('#edit-vehicle-btn');
const saveVehicleBtn = document.querySelector('#save-vehicle-btn');
//VALIDATED INPUTS
let vehiclePlatesValidated;
let vehicleBrandValidated;
let vehicleModelValidated;
let vehicleSeatsValidated;
let vehicleStaffValidated;