//FUNCION PARA IMPRIMIR LOS VALORES EN UNA TABLA
let printTable = (listToPrint, tableIdName, propertyName) => {
    let selectedList = listToPrint;
    $(tableIdName + ' tbody').empty();

    for (let index = 0; index < selectedList.length; index++) {
        $(tableIdName).append(`<tr><td id="${selectedList[index][propertyName]}">${selectedList[index][propertyName]}<i id="${selectedList[index][propertyName]}" class="icon-bin2"></i></td></tr>`);
    }
};

//FUNCION LIMPIAR FORMULARIOS
let cleanForm = (inputsIdNames) => {
    //Revisamos todos los nombres de los inputs guardados en el array
    let index = 0;
    for (let index = 0; index < inputsIdNames.length; index++) {
        $(inputsIdNames[index]).val(null);
        $(inputsIdNames[index]).removeClass('border-red');
        $(inputsIdNames[index]).removeClass('border-yellow');
    }
}

//LIMPIAR EVENTOS DE ELEMENTOS
let eventInputCleaner = (elementsList) => {
    let index = 0;

    for (let index = 0; index < elementsList.length; index++) {
        $(elementsList[index]).unbind('change');
    }
}

//DESHABILITAR FORMULARIOS
let disableForm = (inputsIdNames) => {
    //Revisamos todos los nombres de los inputs guardados en el array
    
    for (let index = 0; index < inputsIdNames.length; index++) {
        $(inputsIdNames[index]).prop("disabled", true);
    }
};

//HABILITAR FORMULARIOS
let enableForm = (inputsIdNames) => {
    //Revisamos todos los nombres de los inputs guardados en el array
    for (let index = 0; index < inputsIdNames.length; index++) {
        $(inputsIdNames[index]).prop("disabled", false);
    };
};

//CONSEGUIR SELECCIONAR UN ITEM DE UNA TABLA
let itemsSelectedFromTable = { scheduleTableItem: undefined, vehicleTableItem: undefined, routeTableItem: undefined, tripTableItem: undefined, ticketTableItem: undefined };
let getTableItem = (list, keyitemSelectedFromTable, selectedElement, propertyName, editBtn, editBtnEvent) => {
    for (let i = 0; i < $(selectedElement).length; i++) {
        //Asignamos el evento a los elementos de la tabla
        $(selectedElement)[i].addEventListener("click", (e) => {
            //Removemos la clase active de cualquier otro elemento seleccionado
            for (let j = 0; j < $(selectedElement).length; j++) {
                $(selectedElement).eq(j).removeClass('active');
            }
            //Agregamos la clase active y almacenamos la informacion de la coincidencia
            e.currentTarget.classList.add('active');
            //Activamos el boton editar
            $(editBtn).addClass('active');
            $(editBtn).click(editBtnEvent);

            itemsSelectedFromTable[keyitemSelectedFromTable] = list.find(element => element[propertyName] === e.target.id);
        });
    };
};

//EVITAMOS EL COMPORTAMIENTO POR DEFECTO DE LOS ENLACES Y BOTONES
for (const item of $('a')) {
    item.addEventListener('click', (e) => {
        e.preventDefault();
    })
}

//LIMPIAR CAMBIOS DE COLOR EN INPUTS AL RECIBIR UN CAMBIO
for (const item of $('input, select')) {
    item.addEventListener('change', () => {
        item.classList.remove('border-red');
        item.classList.remove('border-yellow');
    });
}

//CREAR NOTIFICACIONES DE MANERA DINAMICA y APLICAR CAMBIOS A INPUTS
let animatedNotification = (notificationText, notificationType, duration, input) => {
    let htmlContent = undefined;

    switch (notificationType) {
        case 'done':
            htmlContent = `<div class="notification-card notification-${notificationCount}"><div class="popup ${notificationType}"><i class="icon-checkmark"></i><span>${notificationText}</span></div></div>`;
            $('#notification').append(htmlContent);
            break;

        case 'delete':
            htmlContent = `<div class="notification-card notification-${notificationCount}"><div class="popup ${notificationType}"><i class="icon-bin2"></i><span>${notificationText}</span></div></div>`;
            $('#notification').append(htmlContent);
            break;

        case 'alert':
            htmlContent = `<div class="notification-card notification-${notificationCount}"><div class="popup ${notificationType}"><i class="icon-warning"></i><span>${notificationText}</span></div></div>`;
            $('#notification').append(htmlContent);
            $(input).addClass('border-yellow');
            break;

        case 'error':
            htmlContent = `<div class="notification-card notification-${notificationCount}"><div class="popup ${notificationType}"><i class="icon-blocked"></i><span>${notificationText}</span></div></div>`;
            $('#notification').append(htmlContent);
            $(input).addClass('border-red');
            break;
    }
    //ANIMACION DE ENTRADA Y SALIDA
    $(`#notification .notification-${notificationCount}`).fadeIn(300);
    $(`#notification .notification-${notificationCount}`).delay(duration);
    $(`#notification .notification-${notificationCount}`).fadeOut(500);

    notificationCount++;
    htmlContent = undefined;
};
