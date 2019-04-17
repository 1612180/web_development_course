$(document).ready(function () {
    let totalWidth = 0
    let positions = new Array()

    $('#slides .slide').each(function (i) {
        // get slider width
        positions[i] = totalWidth
        totalWidth += $(this).width()

        // check width
        if (!$(this).width()) {
            alert('Please add a width to your images')
            return false
        }
    })

    $('#slides').width(totalWidth)

    // menu item click handler
    $('#menu ul li a').click(function (e, keepScroll) {
        // remove active
        $('li.product').removeClass('active').addClass('inactive')
        // add active
        $(this).parent().addClass('active')

        let pos = $(this).parent().prevAll('.product').length

        $('#slides').stop().animate({ marginLeft: -positions[pos] + 'px' }, 450)

        e.preventDefault()

        // stop auto scroll
        if (!autoscroll)
            clearInterval(itvl)
    })

    // make first image active
    $('#menu ul li.product:first').addClass('active').siblings().addClass('inactive')

    // autoscroll
    let current = 1
    function autoscroll() {
        if (current == 1)
            return false

        $('#menu ul li a').eq(current % $('#menu ul li a').length).trigger('click', [true])
        current += 1
    }

    // duration for autoscroll
    let duration = 5
    let itvl = setInterval(function () {
        autoscroll()
    }, duration * 1000)
})