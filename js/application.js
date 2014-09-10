$(document).ready(function () {
    $('.intro').delay(3000).fadeOut(200);

    var $headerIntro = $('.intro');

    //open-close submenu on mobile
    $('.cd-main-nav').on('click', function (event) {
        if ($(event.target).is('.cd-main-nav')) { 
            $(this).children('ul').toggleClass('is-visible');
        }
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

    /* Having fun with some clock animation */
    var seconds = 10;
    var doPlay = true;
    var loader = document.getElementById('loader'),
        α = 0,
        π = Math.PI,
        t = (seconds/360 * 1000);

    $(function draw() {
      α++;
      α %= 360;
      var r = ( α * π / 180 ),
         x = Math.sin( r ) * 125,
         y = Math.cos( r ) * - 125,
         mid = ( α > 180 ) ? 1 : 0,
         anim = 'M 0 0 v -125 A 125 125 1 ' + mid + ' 1 ' +  x  + ' ' +  y  + ' z';
      //[x,y].forEach(function( d ){
      //  d = Math.round( d * 1e3 ) / 1e3;
      //});
     
      loader.setAttribute( 'd', anim );
      
      if(doPlay){
        setTimeout(draw, t); // Redraw
      }
    });
});