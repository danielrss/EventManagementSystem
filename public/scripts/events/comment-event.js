'use strict';
(() => {
    const $eventInfo = $('.event-info'),
        $commentBtn = $('#comment-button'),
        $commentInput = $('#comment-input');

    $commentBtn.on('click', () => {
        return Promise.resolve()
            .then(() => {
                let commentedEventId = $eventInfo.attr('id'),
                    user = $eventInfo.attr('user');  
                return {
                    commentedEventId: commentedEventId,
                    text: $commentInput.val(),
                    author: user
                };
            })
            .then((commentData) => {
                $.ajax({
                    url: '/events/' + commentData.commentedEventId + '/comment',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(commentData)
                })
                .done(() => {
                    let $div = $('<div>', { id: 'comment' } );
                    $div.html('Comment:' + commentData.text + ' ' + 'Author:' + commentData.author);
                    $('#comments').append($div);
                })
                .fail((err) => {
                    let errorObject = JSON.parse(err.responseText);
                    return errorObject;
                });             
            });             
    });
})();