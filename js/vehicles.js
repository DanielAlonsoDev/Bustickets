//FUNCION QUE CREA UN NUEVO REGISTRO EN LA LISTA DE VEHICULOS
let addVehicle = (vehicleBrandValue, vehicleModelValue, vehiclePlatesValue, vehicleSeatsValue, vehicleStaffValue) => {
    let newVehicle = new Vehicle(vehicleBrandValue,vehicleModelValue,vehiclePlatesValue,vehicleSeatsValue,vehicleStaffValue);
    vehicleList.push(newVehicle);
};

//FUNCION QUE CREA UN NUEVO REGISTRO EN LA LISTA DE VEHICULOS
let editVehicle = (vehicleBrandValue, vehicleModelValue, vehiclePlatesValue, vehicleSeatsValue, vehicleStaffValue, keyValue) => {
    let editVehicle = new Vehicle(vehicleBrandValue,vehicleModelValue,vehiclePlatesValue,vehicleSeatsValue,vehicleStaffValue);
    vehicleList[keyValue] = editVehicle;
    sessionStorage.setItem('vehicleDataSetJSON', JSON.stringify(vehicleList));

    loadVehicleDataSet();
};

//VALIDAMOS SI EXISTE INFORMACION EN EL STORAGE
if( vehicleData == null ){
    let vehicleDataSet = '[{"vehicleBrand": "Mercedes", "vehicleModel":"mb-350", "vehiclePlates":"B734FA", "vehicleSeats" : "32", "vehicleStaff" : "2", "available" : "true" }, {"vehicleBrand": "Mercedes", "vehicleModel":"td-180", "vehiclePlates":"76YT9A", "vehicleSeats" : "36", "vehicleStaff" : "2", "available" : "true" }]';
    sessionStorage.setItem('vehicleDataSetJSON', vehicleDataSet);
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
    
        addVehicle(vehicleBrandData,vehicleModelData,vehiclePlatesData,vehicleSeatsData,vehicleStaffData,vehicleAvailableData);
    };
};

//FUNCION PARA REGISTRAR NUEVA INFORMACION EN EL STORAGE
let addVehicleToData = (addBrand, addModel, addPlates, addSeats, addStaff) => {
    //Agregamos registro al vehicleList
    addVehicle(addBrand, addModel, addPlates, addSeats, addStaff);

    newData = JSON.parse(sessionStorage.getItem('vehicleDataSetJSON'));
    newData.push(vehicleList[vehicleList.length-1]);
    sessionStorage.setItem('vehicleDataSetJSON', JSON.stringify(newData));
    //Cargamos al storage
    loadVehicleDataSet();
}

//FUNCION PARA CONSEGUIR LA INFORMACION DEL FORMULARIO
let getVehicleFormData = () => {
    //Validamos que el contenido del input Name sea valido
    if( $('#vehiclePlatesInput').val() != ''){
        //Comparamos el nombre con todos los guardados con anterioridad
        let vehicleNameExist = false;
        for (let index = 0; index < vehicleList.length; index++) {
            if(vehicleList[index].vehiclePlates == $('#vehiclePlatesInput').val() ){
                vehicleNameExist = true;
            }
        }

        switch(vehicleNameExist){
            case true:
                alert('Ya existe un vehiculo registrado con esa patente');
                break;

            case false:
                vehiclePlatesValidated = $('#vehiclePlatesInput').val();
                break;
        }
    }
    else {
        alert('Debes ingresar una patente valida');
    }

    //Validamos que el contenido del input Checkin sea valido
    if( $('#vehicleBrandInput').val() != ''){
        vehicleBrandValidated = $('#vehicleBrandInput').val();
    } else {
        alert('Debes ingresar un nombre de marca valido');
    }

    if($('#vehicleModelInput').val() != ''){
        vehicleModelValidated = $('#vehicleModelInput').val();
    } else {
        alert('Debes ingresar un nombre de modelo valido');
    }

    if( $('#vehicleSeatsInput').val() != '' && !isNaN( $('#vehicleSeatsInput').val() )){
        vehicleSeatsValidated = $('#vehicleSeatsInput').val();
    } else {
        alert('Debes ingresar un numero de asientos');
    }

    if( $('#vehicleStaffInput').val() != '' && !isNaN( $('#vehicleStaffInput').val() )){
        vehicleStaffValidated = $('#vehicleStaffInput').val();
    } else {
        alert('Debes ingresar un numero de personal');
    }


    //Cuando la informacion de todos los inputs sea valida procedemos
    if(vehiclePlatesValidated != undefined && vehicleBrandValidated != undefined && vehicleModelValidated != undefined && vehicleSeatsValidated != undefined && vehicleStaffValidated != undefined){
        //Regsitramos la informacion en el Storage
        addVehicleToData(vehicleBrandValidated, vehicleModelValidated, vehiclePlatesValidated, vehicleSeatsValidated, vehicleStaffValidated);

        printTable(vehicleList,'#table-vehicle','vehicleName');
        getTableItem(vehicleList, 'vehicleTableItem', '#table-vehicle', 'vehicleName', '#edit-vehicle-btn', vehicleEditEvent);
        
        cleanForm(vehicleInputsList);
        disableForm(vehicleInputsList);
        $('#save-vehicle-btn').removeClass('active');
        $('#save-vehicle-btn').unbind('click', getVehicleFormData);
        $('#vehicleBrandInput').unbind('change', onchangeVehicle); 
        //Limpiamos los campos validados
        vehiclePlatesValidated = undefined;
        vehicleBrandValidated = undefined;
        vehicleModelValidated = undefined;
        vehicleSeatsValidated = undefined;
        vehicleStaffValidated = undefined;
    }
}

let editVehicleFormData = () => {
    indexVehicleItem = vehicleList.findIndex(element => element.vehicleName === itemsSelectedFromTable['vehicleTableItem'].vehicleName);
    //Validamos que el contenido del input Name sea valido
    if( $('#vehiclePlatesInput').val() != '' && $('#vehiclePlatesInput').val() != null && $('#vehiclePlatesInput').val() != undefined){
        vehiclePlatesValidated = $('#vehiclePlatesInput').val();
    }
    else {
        alert('Debes ingresar una patente valida');
    }

    //Validamos que el contenido del input Checkin sea valido
    if($('#vehicleBrandInput').val() != ''){
        vehicleBrandValidated = $('#vehicleBrandInput').val();
    } else {
        alert('Debes ingresar un nombre de marca valido');
    }

    if($('#vehicleModelInput').val() != ''){
        vehicleModelValidated = $('#vehicleModelInput').val();
    } else {
        alert('Debes ingresar un nombre de modelo valido');
    }

    if($('#vehicleSeatsInput').val() != '' && !isNaN($('#vehicleSeatsInput').val())){
        vehicleSeatsValidated = $('#vehicleSeatsInput').val();
    } else {
        alert('Debes ingresar un numero de asientos');
    }

    if($('#vehicleStaffInput').val() != '' && !isNaN($('#vehicleStaffInput').val())){
        vehicleStaffValidated = $('#vehicleStaffInput').val();
    } else {
        alert('Debes ingresar un numero de personal');
    }

    if(vehiclePlatesValidated != undefined && vehicleBrandValidated != undefined && vehicleModelValidated != undefined && vehicleSeatsValidated != undefined && vehicleStaffValidated != undefined){
        //Regsitramos la informacion en el Storage
        editVehicle(vehicleBrandValidated, vehicleModelValidated, vehiclePlatesValidated, vehicleSeatsValidated, vehicleStaffValidated,indexVehicleItem);
        printTable(vehicleList,'#table-vehicle','vehicleName');
        getTableItem(vehicleList, 'vehicleTableItem','#table-vehicle','vehicleName', '#edit-vehicle-btn', vehicleEditEvent);

        
        cleanForm(vehicleInputsList);
        disableForm(vehicleInputsList);
        $('#save-vehicle-btn').removeClass('active');
        $('#save-vehicle-btn').unbind('click', editVehicleFormData);
        //Limpiamos los campos validados
        vehiclePlatesValidated = undefined;
        vehicleBrandValidated = undefined;
        vehicleModelValidated = undefined;
        vehicleSeatsValidated = undefined;
        vehicleStaffValidated = undefined;
    };
};

let vehicleEditEvent = () => {
    if(itemsSelectedFromTable['vehicleTableItem'] != undefined){
        //Habilitamos el formulario
        enableForm(vehicleInputsList);
        $('#save-vehicle-btn').unbind('click', getVehicleFormData);
        $('#save-vehicle-btn').addClass('active');
        $('#save-vehicle-btn').removeClass('active');

        //Rellenamos el input con la informacion
        $('#vehicleBrandInput').val(itemsSelectedFromTable['vehicleTableItem'].vehicleBrand);
        $('#vehicleModelInput').val(itemsSelectedFromTable['vehicleTableItem'].vehicleModel);
        $('#vehiclePlatesInput').val(itemsSelectedFromTable['vehicleTableItem'].vehiclePlates);
        $('#vehicleSeatsInput').val(itemsSelectedFromTable['vehicleTableItem'].vehicleSeats);
        $('#vehicleStaffInput').val(itemsSelectedFromTable['vehicleTableItem'].vehicleStaff);
        $('#vehicleCapacityInput').val(itemsSelectedFromTable['vehicleTableItem'].vehicleCapacity());

        $('#vehicleSeatsInput').change(showVehicleCapacity);
        $('#vehicleStaffInput').change(showVehicleCapacity);

        $('#save-vehicle-btn').click(editVehicleFormData);
        $('#edit-vehicle-btn').unbind('click', vehicleEditEvent);
        $('#vehicleBrandInput').unbind('change', onchangeVehicle);
    };
};

let showVehicleCapacity = () => {
    if( $('#vehicleSeatsInput').val() != null && $('#vehicleStaffInput').val() != null ){
        $('#vehicleCapacityInput').val( $('#vehicleSeatsInput').val() - $('#vehicleStaffInput').val() + " Pasajeros" );
    }
};

let onchangeVehicle = () => {
    if($('#vehicleBrandInput').val() != ''){
        $('#save-vehicle-btn').addClass('active');
        $('#save-vehicle-btn').click(getVehicleFormData);
    };
}

//Inicializamos la tabla
loadVehicleDataSet();
printTable(vehicleList,'#table-vehicle','vehicleName');
getTableItem(vehicleList, 'vehicleTableItem','#table-vehicle','vehicleName', '#edit-vehicle-btn', vehicleEditEvent);

$('#new-vehicle-btn').click(function (e) { 
    cleanForm(vehicleInputsList);
    enableForm(vehicleInputsList);
    $('#save-vehicle-btn').removeClass('active');
    $('#save-vehicle-btn').unbind('click', getVehicleFormData);
    $('#save-vehicle-btn').unbind('click', editVehicleFormData);
    $('#edit-vehicle-btn').unbind('click', vehicleEditEvent);
    $('#save-vehicle-btn').removeClass('active');
    
    for (let i = 0; i < $('#table-vehicle td').length; i++) {
        $('#table-vehicle td').eq(i).removeClass('active');
    }

    $('#vehicleBrandInput').change(onchangeVehicle);
    $('#vehicleSeatsInput').change(showVehicleCapacity);
    $('#vehicleStaffInput').change(showVehicleCapacity);
});