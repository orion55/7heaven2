$(document).ready(function () {
    $('#slider-main').bxSlider(
        {
            preloadImages: true,
            mode: 'fade',
            auto: true,
            pause: 5000,
            pager: false,
            nextSelector: '#slider-next',
            prevSelector: '#slider-prev',
            nextText: 'Right',
            prevText: 'Left'
        }
    );
    $('#slider-tweets').bxSlider(
        {
            preloadImages: true,
            mode: 'horizontal',
            auto: true,
            controls: false,
            pause: 5000,
            pager: true
        }
    );
});
