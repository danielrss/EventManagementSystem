'use strict';
const ALPHA_PATTERN = /^[A-Za-z1-9]+$/,
    MIN_USERNAME_LENGTH = 5,
    MAX_USERNAME_LENGTH = 30;

(() => {
    const $loginForm = $('#user-login-form'),
        $loginBtn = $('#login-button'),
        $loginFormErrorContainer = $('#error-container');

    $loginForm.find(':input').on('focus', function() {
        $(this).removeClass('input-error');
        $(this).next('span').text('');
    });

    $loginBtn.on('click', () => {
        resetErrorContainer();
        let isFormValid = validateRegistrationForm();

        if(isFormValid){
            return Promise.resolve()
                .then(() => {
                    let dataArray = $loginForm.serializeArray(),
                        dataObj = {};

                    $(dataArray).each(function(i, field){
                        dataObj[field.name] = field.value;
                    });

                    return dataObj;
                })
                .then((user) => {
                    $.ajax({
                        url: '/login',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(user)
                    })
                    .done((res) => {
                        window.location.href = res.redirectRoute;
                    })
                    .fail((err) => {
                        let errorObj = JSON.parse(err.responseText);

                        displayValidationErrors(errorObj.message, $loginFormErrorContainer);
                    });
                })
                .catch((err) => {
                    let errorObj = JSON.parse(err.responseText);

                    displayValidationErrors(errorObj.message , $loginFormErrorContainer);
                });
        }
    });

    function resetErrorContainer(){
        $loginFormErrorContainer.find('ul').html('');
        $loginFormErrorContainer.hide();
    }

    function displayValidationErrors(message, container){
        container.show();

        container.find('ul').append(
            $(document.createElement('li')).text(message)
        );
    }

    function validateRegistrationForm(){
        let isFormValid = false,
            isUsernameValid = false,
            isPasswordValid = false;

        $loginForm.find('input').each(function(){
            let input = $(this),
                inputName = input.attr('name');

            if(inputName === 'username'){
                isUsernameValid = validateInput(input, true, true, MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH, ALPHA_PATTERN);
            }

            if(inputName === 'password'){
                isPasswordValid = validateInput(input, true, true, MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH, ALPHA_PATTERN);
            }
        });

        if(isUsernameValid && isPasswordValid){
            isFormValid = true;
        }

        return isFormValid;
    }

    function validateInput(input, wantLengthValidation, wantCharacterValidation, min = 0, max = 100, pattern = ''){
        let isValid = false;

        if (input.val() === '') {
            input.addClass('input-error');
            input.next('span').text('Field is required');
        }
        else if (wantLengthValidation && !validateInputLength(input.val(), min, max)) {
            input.addClass('input-error');
            input.next('span').text('Invalid length: must be between ' + min + ' and ' + max);
        }
        else if (wantCharacterValidation && validateInputCharacters(input.val(), pattern)) {
            input.addClass('input-error');
            input.next('span').text('Invalid characters!');
        }
        else {
            input.removeClass('input-error');
            input.next('span').text('');
            isValid = true;
        }

        return isValid;
    }

    function validateInputLength(value, min, max){
        let hasValidLength = true;

        if ((value.length < min || value.length > max)) {
            hasValidLength = false;
        }

        return hasValidLength;
    }

    function validateInputCharacters(value, pattern){
        let hasErrors = false;

        if (!pattern.test(value)) {
            hasErrors = true;
        }

        return hasErrors;
    }
})();