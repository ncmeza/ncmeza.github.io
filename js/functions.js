/* window.setInterval(function () {
    setTimeout(setWarm, 4000)
    clearInterval(this)
}) */

let is_collapsed = false
let limit_values = [{
    water_temp: {
        min: 10,
        max: 20
    },
    water_level: {
        min: 15,
        max: 30
    },
    water_ph: {
        min: 4,
        max: 9
    },
    room_temp: {
        min: 17,
        max: 23
    }
}]
//click events
$('.side-button-collapse').on("click", collapseSideBar)
$('.pill-text').on('click', function () {
    let tag = $(this).attr('id')
    compareValues(tag)
})



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
        title: "Time",
        gridThickness: 2,
        interval: 2,
        intervalType: "hour",
        valueFormatString: "hh TT K",
        labelAngle: -20
    },
    axisY: {
        title: "Values"
    },
    scales: {
        yAxes: [{
            ticks: {
                min: 0,
                max: 18,
                stepSize: 1,

                callback: function (value, index, values) {
                    return '' + value;
                }

            }
        }]
    },
    data: [{
        yValueFormatString: "$#,###",
        xValueType: "dateTime",
        type: "spline",
        dataPoints: getAxisValues()
    }]
};
$("#chart-container").CanvasJSChart(options);

function setWarm() {
    let temp_vars = ['20.0', '23.3', '22.4', '24.6']
    let i = 0
    $('.warm-body').text(temp_vars[i] + '°C')
    console.log('executed')
}

function getAxisValues(values) {
    let data_points = []
    if (values == null) {
        for (let i = 0; i < 12; i++) {
            date = new Date()
            let value = Math.random() * (23 - 17) + 17;
            let point = { x: new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDay(), i, 0)), y: value }
            data_points.push(point)
        }
    }
    //console.log(data_points)
    return data_points
}

function compareValues(tag) {
    let values = []
    let points = getAxisValues()
    console.log(points)
    for (let i = 0; i < getAxisValues(); i++) {
        console.log(getAxisValues()[i].y)
    }

    console.log(values)
}

function getLimitValues(tag) {
    return limit_values[0][tag].max
}

