/* [DEFAULT SETTINGS] */

// # Config
var form = { cooldown: 2000, timeout: 0 }
var tab = { before: 'overview' };
var menu = { mobile: { size: 768, fadeTimeout: 500 } }
alertify.defaults.maintainFocus = false

// # Menu
$(`main[data-tab=${tab.before}]`).css('display', 'flex');
$(`header nav#main a[data-tab=${tab.before}]`).toggleClass("active");

// # Mobile Menu
if ($(window).width() <= menu.mobile.size) {

    $('header nav#main').fadeOut(menu.mobile.fadeTimeout);
    $('header nav#mobile a').click(() => $("header nav#main").fadeIn(menu.mobile.fadeTimeout));
    $('header nav#main a#close').click(() => $("header nav#main").fadeOut(menu.mobile.fadeTimeout));

}


/* [EVENTS] */

// # Mouse Pointer AXIS

window.addEventListener("mousemove", evt => `X: ${evt.clientX}\nY: ${evt.clientY}`);

// # Keyboard Event [CTRL+S]

$(document).keydown(function(event) {

    //19 for Mac Command+S
    if (!(String.fromCharCode(event.which).toLowerCase() == 's' && event.ctrlKey) && !(event.which == 19)) return true;

    // if (event.which == 116) {
    //     $(".preloader").fadeIn(500);
    //     setTimeout(() => $(".preloader").fadeOut(1000), 2000);
    // }

    event.preventDefault();
    $(`form#${tab.before}`).submit();

    return false;

});

// # Form Submit

$('form').submit(e => {

    const tag = ['input', 'button', 'textarea', 'select'];
    e.preventDefault();

    if (Date.now() - form.timeout > form.cooldown) {
        alertify.success('Updated!');
        timeout = Date.now()
    }

    tag.forEach(x => $(x).prop('disabled', true))
    setTimeout(() => tag.forEach(x => $(x).prop('disabled', false)), form.cooldown);

})

// # Show/Hide Checkbox
$("[data-child]").on('click', function(e) {

    var parent = $(this).data('child');
    $(`[data-parent=${parent}]`).css('display', (this.checked) ? 'initial' : 'none');

});

// # Tab Toggle
$("a[data-tab]").click(function() {
    tab.after = $(this).data('tab');

    if ($(`[data-tab=${tab.after}]`).length === 0) {
        console.log('[Error] Page Not Found')
        return;
    }

    if ($(window).width() <= 768) $('header nav#main').fadeOut(500)

    $(`header nav#main a[data-tab=${tab.before}]`).toggleClass("active");
    $(`header nav#main a[data-tab=${tab.after}]`).toggleClass("active");

    $(`main[data-tab=${tab.before}]`).css('display', 'none');
    $(`main[data-tab=${tab.after}]`).css('display', 'flex');

    tab.before = tab.after;

});


/* [FUNCTIONS] */

const ucWords = text => text.replace(/\b[a-z]/g, letter => letter.toUpperCase());
const objLength = obj => Object.keys(obj).length;
const validURL = str => {

    var pattern = new RegExp('^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$', 'i');

    return !!pattern.test(str);

}
const generateUniqueID = () => {

    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;

}