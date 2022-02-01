//************ SCHEDULE VARIABLES ************
let scheduleList = [];
let scheduleData = JSON.parse(sessionStorage.getItem('scheduleDataSetJSON'));
//INPUTS
const scheduleInputsList = [ '#scheduleNameInput','#scheduleCheckInInput', '#scheduleDepartureInput'];
const scheduleNameInput = $('#scheduleNameInput');
const scheduleCheckInInput = $('#scheduleCheckInInput');
const scheduleDepartureInput = $('#scheduleDepartureInput');
//BUTTONS
const newScheduleBtn = document.querySelector('#new-schedule-btn');
const editScheduleBtn = document.querySelector('#edit-schedule-btn')
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
//VALIDATED INPUTS
let vehiclePlatesValidated;
let vehicleBrandValidated;
let vehicleModelValidated;
let vehicleSeatsValidated;
let vehicleStaffValidated;


//Print Table por Id con #
//getTableItem con boton por id en lugar de variable
//La variables para los botones dejan de ser necesarias al cambiar el codigo
//Se conservan las variables para los inputs pero se debe cambiar el contenido por la seleccion de JQ