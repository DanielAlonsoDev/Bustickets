//FUNCION PARA IMPRIMIR LOS VALORES EN LA TABLA
let printTable = (listToPrint, tableIdName, propertyName) => {
    let selectedList = listToPrint;

    for (let index = 0; index < selectedList.length; index++) {
        let tableSelected = document.querySelector(tableIdName).querySelector('tbody');
        let newRowElement = document.createElement('tr');
        let newColumnElement = document.createElement('td');
    
        tableSelected.appendChild(newRowElement);
        newRowElement.appendChild(newColumnElement);
        newColumnElement.textContent = selectedList[index][propertyName];
    }
}

let printNewTableElement = (listToPrint, tableIdName, propertyName) => {
    let selectedList = listToPrint;
    let tableSelected = document.querySelector(tableIdName).querySelector('tbody');
    let newRowElement = document.createElement('tr');
    let newColumnElement = document.createElement('td');
    
    tableSelected.appendChild(newRowElement);
    newRowElement.appendChild(newColumnElement);
    newColumnElement.textContent = selectedList[selectedList.length - 1][propertyName];
}

let cleanForm = (inputsIdNames) => {
    //Revisamos todos los nombres de los inputs guardados en el array
    for (let index = 0; index < inputsIdNames.length; index++) {
        document.getElementById(inputsIdNames[index]).value = null;
    }
}

let disableForm = (inputsIdNames) => {
    //Revisamos todos los nombres de los inputs guardados en el array
    for (let index = 0; index < inputsIdNames.length; index++) {
        document.getElementById(inputsIdNames[index]).disabled = true;
    }
}

let enableForm = (inputsIdNames) => {
    //Revisamos todos los nombres de los inputs guardados en el array
    for (let index = 0; index < inputsIdNames.length; index++) {
        document.getElementById(inputsIdNames[index]).disabled = false;
    }
}

let getTableItem = (list, tableIdName, propertyName) => {
    let tableElementList = document.querySelector(tableIdName).getElementsByTagName('td');
    for (let i = 0; i < tableElementList.length; i++) {
            //Asignamos el evento a los elementos de la tabla
            tableElementList[i].addEventListener("click", (e) =>{
                    let valueItem = e.target.innerText;
                    let result = list.find(element => element[propertyName] === valueItem);
                    console.log(result);
            });
    }
}