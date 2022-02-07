//CREAMOS LOS ELEMENTOS DE LAS LISTAS
let createRouteSelectors = () => {
    if (routeList.length > 0) {
        let contentOption;
        $('#route-selector').empty();
        $('#route-selector').append(`<option value="default" selected>--</option>`);

        for (let index = 0; index < routeList.length; index++) {
            contentOption = `<option value="${routeList[index].routeName}">${routeList[index].routeName}</option>`;
            $('#route-selector').append(contentOption);
        }
    }
}

let createScheduleSelectors = () => {
    if (scheduleList.length > 0) {
        let contentOption;
        $('#schedule-selector').empty();
        $('#schedule-selector').append(`<option value="default" selected>--</option>`);

        for (let index = 0; index < scheduleList.length; index++) {
            contentOption = `<option value="${scheduleList[index].scheduleName}">${scheduleList[index].scheduleName}</option>`;
            $('#schedule-selector').append(contentOption);
        }
    }
}

let createVehicleSelectors = () => {
    if (vehicleList.length > 0) {
        let contentOption;
        $('#vehicle-selector').empty();
        $('#vehicle-selector').append(`<option value="default" selected>--</option>`);

        for (let index = 0; index < vehicleList.length; index++) {
            contentOption = `<option value="${vehicleList[index].vehiclePlates}">${vehicleList[index].vehicleBrand} - ${vehicleList[index].vehicleModel} - ${vehicleList[index].vehiclePlates}</option>`;
            $('#vehicle-selector').append(contentOption);
        }
    }
}

//Inicializamos los select
createRouteSelectors();
createScheduleSelectors();
createVehicleSelectors();

//AGREGAMOS UN ELEMENTO FOCUS SOBRE LAS LISTAS PARA TRAER LA INFORMACION
$('#route-selector').focus(function (e) {
    createRouteSelectors();
});

$('#schedule-selector').focus(function (e) {
    createScheduleSelectors();
});

$('#vehicle-selector').focus(function (e) {
    createVehicleSelectors();
});

console.log("P1"); //TEMPORAL

//FUNCION QUE CREA UN NUEVO REGISTRO EN LA LISTA DE VIAJES
let addTrip = (tripName, routeObject, vehicleObject, scheduleObject, costValue) => {
    let newTrip = new ScheduledTrip(tripName, routeObject, vehicleObject, scheduleObject, costValue);
    tripList.push(newTrip);
};

//FUNCION QUE CREA UN NUEVO REGISTRO EN LA LISTA DE VIAJES
let editTrip = (tripName, routeObject, vehicleObject, scheduleObject, costValue, keyValue) => {
    let editTrip = new ScheduledTrip(tripName, routeObject, vehicleObject, scheduleObject, costValue);
    tripList[keyValue] = editTrip;
    sessionStorage.setItem('tripDataSetJSON', JSON.stringify(tripList));

    loadTripDataSet();
};

//VALIDAMOS SI EXISTE INFORMACION EN EL STORAGE
if (tripData == null) {
    let tripDataSet = '[{ "tripName":"Regular" ,"tripRoute" : "stgo-valpo", "tripVehicle" : "B734FA", "tripSchedule" : "Primero Mañana", "tripCost" : "6000"}]';
    sessionStorage.setItem('tripDataSetJSON', tripDataSet);
};

//FUNCION PARA TRAER INFORMACION ALMACENADA EN EL STORAGE
let loadTripDataSet = () => {
    tripData = JSON.parse(sessionStorage.getItem('tripDataSetJSON'));
    tripList = [];

    for (let index = 0; index < tripData.length; index++) {
        tripNameData = tripData[index].tripName;
        tripRouteData = tripData[index].tripRoute;
        tripVehicleData = tripData[index].tripVehicle;
        tripScheduleData = tripData[index].tripSchedule;
        tripCostData = tripData[index].tripCost;

        addTrip(tripNameData,tripRouteData, tripVehicleData, tripScheduleData, tripCostData);
    };
};

console.log("P2");//TEMPORAL

let addTripToData = (tripName, routeObject, vehicleObject, scheduleObject, costValue) => {
    //Agregamos registro al tripList
    addTrip(tripName, routeObject, vehicleObject, scheduleObject, costValue);

    newData = JSON.parse(sessionStorage.getItem('tripDataSetJSON'));
    newData.push(tripList[tripList.length - 1]);
    sessionStorage.setItem('tripDataSetJSON', JSON.stringify(newData));
    //Cargamos al storage
    loadTripDataSet();
}

console.log("P3");//TEMPORAL

//FUNCION PARA CONSEGUIR LA INFORMACION DEL FORMULARIO
let getTripFormData = () => {
    //Validamos el valor del select Route

    if ($('#route-selector option:selected').val() != 'default') {
        tripRouteValidated = $('#route-selector option:selected').val();
    }
    else {
        animatedNotification('Debes seleccionar una ruta', 'alert', 6000, '#route-selector');
    }

    if ($('#tripNameInput').val() != '') {
        tripNameValidated =  $('#tripNameInput').val();
    } else { 
        animatedNotification('Debes ingresar un nombre valido y seleccionar una ruta', 'alert', 6000, '#schedule-selector');
    }

    if ($('#vehicle-selector option:selected').val() != 'default') {
        tripVehicleValidated = $('#vehicle-selector option:selected').val();
    }
    else {
        animatedNotification('Debes seleccionar un vehiculo', 'alert', 6000, '#vehicle-selector');
    }

    if ($('#schedule-selector option:selected').val() != 'default') {
        tripScheduleValidated = $('#schedule-selector option:selected').val();
    }
    else {
        animatedNotification('Debes seleccionar un horario', 'alert', 6000, '#schedule-selector');
    }

    if ($('#tripCostInput').val() != '' && !isNaN($('#tripCostInput').val())) {
        tripCostValidated = $('#tripCostInput').val();
    } else {
        animatedNotification('Debes ingresar un monto para el pasaje', 'alert', 6000, '#tripCostInput');
    }

    console.log("P4");//TEMPORAL


    //Cuando la informacion de todos los inputs sea valida procedemos
    if (tripNameValidated != undefined && tripRouteValidated != undefined && tripVehicleValidated != undefined && tripScheduleValidated != undefined && tripCostValidated != undefined) {
        //Registramos la informacion en el Storage
        addTripToData(tripNameValidated,tripRouteValidated, tripVehicleValidated, tripScheduleValidated, tripCostValidated);

        printTable(tripList, '#table-trip', 'tripColumnName');
        getTableItem(tripList, 'tripTableItem', '#table-trip', 'tripColumnName', '#edit-trip-btn', tripEditEvent);

        cleanForm(tripInputsList);
        disableForm(tripInputsList);
        $('#save-trip-btn').removeClass('active');
        $('#save-trip-btn').unbind('click', getTripFormData);
        $('#route-selector').unbind('change', onChangeTrip);

        animatedNotification('Se ha creado un nuevo viaje', 'done', 6000);
    }

    //Limpiamos los campos validados
    tripRouteValidated = undefined;
    tripScheduleValidated = undefined;
    tripVehicleValidated = undefined;
    tripCostValidated = undefined;
}

console.log("P5");//TEMPORAL

let editTripFormData = () => {
    indexTripItem = tripList.findIndex(element => element.tripName === itemsSelectedFromTable['tripTableItem'].tripName);

    //Validamos el contenido de los inputs
    if ($('#route-selector option:selected').val() != 'default') {
        tripRouteValidated = $('#route-selector option:selected').val();
    }
    else {
        animatedNotification('Debes seleccionar una ruta', 'alert', 6000, '#route-selector');
    }

    if ($('#vehicle-selector option:selected').val() != 'default') {
        tripVehicleValidated = $('#vehicle-selector option:selected').val();
    }
    else {
        animatedNotification('Debes seleccionar un vehiculo', 'alert', 6000, '#vehicle-selector');
    }

    if ($('#schedule-selector option:selected').val() != 'default') {
        tripScheduleValidated = $('#schedule-selector option:selected').val();
    }
    else {
        animatedNotification('Debes seleccionar un horario', 'alert', 6000, '#schedule-selector');
    }
    
    if ($('#tripNameInput').val() != '') {
        tripNameValidated =  $('#tripNameInput').val();
    } else { 
        animatedNotification('Debes ingresar un nombre valido', 'alert', 6000, '#schedule-selector');
    }

    if ($('#tripCostInput').val() != '' && !isNaN($('#tripCostInput').val())) {
        tripCostValidated = $('#tripCostInput').val();
    } else {
        animatedNotification('Debes ingresar un monto para el pasaje', 'alert', 6000, '#tripCostInput');
    }

    if (tripNameValidated != undefined && tripRouteValidated != undefined && tripVehicleValidated != undefined && tripScheduleValidated != undefined && tripCostValidated != undefined) {
        //Registramos la informacion en el Storage
        addTripToData(tripNameValidated,tripRouteValidated, tripVehicleValidated, tripScheduleValidated, tripCostValidated);

        printTable(tripList, '#table-trip', 'tripColumnName');
        getTableItem(tripList, 'tripTableItem', '#table-trip', 'tripColumnName', '#edit-trip-btn', tripEditEvent);

        cleanForm(tripInputsList);
        disableForm(tripInputsList);
        $('#save-trip-btn').removeClass('active');
        $('#save-trip-btn').unbind('click', getTripFormData);
        $('#route-selector').unbind('change', onChangeTrip);

        animatedNotification('Se ha creado un nuevo viaje', 'done', 6000);
    }

    //Limpiamos los campos validados
    tripRouteValidated = undefined;
    tripScheduleValidated = undefined;
    tripVehicleValidated = undefined;
    tripCostValidated = undefined;
}

let tripEditEvent = () => {
    if(itemsSelectedFromTable['tripTableItem'] != undefined){
        //Habilitamos el formulario
        enableForm(tripInputsList);
        $('#save-trip-btn').unbind('click', getTripFormData);
        $('#save-trip-btn').addClass('active');
        $('#save-trip-btn').removeClass('active');

        //Rellenamos el input con la informacion
        $('#tripNameInput').val(itemsSelectedFromTable['tripTableItem'].tripName);
        $('#route-selector').val(itemsSelectedFromTable['tripTableItem'].tripRoute);
        $('#vehicle-selector').val(itemsSelectedFromTable['tripTableItem'].tripVehicle);
        $('#schedule-selector').val(itemsSelectedFromTable['tripTableItem'].tripSchedule);
        $('#tripCostInput').val(itemsSelectedFromTable['tripTableItem'].tripCost);

        $('#save-trip-btn').click(editTripFormData);
        $('#edit-trip-btn').unbind('click', tripEditEvent);
        $('#route-selector').unbind('focus', onChangeTrip);
        
        console.log("P6");//TEMPORAL
    }
};


let onChangeTrip = () => {
    if($('#route-selector option:selected').val() != 'default'){
        $('#save-trip-btn').addClass('active');
        $('#save-trip-btn').click( getTripFormData );

    console.log("P7");//TEMPORAL
    };
}

let cleanTripForm = (inputList) => {
    cleanForm(inputList);
    $('#route-selector').append(`<option value="default" selected>--</option>`);
    $('#schedule-selector').append(`<option value="default" selected>--</option>`);
    $('#vehicle-selector').append(`<option value="default" selected>--</option>`);
}

console.log("P8");//TEMPORAL
//Inicializamos la tabla
loadTripDataSet();
printTable(tripList,'#table-trip','tripColumnName');
getTableItem(tripList, 'tripTableItem','#table-trip','tripColumnName', '#edit-trip-btn', tripEditEvent);

$('#new-trip-btn').click(function (e) { 
    cleanTripForm(tripInputsList);

    enableForm(tripInputsList);
    $('#save-trip-btn').removeClass('active');
    $('#save-trip-btn').unbind('click', getTripFormData);
    $('#save-trip-btn').unbind('click', editTripFormData);
    $('#edit-trip-btn').unbind('click', tripEditEvent);
    $('#save-trip-btn').removeClass('active');
    //Reiniciamos los eventos de cambios
    eventInputCleaner(tripInputsList);
    
    for (let i = 0; i < $('#table-trip td').length; i++) {
        $('#table-trip td').eq(i).removeClass('active');
    }

    $('#route-selector').change(onChangeTrip);
    console.log("P10");//TEMPORAL
});

console.log(tripList);
console.log(tripKeysList);




