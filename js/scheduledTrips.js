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


//FUNCION QUE CREA UN NUEVO REGISTRO EN LA LISTA DE VIAJES
let addTrip = (tripName, routeObject, vehicleObject, scheduleObject, costValue) => {
    let newTrip = new ScheduledTrip(tripName, routeObject, vehicleObject, scheduleObject, costValue);
    tripList.push(newTrip);
};

let addTripKeys = (tripName, routeKey, vehicleKey, scheduleKey, tripCost) => {
    let newTripKeys = new TripKeys(tripName, routeKey, vehicleKey, scheduleKey, tripCost);
    tripKeysList.push(newTripKeys);
};

let editTrip = (tripName, routeKey, vehicleKey, scheduleKey, tripCost, keyValue) => {
    let editTrip = new TripKeys(tripName, routeKey, vehicleKey, scheduleKey, tripCost);
    tripKeysList[keyValue] = editTrip;
    sessionStorage.setItem('tripDataSetJSON', JSON.stringify(tripKeysList));

    loadTripDataSet();
}

//FUNCION PARA TRAER INFORMACION ALMACENADA EN EL STORAGE
let loadTripDataSet = () => {
    tripData = JSON.parse(sessionStorage.getItem('tripDataSetJSON'));
    tripKeysList = [];

    for (let index = 0; index < tripData.length; index++) {
        tripNameData = tripData[index].tripName;
        tripRouteData = tripData[index].routeKey;
        tripVehicleData = tripData[index].vehicleKey;
        tripScheduleData = tripData[index].scheduleKey;
        tripCostData = tripData[index].tripCost;

        addTripKeys(tripNameData, tripRouteData, tripVehicleData, tripScheduleData, tripCostData);
    };
};

//ASIGNAMOS LOS OBJETOS QUE COINCIDAN CON LOS KEYS
let getTripObjects = () => {
    let routeIndexValidated;
    let vehicleIndexValidated;
    let scheduleIndexValidated;

    for (let index = 0; index < tripKeysList.length; index++) {
        let routeIndex = routeList.findIndex(element => element.routeName == tripKeysList[index].routeKey);
        if (routeIndex != -1) {
            routeIndexValidated = routeIndex;
        } else {
            routeIndexValidated = undefined;
        }

        let vehicleIndex = vehicleList.findIndex(element => element.vehiclePlates == tripKeysList[index].vehicleKey);
        if (vehicleIndex != -1) {
            vehicleIndexValidated = vehicleIndex;
        } else {
            vehicleIndexValidated = undefined;
        }

        let scheduleIndex = scheduleList.findIndex(element => element.scheduleName == tripKeysList[index].scheduleKey);
        if (scheduleIndex != -1) {
            scheduleIndexValidated = scheduleIndex;
        } else {
            scheduleIndexValidated = undefined;
        }

        addTrip(tripKeysList[index].tripName, routeList[routeIndexValidated], vehicleList[vehicleIndexValidated], scheduleList[scheduleIndexValidated], tripKeysList[index].tripCost);
    }
}

let addTripToData = (tripName, routeKey, vehicleKey, scheduleKey, tripCost) => {
    //Agregamos registro al tripList
    addTripKeys(tripName, routeKey, vehicleKey, scheduleKey, tripCost);

    newData = JSON.parse(sessionStorage.getItem('tripDataSetJSON'));
    newData.push(tripKeysList[tripKeysList.length - 1]);
    sessionStorage.setItem('tripDataSetJSON', JSON.stringify(newData));
}

//loadTripDataSet();
//getTripObjects();

let getTripFormData = () => {
    //Validamos el valor del select Route
    if ($('#route-selector option:selected').val() != 'default') {
        tripRouteValidated = $('#route-selector option:selected').val();
    }
    else {
        animatedNotification('Debes seleccionar una ruta', 'alert', 6000, '#route-selector');
    }

    if ($('#tripNameInput').val() != '' && $('#tripNameInput').val() != null && $('#tripNameInput').val() != undefined) {
        //Comparamos el nombre con todos los guardados con anterioridad
        let tripNameExist = false;
        for (let index = 0; index < tripList.length; index++) {
            if (tripList[index].tripName == $('#tripNameInput').val()) {
                tripNameExist = true;
            }
        }

        switch (tripNameExist) {
            case true:
                animatedNotification('Ya existe un viaje registrado con ese nombre', 'error', 6000, '#tripNameInput')
                break;

            case false:
                tripNameValidated = $('#tripNameInput').val();
                break;
        }
    }
    else {
        animatedNotification('Debes ingresar un nombre valido', 'alert', 6000, '#schedule-selector');
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

    //Cuando la informacion de todos los inputs sea valida procedemos
    if (tripNameValidated != undefined && tripRouteValidated != undefined && tripVehicleValidated != undefined && tripScheduleValidated != undefined && tripCostValidated != undefined) {
        //Registramos la informacion en el Storage
        addTripToData(tripNameValidated, tripRouteValidated, tripVehicleValidated, tripScheduleValidated, tripCostValidated);
        getTripObjects();

        printTable(tripKeysList, '#table-trip', 'tripColumnName');
        getTableItem(tripKeysList, 'tripTableItem', '#table-trip', 'tripColumnName', '#edit-trip-btn', tripEditEvent);

        cleanForm(tripInputsList);
        disableForm(tripInputsList);
        $('#save-trip-btn').removeClass('active');
        $('#save-trip-btn').unbind('click', getTripFormData);
        $('#route-selector').unbind('change', onChangeTrip);

        animatedNotification('Se ha creado un nuevo viaje', 'done', 6000);
    }

    //Limpiamos los campos validados
    tripNameValidated = undefined;
    tripRouteValidated = undefined;
    tripScheduleValidated = undefined;
    tripVehicleValidated = undefined;
    tripCostValidated = undefined;
}

let editTripFormData = () => {
    indexTripItem = tripKeysList.findIndex(element => element.tripName === itemsSelectedFromTable['tripTableItem'].tripName);

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

    if ($('#tripNameInput').val() == itemsSelectedFromTable['tripTableItem'].tripName) {
        tripNameValidated = $('#tripNameInput').val();
    } else {
        if ($('#tripNameInput').val() != '' && $('#tripNameInput').val() != null && $('#tripNameInput').val() != undefined) {
            //Comparamos el nombre con todos los guardados con anterioridad
            let tripNameExist = false;
            for (let index = 0; index < tripList.length; index++) {
                if (tripList[index].tripName == $('#tripNameInput').val()) {
                    tripNameExist = true;
                }
            }

            switch (tripNameExist) {
                case true:
                    animatedNotification('Ya existe un viaje registrado con ese nombre', 'error', 6000, '#tripNameInput')
                    break;

                case false:
                    tripNameValidated = $('#tripNameInput').val();
                    break;
            }
        }
        else {
            animatedNotification('Debes ingresar un nombre valido', 'alert', 6000, '#schedule-selector');
        }
    }

    if ($('#tripCostInput').val() != '' && !isNaN($('#tripCostInput').val())) {
        tripCostValidated = $('#tripCostInput').val();
    } else {
        animatedNotification('Debes ingresar un monto para el pasaje', 'alert', 6000, '#tripCostInput');
    }

    if (tripNameValidated != undefined && tripRouteValidated != undefined && tripVehicleValidated != undefined && tripScheduleValidated != undefined && tripCostValidated != undefined) {
        //Registramos la informacion en el Storage
        editTrip(tripNameValidated, tripRouteValidated, tripVehicleValidated, tripScheduleValidated, tripCostValidated, indexTripItem);

        printTable(tripKeysList, '#table-trip', 'tripColumnName');
        getTableItem(tripKeysList, 'tripTableItem', '#table-trip', 'tripColumnName', '#edit-trip-btn', tripEditEvent);

        cleanForm(tripInputsList);
        disableForm(tripInputsList);
        $('#save-trip-btn').removeClass('active');
        $('#save-trip-btn').unbind('click', getTripFormData);
        $('#route-selector').unbind('change', onChangeTrip);

        animatedNotification('Se ha creado un nuevo viaje', 'done', 6000);
    }

    //Limpiamos los campos validados
    tripNameValidated = undefined;
    tripRouteValidated = undefined;
    tripScheduleValidated = undefined;
    tripVehicleValidated = undefined;
    tripCostValidated = undefined;
}

let tripEditEvent = () => {
    if (itemsSelectedFromTable['tripTableItem'] != undefined) {
        //Habilitamos el formulario
        enableForm(tripInputsList);
        $('#save-trip-btn').unbind('click', getTripFormData);
        $('#save-trip-btn').addClass('active');
        $('#save-trip-btn').removeClass('active');

        //Rellenamos el input con la informacion
        $('#tripNameInput').val(itemsSelectedFromTable['tripTableItem'].tripName);
        $('#route-selector').val(itemsSelectedFromTable['tripTableItem'].routeKey);
        $('#vehicle-selector').val(itemsSelectedFromTable['tripTableItem'].vehicleKey);
        $('#schedule-selector').val(itemsSelectedFromTable['tripTableItem'].scheduleKey);
        $('#tripCostInput').val(itemsSelectedFromTable['tripTableItem'].tripCost);

        $('#save-trip-btn').click(editTripFormData);
        $('#edit-trip-btn').unbind('click', tripEditEvent);
        $('#route-selector').unbind('focus', onChangeTrip);

        console.log("P6");//TEMPORAL
    }
};

let onChangeTrip = () => {
    if ($('#tripNameInput').val() != '') {
        $('#save-trip-btn').addClass('active');
        $('#save-trip-btn').click(getTripFormData);

        console.log("P7");//TEMPORAL
    };
}

let cleanTripForm = (inputList) => {
    cleanForm(inputList);
    $('#route-selector').append(`<option value="default" selected>--</option>`);
    $('#schedule-selector').append(`<option value="default" selected>--</option>`);
    $('#vehicle-selector').append(`<option value="default" selected>--</option>`);
}

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

    $('#tripNameInput').change(onChangeTrip);
});

if (tripData != null) {
    getTripObjects();
    loadTripDataSet();
    printTable(tripKeysList, '#table-trip', 'tripColumnName');
    getTableItem(tripKeysList, 'tripTableItem', '#table-trip', 'tripColumnName', '#edit-trip-btn', tripEditEvent);
}

//Cargamos la informacion de Storage
$.ajax({
    type: "GET",
    url: "/data/dataFile.json",
    success: function (data) {
        //Cargamos la Data de Viajes
        if (tripData == null) {
            for (let index = 0; index < data.tripData.length; index++) {
                dataSet.push(data.tripData[index]);
            }
            sessionStorage.setItem('tripDataSetJSON', JSON.stringify(dataSet));
            dataSet = [];

            //Inicializamos los select
            createRouteSelectors();
            createScheduleSelectors();
            createVehicleSelectors();

            getTripObjects();
            loadTripDataSet();
            printTable(tripKeysList, '#table-trip', 'tripColumnName');
            getTableItem(tripKeysList, 'tripTableItem', '#table-trip', 'tripColumnName', '#edit-trip-btn', tripEditEvent);
        }
    },
    error: function () {
        animatedNotification('No se pudo cargar el archivo JSON con la información', 'error', 6000);
    }
});