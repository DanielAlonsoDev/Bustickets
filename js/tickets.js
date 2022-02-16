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