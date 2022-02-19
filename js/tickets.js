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

$('#trip-selector').change(function (e) {
    if ($('#trip-selector option:selected').val() != 'default') {
        let indexTripItem = tripKeysList.findIndex(element => element.tripColumnName == $('#trip-selector option:selected').val());
        console.log(tripList[indexTripItem]);
        getTripObjects();
        $('#showDepartureInput').val(tripList[indexTripItem].tripRoute.departure);
        $('#showDestinationInput').val(tripList[indexTripItem].tripRoute.destination);
        $('#showCostInput').val(tripList[indexTripItem].tripCost + "$");

        let taxesValue = calculateTaxes(tripList[indexTripItem].tripCost);
        $('#showTaxesInput').val(taxesValue[0] + "$");
        $('#showTotalInput').val(taxesValue[1] + "$");
    }
    else {
        cleanForm(ticketInputsList);
    }
});

let addTicketKeys = (userName, userLastaName, userId, tripKey) => {
    let newTicket = new TicketKeys(userName, userLastaName, userId, tripKey);
    ticketKeysList.push(newTicket);
};

let editTicketKeys = (userName, userLastaName, userId, tripKey, keyValue) => {
    let editTicket = new TicketKeys(userName, userLastaName, userId, tripKey);
    ticketKeysList[keyValue] = editTicket;
    sessionStorage.setItem('ticketDataSetJSON', JSON.stringify(ticketKeysList));

    loadTicketDataSet();
}

let addTicket = (userName, userLastaName, userId, route, schedule, vehicle) => {
    let newTicket = new Ticket(userName, userLastaName, userId, route, schedule, vehicle);
    ticketList.push(newTicket);
};

let loadTicketDataSet = () => {
    ticketData = JSON.parse(sessionStorage.getItem('ticketDataSetJSON'));
    ticketKeysList = [];

    for (let index = 0; index < ticketData.length; index++) {
        ticketUserNameData = ticketData[index].userName;
        ticketUserLastNameData = ticketData[index].userLastaName;
        ticketUserIdData = ticketData[index].userId;
        ticketTripData = ticketData[index].tripKey;
        
        addTicketKeys(ticketUserNameData, ticketUserLastNameData, ticketUserIdData, ticketTripData);
    };
};

let addTicketToData = (userName, userLastaName, userId, tripKey) => {
    //Agregamos registro al ticketKeysList
    addTripKeys(userName, userLastaName, userId, tripKey);

    newData = JSON.parse(sessionStorage.getItem('ticketDataSetJSON'));
    newData.push(ticketKeysList[ticketKeysList.length - 1]);
    sessionStorage.setItem('ticketDataSetJSON', JSON.stringify(newData));
}

let getTicketObjects = () => {
    let tripIndexValidated;
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

    // if($('#trip-selector option:selected').val() != 'default'){

    // }

    if (userNameValidated != undefined && userLastNameValidated != undefined && userIdValidated != undefined) {
        console.log(userNameValidated);
        console.log(userLastNameValidated);
        console.log(userIdValidated);
        console.log('PRUEBA');
        cleanForm(ticketInputsList);
        animatedNotification('Venta Registrada', 'done', 6000);
    }

    userNameValidated = undefined;
    userLastNameValidated = undefined;
    userIdValidated = undefined;
}

$('#register-ticket-btn').click(function (e) {
    e.preventDefault();
    //getTicketFormData();
    console.log(ticketKeysList);
    console.log(ticketList);
});

if (ticketData != null) {
    loadTicketDataSet();
    getTicketObjects();
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

        }
    },
    error: function () {
        animatedNotification('No se pudo cargar el archivo JSON con la información', 'error', 6000);
    }
});