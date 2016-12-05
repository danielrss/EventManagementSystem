'use strict';

$(document).ready(function() {
    $(function(){
        $('#scheduler_here').dhx_scheduler({
            xml_date:'%Y-%m-%d %H:%i',
            date:new Date(2016,11,12),
            mode:'month'
        });

        scheduler.load('/user/events', 'json');
    });
});