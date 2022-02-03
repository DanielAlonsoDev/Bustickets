//FUNCION QUE CREA UN NUEVO REGISTRO EN LA LISTA DE HORARIOS
let addSchedule = (scheduleNameValue,scheduleCheckInValue,scheduleDepartureValue) => {
    let newSchedule = new Schedule(scheduleNameValue,scheduleCheckInValue,scheduleDepartureValue);
    scheduleList.push(newSchedule);
}

//FUNCION QUE CREA UN NUEVO REGISTRO EN LA LISTA DE HORARIOS
let editSchedule = (scheduleNameValue, scheduleCheckInValue, scheduleDepartureValue, keyValue) => {
    let editSchedule = new Schedule(scheduleNameValue,scheduleCheckInValue,scheduleDepartureValue);
    scheduleList[keyValue] = editSchedule;
    sessionStorage.setItem('scheduleDataSetJSON', JSON.stringify(scheduleList));

    loadScheduleDataSet();
}

//VALIDAMOS SI EXISTE INFORMACION EN EL STORAGE
if( scheduleData == null ){
    let scheduleDataSet = '[ {"scheduleName":"Primero Mañana", "scheduleCheckIn":"07:45", "scheduleDeparture":"08:00" }, {"scheduleName":"Segundo Mañana", "scheduleCheckIn":"08:25", "scheduleDeparture":"08:40"},{"scheduleName":"Primero Tarde", "scheduleCheckIn":"14:15", "scheduleDeparture":"14:30"} ]';
    sessionStorage.setItem('scheduleDataSetJSON', scheduleDataSet);
}

//FUNCION PARA TRAER INFORMACION ALMACENADA EN EL STORAGE
let loadScheduleDataSet = () => {
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
let addScheduleToData = (addName, addCheckIn, addDeparture) => {
    //Agregamos registro al ScheduleList
    addSchedule(addName, addCheckIn, addDeparture);

    newData = JSON.parse(sessionStorage.getItem('scheduleDataSetJSON'));
    newData.push(scheduleList[scheduleList.length-1]);
    sessionStorage.setItem('scheduleDataSetJSON', JSON.stringify(newData));
    //Cargamos al storage
    loadScheduleDataSet();
}

//FUNCION PARA CONSEGUIR LA INFORMACION DEL FORMULARIO
let getScheduleFormData = () => {
    //Validamos que el contenido del input Name sea valido
    if( $('#scheduleNameInput').val() != '' && $('#scheduleNameInput').val() != null && $('#scheduleNameInput').val() != undefined){
        //Comparamos el nombre con todos los guardados con anterioridad
        let scheduleNameExist = false;
        for (let index = 0; index < scheduleList.length; index++) {
            if(scheduleList[index].scheduleName == $('#scheduleNameInput').val() ){
                scheduleNameExist = true;
            }
        }

        switch(scheduleNameExist){
            case true:
                alert('Ya existe un nombre registrado con ese nombre');
                break;

            case false:
                scheduleNameValidated = $('#scheduleNameInput').val();
                break;
        }
    }
    else {
        alert('Debes ingresar un nombre de horario valido');
    }

    //Validamos que el contenido del input Checkin sea valido
    if( $('#scheduleCheckInInput').val() != ''){
        scheduleCheckInValidated = $('#scheduleCheckInInput').val();
    } else {
        alert('Debes ingresar una hora de Check In valida');
    }

    if($('#scheduleCheckInInput').val() != ''){
        scheduleDepartureValidated = $('#scheduleDepartureInput').val();
    } else {
        alert('Debes ingresar una hora de Salida valida');
    }

    //Cuando la informacion de todos los inputs sea valida procedemos
    if(scheduleNameValidated != undefined && scheduleCheckInValidated != undefined && scheduleDepartureValidated != undefined ){
        //Regsitramos la informacion en el Storage
        addScheduleToData(scheduleNameValidated, scheduleCheckInValidated, scheduleDepartureValidated);

        printTable(scheduleList,'#table-schedule','scheduleName');
        getTableItem(scheduleList, 'scheduleTableItem','#table-schedule','scheduleName','#edit-schedule-btn',scheduleEditEvent);
        

        cleanForm(scheduleInputsList);
        disableForm(scheduleInputsList);
        $('#save-schedule-btn').removeClass('active');
        $('#save-schedule-btn').unbind('click', getScheduleFormData);
        $('#scheduleNameInput').unbind('change', onchangeSchedule);

        //Limpiamos los campos validados
        scheduleNameValidated = undefined;
        scheduleCheckInValidated = undefined;
        scheduleDepartureValidated = undefined;
    }
}

let editScheduleFormData = () => {
    indexScheduleItem = scheduleList.findIndex(element => element.scheduleName === itemsSelectedFromTable['scheduleTableItem'].scheduleName);
    //Validamos si se realizaron cambios en el input del nombre del horario
    if($('#scheduleNameInput').val() == itemsSelectedFromTable['scheduleTableItem'].scheduleName){
        scheduleNameValidated = $('#scheduleNameInput').val();
    } else {
        if( $('#scheduleNameInput').val() != '' && $('#scheduleNameInput').val() != null && $('#scheduleNameInput').val() != undefined){
            //Comparamos el nombre con todos los guardados con anterioridad
            let scheduleNameExist = false;
            for (let index = 0; index < scheduleList.length; index++) {
                if(scheduleList[index].scheduleName == $('#scheduleNameInput').val() ){
                    scheduleNameExist = true;
                }
            }
    
            switch(scheduleNameExist){
                case true:
                    alert('Ya existe un nombre registrado con ese nombre');
                    break;
    
                case false:
                    scheduleNameValidated = $('#scheduleNameInput').val();
                    break;
            }
        }
        else {
            alert('Debes ingresar un nombre de horario valido');
        }
    }
    
    //Validamos que el contenido del input Checkin sea valido
    if($('#scheduleCheckInInput').val() != ''){
        scheduleCheckInValidated = $('#scheduleCheckInInput').val();
    } else {
        alert('Debes ingresar una hora de Check In valida');
    }

    if( $('#scheduleDepartureInput').val() != ''){
        scheduleDepartureValidated = $('#scheduleDepartureInput').val();
    } else {
        alert('Debes ingresar una hora de Salida valida');
    }

    if(scheduleNameValidated != undefined && scheduleCheckInValidated != undefined && scheduleDepartureValidated != undefined ){
        //Regsitramos la informacion en el Storage
        editSchedule(scheduleNameValidated,scheduleCheckInValidated,scheduleDepartureValidated,indexScheduleItem);
        printTable(scheduleList,'#table-schedule','scheduleName');
        getTableItem(scheduleList, 'scheduleTableItem','#table-schedule','scheduleName','#edit-schedule-btn',scheduleEditEvent);

        
        cleanForm(scheduleInputsList);
        disableForm(scheduleInputsList);
        $('#save-schedule-btn').removeClass('active');
        $('#save-schedule-btn').unbind('click', editScheduleFormData);

        //Limpiamos los campos validados
        scheduleNameValidated = undefined;
        scheduleCheckInValidated = undefined;
        scheduleDepartureValidated = undefined;
    };
};

let scheduleEditEvent = () => {
    if(itemsSelectedFromTable['scheduleTableItem'] != undefined){
        //Habilitamos el formulario
        enableForm(scheduleInputsList);
        $('#save-schedule-btn').unbind('click', getScheduleFormData);
        $('#save-schedule-btn').addClass('active');
        $('#edit-schedule-btn').removeClass('active');

        //Rellenamos el input con la informacion
        $('#scheduleNameInput').val( itemsSelectedFromTable['scheduleTableItem'].scheduleName );
        $('#scheduleCheckInInput').val( itemsSelectedFromTable['scheduleTableItem'].scheduleCheckIn );
        $('#scheduleDepartureInput').val( itemsSelectedFromTable['scheduleTableItem'].scheduleDeparture );

        
        $('#save-schedule-btn').click(editScheduleFormData);
        $('#edit-schedule-btn').unbind('click', scheduleEditEvent);
        $('#scheduleNameInput').unbind('change', onchangeSchedule);

    };
};

let onchangeSchedule = () => {
    if( $('#scheduleNameInput').val() != ''){
        $('#save-schedule-btn').addClass('active');
        $('#save-schedule-btn').click(getScheduleFormData);
    };
}

//Inicializamos la tabla
loadScheduleDataSet();
printTable(scheduleList,'#table-schedule','scheduleName');
getTableItem(scheduleList, 'scheduleTableItem','#table-schedule','scheduleName','#edit-schedule-btn', scheduleEditEvent);

//EVENTO PARA CREAR NUEVOS REGISTROS EN LAS LISTAS DE HORARIOS
$('#new-schedule-btn').click(function (e) { 
    cleanForm(scheduleInputsList);
    enableForm(scheduleInputsList);
    $('#save-schedule-btn').removeClass('active');
    $('#save-schedule-btn').unbind('click', getScheduleFormData);
    $('#save-schedule-btn').unbind('click', editScheduleFormData);
    $('#edit-schedule-btn').unbind('click', scheduleEditEvent);
    $('#edit-schedule-btn').removeClass('active');
    
    for (let i = 0; i < $('#table-schedule td').length; i++) {
        $('#table-schedule td').eq(i).removeClass('active');
    }

    $('#scheduleNameInput').change(onchangeSchedule)
    
});