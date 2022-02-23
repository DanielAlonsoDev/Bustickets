//FUNCION QUE CREA UN NUEVO REGISTRO EN LA LISTA DE RUTAS
let addRoute = (departureCodeValue, destinationCodeValue, departureValue, destinationValue, distanceValue) => {
    let newRoute = new Route(departureCodeValue, destinationCodeValue, departureValue, destinationValue, distanceValue);
    routeList.push(newRoute);
};

//FUNCION QUE CREA UN NUEVO REGISTRO EN LA LISTA DE RUTAS
let editRoute = (departureCodeValue, destinationCodeValue, departureValue, destinationValue, distanceValue, keyValue) => {
    let editRoute = new Route(departureCodeValue, destinationCodeValue, departureValue, destinationValue, distanceValue);
    routeList[keyValue] = editRoute;
    sessionStorage.setItem('routeDataSetJSON', JSON.stringify(routeList));

    loadRouteDataSet();
};

//FUNCION PARA TRAER INFORMACION ALMACENADA EN EL STORAGE
let loadRouteDataSet = () => {
    routeData = JSON.parse(sessionStorage.getItem('routeDataSetJSON'));
    routeList = [];

    for (let index = 0; index < routeData.length; index++) {
        codeDepartureData = routeData[index].codeDeparture;
        codeDestinationData = routeData[index].codeDestination;
        departureData = routeData[index].departure;
        destinationData = routeData[index].destination;
        distanceData = routeData[index].distance;

        addRoute(codeDepartureData, codeDestinationData, departureData, destinationData, distanceData);
    };
};

//FUNCION PARA REGISTRAR NUEVA INFORMACION EN EL STORAGE
let addRouteToData = (addCodeDeparture, addCodeDestination, addDeparture, addDestination, addDistance) => {
    //Agregamos registro al routeList
    addRoute(addCodeDeparture, addCodeDestination, addDeparture, addDestination, addDistance);

    newData = JSON.parse(sessionStorage.getItem('routeDataSetJSON'));
    newData.push(routeList[routeList.length - 1]);
    sessionStorage.setItem('routeDataSetJSON', JSON.stringify(newData));
    //Cargamos al storage
    loadRouteDataSet();
}

//FUNCION PARA CONSEGUIR LA INFORMACION DEL FORMULARIO
let getRouteFormData = () => {
    //Validamos que el contenido del input Code Departure y Destination sea valido
    if ($('#routeDepartureCodeInput').val() != '' && $('#routeDestinationCodeInput').val() != '') {
        //Comparamos el codigo con todos los guardados con anterioridad
        let departureCodeExist = false;
        let destinationCodeExist = false;

        for (let index = 0; index < routeList.length; index++) {
            if (routeList[index].codeDeparture == $('#routeDepartureCodeInput').val()) {
                departureCodeExist = true;
            }

            if (routeList[index].codeDestination == $('#routeDestinationCodeInput').val()) {
                destinationCodeExist = true;
            }
        }

        if (departureCodeExist == true && destinationCodeExist == true) {
            animatedNotification('Ya existe una ruta registrada con el mismo origen y destino', 'error', 6000, '#routeNameInput');
        }
        else {
            routeDepartureCodeValidated = $('#routeDepartureCodeInput').val();
            routeDestinationCodeValidated = $('#routeDestinationCodeInput').val();
        }
    }
    //Notificamos que falta el Codigo del Origen
    if ($('#routeDepartureCodeInput').val() == '') {
        animatedNotification('Debes ingresar un codigo de origen', 'alert', 6000, '#routeDepartureCodeInput');
    }

    //Notificamos que falta el Codigo del Destino
    if ($('#routeDestinationCodeInput').val() == '') {
        animatedNotification('Debes ingresar un codigo de destino', 'alert', 6000, '#routeDestinationCodeInput');
    }

    //Validamos el Route Departure
    if ($('#routedDepartureNameInput').val() != '') {
        routeDepartureNameValidated = $('#routedDepartureNameInput').val();
    } else {
        animatedNotification('Debes ingresar un nombre de origen', 'alert', 6000, '#routedDepartureNameInput');
    }

    //Validamos el Route Destination
    if ($('#routeDestinationNameInput').val() != '') {
        routeDestinationNameValidated = $('#routeDestinationNameInput').val();
    } else {
        animatedNotification('Debes ingresar un nombre de destino', 'alert', 6000, '#routeDestinationNameInput');
    }

    //Validamos el Route Distance
    if ($('#routeDistanceInput').val() != '' && !isNaN($('#routeDistanceInput').val())) {
        routeDistanceValidated = $('#routeDistanceInput').val();
    } else {
        animatedNotification('Debes ingresar la distancia de recorrido', 'alert', 6000, '#routeDistanceInput');
    }

    //Cuando la informacion de todos los inputs sea valida procedemos
    if (routeDepartureNameValidated != undefined && routeDepartureCodeValidated != undefined && routeDestinationNameValidated != undefined && routeDestinationCodeValidated != undefined && routeDistanceValidated != undefined) {
        //Registramos la informacion en el Storage
        addRouteToData(routeDepartureCodeValidated, routeDestinationCodeValidated, routeDepartureNameValidated, routeDestinationNameValidated, routeDistanceValidated);

        printTable(routeList, '#table-route', 'routeName');
        getTableItem(routeList, 'routeTableItem', '#table-route td', 'routeName', '#edit-route-btn', routeEditEvent);
        deleteRouteItem();

        //Limpiamos los formularios y los cambios de los inputs
        cleanForm(routeInputsList);
        disableForm(routeInputsList);
        $('#save-route-btn').removeClass('active');
        $('#save-route-btn').unbind('click', getRouteFormData);
        $('#routedDepartureNameInput').unbind('change', onchangeRoute);

        animatedNotification('Se ha creado una nueva ruta', 'done', 6000);
    }

    //Limpiamos los campos validados
    routeDepartureNameValidated = undefined;
    routeDepartureCodeValidated = undefined;
    routeDestinationNameValidated = undefined;
    routeDestinationCodeValidated = undefined;
    routeDistanceValidated = undefined;
}

let editRouteFormData = () => {
    indexRouteItem = routeList.findIndex(element => element.routeName === itemsSelectedFromTable['routeTableItem'].routeName);
    //Validamos que el contenido del input Code Departure y Destination sea valido
    if ($('#routeDepartureCodeInput').val() == itemsSelectedFromTable['routeTableItem'].codeDeparture && $('#routeDestinationCodeInput').val() == itemsSelectedFromTable['routeTableItem'].codeDestination) {
        routeDepartureCodeValidated = $('#routeDepartureCodeInput').val();
        routeDestinationCodeValidated = $('#routeDestinationCodeInput').val();
    }
    else {
        //En caso de modificarse el contenido de los inputs, se valida el contenido y que no exista otro registro igual
        if ($('#routeDepartureCodeInput').val() != '' && $('#routeDestinationCodeInput').val() != '') {
            //Comparamos el codigo con todos los guardados con anterioridad
            let departureCodeExist = false;
            let destinationCodeExist = false;

            for (let index = 0; index < routeList.length; index++) {
                if (routeList[index].codeDeparture == $('#routeDepartureCodeInput').val()) {
                    departureCodeExist = true;
                }

                if (routeList[index].codeDestination == $('#routeDestinationCodeInput').val()) {
                    destinationCodeExist = true;
                }
            }

            if (departureCodeExist == true && destinationCodeExist == true) {
                animatedNotification('Ya existe una ruta registrada con el mismo origen y destino', 'error', 6000, '#routeNameInput');
            }
            else {
                routeDepartureCodeValidated = $('#routeDepartureCodeInput').val();
                routeDestinationCodeValidated = $('#routeDestinationCodeInput').val();
            }
        }
        //Notificamos que falta el Codigo del Origen
        if ($('#routeDepartureCodeInput').val() == '') {
            animatedNotification('Debes ingresar un codigo de origen', 'alert', 6000, '#routeDepartureCodeInput');
        }
        //Notificamos que falta el Codigo del Destino
        if ($('#routeDestinationCodeInput').val() == '') {
            animatedNotification('Debes ingresar un codigo de destino', 'alert', 6000, '#routeDestinationCodeInput');
        }
    }


    //Validamos que el contenido Departure Name sea valido
    if ($('#routedDepartureNameInput').val() != '') {
        routeDepartureNameValidated = $('#routedDepartureNameInput').val();
    } else {
        animatedNotification('Debes ingresar un nombre de origen', 'alert', 6000, '#routedDepartureNameInput');
    }

    //Validamos que el contenido Destination Name sea valido
    if ($('#routeDestinationNameInput').val() != '') {
        routeDestinationNameValidated = $('#routeDestinationNameInput').val();
    } else {
        animatedNotification('Debes ingresar un nombre de destino', 'alert', 6000, '#routeDestinationNameInput');
    }

    //Validamos que el contenido del Distance sea valido
    if ($('#routeDistanceInput').val() != '' && !isNaN($('#routeDistanceInput').val())) {
        routeDistanceValidated = $('#routeDistanceInput').val();
    } else {
        animatedNotification('Debes ingresar la distancia de recorrido', 'alert', 6000, '#routeDistanceInput');
    }

    if (routeDepartureNameValidated != undefined && routeDepartureCodeValidated != undefined && routeDestinationNameValidated != undefined && routeDestinationCodeValidated != undefined && routeDistanceValidated != undefined) {
        //Actualizamos el Key del Trip
        for (let index = 0; index < tripKeysList.length; index++) {
            if (tripKeysList[index].routeKey == routeList[indexRouteItem].routeName) {
                editTrip(tripKeysList[index].tripDate, routeDepartureCodeValidated + "-" + routeDestinationCodeValidated, tripKeysList[index].vehicleKey, tripKeysList[index].scheduleKey, tripKeysList[index].tripCost, index);
            }
        }
        editRoute(routeDepartureCodeValidated, routeDestinationCodeValidated, routeDepartureNameValidated, routeDestinationNameValidated, routeDistanceValidated, indexRouteItem);
        //Actualizamos la tabla de viajes
        createRouteSelectors();
        printTable(tripKeysList, '#table-trip', 'tripColumnName');
        getTableItem(tripKeysList, 'tripTableItem', '#table-trip td', 'tripColumnName', '#edit-trip-btn', tripEditEvent);

        //Registramos la informacion en el Storage
        printTable(routeList, '#table-route', 'routeName');
        getTableItem(routeList, 'routeTableItem', '#table-route td', 'routeName', '#edit-route-btn', routeEditEvent);
        deleteRouteItem();

        //Limpiamos los formularios y los cambios de los inputs
        cleanForm(routeInputsList);
        disableForm(routeInputsList);
        $('#save-route-btn').removeClass('active');
        $('#save-route-btn').unbind('click', editRouteFormData);

        animatedNotification('Se ha actualizado la información de la ruta', 'done', 6000);
    };

    //Limpiamos los campos validados
    routeDepartureNameValidated = undefined;
    routeDepartureCodeValidated = undefined;
    routeDestinationNameValidated = undefined;
    routeDestinationCodeValidated = undefined;
    routeDistanceValidated = undefined;
};

let routeEditEvent = () => {
    if (itemsSelectedFromTable['routeTableItem'] != undefined) {
        //Habilitamos el formulario
        enableForm(routeInputsList);
        cleanForm(routeInputsList);
        $('#save-route-btn').unbind('click');
        $('#save-route-btn').addClass('active');
        $('#edit-route-btn').removeClass('active');

        //Rellenamos el input con la informacion
        $('#routeDepartureCodeInput').val(itemsSelectedFromTable['routeTableItem'].codeDeparture);
        $('#routeDestinationCodeInput').val(itemsSelectedFromTable['routeTableItem'].codeDestination);
        $('#routedDepartureNameInput').val(itemsSelectedFromTable['routeTableItem'].departure);
        $('#routeDestinationNameInput').val(itemsSelectedFromTable['routeTableItem'].destination);
        $('#routeNameInput').val(itemsSelectedFromTable['routeTableItem'].routeName);
        $('#routeDistanceInput').val(itemsSelectedFromTable['routeTableItem'].distance);
        $('#routeHoursInput').val(itemsSelectedFromTable['routeTableItem'].getEta()[0] + 'h');
        $('#routeMinutesInput').val(itemsSelectedFromTable['routeTableItem'].getEta()[1] + 'm');

        $('#routeDepartureCodeInput, #routeDestinationCodeInput').change(showRouteName);

        $('#save-route-btn').click(editRouteFormData);
        $('#edit-route-btn').unbind('click');
        $('#routedDepartureNameInput').unbind('change');
    };
};

let onchangeRoute = () => {
    $('#save-route-btn').unbind('click');
    //Validamos el contenido del input
    if ($('#routedDepartureNameInput').val() != '') {
        $('#save-route-btn').addClass('active');
        $('#save-route-btn').click(getRouteFormData);
    };
};

//Mostrar el contenido del nombre de la ruta
let showRouteName = () => {
    let inputNameValue = $("#routeDepartureCodeInput").val() + "-" + $("#routeDestinationCodeInput").val();
    $('#routeNameInput').val(inputNameValue);
}

//Eliminar elementos de la lista de rutas
let deleteRouteItem = () => {
    $('#table-route .icon-bin2').click(function (e) {
        e.preventDefault();

        let itemExist = false;
        for (const item of tripKeysList) {
            if (item.routeKey == e.currentTarget.id) {
                itemExist = true;
            }
        }

        switch (itemExist) {
            case true:
                animatedNotification('La ruta no se puede eliminar ya que se encuentra seleccionada en un viaje', 'alert', 6000);
                break;

            default:
                let index = routeList.findIndex(element => element.routeName == e.currentTarget.id);
                routeList.splice(index, 1);
                sessionStorage.setItem('routeDataSetJSON', JSON.stringify(routeList));
                animatedNotification('Ruta Eliminada', 'delete', 6000);
                $(`#table-route td[id="${e.currentTarget.id}"]`).remove();
                break;
        }
    });
}

//Asignamos el evento al boton nuevo
$('#new-route-btn').click(function (e) {
    cleanForm(routeInputsList);
    enableForm(routeInputsList);
    //Reiniciamos los eventosy los cambios de clases
    $('#save-route-btn, #edit-route-btn').removeClass('active');
    $('#save-route-btn, #edit-route-btn').unbind('click');
    eventInputCleaner(routeInputsList);

    for (let i = 0; i < $('#table-route td').length; i++) {
        $('#table-route td').eq(i).removeClass('active');
    }

    $('#routedDepartureNameInput').change(onchangeRoute);
    $('#routeDepartureCodeInput, #routeDestinationCodeInput').change(showRouteName);
});

$(document).ready(function () {
    //Si las rutas se encuentran en el sessionStorage
    if (routeData != null) {
        //Inicializamos la tabla
        loadRouteDataSet();
        printTable(routeList, '#table-route', 'routeName');
        getTableItem(routeList, 'routeTableItem', '#table-route td', 'routeName', '#edit-route-btn', routeEditEvent);
        deleteRouteItem();
    }
});

//Cargamos la informacion de Storage
$.ajax({
    type: "GET",
    url: "../data/dataFile.json",
    success: function (data) {
        //Cargamos la Data de Rutas
        if (routeData == null) {
            for (let index = 0; index < data.routeData.length; index++) {
                dataSet.push(data.routeData[index]);
            }
            sessionStorage.setItem('routeDataSetJSON', JSON.stringify(dataSet));
            dataSet = [];
            //Inicializamos la tabla
            loadRouteDataSet();
            printTable(routeList, '#table-route', 'routeName');
            getTableItem(routeList, 'routeTableItem', '#table-route td', 'routeName', '#edit-route-btn', routeEditEvent);
            deleteRouteItem();
        }
    },
    error: function () {
        animatedNotification('No se pudo cargar el archivo JSON con la información', 'error', 6000);
    }
});



