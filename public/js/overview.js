$(document).ready(() => {
    let flag = 0;
    $('#meeting_viewer').hide();
    $(window).resize(() => {
        var wdth = $(window).width();
        if (wdth > 768) {
            $('#meeting_viewer').css('display', 'flex');
        } else {
            $('#meeting_viewer').css('display', 'block');
        }
    });
    $('.card_body').click(() => {
        flag = 1;
        if (window.innerWidth <= 768) {
            $('#meeting_viewer').fadeIn();

        } else if (window.innerWidth <= 768) {
            $('#meeting_viewer').hide();
        }
    });
    $('.back').click(() => {
        flag = 0;
        if (window.innerWidth <= 768) {
            $('#meeting_viewer').fadeOut();
        }
    });
});
