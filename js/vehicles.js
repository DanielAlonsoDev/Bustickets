//FUNCION QUE CREA UN NUEVO REGISTRO EN LA LISTA DE VEHICULOS
let addVehicle = (vehicleBrandValue, vehicleModelValue, vehiclePlatesValue, vehicleSeatsValue, vehicleStaffValue) => {
    let newVehicle = new Vehicle(vehicleBrandValue, vehicleModelValue, vehiclePlatesValue, vehicleSeatsValue, vehicleStaffValue);
    vehicleList.push(newVehicle);
};

//FUNCION QUE CREA UN NUEVO REGISTRO EN LA LISTA DE VEHICULOS
let editVehicle = (vehicleBrandValue, vehicleModelValue, vehiclePlatesValue, vehicleSeatsValue, vehicleStaffValue, keyValue) => {
    let editVehicle = new Vehicle(vehicleBrandValue, vehicleModelValue, vehiclePlatesValue, vehicleSeatsValue, vehicleStaffValue);
    vehicleList[keyValue] = editVehicle;
    sessionStorage.setItem('vehicleDataSetJSON', JSON.stringify(vehicleList));

    loadVehicleDataSet();
};

//FUNCION PARA TRAER INFORMACION ALMACENADA EN EL STORAGE
let loadVehicleDataSet = () => {
    vehicleData = JSON.parse(sessionStorage.getItem('vehicleDataSetJSON'));
    vehicleList = [];

    for (let index = 0; index < vehicleData.length; index++) {
        vehicleBrandData = vehicleData[index].vehicleBrand;
        vehicleModelData = vehicleData[index].vehicleModel;
        vehiclePlatesData = vehicleData[index].vehiclePlates;
        vehicleSeatsData = vehicleData[index].vehicleSeats;
        vehicleStaffData = vehicleData[index].vehicleStaff;
        vehicleAvailableData = vehicleData[index].available;

        addVehicle(vehicleBrandData, vehicleModelData, vehiclePlatesData, vehicleSeatsData, vehicleStaffData, vehicleAvailableData);
    };
};

//FUNCION PARA REGISTRAR NUEVA INFORMACION EN EL STORAGE
let addVehicleToData = (addBrand, addModel, addPlates, addSeats, addStaff) => {
    //Agregamos registro al vehicleList
    addVehicle(addBrand, addModel, addPlates, addSeats, addStaff);

    newData = JSON.parse(sessionStorage.getItem('vehicleDataSetJSON'));
    newData.push(vehicleList[vehicleList.length - 1]);
    sessionStorage.setItem('vehicleDataSetJSON', JSON.stringify(newData));
    //Cargamos al storage
    loadVehicleDataSet();
}

//FUNCION PARA CONSEGUIR LA INFORMACION DEL FORMULARIO
let getVehicleFormData = () => {
    //Validamos que el contenido del input Name sea valido
    if ($('#vehiclePlatesInput').val() != '') {
        //Comparamos el nombre con todos los guardados con anterioridad
        let vehiclePlatesExist = false;
        for (let index = 0; index < vehicleList.length; index++) {
            if (vehicleList[index].vehiclePlates == $('#vehiclePlatesInput').val()) {
                vehiclePlatesExist = true;
            }
        }

        switch (vehiclePlatesExist) {
            case true:
                animatedNotification('Ya existe un vehiculo registrado con esa patente', 'error', 6000, '#vehiclePlatesInput');
                break;

            case false:
                vehiclePlatesValidated = $('#vehiclePlatesInput').val();
                break;
        }
    }
    else {
        animatedNotification('Debes ingresar una patente valida', 'alert', 6000, '#vehiclePlatesInput');
    }

    //Validamos que el contenido del input Checkin sea valido
    if ($('#vehicleBrandInput').val() != '') {
        vehicleBrandValidated = $('#vehicleBrandInput').val();
    } else {
        animatedNotification('Debes ingresar un nombre de marca valido', 'alert', 6000, '#vehicleBrandInput');
    }

    if ($('#vehicleModelInput').val() != '') {
        vehicleModelValidated = $('#vehicleModelInput').val();
    } else {
        animatedNotification('Debes ingresar un nombre de modelo valido', 'alert', 6000, '#vehicleModelInput');
    }

    if ($('#vehicleSeatsInput').val() != '' && !isNaN($('#vehicleSeatsInput').val())) {
        vehicleSeatsValidated = $('#vehicleSeatsInput').val();
    } else {
        animatedNotification('Debes ingresar un numero de asientos', 'alert', 6000, '#vehicleSeatsInput');
    }

    if ($('#vehicleStaffInput').val() != '' && !isNaN($('#vehicleStaffInput').val())) {
        vehicleStaffValidated = $('#vehicleStaffInput').val();
    } else {
        animatedNotification('Debes ingresar un numero de personal', 'alert', 6000, '#vehicleStaffInput');
    }


    //Cuando la informacion de todos los inputs sea valida procedemos
    if (vehiclePlatesValidated != undefined && vehicleBrandValidated != undefined && vehicleModelValidated != undefined && vehicleSeatsValidated != undefined && vehicleStaffValidated != undefined) {
        //Regsitramos la informacion en el Storage
        addVehicleToData(vehicleBrandValidated, vehicleModelValidated, vehiclePlatesValidated, vehicleSeatsValidated, vehicleStaffValidated);

        printTable(vehicleList, '#table-vehicle', 'vehicleName');
        getTableItem(vehicleList, 'vehicleTableItem', '#table-vehicle td', 'vehicleName', '#edit-vehicle-btn', vehicleEditEvent);
        deleteVehicleItem();

        cleanForm(vehicleInputsList);
        disableForm(vehicleInputsList);
        $('#save-vehicle-btn').removeClass('active');
        $('#save-vehicle-btn').unbind('click', getVehicleFormData);
        $('#vehicleBrandInput').unbind('change', onchangeVehicle);

        animatedNotification('Se ha creado un nuevo vehículo', 'done', 6000);
    }

    //Limpiamos los campos validados
    vehiclePlatesValidated = undefined;
    vehicleBrandValidated = undefined;
    vehicleModelValidated = undefined;
    vehicleSeatsValidated = undefined;
    vehicleStaffValidated = undefined;
}

//Editar la informacion de un vehiculo
let editVehicleFormData = () => {
    indexVehicleItem = vehicleList.findIndex(element => element.vehicleName === itemsSelectedFromTable['vehicleTableItem'].vehicleName);
    //Validamos que el contenido del input Name sea valido
    if ($('#vehiclePlatesInput').val() == itemsSelectedFromTable['vehicleTableItem'].vehiclePlates) {
        vehiclePlatesValidated = $('#vehiclePlatesInput').val();
    } else {
        if ($('#vehiclePlatesInput').val() != '') {
            //Comparamos el nombre con todos los guardados con anterioridad
            let vehiclePlatesExist = false;
            for (let index = 0; index < vehicleList.length; index++) {
                if (vehicleList[index].vehiclePlates == $('#vehiclePlatesInput').val()) {
                    vehiclePlatesExist = true;
                }
            }

            switch (vehiclePlatesExist) {
                case true:
                    animatedNotification('Ya existe un vehiculo registrado con esa patente', 'error', 6000, '#vehiclePlatesInput');
                    break;

                case false:
                    vehiclePlatesValidated = $('#vehiclePlatesInput').val();
                    break;
            }
        }
        else {
            animatedNotification('Debes ingresar una patente valida', 'alert', 6000, '#vehiclePlatesInput');
        }
    }

    //Validamos que el contenido del input Checkin sea valido
    if ($('#vehicleBrandInput').val() != '') {
        vehicleBrandValidated = $('#vehicleBrandInput').val();
    } else {
        animatedNotification('Debes ingresar un nombre de marca valido', 'alert', 6000, '#vehicleBrandInput');
    }

    //Validamos el contenido del Vehicle Model
    if ($('#vehicleModelInput').val() != '') {
        vehicleModelValidated = $('#vehicleModelInput').val();
    } else {
        animatedNotification('Debes ingresar un nombre de modelo valido', 'alert', 6000, '#vehicleModelInput');
    }

    //Validamos el contenido del Vehicle Seats
    if ($('#vehicleSeatsInput').val() != '' && !isNaN($('#vehicleSeatsInput').val())) {
        vehicleSeatsValidated = $('#vehicleSeatsInput').val();
    } else {
        animatedNotification('Debes ingresar un numero de asientos', 'alert', 6000, '#vehicleSeatsInput');
    }

    //Validamos el contenido del Vehicle Staff
    if ($('#vehicleStaffInput').val() != '' && !isNaN($('#vehicleStaffInput').val())) {
        vehicleStaffValidated = $('#vehicleStaffInput').val();
    } else {
        animatedNotification('Debes ingresar un numero de personal', 'alert', 6000, '#vehicleStaffInput');
    }

    if (vehiclePlatesValidated != undefined && vehicleBrandValidated != undefined && vehicleModelValidated != undefined && vehicleSeatsValidated != undefined && vehicleStaffValidated != undefined) {
        //Actualizamos el Key del Trip
        for (let index = 0; index < tripKeysList.length; index++) {
            if( tripKeysList[index].vehicleKey == vehicleList[indexVehicleItem].vehiclePlates ){
                editTrip(tripKeysList[index].tripDate, tripKeysList[index].routeKey, vehiclePlatesValidated, tripKeysList[index].scheduleKey, tripKeysList[index].tripCost, index);
            }
        }
        editVehicle(vehicleBrandValidated, vehicleModelValidated, vehiclePlatesValidated, vehicleSeatsValidated, vehicleStaffValidated, indexVehicleItem);
        
        //Actualizamos la tabla de viajes
        getTripObjects();
        createVehicleSelectors();
        printTable(tripKeysList, '#table-trip', 'tripColumnName');
        getTableItem(tripKeysList, 'tripTableItem', '#table-trip td', 'tripColumnName', '#edit-trip-btn', tripEditEvent);
        
        //Registramos la informacion en el Storage
        printTable(vehicleList, '#table-vehicle', 'vehicleName');
        getTableItem(vehicleList, 'vehicleTableItem', '#table-vehicle td', 'vehicleName','#edit-vehicle-btn', vehicleEditEvent);
        deleteVehicleItem();

        cleanForm(vehicleInputsList);
        disableForm(vehicleInputsList);
        $('#save-vehicle-btn').removeClass('active');
        $('#save-vehicle-btn').unbind('click', editVehicleFormData);

        animatedNotification('Se ha actualizado la información del Vehículo', 'done', 6000);
    };

    //Limpiamos los campos validados
    vehiclePlatesValidated = undefined;
    vehicleBrandValidated = undefined;
    vehicleModelValidated = undefined;
    vehicleSeatsValidated = undefined;
    vehicleStaffValidated = undefined;
};

//Conseguimos los datos del elemento a editar
let vehicleEditEvent = () => {
    if (itemsSelectedFromTable['vehicleTableItem'] != undefined) {
        //Habilitamos el formulario
        enableForm(vehicleInputsList);
        cleanForm(vehicleInputsList);
        $('#save-vehicle-btn').unbind('click');
        $('#save-vehicle-btn').addClass('active');
        $('#edit-vehicle-btn').removeClass('active');
        
        //Rellenamos el input con la informacion
        $('#vehicleBrandInput').val(itemsSelectedFromTable['vehicleTableItem'].vehicleBrand);
        $('#vehicleModelInput').val(itemsSelectedFromTable['vehicleTableItem'].vehicleModel);
        $('#vehiclePlatesInput').val(itemsSelectedFromTable['vehicleTableItem'].vehiclePlates);
        $('#vehicleSeatsInput').val(itemsSelectedFromTable['vehicleTableItem'].vehicleSeats);
        $('#vehicleStaffInput').val(itemsSelectedFromTable['vehicleTableItem'].vehicleStaff);
        $('#vehicleCapacityInput').val(itemsSelectedFromTable['vehicleTableItem'].vehicleCapacity());

        $('#vehicleSeatsInput, #vehicleStaffInput').change(showVehicleCapacity);

        $('#save-vehicle-btn').click(editVehicleFormData);
        $('#edit-vehicle-btn').unbind('click');
        $('#vehicleBrandInput').unbind('change');
    };
};

//Mostrar la capacidad del vehiculo
let showVehicleCapacity = () => {
    if ($('#vehicleSeatsInput').val() != null && $('#vehicleStaffInput').val() != null) {
        $('#vehicleCapacityInput').val($('#vehicleSeatsInput').val() - $('#vehicleStaffInput').val() + " Pasajeros");
    }
};

//Asignamos el evento al boton guardar
let onchangeVehicle = () => {
    if ($('#vehicleBrandInput').val() != '') {
        $('#save-vehicle-btn').addClass('active');
        $('#save-vehicle-btn').click(getVehicleFormData);
    };
}

//Eliminar elementos de la lista de vehiculos
let deleteVehicleItem = () => {
    $('#table-vehicle .icon-bin2').click(function (e) {
        e.preventDefault();

        let index = vehicleList.findIndex(element => element.vehicleName == e.currentTarget.id);
        
        let itemExist = false;
        for (const item of tripKeysList) {
            if (item.vehicleKey == vehicleList[index].vehiclePlates) {
                itemExist = true;
            }
        }

        switch (itemExist) {
            case true:
                animatedNotification('El vehículo no se puede eliminar ya que se encuentra seleccionado en un viaje', 'alert', 6000);
                break;

            default:
                vehicleList.splice(index, 1);
                sessionStorage.setItem('vehicleDataSetJSON', JSON.stringify(vehicleList));
                animatedNotification('Vehículo eliminado', 'delete', 6000);
                $(`#table-vehicle td[id="${e.currentTarget.id}"]`).remove();
                break;
        }
    });
}

//Asignamos el evento al boton nuevo
$('#new-vehicle-btn').click(function (e) {
    cleanForm(vehicleInputsList);
    enableForm(vehicleInputsList);
    $('#save-vehicle-btn, #edit-vehicle-btn').removeClass('active');
    $('#save-vehicle-btn, #edit-vehicle-btn').unbind('click');
    //Reiniciamos los eventos de cambios
    eventInputCleaner(vehicleInputsList);

    for (let i = 0; i < $('#table-vehicle td').length; i++) {
        $('#table-vehicle td').eq(i).removeClass('active');
    }

    $('#vehicleBrandInput').change(onchangeVehicle);
    $('#vehicleSeatsInput, #vehicleStaffInput').change(showVehicleCapacity);
});

//Si la informacion existe en el sessionStorage
if (vehicleData != null) {
    //Inicializamos la tabla
    loadVehicleDataSet();
    printTable(vehicleList, '#table-vehicle', 'vehicleName');
    getTableItem(vehicleList, 'vehicleTableItem', '#table-vehicle td', 'vehicleName', '#edit-vehicle-btn', vehicleEditEvent);
    deleteVehicleItem();
}

//Cargamos la informacion de Storage
$.ajax({
    type: "GET",
    url: "../data/dataFile.json",
    success: function (data) {
        //Cargamos la Data de Vehiculos
        if (vehicleData == null) {
            for (let index = 0; index < data.vehicleData.length; index++) {
                dataSet.push(data.vehicleData[index]);
            }
            sessionStorage.setItem('vehicleDataSetJSON', JSON.stringify(dataSet));
            dataSet = [];

            //Inicializamos la tabla
            loadVehicleDataSet();
            printTable(vehicleList, '#table-vehicle', 'vehicleName');
            getTableItem(vehicleList, 'vehicleTableItem', '#table-vehicle td', 'vehicleName', '#edit-vehicle-btn', vehicleEditEvent);
            deleteVehicleItem();
        }
    },
    error: function () {
        animatedNotification('No se pudo cargar el archivo JSON con la información', 'error',6000);
    }
});