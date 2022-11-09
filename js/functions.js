let is_collapsed = false
//click events
$('.side-button-collapse').on("click", collapseSideBar)

//functions
function collapseSideBar() {
    console.log(is_collapsed)
    if (!is_collapsed) {
        is_collapsed = true
        $('.side-bar').css('width', '100px')
        hideText()
    }
    else if (is_collapsed) {
        is_collapsed = false
        $('.side-bar').css('width', '300px')
    }
}

function hideText() {
    $('.pill-text').each(function () {
        $(this).css('color', '#FFF')
    })
}