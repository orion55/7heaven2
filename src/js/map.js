$(document).ready(function () {
    var myMap;
    ymaps.ready(init);


    function init() {
        myMap = new ymaps.Map("map", {
            center: [38.897674, -77.036545],
            zoom: 15
        });
        myMap.behaviors.disable('scrollZoom');
        myMap.container.fitToViewport();
    }
});