class Schedule {
    constructor(scheduleName, checkInTime, departureTime) {
        this.scheduleName = scheduleName;
        this.checkInTime = checkInTime;
        this.departureTime = departureTime;
    }
}

let scheduleList = [];
let addSchedule = (scheduleNameInput,scheduleCheckInInput,scheduleDepartureInput) => {
    let newSchedule = new Schedule(scheduleNameInput,scheduleCheckInInput,scheduleDepartureInput);
    scheduleList.push(newSchedule);
}

let scheduleDataSet = '[ {"scheduleName":"Primero Mañana", "scheduleCheckIn":"07:45", "scheduleDeparture":"08:00" }, {"scheduleName":"Segundo Mañana", "scheduleCheckIn":"08:25", "scheduleDeparture":"08:40"},{"scheduleName":"Primero Tarde", "scheduleCheckIn":"14:15", "scheduleDeparture":"14:30"} ]';
let scheduleData = JSON.parse( scheduleDataSet );

for (let index = 0; index < scheduleData.length; index++) {

    let scheduleNameInput = scheduleData[index].scheduleName;
    let scheduleCheckInInput = scheduleData[index].scheduleCheckIn;
    let scheduleDepartureInput = scheduleData[index].scheduleDeparture;

    addSchedule(scheduleNameInput,scheduleCheckInInput,scheduleDepartureInput);
}

for (let index = 0; index < scheduleList.length; index++) {
    let tableSchedule = document.querySelector('#table-schedule').querySelector('tbody');
    let newRowElement = document.createElement('tr');
    let newColumnElement = document.createElement('td');

    tableSchedule.appendChild(newRowElement);
    newRowElement.appendChild(newColumnElement);
    newColumnElement.textContent = scheduleList[index].scheduleName;
}