/* globals validator */
'use strict';

(() => {
    const $profileForm = $('#user-profile-form'),
        $inputFile = $('#form-file'),
        $uploadBtn = $('#upload-button'),
        $profileFormErrorContainer = $('#error-container');

    $profileForm.find(':input').on('focus', function() {
        $(this).removeClass('input-error');
        $(this).next('span').text('');
    });

    $uploadBtn.on('click', () => {
        resetErrorContainer();
        let isFormValid = validateProfileForm();

        if(true){ // isFormValid
            return Promise.resolve()
                .then(() => {
                    let formData = new FormData();
                    formData.append('file', $inputFile[0].files[0] );

                    return formData;
                })
                .then((formData) => {
                    $.ajax({
                        url: '/profile/avatar',
                        method: 'POST',
                        contentType: false,
                        data: formData,
                        processData: false
                    })
                    .done((res) => {
                        setTimeout(() => {
                            window.location = res.redirectRoute;
                        }, 1000);
                    })
                    .fail((err) => {
                        let errorObj = JSON.parse(err.responseText);
                        displayValidationErrors(errorObj, $profileFormErrorContainer);
                    });
                })
                .catch((err) => {
                    let errorObj = JSON.parse(err.responseText);
                    displayValidationErrors(errorObj, $profileFormErrorContainer);
                });
        }
    });

    function resetErrorContainer(){
        $profileFormErrorContainer.find('ul').html('');
        $profileFormErrorContainer.hide();
    }

    function displayValidationErrors(jsonObject, container){
        container.show();

        $(jsonObject.validationErrors).each(function(index, item) {
            container.find('ul').append(
                $(document.createElement('li')).text(item)
            );
        });
    }

    function validateProfileForm() {
        let isFormValid = false,
            isFileValid = false;

        $profileForm.find('#form-file').each(function () {
            let input = $(this),
                inputName = input.attr('name');

            if (inputName === 'file') {
                // VALIDATE
                isFileValid = true;
            }

            if (isFileValid) {
                isFormValid = true;
            }

            return isFormValid;
        });
    }
})();