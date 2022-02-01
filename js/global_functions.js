//FUNCION PARA IMPRIMIR LOS VALORES EN LA TABLA
let printTable = (listToPrint, tableIdName, propertyName) => {
    let selectedList = listToPrint;
    $(tableIdName + ' tbody').empty();

    for (let index = 0; index < selectedList.length; index++) {
        $(tableIdName).append(`<tr><td>${selectedList[index][propertyName]}</td></tr>`);
    };
};

let cleanForm = (inputsIdNames) => {
    //Revisamos todos los nombres de los inputs guardados en el array
    for (let index = 0; index < inputsIdNames.length; index++) {
        // document.getElementById(inputsIdNames[index]).value = null;
        $(inputsIdNames[index]).val(null);
    };
};

let disableForm = (inputsIdNames) => {
    //Revisamos todos los nombres de los inputs guardados en el array
    for (let index = 0; index < inputsIdNames.length; index++) {
        $(inputsIdNames[index]).prop( "disabled", true );
    };
};

let enableForm = (inputsIdNames) => {
    //Revisamos todos los nombres de los inputs guardados en el array
    for (let index = 0; index < inputsIdNames.length; index++) {
        $(inputsIdNames[index]).prop( "disabled", false );
    };
};

let itemsSelectedFromTable = { scheduleTableItem : undefined, vehicleTableItem : undefined, routeTableItem : undefined };
let getTableItem = (list, keyitemSelectedFromTable, tableIdName, propertyName, editBtn, editBtnEvent) => {
    
    for (let i = 0; i < $(tableIdName + ' td').length; i++) {
            //Asignamos el evento a los elementos de la tabla
            $(tableIdName + ' td')[i].addEventListener("click", (e) =>{
                    //Removemos la clase active de cualquier otro elemento seleccionado
                    for (let j = 0; j < $(tableIdName + ' td').length; j++) {
                        //tableElementList.qe(j).removeClass('active');
                        $(tableIdName + ' td').eq(j).removeClass('active');
                    }
                    //Agregamos la clase active y almacenamos la informacion de la coincidencia
                    e.target.classList.add('active');
                    //Activamos el boton editar
                    $(editBtn).addClass('active');
                    $(editBtn).click(editBtnEvent);

                    itemsSelectedFromTable[keyitemSelectedFromTable] = list.find(element => element[propertyName] === e.target.innerText);
            });
    };
};

//Evitamos el comportamiento por defecto de los enlaces y botones de la aplicacion
for (const item of $('a')) {
    item.addEventListener('click', (e) => {
        e.preventDefault();
    })
}

