/* globals validator */
'use strict';

const MIN_NAME_LENGTH = 3,
    MAX_NAME_LENGTH = 30,
    MIN_DESCRIPTION_LENGTH = 50,
    MAX_DESCRIPTION_LENGTH = 1000,
    NAME_PATTERN = /^[A-Za-z]+$/,
    ALPHA_PATTERN = /^[A-Za-z1-9]+$/;

(() => {
    const $createForm = $('#user-create-form'),
        $createBtn = $('#create-button'),
        $createFormErrorContainer = $('#error-container');

    $createForm.find(':input').on('focus', function() {
        $(this).removeClass('input-error');
        $(this).next('span').text('');
    });

    $createBtn.on('click', () => {
        resetErrorContainer();
        let isFormValid = validateCreateForm();

        if(isFormValid){
            return Promise.resolve()
                .then(() => {
                    let dataArray = $createForm.serializeArray(),
                        dataObj = {};

                    $(dataArray).each(function(i, field){
                        dataObj[field.name] = field.value;
                    });

                    return dataObj;
                })
                .then((event) => {
                    $.ajax({
                        url: '/events/create',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(event)
                    })
                    .done((res) => {
                        setTimeout(() => {
                            window.location = res.redirectRoute;
                        }, 1000);
                    })
                    .fail((err) => {
                        let errorObj = JSON.parse(err.responseText);
                        displayValidationErrors(errorObj, $createFormErrorContainer);
                    });
                })
                .catch((err) => {
                    let errorObj = JSON.parse(err.responseText);
                    displayValidationErrors(errorObj, $createFormErrorContainer);
                });
        }
    });

    function resetErrorContainer(){
        $createFormErrorContainer.find('ul').html('');
        $createFormErrorContainer.hide();
    }

    function displayValidationErrors(jsonObject, container){
        container.show();

        $(jsonObject.validationErrors).each(function(index, item) {
            container.find('ul').append(
                $(document.createElement('li')).text(item)
            );
        });
    }

    function validateCreateForm(){
        let isFormValid = false,
            isNameValid = false,
            // isCategoryValid = false,
            // isCityValid = false,
            // isCountryValid = false,
            isAddressValid = false,
            isDescriptionValid = false,
            isCapacityValid = false;

        $createForm.find('input').each(function(){
            let input = $(this),
                inputName = input.attr('name');

            if(inputName === 'name'){
                isNameValid = validator.validateInputString(input, true, true, MIN_NAME_LENGTH, MAX_NAME_LENGTH, ALPHA_PATTERN);
            }

            if(inputName === 'address'){
                isAddressValid = validator.validateInputString(input, true, true, MIN_NAME_LENGTH, MAX_NAME_LENGTH, ALPHA_PATTERN);
            }

            if(inputName === 'description'){
                isDescriptionValid = validator.validateInputString(input, true, false, MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH);
            }

            if(inputName === 'capacity'){
                isCapacityValid = validator.validateInputNumber(input, 30, 1000);
            }
        });

        if(isNameValid && isAddressValid && isDescriptionValid && isCapacityValid){
            isFormValid = true;
        }

        return isFormValid;
    }
})();