'use strict';

(() => {
    const $allEvents = $('#filter-events');
    console.log('it works in ammin-approvals');
    $allEvents.on('click', (event) => {
        return Promise.resolve()
                .then(() => {                                        
                    let $eventToBeEdited = event.target.getAttribute('event-target');
                    // console.log($eventToBeEdited);
                    let action = event.target.id;                 
                    // console.log(action);                    
                    return {
                        event: $eventToBeEdited,
                        action: action
                    };
                })
                .then((processCommand) => {     
                    console.log(processCommand);               
                    $.ajax({
                        url: '/approvals',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(processCommand)
                    })
                    .done((res) => {
                        //console.log(res);
                        setTimeout(() => {
                            window.location = res.redirectRoute;
                        }, 1000);
                    })
                    .fail((err) => {
                        let errorObj = JSON.parse(err.responseText);                        
                    });                                   
                });
    });
})();