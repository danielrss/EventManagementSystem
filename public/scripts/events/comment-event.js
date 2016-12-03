'use strict';
(() => {
    const $eventInfo = $('.event-info'),
        $commentBtn = $('#comment-button'),
        $commentInput = $('#comment-input');

    $commentBtn.on('click', () => {
        return Promise.resolve()
            .then(() => {
                let commentedEventId = $eventInfo.attr('id'); 
                return {
                    commentedEventId: commentedEventId,
                    text: $commentInput.val(),
                };
            })
            .then((commentData) => {
                $.ajax({
                    url: '/events/' + commentData.commentedEventId + '/comment',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(commentData)
                })
                .done((res) => {
                    console.log(res);
                    let $div = $('<div>', { id: 'comment' } );
                    $div.html('Comment:' + commentData.text + ' ' + 'Author:' + res);
                    $('#comments').append($div);
                })
                .fail((err) => {
                    let errorObject = JSON.parse(err.responseText);
                    return errorObject;
                });             
            });             
    });
})();