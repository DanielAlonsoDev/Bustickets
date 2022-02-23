//FUNCION QUE CREA UN NUEVO REGISTRO EN LA LISTA DE HORARIOS
let addSchedule = (scheduleNameValue, scheduleCheckInValue, scheduleDepartureValue) => {
    let newSchedule = new Schedule(scheduleNameValue, scheduleCheckInValue, scheduleDepartureValue);
    scheduleList.push(newSchedule);
}

//FUNCION QUE CREA UN NUEVO REGISTRO EN LA LISTA DE HORARIOS
let editSchedule = (scheduleNameValue, scheduleCheckInValue, scheduleDepartureValue, keyValue) => {
    let editSchedule = new Schedule(scheduleNameValue, scheduleCheckInValue, scheduleDepartureValue);
    scheduleList[keyValue] = editSchedule;
    sessionStorage.setItem('scheduleDataSetJSON', JSON.stringify(scheduleList));

    loadScheduleDataSet();
}

//FUNCION PARA TRAER INFORMACION ALMACENADA EN EL STORAGE
let loadScheduleDataSet = () => {
    scheduleData = JSON.parse(sessionStorage.getItem('scheduleDataSetJSON'));
    scheduleList = [];

    for (let index = 0; index < scheduleData.length; index++) {
        scheduleNameData = scheduleData[index].scheduleName;
        scheduleCheckInData = scheduleData[index].scheduleCheckIn;
        scheduleDepartureData = scheduleData[index].scheduleDeparture;

        addSchedule(scheduleNameData, scheduleCheckInData, scheduleDepartureData);
    }
}

//FUNCION PARA REGISTRAR NUEVA INFORMACION EN EL STORAGE
let addScheduleToData = (addName, addCheckIn, addDeparture) => {
    //Agregamos registro al ScheduleList
    addSchedule(addName, addCheckIn, addDeparture);

    newData = JSON.parse(sessionStorage.getItem('scheduleDataSetJSON'));
    newData.push(scheduleList[scheduleList.length - 1]);
    sessionStorage.setItem('scheduleDataSetJSON', JSON.stringify(newData));
    //Cargamos al storage
    loadScheduleDataSet();
}

//CONSEGUIR LA INFORMACION DEL FORMULARIO
let getScheduleFormData = () => {
    //Validamos que el contenido del input Name sea valido
    if ($('#scheduleNameInput').val() != '' && $('#scheduleNameInput').val() != null && $('#scheduleNameInput').val() != undefined) {
        //Comparamos el nombre con todos los guardados con anterioridad
        let scheduleNameExist = false;
        for (let index = 0; index < scheduleList.length; index++) {
            if (scheduleList[index].scheduleName == $('#scheduleNameInput').val()) {
                scheduleNameExist = true;
            }
        }

        switch (scheduleNameExist) {
            case true:
                alert('Ya existe un nombre registrado con ese nombre');
                animatedNotification('Ya existe un nombre registrado con ese nombre', 'error', 6000, '#scheduleNameInput')
                break;

            case false:
                scheduleNameValidated = $('#scheduleNameInput').val();
                break;
        }
    }
    else {
        animatedNotification('Debes ingresar un nombre de horario valido', 'alert', 6000, '#scheduleNameInput');
    }

    //Validamos que el contenido del input Checkin sea valido
    if ($('#scheduleCheckInInput').val() != '') {
        scheduleCheckInValidated = $('#scheduleCheckInInput').val();
    } else {
        animatedNotification('Debes ingresar una hora de Check In valida', 'alert', 6000, '#scheduleCheckInInput')
    }

    if ($('#scheduleDepartureInput').val() != '') {
        scheduleDepartureValidated = $('#scheduleDepartureInput').val();
    } else {
        animatedNotification('Debes ingresar una hora de Salida valida', 'alert', 6000, '#scheduleDepartureInput');
    }

    //Cuando la informacion de todos los inputs sea valida procedemos
    if (scheduleNameValidated != undefined && scheduleCheckInValidated != undefined && scheduleDepartureValidated != undefined) {
        //Regsitramos la informacion en el Storage
        addScheduleToData(scheduleNameValidated, scheduleCheckInValidated, scheduleDepartureValidated);

        printTable(scheduleList, '#table-schedule', 'scheduleName');
        getTableItem(scheduleList, 'scheduleTableItem', '#table-schedule td', 'scheduleName', '#edit-schedule-btn', scheduleEditEvent);
        deleteScheduleItem();

        cleanForm(scheduleInputsList);
        disableForm(scheduleInputsList);
        $('#save-schedule-btn').removeClass('active');
        $('#save-schedule-btn').unbind('click', getScheduleFormData);
        $('#scheduleNameInput').unbind('change', onchangeSchedule);

        animatedNotification('Se ha creado un nuevo horario', 'done', 6000);
    }

    //Limpiamos los campos validados
    scheduleNameValidated = undefined;
    scheduleCheckInValidated = undefined;
    scheduleDepartureValidated = undefined;
}

//EDITAR LA INFORMACION DEL FORMULARIO
let editScheduleFormData = () => {
    indexScheduleItem = scheduleList.findIndex(element => element.scheduleName === itemsSelectedFromTable['scheduleTableItem'].scheduleName);
    //Validamos si se realizaron cambios en el input del nombre del horario
    if ($('#scheduleNameInput').val() == itemsSelectedFromTable['scheduleTableItem'].scheduleName) {
        scheduleNameValidated = $('#scheduleNameInput').val();
    } else {
        if ($('#scheduleNameInput').val() != '' && $('#scheduleNameInput').val() != null && $('#scheduleNameInput').val() != undefined) {
            //Comparamos el nombre con todos los guardados con anterioridad
            let scheduleNameExist = false;
            for (let index = 0; index < scheduleList.length; index++) {
                if (scheduleList[index].scheduleName == $('#scheduleNameInput').val()) {
                    scheduleNameExist = true;
                }
            }

            switch (scheduleNameExist) {
                case true:
                    animatedNotification('Ya existe un horario registrado con ese nombre', 'error', 6000, '#scheduleNameInput')
                    break;

                case false:
                    scheduleNameValidated = $('#scheduleNameInput').val();
                    break;
            }
        }
        else {
            animatedNotification('Debes ingresar un nombre de horario valido', 'alert', 6000, '#scheduleNameInput');
        }
    }

    //Validamos que el contenido del input Checkin sea valido
    if ($('#scheduleCheckInInput').val() != '') {
        scheduleCheckInValidated = $('#scheduleCheckInInput').val();
    } else {
        animatedNotification('Debes ingresar una hora de Check In valida', 'alert', 6000, '#scheduleCheckInInput')
    }

    if ($('#scheduleDepartureInput').val() != '') {
        scheduleDepartureValidated = $('#scheduleDepartureInput').val();
    } else {
        animatedNotification('Debes ingresar una hora de Salida valida', 'alert', 6000, '#scheduleDepartureInput');
    }

    if (scheduleNameValidated != undefined && scheduleCheckInValidated != undefined && scheduleDepartureValidated != undefined) {
        //Actualizamos el Key del Trip
        for (let index = 0; index < tripKeysList.length; index++) {
            if (tripKeysList[index].scheduleKey == scheduleList[indexScheduleItem].scheduleName) {
                editTrip(tripKeysList[index].tripDate, tripKeysList[index].routeKey, tripKeysList[index].vehicleKey, scheduleNameValidated, tripKeysList[index].tripCost, index);
            }
        }
        editSchedule(scheduleNameValidated, scheduleCheckInValidated, scheduleDepartureValidated, indexScheduleItem);
        createScheduleSelectors();
        //Imprimimos la tabla de viajes para reflejar los cambios
        printTable(tripKeysList, '#table-trip', 'tripColumnName');
        getTableItem(tripKeysList, 'tripTableItem', '#table-trip td', 'tripColumnName', '#edit-trip-btn', tripEditEvent);

        //Registramos la informacion en el Storage
        printTable(scheduleList, '#table-schedule', 'scheduleName');
        getTableItem(scheduleList, 'scheduleTableItem', '#table-schedule td', 'scheduleName', '#edit-schedule-btn', scheduleEditEvent);
        deleteScheduleItem();

        cleanForm(scheduleInputsList);
        disableForm(scheduleInputsList);
        $('#save-schedule-btn').removeClass('active');
        $('#save-schedule-btn').unbind('click', editScheduleFormData);

        animatedNotification('Se ha actualizado la información del horario', 'done', 6000);
    };

    //Limpiamos los campos validados
    scheduleNameValidated = undefined;
    scheduleCheckInValidated = undefined;
    scheduleDepartureValidated = undefined;
};

let scheduleEditEvent = () => {
    if (itemsSelectedFromTable['scheduleTableItem'] != undefined) {
        //Habilitamos el formulario
        enableForm(scheduleInputsList);
        cleanForm(scheduleInputsList);
        $('#save-schedule-btn').unbind('click');
        $('#save-schedule-btn').addClass('active');
        $('#edit-schedule-btn').removeClass('active');

        //Rellenamos el input con la informacion
        $('#scheduleNameInput').val(itemsSelectedFromTable['scheduleTableItem'].scheduleName);
        $('#scheduleCheckInInput').val(itemsSelectedFromTable['scheduleTableItem'].scheduleCheckIn);
        $('#scheduleDepartureInput').val(itemsSelectedFromTable['scheduleTableItem'].scheduleDeparture);

        $('#save-schedule-btn').click(editScheduleFormData);
        $('#edit-schedule-btn').unbind('click');
        $('#scheduleNameInput').unbind('change');
    };
};

//Evento que activa el boton guardar
let onchangeSchedule = () => {
    if ($('#scheduleNameInput').val() != '') {
        $('#save-schedule-btn').addClass('active');
        $('#save-schedule-btn').click(getScheduleFormData);
    };
}

//Eliminar elementos de la lista de Horarios
let deleteScheduleItem = () => {
    $('#table-schedule .icon-bin2').click(function (e) {
        e.preventDefault();

        let itemExist = false;
        for (const item of tripKeysList) {
            if (item.scheduleKey == e.currentTarget.id) {
                itemExist = true;
            }
        }

        switch (itemExist) {
            case true:
                animatedNotification('El horario no se puede eliminar ya que se encuentra seleccionado en un viaje', 'alert', 6000);
                break;

            default:
                let index = scheduleList.findIndex(element => element.scheduleName == e.currentTarget.id);
                scheduleList.splice(index, 1);
                sessionStorage.setItem('scheduleDataSetJSON', JSON.stringify(scheduleList));
                animatedNotification('Horario Eliminado', 'delete', 6000);
                $(`#table-schedule td[id="${e.currentTarget.id}"]`).remove();
                break;
        }
    });
}

//EVENTO PARA CREAR NUEVOS REGISTROS EN LAS LISTAS DE HORARIOS
$('#new-schedule-btn').click(function (e) {
    cleanForm(scheduleInputsList);
    enableForm(scheduleInputsList);
    $('#save-schedule-btn, #edit-schedule-btn').removeClass('active');
    $('#save-schedule-btn, #edit-schedule-btn').unbind('click');
    //Reiniciamos los eventos de cambios
    eventInputCleaner(scheduleInputsList);

    for (let i = 0; i < $('#table-schedule td').length; i++) {
        $('#table-schedule td').eq(i).removeClass('active');
    }

    $('#scheduleNameInput').change(onchangeSchedule)
});

$(document).ready(function () {
    //Si la informacion de los horarios existe
    if (scheduleData != null) {
        //Inicializamos la tabla
        loadScheduleDataSet();
        printTable(scheduleList, '#table-schedule', 'scheduleName');
        getTableItem(scheduleList, 'scheduleTableItem', '#table-schedule td', 'scheduleName', '#edit-schedule-btn', scheduleEditEvent);
        deleteScheduleItem();
    }
});

//Cargamos la informacion de Storage
$.ajax({
    type: "GET",
    url: "../data/dataFile.json",
    success: function (data) {
        //Cargamos la Data de Horarios
        if (scheduleData == null) {
            for (let index = 0; index < data.scheduleData.length; index++) {
                dataSet.push(data.scheduleData[index]);
            }
            sessionStorage.setItem('scheduleDataSetJSON', JSON.stringify(dataSet));
            dataSet = [];

            //Inicializamos la tabla
            loadScheduleDataSet();
            printTable(scheduleList, '#table-schedule', 'scheduleName');
            getTableItem(scheduleList, 'scheduleTableItem', '#table-schedule td', 'scheduleName', '#edit-schedule-btn', scheduleEditEvent);
            deleteScheduleItem();
        }
    },
    error: function () {
        animatedNotification('No se pudo cargar el archivo JSON con la información', 'error', 6000);
    }
});