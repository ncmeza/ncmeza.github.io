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
    }
    else if (is_collapsed) {
        $('.side-bar').css('width', '500px')
        hideOrShowElements(is_collapsed)
        is_collapsed = false
    }
}

function hideOrShowElements(is_collapsed) {
    if (!is_collapsed) {
        $('.display-pill-wrapper').hide()
        $('.main-icon').hide()
    } else if (is_collapsed) {
        $('.display-pill-wrapper').show()
        $('.main-icon').show()
    }
}