$(document).ready(() => {
    $(window).resize(() => {
        var wdth = $(window).width();
        if (wdth > 768) {
            $("#meeting_viewer").css("display", "flex");
        } else {
            $("#meeting_viewer").css("display", "none");
        }
    });
    $('.card_content').click(() => {
        if (window.innerWidth <= 768) {
            $('#meeting_list').hide();
            $('#meeting_viewer').fadeIn();

        } else if (window.innerWidth <= 768) {
            $('#meeting_viewer').hide();
            $('#meeting_list').fadeIn();

        }
    });
    $('.back').click(() => {
        if (window.innerWidth <= 768) {
            $('#meeting_viewer').hide();
            $('#meeting_list').show();
        }
    });
});
