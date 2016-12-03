'use strict';

(() => {
    const $sendBtn = $('#send-email-button'),
        $contactForm = $('#contact-form');

    $sendBtn.one('click', function() {
        return Promise.resolve()
            .then(() => {
                let dataArray = $contactForm.serializeArray(),
                    dataObj = {};

                $(dataArray).each(function(i, field) {
                    dataObj[field.name] = field.value;
                });

                return dataObj;
            })
            .then((message) => {
                $.ajax({
                        method: 'POST',
                        url: 'https://mandrillapp.com/api/1.0/messages/send.json',
                        contentType: 'application/json',
                        data: JSON.stringify(message)
                    })
                    .done((res) => {
                        window.location = res.redirectRoute;
                    })
                    .fail((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    });
})();