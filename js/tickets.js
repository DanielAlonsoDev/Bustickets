//CREAR EL SELECTOR DE VIAJES
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
//Mostrar cambios de selectores
$('#trip-selector').focus(function (e) {
    createTripSelectors();
});

//Calcular los impuestos
let calculateTaxes = (cost) => {
    let taxes = 19;
    let taxesValue = parseInt(cost) * (taxes / 100);
    let total = parseInt(cost) + taxesValue;
    return [taxesValue, total];
}

//Calcular la cantidad de puestos disponibles de un viaje
let showAvailableCapacity = () => {
    loadTicketDataSet();
    $('#showAvailableInput').removeClass('border-red');
    let seatsCount = 0;
    for (let index = 0; index < ticketKeysList.length; index++) {
        if (ticketKeysList[index].tripKey === $('#trip-selector option:selected').val()) {
            seatsCount++;
        }
    }

    let indexTripItem = tripKeysList.findIndex(element => element.tripColumnName == $('#trip-selector option:selected').val());

    let availableCapacity = tripList[indexTripItem].tripVehicle.vehicleSeats - tripList[indexTripItem].tripVehicle.vehicleStaff;

    if ((availableCapacity - seatsCount) == 0) {
        tripList[indexTripItem].available = false;
    }
    $('#showAvailableInput').val(availableCapacity - seatsCount);
}

//Mostramos la informacion de viaje en los inputs
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

//Crear un nuevo elemento en la lista de ticketsKeys
let addTicketKeys = (userName, userLastName, userId, tripKey) => {
    let newTicket = new TicketKeys(userName, userLastName, userId, tripKey, generateTicketNumber());
    ticketKeysList.push(newTicket);
};

//Editar un nuevo elemento en la lista de ticketsKeys
let editTicketKeys = (userName, userLastName, userId, tripKey, ticketNumber, keyValue) => {
    let editTicket = new TicketKeys(userName, userLastName, userId, tripKey, ticketNumber);
    ticketKeysList[keyValue] = editTicket;
    sessionStorage.setItem('ticketDataSetJSON', JSON.stringify(ticketKeysList));

    loadTicketDataSet();
}

//Crear un nuevo elemento en la lista de tickets
let addTicket = (userName, userLastName, userId, trip, ticketNumber) => {
    let newTicket = new Ticket(userName, userLastName, userId, trip, ticketNumber);
    ticketList.push(newTicket);
};

//FUNCION PARA TRAER INFORMACION ALMACENADA EN EL STORAGE
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

//Agregar nuecos elementos al sessionStorage
let addTicketKeysToData = (userName, userLastName, userId, tripKey) => {
    //Agregamos registro al ticketKeysList
    addTicketKeys(userName, userLastName, userId, tripKey);

    newData = JSON.parse(sessionStorage.getItem('ticketDataSetJSON'));
    newData.push(ticketKeysList[ticketKeysList.length - 1]);
    sessionStorage.setItem('ticketDataSetJSON', JSON.stringify(newData));
}

//ASIGNAMOS LOS OBJETOS QUE COINCIDAN CON LOS KEYS
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
            addTicket(ticketKeysList[index].userName, ticketKeysList[index].userLastName, ticketKeysList[index].userId, tripList[tripIndex], ticketKeysList[index].ticketNumber);
        }
    }
}

//Conseguir la informacion del Formulario
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

    if ($('#trip-selector option:selected').val() != 'default') {
        ticketTripValidated = $('#trip-selector option:selected').val();
    } else {
        animatedNotification('Debes seleccionar un viajes', 'alert', 6000, '#trip-selector');
    }

    let indexTripItem = tripKeysList.findIndex(element => element.tripColumnName == $('#trip-selector option:selected').val());

    //Validamos la disponibilidad
    if (tripList[indexTripItem].available == false) {
        console.log('Exito en la validacion');
        animatedNotification('El viaje ya no tiene puestos disponibles', 'error', 6000, '#showAvailableInput');
    }

    if (userNameValidated != undefined && userLastNameValidated != undefined && userIdValidated != undefined && tripList[indexTripItem].available == true) {
        addTicketKeysToData(userNameValidated, userLastNameValidated, userIdValidated, ticketTripValidated);
        getTicketObjects();
        salesSummary();
        printTicketsTable();
        showTicketEvent();

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
        let total = calculateTaxes(item.trip.tripCost);
        salesRevenue = salesRevenue + parseInt(total[1]);
    }

    $('#sold-tickets-value').text(ticketKeysList.length);
    $('#flow-cash-value').text(salesRevenue + '$');
}

let generateTicketNumber = () => {
    ticketCount = 'T-#' + (ticketKeysList.length + 1);
    return ticketCount;
}

let printTicketsTable = () => {
    $('#table-tickets tbody').empty();

    let ticketListReverse = ticketList.reverse();
    for (let index = 0; index < ticketListReverse.length; index++) {
        let htmlTicket = `
        <tr>
            <td>${ticketListReverse[index].userName} ${ticketListReverse[index].userLastName}</td>
            <td>${ticketListReverse[index].trip.tripRoute.routeName}</td>
            <td>${ticketListReverse[index].trip.tripDate.slice(5)}</td>
            <td>${ticketListReverse[index].trip.tripSchedule.scheduleDeparture}</td>
            <td><button id="${ticketListReverse[index].ticketNumber}" class="g-show-ticket" data-bs-toggle="modal" data-bs-target="#modalTicket"><i class="icon-file-text2" data-toggle="tooltip" data-placement="top" title="Ver Factura"></i> </button></td>
        </tr>`

        $('#table-tickets tbody').append(htmlTicket);
    };
}

let showTicketEvent = () => {
    $('.g-show-ticket').click(function (e) {
        e.preventDefault();
        let indexTicket = ticketList.findIndex(element => element.ticketNumber == e.currentTarget.id);
        $('#modalTicketLabel').empty();
        $('#modalTicketLabel').text('Ticket ' + e.currentTarget.id);

        let htmlContent = `
        <tr>
            <td colspan="2" class="text-center"><b>Información Usuario</b></td>
        </tr>
        <tr>
            <td>Nombre Cliente:</td>
            <td>${ticketList[indexTicket].userName} ${ticketList[indexTicket].userLastName}</td>
        </tr>
        <tr>
            <td>Documento de identidad:</td>
            <td>${ticketList[indexTicket].userId}</td>
        </tr>
        <hr>
        <tr>
            <td colspan="2" class="text-center"><b>Información del Viaje</b></td>
        </tr>
        <tr>
            <td>Salida:</td>
            <td>${ticketList[indexTicket].trip.tripRoute.departure}</td>
        </tr>
        <tr>
            <td>Destino:</td>
            <td>${ticketList[indexTicket].trip.tripRoute.destination}</td>
        </tr>
        <tr>
            <td>Hora Check-In:</td>
            <td>${ticketList[indexTicket].trip.tripSchedule.scheduleCheckIn}</td>
        </tr>
        <tr>
            <td>Hora Salida:</td>
            <td>${ticketList[indexTicket].trip.tripSchedule.scheduleDeparture}</td>
        </tr>
        <tr>
            <td colspan="2" class="text-center"><b>Información del Transporte</b></td>
        </tr>
        <tr>
            <td>Vehículo</td>
            <td>${ticketList[indexTicket].trip.tripVehicle.vehicleBrand} ${ticketList[indexTicket].trip.tripVehicle.vehicleModel}</td>
        </tr>
        <tr>
            <td>Patente:</td>
            <td>${ticketList[indexTicket].trip.tripVehicle.vehiclePlates}</td>
        </tr>`;
        
        $('#table-printTickets tbody').empty();
        $('#table-printTickets tbody').append(htmlContent);
    });
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
    printTicketsTable();
    showTicketEvent();
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
            printTicketsTable();
            showTicketEvent();
        }
    },
    error: function () {
        animatedNotification('No se pudo cargar el archivo JSON con la información', 'error', 6000);
    }
});


