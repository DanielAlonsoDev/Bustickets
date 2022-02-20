let createTripSelectors = () => {
    if (tripKeysList.length > 0) {
        let contentOption;
        $('#trip-selector').empty();
        $('#trip-selector').append(`<option value="default" selected>--</option>`);

        for (let index = 0; index < tripKeysList.length; index++) {
            contentOption = `<option value="${tripKeysList[index].tripColumnName}">${tripKeysList[index].tripColumnName}</option>`;
            $('#trip-selector').append(contentOption);
        }
    }
}

$('#trip-selector').focus(function (e) {
    createTripSelectors();
});

let calculateTaxes = (cost) => {
    let taxes = 19;
    let taxesValue = parseInt(cost) * (taxes / 100);
    let total = parseInt(cost) + taxesValue;
    return [taxesValue, total];
}

let showAvailableCapacity = ( selectorValue ) => {
    loadTicketDataSet();
    $('#showAvailableInput').removeClass('border-red');
    let seatsCount = 0;
    for (let index = 0; index < ticketKeysList.length; index++) {
        if ( ticketKeysList[index].tripKey === $('#trip-selector option:selected').val() ) {
            seatsCount++;
        }
    }

    let indexTripItem = ticketKeysList.findIndex(element => element.tripKey == $('#trip-selector option:selected').val());

    let availableCapacity = ticketList[indexTripItem].trip.tripVehicle.vehicleSeats - ticketList[indexTripItem].trip.tripVehicle.vehicleStaff;

    if( (availableCapacity - seatsCount) == 0){
        ticketList[indexTripItem].trip.available = false;
    }
    $('#showAvailableInput').val( availableCapacity - seatsCount);
}

$('#trip-selector').change(function (e) {
    if ($('#trip-selector option:selected').val() != 'default') {
        let indexTripItem = tripKeysList.findIndex(element => element.tripColumnName == $('#trip-selector option:selected').val());
        getTripObjects();
        $('#showDepartureInput').val(tripList[indexTripItem].tripRoute.departure);
        $('#showDestinationInput').val(tripList[indexTripItem].tripRoute.destination);
        $('#showCostInput').val(tripList[indexTripItem].tripCost + "$");

        let taxesValue = calculateTaxes(tripList[indexTripItem].tripCost);
        $('#showTaxesInput').val(taxesValue[0] + "$");
        $('#showTotalInput').val(taxesValue[1] + "$");

        showAvailableCapacity();
    }
    else {
        cleanForm(ticketInputsList);
    }
});

let addTicketKeys = (userName, userLastName, userId, tripKey) => {
    let newTicket = new TicketKeys(userName, userLastName, userId, tripKey);
    ticketKeysList.push(newTicket);
};

let editTicketKeys = (userName, userLastName, userId, tripKey, keyValue) => {
    let editTicket = new TicketKeys(userName, userLastName, userId, tripKey);
    ticketKeysList[keyValue] = editTicket;
    sessionStorage.setItem('ticketDataSetJSON', JSON.stringify(ticketKeysList));

    loadTicketDataSet();
}

let addTicket = (userName, userLastName, userId, route, schedule, vehicle) => {
    let newTicket = new Ticket(userName, userLastName, userId, route, schedule, vehicle);
    ticketList.push(newTicket);
};

let loadTicketDataSet = () => {
    ticketData = JSON.parse(sessionStorage.getItem('ticketDataSetJSON'));
    ticketKeysList = [];

    for (let index = 0; index < ticketData.length; index++) {
        ticketUserNameData = ticketData[index].userName;
        ticketUserLastNameData = ticketData[index].userLastName;
        ticketUserIdData = ticketData[index].userId;
        ticketTripData = ticketData[index].tripKey;
        
        addTicketKeys(ticketUserNameData, ticketUserLastNameData, ticketUserIdData, ticketTripData);
    };
};

let addTicketKeysToData = (userName, userLastName, userId, tripKey) => {
    //Agregamos registro al ticketKeysList
    addTicketKeys(userName, userLastName, userId, tripKey);

    newData = JSON.parse(sessionStorage.getItem('ticketDataSetJSON'));
    newData.push(ticketKeysList[ticketKeysList.length - 1]);
    sessionStorage.setItem('ticketDataSetJSON', JSON.stringify(newData));
}

let getTicketObjects = () => {
    let tripIndexValidated;
    ticketList = [];
    for (let index = 0; index < ticketKeysList.length; index++) {

        let tripIndex = tripKeysList.findIndex(element => element.tripColumnName == ticketKeysList[index].tripKey);

        if (tripIndex != -1) {
            tripIndexValidated = tripIndex;
        } else {
            tripIndexValidated = undefined;
        }
        
        if (tripIndexValidated != undefined) {
            addTicket(ticketKeysList[index].userName, ticketKeysList[index].userLastName, ticketKeysList[index].userId, tripList[tripIndex]);
        }
    }
}

let getTicketFormData = () => {
    //Validamos el contenido del input UserName
    if ($('#userNameInput').val() != '' && isNaN($('#userNameInput').val())) {
        userNameValidated = $('#userNameInput').val();
    } else {
        animatedNotification('Debes ingresar un nombre de pasajero valido', 'alert', 6000, '#userNameInput');
    }

    //Validamos el contenido del input UserLastName
    if ($('#userLastNameInput').val() != '' && isNaN($('#userLastNameInput').val())) {
        userLastNameValidated = $('#userLastNameInput').val();
    } else {
        animatedNotification('Debes ingresar un apellido de pasajero valido', 'alert', 6000, '#userLastNameInput');
    }

    //Validamos el contenido del input UserId
    if ($('#userIdInput').val() != '') {
        userIdValidated = $('#userIdInput').val();
    } else {
        animatedNotification('Debes ingresar un documento de identidad de pasajero valido', 'alert', 6000, '#userIdInput');
    }

    if($('#trip-selector option:selected').val() != 'default'){
        ticketTripValidated = $('#trip-selector option:selected').val();
    } else {
        animatedNotification('Debes seleccionar un viajes', 'alert', 6000, '#trip-selector' );
    }

    let indexTripItem = ticketKeysList.findIndex(element => element.tripKey == $('#trip-selector option:selected').val());

    //Validamos la disponibilidad
    if (ticketList[indexTripItem].trip.available == false){
        console.log('Exito en la validacion');
        animatedNotification('El viaje ya no tiene puestos disponibles','error', 6000, '#showAvailableInput');
    }     

    if (userNameValidated != undefined && userLastNameValidated != undefined && userIdValidated != undefined && ticketList[indexTripItem].trip.available == true) {
        addTicketKeysToData( userNameValidated, userLastNameValidated, userIdValidated,ticketTripValidated);
        getTicketObjects();
        salesSummary();

        console.log(ticketKeysList);
        console.log(ticketList);

        cleanTicketForm(ticketInputsList);
        animatedNotification('Venta de ticket registrada', 'done', 6000);
    }

    userNameValidated = undefined;
    userLastNameValidated = undefined;
    userIdValidated = undefined;
    ticketTripValidated = undefined;
}

let salesSummary = () => {
    loadTicketDataSet();
    getTicketObjects();
    
    let salesRevenue = 0;
    for (const item of ticketList) {
        salesRevenue = salesRevenue + parseInt(item.trip.tripCost);
    }

    $('#sold-tickets-value').text(ticketKeysList.length);
    $('#flow-cash-value').text(salesRevenue + '$');
}

let cleanTicketForm = (inputList) => {
    cleanForm(inputList);
    $('#trip-selector option[value="default"]').prop('selected', true);
}

$('#register-ticket-btn').click(function (e) {
    e.preventDefault();
    getTicketFormData();
});

if (ticketData != null) {
    loadTicketDataSet();
    getTicketObjects();
    salesSummary();
}

//Cargamos la informacion de Storage
$.ajax({
    type: "GET",
    url: "../data/dataFile.json",
    success: function (data) {
        //Cargamos la Data de Viajes
        if (ticketData == null) {
            for (let index = 0; index < data.ticketData.length; index++) {
                dataSet.push(data.ticketData[index]);
            }
            sessionStorage.setItem('ticketDataSetJSON', JSON.stringify(dataSet));
            dataSet = [];
            loadTicketDataSet();
            getTicketObjects();
            salesSummary();
        }
    },
    error: function () {
        animatedNotification('No se pudo cargar el archivo JSON con la información', 'error', 6000);
    }
});