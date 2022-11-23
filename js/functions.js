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
$('.display-pill-wrapper').on('click', function () {
    let tag = $(this).attr('id')
    drawChart()
    compareValues(tag)
})
$('.btn-success').on('click', function () {
    alert('Success: Values has been configured successfully')
})

$('.medition-image').on('click', drawChart)

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

function drawChart() {
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
}

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
            let value = Math.random() * (22 - 17) + 17;
            let point = { x: new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDay(), i, 0)), y: value }
            data_points.push(point)
        }
    }

    return data_points
}

function compareValues(tag) {
    let points = getAxisValues()

    const max_point = function (points) {
        let max = points[0].y
        for (let i = 0; i < points.length; i++) {
            if (max < points[i].y) {
                max = points[i].y
            }
        }
        return max;
    }

    let max = max_point(points)

    if (max > getLimitValues(tag)) {
        $('#' + tag).css('background-color', 'red')
        alert("WARNING " + tag + " exceed the limit value. Take appropiate measures. Limit: " + getLimitValues(tag) + ". Current value: " + max,)
    }
}

function getLimitValues(tag) {
    return limit_values[0][tag].max
}

