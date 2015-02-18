$(document).ready(function () {
    $('.intro').delay(4000).fadeOut(200);

    /* Resize background depending on screen width*/
    function vidHeight(){
      var winWidth = $( document ).width(),
          vHeight = winWidth*0.57;
          if ($(window).width() < 768){
            vHeight = 330;
          }
      $('.cd-fixed-bg').css("min-height", vHeight);
      $('.video').css("height", vHeight);
    }
    vidHeight();


    $('.cd-main-nav').on('click', function(event){
      if($(event.target).is('.cd-main-nav')){
        $(this).children('ul').toggleClass('is-visible').slideDown(500);
      }
    });

    $('.cd-main-nav ul li a').on('click', function(){
      if ($(window).width() < 768){
        $(this).closest('ul').toggleClass('is-visible').fadeOut(1000);
      }
    });



    // Animate clocks on scroll using Waypoint.js & Inview
    var inview = new Waypoint.Inview({
      element: $('.clock'),
      entered: function() {
        $('.clock').fadeIn(2000).circliful().addClass("animated pulse");
      },
      exit: function() {
        // calling inview.destroy prevent multiple clocks from showing on the page
        inview.destroy();
      },
    });


    /* Add Scroll To Effect */
    $(function () {
        $('a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top-50
                    }, 1000);
                    return false;
                }
            }
        });
    });

    // Resize video container on resizing of Window
    $(window).on("resize", vidHeight);

    if ($(window).width() < 768){
      $('#social').css('background-color','#000');
    }


    // *** Fade In Effect ***
    var element = document.getElementById("js-fadeInElement");
    $(element).addClass('js-fade-element-hide');

    $(window).scroll(function() {
      if( $("#js-fadeInElement").length > 0 ) {
        var elementTopToPageTop = $(element).offset().top;
        var windowTopToPageTop = $(window).scrollTop();
        var windowInnerHeight = window.innerHeight;
        var elementTopToWindowTop = elementTopToPageTop - windowTopToPageTop;
        var elementTopToWindowBottom = windowInnerHeight - elementTopToWindowTop;
        var distanceFromBottomToAppear = 400;

        if(elementTopToWindowBottom > distanceFromBottomToAppear) {
          $(element).addClass('js-fade-element-show');
        }
        else if(elementTopToWindowBottom < 0) {
          $(element).removeClass('js-fade-element-show');
          $(element).addClass('js-fade-element-hide');
        }
      }
    });

});
