//FUNCION PARA IMPRIMIR LOS VALORES EN LA TABLA
let printTable = (listToPrint, tableIdName, propertyName) => {
    let selectedList = listToPrint;
    let tableSelected = document.getElementById(tableIdName).querySelector('tbody');
    tableSelected.innerHTML = '';
    for (let index = 0; index < selectedList.length; index++) {
        let newRowElement = document.createElement('tr');
        let newColumnElement = document.createElement('td');
        tableSelected.appendChild(newRowElement);
        newRowElement.appendChild(newColumnElement);
        newColumnElement.textContent = selectedList[index][propertyName];
    };
};

let printNewTableElement = (listToPrint, tableIdName, propertyName) => {
    const selectedList = listToPrint;
    const tableSelected = document.querySelector(tableIdName).querySelector('tbody');
    const newRowElement = document.createElement('tr');
    const newColumnElement = document.createElement('td');
    
    tableSelected.appendChild(newRowElement);
    newRowElement.appendChild(newColumnElement);
    newColumnElement.textContent = selectedList[selectedList.length - 1][propertyName];
};

let cleanForm = (inputsIdNames) => {
    //Revisamos todos los nombres de los inputs guardados en el array
    for (let index = 0; index < inputsIdNames.length; index++) {
        document.getElementById(inputsIdNames[index]).value = null;
    };
};

let disableForm = (inputsIdNames) => {
    //Revisamos todos los nombres de los inputs guardados en el array
    for (let index = 0; index < inputsIdNames.length; index++) {
        document.getElementById(inputsIdNames[index]).disabled = true;
    };
};

let enableForm = (inputsIdNames) => {
    //Revisamos todos los nombres de los inputs guardados en el array
    for (let index = 0; index < inputsIdNames.length; index++) {
        document.getElementById(inputsIdNames[index]).disabled = false;
    };
};

let nameChange = (inputName, saveBtnEvent) => {
    if(inputName.value != ''){
        saveSchedulenBtn.classList.add('active');
        saveSchedulenBtn.addEventListener('click', saveBtnEvent);
    }
}

let itemsSelectedFromTable = { scheduleTableItem : undefined};
let getTableItem = (list, keyitemSelectedFromTable, tableIdName, propertyName, editBtn, editBtnEvent) => {
    const tableElementList = document.querySelector(tableIdName).getElementsByTagName('td');
    
    for (let i = 0; i < tableElementList.length; i++) {
            //Asignamos el evento a los elementos de la tabla
            tableElementList[i].addEventListener("click", (e) =>{
                    //Removemos la clase active de cualquier otro elemento seleccionado
                    for (let j = 0; j < tableElementList.length; j++) {
                        tableElementList[j].classList.remove('active');
                    }
                    //Agregamos la clase active y almacenamos la informacion de la coincidencia
                    e.target.classList.add('active');
                    //Activamos el boton editar
                    editBtn.classList.add('active');
                    editBtn.addEventListener('click', editBtnEvent);


                    itemsSelectedFromTable[keyitemSelectedFromTable] = list.find(element => element[propertyName] === e.target.innerText);
            });
    };
};
