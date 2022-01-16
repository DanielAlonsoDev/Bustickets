//DECLARACION DE CLASE
class Schedule {
    constructor(scheduleName, checkInTime, departureTime) {
        this.scheduleName = scheduleName;
        this.checkInTime = checkInTime;
        this.departureTime = departureTime;
    }
}

//FUNCION QUE CREA UN NUEVO REGISTRO EN LA LISTA DE RUTAS
let scheduleList = [];
let addSchedule = (scheduleNameValue,scheduleCheckInValue,scheduleDepartureValue) => {
    let newSchedule = new Schedule(scheduleNameValue,scheduleCheckInValue,scheduleDepartureValue);
    scheduleList.push(newSchedule);
}

//VALIDAMOS SI EXISTE INFORMACION EN EL STORAGE
let scheduleData = JSON.parse(sessionStorage.getItem('scheduleDataSetJSON'));

if( scheduleData == null ){
    let scheduleDataSet = '[ {"scheduleName":"Primero Mañana", "scheduleCheckIn":"07:45", "scheduleDeparture":"08:00" }, {"scheduleName":"Segundo Mañana", "scheduleCheckIn":"08:25", "scheduleDeparture":"08:40"},{"scheduleName":"Primero Tarde", "scheduleCheckIn":"14:15", "scheduleDeparture":"14:30"} ]';
    sessionStorage.setItem('scheduleDataSetJSON', scheduleDataSet);
}

//FUNCION PARA TRAER INFORMACION ALMACENADA EN EL STORAGE
let loadDataSet = () => {
    scheduleData = JSON.parse(sessionStorage.getItem('scheduleDataSetJSON'));
    scheduleList = [];

    for (let index = 0; index < scheduleData.length; index++) {
        scheduleNameData = scheduleData[index].scheduleName;
        scheduleCheckInData = scheduleData[index].scheduleCheckIn;
        scheduleDepartureData = scheduleData[index].scheduleDeparture;
    
        addSchedule(scheduleNameData,scheduleCheckInData,scheduleDepartureData);
    }
}

//FUNCION PARA REGISTRAR NUEVA INFORMACION EN EL STORAGE
let addScheduleToData = (addName) => {
    //Agregamos registro al ScheduleList
    addSchedule(addName, "00:00", "00:00");

    newData = JSON.parse(sessionStorage.getItem('scheduleDataSetJSON'));
    newData.push(scheduleList[scheduleList.length-1]);
    sessionStorage.setItem('scheduleDataSetJSON', JSON.stringify(newData));
    //Cargamos al storage
    loadDataSet();
}

//FUNCION PARA IMPRIMIR LOS VALORES EN LA TABLA
let printScheduleTable = () => {
    for (let index = 0; index < scheduleList.length; index++) {
        let tableSchedule = document.querySelector('#table-schedule').querySelector('tbody');
        let newRowElement = document.createElement('tr');
        let newColumnElement = document.createElement('td');
    
        tableSchedule.appendChild(newRowElement);
        newRowElement.appendChild(newColumnElement);
        newColumnElement.textContent = scheduleList[index].scheduleName;
    }
}

loadDataSet();
printScheduleTable();

//FUNCION PARA CONSEGUIR LA INFORMACION DEL FORMULARIO
let getScheduleFormData = () => {
    //Validamos el Nombre del horario
    let scheduleNameInput = document.querySelector("#scheduleNameInput").value;
    let scheduleCheckInInput =  document.querySelector("#scheduleCheckInInput").value;
    let scheduleDepartureInput = document.querySelector("#scheduleDepartureInput").value;
    
    let scheduleNameValidated;
    let scheduleCheckInValidated;
    let scheduleDepartureValidated;

    //Validamos que el contenido del input Name sea valido
    if(scheduleNameInput != "" && scheduleNameInput != null && scheduleNameInput != undefined ){
        //Comparamos el nombre con todos los guardados con anterioridad
        let scheduleNameExist = false;
        for (let index = 0; index < scheduleList.length; index++) {
            if(scheduleList[index].scheduleName == scheduleNameInput ){
                scheduleNameExist = true;
            }
        }

        switch(scheduleNameExist){
            case true:
                alert("El nombre ya existe");
                break;

            case false:
                scheduleNameValidated = scheduleNameInput;
                break;
        }
    }
    else {
        alert("Nombre Invalido")
    }

    if(scheduleNameValidated != undefined){
        addScheduleToData(scheduleNameValidated);

        //Imprimo el valor en la tabla
        let tableSchedule = document.querySelector('#table-schedule').querySelector('tbody');
        let newRowElement = document.createElement('tr');
        let newColumnElement = document.createElement('td');
        tableSchedule.appendChild(newRowElement);
        newRowElement.appendChild(newColumnElement);
        newColumnElement.textContent = scheduleList[scheduleList.length-1].scheduleName;
    }

}