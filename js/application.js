$(document).ready(function () {
    $('.intro').delay(3000).fadeOut(200, function () {
        $(this).text("I'M A WEB DEVELOPER..").addClass("bounceIn").fadeIn(500).delay(1000).fadeOut(500, function () {
            $(this).text('SKATEBOARDER / ADRENALINE JUNKY..').fadeIn(500).delay(2000).fadeOut(200, function () {
            	$(this).text('I LIVE IN SAN FRANCISCO').fadeIn(500).delay(2000).fadeOut(200, function () {
            		$(this).text('SCROLL DOWN FOR MORE!').fadeIn(500).delay(2000).fadeOut(200);
        		});
        	});
        });
    });

    var $headerIntro = $('.intro');

    //open-close submenu on mobile
    $('.cd-main-nav').on('click', function (event) {
        if ($(event.target).is('.cd-main-nav')) $(this).children('ul').toggleClass('is-visible');
    });

    //hide header text which are outside the viewport
    $headerIntro.each(function () {
        if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
            $(this).addClass('is-hidden');
        }
    });

    $(window).on('scroll', function () {
        $headerIntro.each(function () {
            if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(this).hasClass('is-hidden')) {
                $(this).removeClass('is-hidden').addClass('bounce-in');
            }
        });
    });

    /* Add Scroll To Effect */
    $(function () {
        $('a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });
});