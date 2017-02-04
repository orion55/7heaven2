$(document).ready(function () {
    var BGCOLOR = "#e9edf2";

    var config = {
        type: 'doughnut',
        data: {
            datasets: [{
                borderColor: [BGCOLOR, BGCOLOR],
                borderWidth: 1
            }],
            options: {
                responsive: true,
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        }
    };

    Chart.defaults.global.tooltips = false;

    var initData = function (percent, color) {
        var newConfig = $.extend(true, {}, config);
        newConfig.data.datasets[0].data = [];
        newConfig.data.datasets[0].data.push(percent);
        newConfig.data.datasets[0].data.push(100 - percent);
        newConfig.data.datasets[0].backgroundColor = [];
        newConfig.data.datasets[0].backgroundColor.push(color);
        newConfig.data.datasets[0].backgroundColor.push(BGCOLOR);
        return newConfig;
    };

    var ctxDezign = document.getElementById("chart-design").getContext("2d");
    var configDezign = initData(81, "#31b111");
    window.chartDesign = new Chart(ctxDezign, configDezign);

    var ctxTemplate = document.getElementById("chart-template").getContext("2d");
    var configTemplate = initData(40, "#f36316");
    window.chartTemplate = new Chart(ctxTemplate, configTemplate);

    var ctxWP = document.getElementById("chart-wp").getContext("2d");
    var configWP = initData(60, "#0073bd");
    window.chartWp = new Chart(ctxWP, configWP);
});
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
