'use strict';

const MIN_NAME_LENGTH = 5,
    MAX_NAME_LENGTH = 30,
    NAME_PATTERN = /^[A-Za-z]+$/,
    ALPHA_PATTERN = /^[A-Za-z1-9]+$/,
    EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

(() => {
    const $registerForm = $('#user-registration-form'),
        $registerBtn = $('#register-button');

    $registerForm.find(':input').on('focus', function() {
        $(this).removeClass('input-error');
        $(this).next('span').text('');
    });

    $registerBtn.on('click', () => {

        let isFormValid = validateRegistrationForm();

        if(isFormValid){
            return Promise.resolve()
                .then(() => {
                    let dataArray = $registerForm.serializeArray(),
                        dataObj = {};

                    $(dataArray).each(function(i, field){
                        dataObj[field.name] = field.value;
                    });

                    return dataObj;
                })
                .then((user) => {
                    $.ajax({
                        url: '/register',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(user)
                    })
                        .done((res) => {
                            setTimeout(() => {
                                window.location = res.redirectRoute;
                            }, 1500);
                        })
                        .fail((err) => {
                            console.log(err.message);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });

    function validateRegistrationForm(){
        let isFormValid = false,
            isUnameValid = false,
            isPasswordValid = false,
            isEmailValid = false,
            isFirstNameValid = false,
            isLastNameValid = false;

        $registerForm.find('input').each(function(){
            let input = $(this),
                inputName = input.attr('name');

            if(inputName === 'username'){
                isUnameValid = validateInput(input, true, true, MIN_NAME_LENGTH, MAX_NAME_LENGTH, ALPHA_PATTERN);
            }

            if(inputName === 'password'){
                isPasswordValid = validateInput(input, true, true, MIN_NAME_LENGTH, MAX_NAME_LENGTH, ALPHA_PATTERN);
            }

            if(inputName === 'email'){
                isEmailValid = validateInput(input, true, true, MIN_NAME_LENGTH, MAX_NAME_LENGTH, EMAIL_PATTERN);
            }

            if(inputName === 'firstName'){
                isFirstNameValid = validateInput(input, true, true, MIN_NAME_LENGTH, MAX_NAME_LENGTH, NAME_PATTERN);
            }

            if(inputName === 'lastName'){
                isLastNameValid = validateInput(input, true, true, MIN_NAME_LENGTH, MAX_NAME_LENGTH, NAME_PATTERN);
            }
        });

        if(isUnameValid && isEmailValid && isPasswordValid && isFirstNameValid && isLastNameValid){
            isFormValid = true;
        }

        return isFormValid;
    }

    function validateInput(input, wantLengthValidation, wantCharacterValidation, min = 0, max = 100, pattern = ''){
        let isValid = false;

        if(input.val() === ''){
            input.addClass('input-error');
            input.next('span').text('Field is required');
        }
        else if(wantLengthValidation && !validateInputLength(input.val(), min, max)){
            input.addClass('input-error');
            input.next('span').text('Invalid length: must be between ' + min + ' and ' + max);
        }
        else if(wantCharacterValidation && validateInputCharacters(input.val(), pattern)){
            input.addClass('input-error');
            input.next('span').text('Invalid characters!');
        }
        else{
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