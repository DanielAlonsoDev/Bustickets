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
    console.log("VEHICLE FORM DATA FUNCIONA")//TEMPORAL
    //Validamos que el contenido del input Name sea valido
    if(vehiclePlatesInput.value != ''){
        //Comparamos el nombre con todos los guardados con anterioridad
        let vehicleNameExist = false;
        for (let index = 0; index < vehicleList.length; index++) {
            if(vehicleList[index].vehiclePlates == vehiclePlatesInput.value ){
                vehicleNameExist = true;
            }
        }

        switch(vehicleNameExist){
            case true:
                alert('Ya existe un vehiculo registrado con esa patente');
                break;

            case false:
                vehiclePlatesValidated = vehiclePlatesInput.value;
                break;
        }
    }
    else {
        alert('Debes ingresar una patente valida');
    }

    //Validamos que el contenido del input Checkin sea valido
    if(vehicleBrandInput.value != ''){
        vehicleBrandValidated = vehicleBrandInput.value;
    } else {
        alert('Debes ingresar un nombre de marca valido');
    }

    if(vehicleModelInput.value != ''){
        vehicleModelValidated = vehicleModelInput.value;
    } else {
        alert('Debes ingresar un nombre de modelo valido');
    }

    if(vehicleSeatsInput.value != '' && !isNaN(vehicleSeatsInput.value)){
        vehicleSeatsValidated = vehicleSeatsInput.value;
    } else {
        alert('Debes ingresar un numero de asientos');
    }

    if(vehicleStaffInput.value != '' && !isNaN(vehicleStaffInput.value)){
        vehicleStaffValidated = vehicleStaffInput.value;
    } else {
        alert('Debes ingresar un numero de personal');
    }


    //Cuando la informacion de todos los inputs sea valida procedemos
    if(vehiclePlatesValidated != undefined && vehicleBrandValidated != undefined && vehicleModelValidated != undefined && vehicleSeatsValidated != undefined && vehicleStaffValidated != undefined){
        //Regsitramos la informacion en el Storage
        addVehicleToData(vehicleBrandValidated, vehicleModelValidated, vehiclePlatesValidated, vehicleSeatsValidated, vehicleStaffValidated);

        printTable(vehicleList,'table-vehicle','vehicleName');
        getTableItem(vehicleList, 'vehicleTableItem', '#table-vehicle', 'vehicleName', editVehicleBtn, vehicleEditEvent);

        cleanForm(vehicleInputsList);
        disableForm(vehicleInputsList);
        saveVehicleBtn.classList.remove('active');
        saveVehicleBtn.removeEventListener('click', getVehicleFormData);
        vehicleBrandInput.removeEventListener('change', onchangeVehicle);
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
    if(vehiclePlatesInput.value != '' && vehiclePlatesInput.value != null && vehiclePlatesInput.value != undefined){
        vehiclePlatesValidated = vehiclePlatesInput.value;
    }
    else {
        alert('Debes ingresar una patente valida');
    }

    //Validamos que el contenido del input Checkin sea valido
    if(vehicleBrandInput.value != ''){
        vehicleBrandValidated = vehicleBrandInput.value;
    } else {
        alert('Debes ingresar un nombre de marca valido');
    }

    if(vehicleModelInput.value != ''){
        vehicleModelValidated = vehicleModelInput.value;
    } else {
        alert('Debes ingresar un nombre de modelo valido');
    }

    if(vehicleSeatsInput.value != '' && !isNaN(vehicleSeatsInput.value)){
        vehicleSeatsValidated = vehicleSeatsInput.value;
    } else {
        alert('Debes ingresar un numero de asientos');
    }

    if(vehicleStaffInput.value != '' && !isNaN(vehicleStaffInput.value)){
        vehicleStaffValidated = vehicleStaffInput.value;
    } else {
        alert('Debes ingresar un numero de personal');
    }

    if(vehiclePlatesValidated != undefined && vehicleBrandValidated != undefined && vehicleModelValidated != undefined && vehicleSeatsValidated != undefined && vehicleStaffValidated != undefined){
        //Regsitramos la informacion en el Storage
        editVehicle(vehicleBrandValidated, vehicleModelValidated, vehiclePlatesValidated, vehicleSeatsValidated, vehicleStaffValidated,indexVehicleItem);
        printTable(vehicleList,'table-vehicle','vehicleName');
        getTableItem(vehicleList, 'vehicleTableItem','#table-vehicle','vehicleName', editVehicleBtn, vehicleEditEvent);

        
        cleanForm(vehicleInputsList);
        disableForm(vehicleInputsList);
        saveVehicleBtn.classList.remove('active');
        saveVehicleBtn.removeEventListener('click', editVehicleFormData);
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
        saveVehicleBtn.removeEventListener('click',getVehicleFormData);
        saveVehicleBtn.classList.add('active');
        editVehicleBtn.classList.remove('active');

        //Rellenamos el input con la informacion
        vehicleBrandInput.value = itemsSelectedFromTable['vehicleTableItem'].vehicleBrand;
        vehicleModelInput.value = itemsSelectedFromTable['vehicleTableItem'].vehicleModel;
        vehiclePlatesInput.value = itemsSelectedFromTable['vehicleTableItem'].vehiclePlates;
        vehicleSeatsInput.value = itemsSelectedFromTable['vehicleTableItem'].vehicleSeats;
        vehicleStaffInput.value = itemsSelectedFromTable['vehicleTableItem'].vehicleStaff;
        vehicleCapacityInput.value = itemsSelectedFromTable['vehicleTableItem'].vehicleCapacity();


        saveVehicleBtn.addEventListener('click', editVehicleFormData);
        editVehicleBtn.removeEventListener('click', vehicleEditEvent);
        vehicleBrandInput.removeEventListener('change', onchangeVehicle);
    };
};

let onchangeVehicle = () => {
    if(vehicleBrandInput.value != ''){
        saveVehicleBtn.classList.add('active');
        saveVehicleBtn.addEventListener('click', getVehicleFormData);
    };
}

//Inicializamos la tabla
loadVehicleDataSet();
printTable(vehicleList,'table-vehicle','vehicleName');
getTableItem(vehicleList, 'vehicleTableItem','#table-vehicle','vehicleName', editVehicleBtn, vehicleEditEvent);

newVehicleBtn.addEventListener('click', () => {
    cleanForm(vehicleInputsList);
    enableForm(vehicleInputsList);
    saveVehicleBtn.classList.remove('active');
    saveVehicleBtn.removeEventListener('click', getVehicleFormData);
    saveVehicleBtn.removeEventListener('click', editVehicleFormData);
    editVehicleBtn.removeEventListener('click', vehicleEditEvent);
    editVehicleBtn.classList.remove('active');
    
    for (let i = 0; i < document.querySelector('#table-vehicle').getElementsByTagName('td').length; i++) {
        document.querySelector('#table-vehicle').getElementsByTagName('td')[i].classList.remove('active');
    }

    vehicleBrandInput.addEventListener('change', onchangeVehicle);
});