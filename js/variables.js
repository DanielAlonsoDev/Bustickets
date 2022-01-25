//************ SCHEDULE VARIABLES ************
let scheduleList = [];
let scheduleData = JSON.parse(sessionStorage.getItem('scheduleDataSetJSON'));
//INPUTS
const scheduleInputsList = [ 'scheduleNameInput','scheduleCheckInInput', 'scheduleDepartureInput'];
const scheduleNameInput = document.querySelector('#scheduleNameInput');
const scheduleCheckInInput =  document.querySelector('#scheduleCheckInInput');
const scheduleDepartureInput = document.querySelector('#scheduleDepartureInput');
//BUTTONS
const newSchedulenBtn = document.querySelector('#new-schedule-btn');
const editSchedulenBtn = document.querySelector('#edit-schedule-btn');
const saveSchedulenBtn = document.querySelector('#save-schedule-btn');
//VALIDATED INPUTS
let scheduleNameValidated;
let scheduleCheckInValidated;
let scheduleDepartureValidated;



//************ VEHICLE VARIABLES ************
let vehicleList = [];
let vehicleData = JSON.parse(sessionStorage.getItem('vehicleDataSetJSON'));


//id="scheduleCheckInInput"