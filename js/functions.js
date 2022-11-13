window.setInterval(function () {
    setTimeout(setWarm, 4000)
    clearInterval(this)
})

let is_collapsed = false
//click events
$('.side-button-collapse').on("click", collapseSideBar)

//functions 
function collapseSideBar() {
    console.log(is_collapsed)
    if (!is_collapsed) {
        $('.side-bar').css('width', '100px')
        hideOrShowElements(is_collapsed)
        is_collapsed = true
    } else if (is_collapsed) {
        $('.side-bar').css('width', '500px')
        hideOrShowElements(is_collapsed)
        is_collapsed = false
    }
    //$('#chart-container').width(getWidth())
}

function hideOrShowElements(is_collapsed) {
    if (!is_collapsed) {
        $('.display-pill-wrapper').hide()
        $('.warm').hide()
        $('.main-icon').hide()
    } else if (is_collapsed) {
        $('.display-pill-wrapper').show()
        $('.warm').show()
        $('.main-icon').show()
    }
}

function getWidth() {
    return $('.dashboard-body').width()
}

var options = {
    animationEnabled: true,
    title: {
        text: "Data"
    },
    axisX: {
        valueFormatString: "MMM"
    },
    axisY: {
        title: "Values",
    },
    data: [{
        yValueFormatString: "$#,###",
        xValueFormatString: "MMMM",
        type: "spline",
        dataPoints: [
            { x: new Date(2022, 0), y: 25060 },
            { x: new Date(2022, 1), y: 27980 },
            { x: new Date(2022, 2), y: 33800 },
            { x: new Date(2022, 3), y: 49400 },
            { x: new Date(2022, 4), y: 40260 },
            { x: new Date(2022, 5), y: 33900 },
            { x: new Date(2022, 6), y: 48000 },
            { x: new Date(2022, 7), y: 31500 },
            { x: new Date(2022, 8), y: 32300 },
            { x: new Date(2022, 9), y: 42000 },
            { x: new Date(2022, 10), y: 52160 },
            { x: new Date(2022, 11), y: 49400 }
        ]
    }]
};
$("#chart-container").CanvasJSChart(options);

function setWarm() {
    let temp_vars = ['20.0', '23.3', '22.4', '24.6']
    let i = 0
    $('.warm-body').text(temp_vars[i] + '°C')
    console.log('executed')
}