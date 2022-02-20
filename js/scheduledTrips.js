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
let addTrip = (tripDate, routeObject, vehicleObject, scheduleObject, costValue) => {
    let newTrip = new ScheduledTrip(tripDate, routeObject, vehicleObject, scheduleObject, costValue);
    tripList.push(newTrip);
};

let addTripKeys = (tripDate, routeKey, vehicleKey, scheduleKey, tripCost) => {
    let newTripKeys = new TripKeys(tripDate, routeKey, vehicleKey, scheduleKey, tripCost);
    tripKeysList.push(newTripKeys);
};

let editTrip = (tripDate, routeKey, vehicleKey, scheduleKey, tripCost, keyValue) => {
    let editTrip = new TripKeys(tripDate, routeKey, vehicleKey, scheduleKey, tripCost);
    tripKeysList[keyValue] = editTrip;
    sessionStorage.setItem('tripDataSetJSON', JSON.stringify(tripKeysList));

    loadTripDataSet();
}

//FUNCION PARA TRAER INFORMACION ALMACENADA EN EL STORAGE
let loadTripDataSet = () => {
    tripData = JSON.parse(sessionStorage.getItem('tripDataSetJSON'));
    tripKeysList = [];

    for (let index = 0; index < tripData.length; index++) {
        tripDateData = tripData[index].tripDate;
        tripRouteData = tripData[index].routeKey;
        tripVehicleData = tripData[index].vehicleKey;
        tripScheduleData = tripData[index].scheduleKey;
        tripCostData = tripData[index].tripCost;

        addTripKeys(tripDateData, tripRouteData, tripVehicleData, tripScheduleData, tripCostData);
    };
};

//ASIGNAMOS LOS OBJETOS QUE COINCIDAN CON LOS KEYS
let getTripObjects = () => {
    let routeIndexValidated;
    let vehicleIndexValidated;
    let scheduleIndexValidated;
    tripList = [];

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

        if (routeIndexValidated != undefined && vehicleIndexValidated != undefined && scheduleIndexValidated != undefined) {
            addTrip(tripKeysList[index].tripDate, routeList[routeIndexValidated], vehicleList[vehicleIndexValidated], scheduleList[scheduleIndexValidated], tripKeysList[index].tripCost);
        }
    }
}

let addTripToData = (tripDate, routeKey, vehicleKey, scheduleKey, tripCost) => {
    //Agregamos registro al tripList
    addTripKeys(tripDate, routeKey, vehicleKey, scheduleKey, tripCost);

    newData = JSON.parse(sessionStorage.getItem('tripDataSetJSON'));
    newData.push(tripKeysList[tripKeysList.length - 1]);
    sessionStorage.setItem('tripDataSetJSON', JSON.stringify(newData));
}

let getTripFormData = () => {
    //Validamos el valor del date
    if ($('#tripDateInput').val() != '' && $('#vehicle-selector option:selected').val() != 'default') {
        //Comparamos la con todos los guardados con anterioridad
        let tripExist = false;
        for (let index = 0; index < tripList.length; index++) {
            let tripDateExist = false;
            let tripVehicleExist = false;
            let tripScheduleExist = false;

            if (tripKeysList[index].tripDate == $('#tripDateInput').val()) {
                tripDateExist = true;
                console.log("Checkpoint 1");
            }
            if (tripKeysList[index].vehicleKey == $('#vehicle-selector option:selected').val()) {
                tripVehicleExist = true;
                console.log("Checkpoint 2");
            }

            if (tripKeysList[index].scheduleKey == $('#schedule-selector option:selected').val()) {
                tripScheduleExist = true;
                console.log("Checkpoint 3");
            }

            if (tripDateExist && tripVehicleExist && tripScheduleExist) {
                tripExist = true;
            }
        }
        switch (tripExist) {
            case true:
                animatedNotification('Existe un viaje guardado con esos datos', 'error', 6000, '#tripDateInput, #vehicle-selector, #schedule-selector');
                break;

            default:
                tripDateValidated = $('#tripDateInput').val();
                tripVehicleValidated = $('#vehicle-selector option:selected').val();
                tripScheduleValidated = $('#schedule-selector option:selected').val();
                break;
        }
    }

    //Validamos el valor del select Route
    if ($('#route-selector option:selected').val() != 'default') {
        tripRouteValidated = $('#route-selector option:selected').val();
    }
    else {
        animatedNotification('Debes seleccionar una ruta', 'alert', 6000, '#route-selector');
    }

    //Validamos el valor del select vehicle
    if ($('#vehicle-selector option:selected').val() == 'default') {
        animatedNotification('Debes seleccionar un vehiculo', 'alert', 6000, '#vehicle-selector');
    }

    //Validamos el valor del select schedule
    if ($('#schedule-selector option:selected').val() == 'default') {
        animatedNotification('Debes seleccionar un horario', 'alert', 6000, '#schedule-selector');
    }

    //Validamos el valor del select Cost
    if ($('#tripCostInput').val() != '' && !isNaN($('#tripCostInput').val())) {
        tripCostValidated = $('#tripCostInput').val();
    } else {
        animatedNotification('Debes ingresar un monto para el pasaje', 'alert', 6000, '#tripCostInput');
    }

    //Cuando la informacion de todos los inputs sea valida procedemos
    if (tripDateValidated != undefined && tripRouteValidated != undefined && tripVehicleValidated != undefined && tripScheduleValidated != undefined && tripCostValidated != undefined) {
        //Registramos la informacion en el Storage
        addTripToData(tripDateValidated, tripRouteValidated, tripVehicleValidated, tripScheduleValidated, tripCostValidated);
        getTripObjects();

        printTable(tripKeysList, '#table-trip', 'tripColumnName');
        getTableItem(tripKeysList, 'tripTableItem', '#table-trip', 'tripColumnName', '#edit-trip-btn', tripEditEvent);

        cleanTripForm(tripInputsList);
        disableForm(tripInputsList);
        $('#save-trip-btn').removeClass('active');
        $('#save-trip-btn').unbind('click', getTripFormData);
        $('#route-selector').unbind('change', onChangeTrip);

        animatedNotification('Se ha creado un nuevo viaje', 'done', 6000);
    }

    //Limpiamos los campos validados
    tripDateValidated = undefined;
    tripRouteValidated = undefined;
    tripScheduleValidated = undefined;
    tripVehicleValidated = undefined;
    tripCostValidated = undefined;
}

let editTripFormData = () => {
    indexTripItem = tripKeysList.findIndex(element => element.tripColumnName === itemsSelectedFromTable['tripTableItem'].tripColumnName);

    if ($('#tripDateInput').val() == itemsSelectedFromTable['tripTableItem'].tripDate && $('#vehicle-selector option:selected').val() == itemsSelectedFromTable['tripTableItem'].vehicleKey && $('#schedule-selector option:selected').val() == itemsSelectedFromTable['tripTableItem'].scheduleKey) {
        tripDateValidated = $('#tripDateInput').val();
        tripVehicleValidated = $('#vehicle-selector option:selected').val();
        tripScheduleValidated = $('#schedule-selector option:selected').val();
    } else {
        if ($('#tripDateInput').val() != '' && $('#vehicle-selector option:selected').val() != 'default') {
            //Comparamos la con todos los guardados con anterioridad
            let tripExist = false;
            for (let index = 0; index < tripList.length; index++) {
                
                let tripDateExist = false;
                let tripVehicleExist = false;
                let tripScheduleExist = false;

                if (tripKeysList[index].tripDate == $('#tripDateInput').val()) {
                    tripDateExist = true;
                    console.log("Checkpoint 1");
                }
                if (tripKeysList[index].vehicleKey == $('#vehicle-selector option:selected').val()) {
                    tripVehicleExist = true;
                    console.log("Checkpoint 2");
                }

                if (tripKeysList[index].scheduleKey == $('#schedule-selector option:selected').val()) {
                    tripScheduleExist = true;
                    console.log("Checkpoint 3");
                }

                if (tripDateExist && tripVehicleExist && tripScheduleExist) {
                    tripExist = true;
                }
            }
            switch (tripExist) {
                case true:
                    animatedNotification('Existe un viaje guardado con esos datos', 'error', 6000, '#tripDateInput, #vehicle-selector, #schedule-selector');
                    break;

                default:
                    tripDateValidated = $('#tripDateInput').val();
                    tripVehicleValidated = $('#vehicle-selector option:selected').val();
                    tripScheduleValidated = $('#schedule-selector option:selected').val();
                    break;
            }
        }
    }

    //Validamos el contenido de los inputs
    if ($('#route-selector option:selected').val() != 'default') {
        tripRouteValidated = $('#route-selector option:selected').val();
    }
    else {
        animatedNotification('Debes seleccionar una ruta', 'alert', 6000, '#route-selector');
    }

    //Validamos el valor del select vehicle
    if ($('#vehicle-selector option:selected').val() == 'default') {
        animatedNotification('Debes seleccionar un vehiculo', 'alert', 6000, '#vehicle-selector');
    }

    //Validamos el valor del select schedule
    if ($('#schedule-selector option:selected').val() == 'default') {
        animatedNotification('Debes seleccionar un horario', 'alert', 6000, '#schedule-selector');
    }

    //Validamos el valor del select Cost
    if ($('#tripCostInput').val() != '' && !isNaN($('#tripCostInput').val())) {
        tripCostValidated = $('#tripCostInput').val();
    } else {
        animatedNotification('Debes ingresar un monto para el pasaje', 'alert', 6000, '#tripCostInput');
    }

    if (tripDateValidated != undefined && tripRouteValidated != undefined && tripVehicleValidated != undefined && tripScheduleValidated != undefined && tripCostValidated != undefined) {
        //Registramos la informacion en el Storage
        editTrip(tripDateValidated, tripRouteValidated, tripVehicleValidated, tripScheduleValidated, tripCostValidated, indexTripItem);

        printTable(tripKeysList, '#table-trip', 'tripColumnName');
        getTableItem(tripKeysList, 'tripTableItem', '#table-trip', 'tripColumnName', '#edit-trip-btn', tripEditEvent);

        cleanTripForm(tripInputsList);
        disableForm(tripInputsList);
        $('#save-trip-btn').removeClass('active');
        $('#save-trip-btn').unbind('click', editTripFormData);
        $('#route-selector').unbind('change', onChangeTrip);

        animatedNotification('Se ha creado un nuevo viaje', 'done', 6000);
    }
    //Limpiamos los campos validados
    tripDateValidated = undefined;
    tripRouteValidated = undefined;
    tripScheduleValidated = undefined;
    tripVehicleValidated = undefined;
    tripCostValidated = undefined;
}

let tripEditEvent = () => {
    if (itemsSelectedFromTable['tripTableItem'] != undefined) {
        //Habilitamos el formulario
        enableForm(tripInputsList);
        cleanForm(tripInputsList);
        $('#save-trip-btn').unbind('click');
        $('#save-trip-btn').addClass('active');
        $('#edit-trip-btn').removeClass('active');

        //Rellenamos el input con la informacion
        $('#tripDateInput').val(itemsSelectedFromTable['tripTableItem'].tripDate);
        $(`#route-selector option[value="${itemsSelectedFromTable['tripTableItem'].routeKey}"]`).prop('selected', true);
        $(`#vehicle-selector option[value="${itemsSelectedFromTable['tripTableItem'].vehicleKey}"]`).prop('selected', true);
        $(`#schedule-selector option[value="${itemsSelectedFromTable['tripTableItem'].scheduleKey}"]`).prop('selected', true);
        $('#tripCostInput').val(itemsSelectedFromTable['tripTableItem'].tripCost);

        $('#save-trip-btn').click(editTripFormData);
        $('#edit-trip-btn').unbind('click');
        $('#route-selector').unbind('focus');
    }
};

let onChangeTrip = () => {
    $('#save-trip-btn').unbind('click');
    //Validamos el contenido del input
    if ($('#tripDateInput').val() != '') {
        $('#save-trip-btn').addClass('active');
        $('#save-trip-btn').click(getTripFormData);
    };
}

let cleanTripForm = (inputList) => {
    cleanForm(inputList);
    $('#route-selector option[value="default"], #schedule-selector option[value="default"], #vehicle-selector option[value="default"]').prop('selected', true);
}

$('#new-trip-btn').click(function (e) {
    cleanTripForm(tripInputsList);
    enableForm(tripInputsList);
    //Reiniciamos los eventosy los cambios de clases
    $('#save-trip-btn, #edit-trip-btn').removeClass('active');
    $('#save-trip-btn, #edit-trip-btn').unbind('click');
    eventInputCleaner(tripInputsList);

    for (let i = 0; i < $('#table-trip td').length; i++) {
        $('#table-trip td').eq(i).removeClass('active');
    }

    $('#tripDateInput').change(onChangeTrip);
});

if (tripData != null) {
    loadTripDataSet();
    getTripObjects();

    //Inicializamos los select
    createRouteSelectors();
    createScheduleSelectors();
    createVehicleSelectors();

    printTable(tripKeysList, '#table-trip', 'tripColumnName');
    getTableItem(tripKeysList, 'tripTableItem', '#table-trip', 'tripColumnName', '#edit-trip-btn', tripEditEvent);
}

//Cargamos la informacion de Storage
$.ajax({
    type: "GET",
    url: "../data/dataFile.json",
    success: function (data) {
        //Cargamos la Data de Viajes
        if (tripData == null) {
            for (let index = 0; index < data.tripData.length; index++) {
                dataSet.push(data.tripData[index]);
            }
            sessionStorage.setItem('tripDataSetJSON', JSON.stringify(dataSet));
            dataSet = [];
            loadTripDataSet();
            getTripObjects();

            //Inicializamos los select
            createRouteSelectors();
            createScheduleSelectors();
            createVehicleSelectors();

            printTable(tripKeysList, '#table-trip', 'tripColumnName');
            getTableItem(tripKeysList, 'tripTableItem', '#table-trip', 'tripColumnName', '#edit-trip-btn', tripEditEvent);
        }
    },
    error: function () {
        animatedNotification('No se pudo cargar el archivo JSON con la información', 'error', 6000);
    }
});