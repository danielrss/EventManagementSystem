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
                    commentText: $commentInput.val(),
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
                    let $div = $('<div>', { id: 'comment' } );
                    $div.html('Comment:' + commentData.commentText + ' ' + 'Author:' + res.commentAuthor);
                    $('#comments').append($div);
                })
                .fail((err) => {
                    let errorObject = JSON.parse(err.responseText);
                    return errorObject;
                });
            });
    });
})();