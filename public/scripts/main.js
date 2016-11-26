'use strict';

$(document).ready(function() {
    animateLandingPageElements();
});


document.onreadystatechange = function () {
    let state = document.readyState,
        loader = document.getElementById('page-loader'),
        content = document.getElementById('content');

    if (state === 'interactive') {
        content.style.visibility = 'hidden';
    } else if (state === 'complete') {
        setTimeout(function(){
            loader.style.visibility = 'hidden';
            content.style.visibility = 'visible';
        },1000);
    }
};

function animateLandingPageElements(){
    $('#logo').addClass('animated rotateIn');
    $('#hp-caption-title').addClass('animated fadeInUp');
    $('#hp-caption-subtitle').addClass('animated fadeInUp');
    $('#hp-caption-buttons').addClass('animated fadeInUp');
}