'use strict';

(() => {
    const $sendBtn = $('#send-email-button'),
        $userEmail = $('#form-user-email'),
        $userName = $('#form-user-name'),
        $adminEmail = $('#form-admin-email'),
        $adminName = $('#form-admin-name'),
        $subject = $('#form-subject'),
        $emailContent = $('#message');

    $sendBtn.one('click', function() {
        return Promise.resolve
            .then(() => {
                console.log('sasdasd');
                $.ajax({
                    type: 'POST',
                    url: 'https://mandrillapp.com/api/1.0/messages/send.json',
                    data: {
                        'key': 'fc56f0efbb220ebf8826cc0e23061c6b-us14',
                        'message': {
                            'from_email': $userEmail.val(),
                            'from_name': $userName.val(),
                            'to': [{
                                'email': $adminEmail.val(),
                                'name': $adminName.val(),
                                'type': 'to'
                            }],
                            'autotext': 'true',
                            'subject': $subject.val(),
                            'html': $emailContent.val()
                        }
                    }
                }).done(() => {
                    console.log('aasdasd');
                    window.location = 'http://localhost:3003/contact/success';
                });
            })
            .catch((err) => {
                console.log(err);
            });
    });
});