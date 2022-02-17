//FUNCION QUE CREA UN NUEVO REGISTRO EN LA LISTA DE RUTAS
let addUser = (userName, userLastName, userId) => {
    let newUser = new User(userName, userLastName, userId);
    userList.push(newUser);
};

let validateUserInfo = () => {
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

    if(userNameValidated != undefined && userLastNameValidated != undefined && userIdValidated != undefined){
        console.log(userNameValidated);
        console.log(userLastNameValidated);
        console.log(userIdValidated);
        animatedNotification('Todo OKA', 'alert', 6000, '#userIdInput');
        return [userNameValidated, userLastNameValidated, userIdValidated];
    }
}

$('#register-ticket-btn').click( function (e){
    e.preventDefault();
    validateUserInfo();
    console.log('TODO OK');
});