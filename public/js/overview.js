$(document).ready(() => {
    $(window).resize(() => {
        var wdth = $(window).width();
        if (wdth > 768) {
            $('#meeting_viewer').css('display', 'flex');
        } else {
            $('#meeting_viewer').css('display', 'block');
        }
    });
    $('.card_body').click(() => {
        if (window.innerWidth <= 768) {
            $('#meeting_viewer').fadeIn();

        } else if (window.innerWidth <= 768) {
            $('#meeting_viewer').hide();
        }
    });
    $('.back').click(() => {
        if (window.innerWidth <= 768) {
            $('#meeting_viewer').fadeOut();
        }
    });
});
