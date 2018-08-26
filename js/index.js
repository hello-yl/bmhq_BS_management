var tab = {
    addTab: function (title, url) {

        var index = url.replace(/\./g, '_').replace(/\//g, '_').replace(/:/g, '_').replace(/\?/g, '_').replace(/,/g, '_').replace(/=/g, '_').replace(/&/g, '_');
        $('.iframe').removeClass('cur');

        var iframe = '<div id="iframe_' + index + '" class="iframe cur"><iframe class="tab_iframe" src="' + url + '" width="100%" frameborder="0" scrolling="auto" onload="changeFrameHeight(this)"></iframe></div>';
        console.log($('.footer').next());
        // $(iframe).prev().empty();
        $('.footer').next().remove();
        $('#page-wrapper').append(iframe);

    }
}
// iframe高度自适应
function changeFrameHeight(ifm) {
    ifm.height = document.documentElement.clientHeight - 118;
}

$(window).bind("resize", function () {
    if ($(this).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }
});
$('.navbar-minimalize').on('click', function () {
    $("body").toggleClass("mini-navbar");
    SmoothlyMenu();

});

function SmoothlyMenu() {
    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 200);
    } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 100);
    } else {
        $('#side-menu').removeAttr('style');
    }
}

$(document).ready(function(){
    var index = 0;
    var tabRadio = $("input[type='radio']");
    var tabPane = $('#myTabContent .tab-pane');
    $("input[type='radio']").on('click',function(){
        if(tabRadio.is(":checked")){
            index = $(this).parent().index();
            $(tabPane[index]).addClass('active').siblings().removeClass('active');
            console.log($(tabPane[1]).attr('class'));
        }else{
            $("input[type='radio']").prop("checked", "checked");
            
        }
    })
})


