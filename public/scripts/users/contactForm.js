'use strict';

(() => {
    const $sendBtn = $('#send-button'),
        $userEmail = $('form-user-email form-control'),
        $adminEmail = $('form-admin-email form-control');

    $sendBtn.on('click', () => {
        return Promise.resolve
            .then(

            )
            .then((email) => {
                $.ajax({
                    url: '/contact',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(email)
                }).done((res) => {
                    window.location = res.redirectRoute;
                });
            });
    });
});