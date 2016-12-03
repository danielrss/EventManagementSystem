'use strict';

(() => {
    const $eventInfo = $('.event-info'),
        $likeBtn = $('.like-btn'),
        $dislikeBtn = $('.dislike-btn'), 
        $countOfLikes = $('.likes'),
        $countOfDislikes = $('.dislikes');        

    $likeBtn.one('click', function(event) { 
        if(!($likeBtn.hasClass('btn-primary'))) {
            let count = parseInt($countOfLikes.text()) + 1;
            console.log(count);                    
            $countOfLikes.html(count);
        } 
        $dislikeBtn.removeClass('btn-primary');
        $likeBtn.addClass('btn-primary'); 
        return Promise.resolve()
            .then(() => {
                let ratedEventId = $eventInfo.attr('id');  
                console.log(ratedEventId);
                return {
                    ratedEventId: ratedEventId,
                    rate: 'like'
                };
            })
            .then((ratedEvent) => {
                console.log(ratedEvent);
                $.ajax({
                    url: '/events/' + ratedEvent.ratedEventId,
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(ratedEvent)
                })
                .done((res) => {
                    console.log('like succeded');
                                       
                })
                .fail((err) => {
                    let errorObject = JSON.parse(err.responseText);
                    return errorObject;
                });
            });

    });
    $dislikeBtn.one('click', function(event) {
        if(!($dislikeBtn.hasClass('btn-primary'))) {
            let count = parseInt($countOfDislikes.text()) + 1;
            console.log(count);
            $countOfDislikes.html(count);
        }
        $dislikeBtn.addClass('btn-primary');
        $likeBtn.removeClass('btn-primary'); 
        return Promise.resolve()
            .then(() => {
                let ratedEventId = $eventInfo.attr('id');  
                console.log(ratedEventId);
                return {
                    ratedEventId: ratedEventId,
                    rate: 'dislike'
                };
            })
            .then((ratedEvent) => {
                console.log(ratedEvent);
                $.ajax({
                    url: '/events/' + ratedEvent.ratedEventId,
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(ratedEvent)
                })
                .done((res) => {
                    console.log('disliked succeded');                                                            
                })
                .fail((err) => {
                    let errorObject = JSON.parse(err.responseText);
                    return errorObject;
                });
            });

    });
})();