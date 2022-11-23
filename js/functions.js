$(window).on('load', initNotes)
let notes = []
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
    let options = defaultOptions()
    options.title.text = getFormattedTitle(tag)
    drawChart(options)
    compareValues(tag)
})
$('#save-settings').on('click', function () {
    alert('Success: Values has been configured successfully')
})

$('.medition-image').on('click', function () {
    drawChartBetweenDates($('#date_from').val(), $('#date_to').val(), $(this).attr('id'))
})

$('#print-btn').on('click', function () {
    exportChart()
})

$('.notes').on('click', function () {
    initNotes()
})

$('#create-btn').on('click', function () {
    let title = $('#note-title')
    let body = $('#note-body')
    let author = $('#note-author')

    createNote(title, body, author)

    alert('Note created successfully!')
})
//functions 
function collapseSideBar() {

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

function drawChart(custom_options) {

    var options = {}

    if (custom_options == null) {
        options = defaultOptions();
    } else {
        options = custom_options
    }

    $("#chart-container").CanvasJSChart(options);
}

function setWarm() {
    let temp_vars = ['20.0', '23.3', '22.4', '24.6']
    let i = 0
    $('.warm-body').text(temp_vars[i] + '°C')

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
        alert("WARNING " + getFormattedTitle(tag) + " exceed the limit value. Take appropiate measures. Limit: " + getLimitValues(tag) + ". Current value: " + max,)
    }
}

function getLimitValues(tag) {
    return limit_values[0][tag].max
}

function drawChartBetweenDates(from, to, tag) {

    let options = defaultOptions()

    options.scales.xAxes[0].ticks.suggestedMin = from
    options.scales.xAxes[0].ticks.suggestedMax = to
    options.axisX.title = "FROM: " + getFormattedDate(from) + " TO: " + getFormattedDate(to)

    options.title.text = getFormattedTitle(tag)

    drawChart(options)
}

function defaultOptions() {
    return {
        scales: {
            xAxes: [{
                display: true,
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 0,
                }
            }]
        },
        animationEnabled: true,
        type: 'line',
        title: {
            text: "Data"
        },
        axisX: {
            title: "Time",
            gridThickness: 1,
            interval: 7,
            intervalType: "hour",
            valueFormatString: "",
        },
        axisY: {
            title: "Values"
        },
        data: [{
            yValueFormatString: "###",
            xValueType: "dateTime",
            type: "spline",
            dataPoints: getAxisValues()
        }]
    }
}

function getFormattedTitle(tag) {

    switch (tag) {
        case 'water_temp':
            return 'Water Temperature';
            break;
        case 'water_ph':
            return 'Water PH';
            break;
        case 'water_level':
            return 'Water Level';
            break;
        case 'room_temp':
            return 'Room Temperature';
            break;
    }
}

function getFormattedDate(string_date) {
    let date = new Date(string_date)

    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
}



function exportChart() {
    window.jsPDF = window.jspdf.jsPDF
    var canvas = $('#chart-container .canvasjs-chart-canvas').get(0);
    console.log(canvas)
    var dataURL = canvas.toDataURL();
    var pdf = new window.jspdf.jsPDF()
    pdf.addImage(dataURL, 'JPEG', 0, 0);
    pdf.save("download.pdf");
}

function initNotes() {
    let lorem_ipsum = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    for (let i = 0; i < 5; i++) {
        let note = {
            title: "Note Title " + i,
            body: lorem_ipsum,
            author: 'Jhon Doe',
            date: getFormattedDate("2022-11-23")
        }

        notes.push(note)
    }
    notes.push({
        title: "Frutillas Tucuman",
        body: "Como cultivar frutillas en Tucuman",
        author: 'Leonel Lopez',
        date: getFormattedDate("2022-11-23")
    })
    addRows()
}

function addRows() {
    notes.splice(0, 1)
    for (let i = 0; i < notes.length; i++) {
        let row = '<tr><th scope="row">' + notes[i].title + '</th><td>' + notes[i].author + '</td><td>' + notes[i].date + '</td><td><input class="button-styles" type="button" value="Download"></td></tr>'
        $(".table tbody").append(row);
    }
}

function createNote(title, note, owner) {
    let new_note = {
        title: title,
        body: note,
        author: owner,
        date: getFormattedDate("2022-11-23")
    }

    notes.push(new_note)
    console.log(notes.length)
}