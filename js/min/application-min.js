function parallax(){if($("#js-parallax-window").length>0){var e=$("#js-parallax-background"),n=$("#js-parallax-window"),a=$(n).offset().top,o=$(window).scrollTop(),s=a-o,t=$(e).offset().top,l=window.innerHeight,i=t-o,d=l-i,u=.35;e.css("top",-(s*u)+"px")}}$(window).resize(function(){var e=document.getElementById("js-navigation-more");if($(e).length>0){var n=$(window).width(),a=$(e).offset().left,o=n-a;o<330&&($("#js-navigation-more .submenu .submenu").removeClass("fly-out-right"),$("#js-navigation-more .submenu .submenu").addClass("fly-out-left")),o>330&&($("#js-navigation-more .submenu .submenu").removeClass("fly-out-left"),$("#js-navigation-more .submenu .submenu").addClass("fly-out-right"))}}),$(document).ready(function(){var e=$("#js-mobile-menu").unbind();$("#js-navigation-menu").removeClass("show"),e.on("click",function(e){e.preventDefault(),$("#js-navigation-menu").slideToggle(function(){$("#js-navigation-menu").is(":hidden")&&$("#js-navigation-menu").removeAttr("style")})})}),$(document).ready(function(){$("#js-parallax-window").length&&parallax()}),$(window).scroll(function(e){$("#js-parallax-window").length&&parallax()}),$(document).ready(function(){var e=document.getElementById("js-fadeInElement");$(e).addClass("js-fade-element-hide"),$(window).scroll(function(){if($("#js-fadeInElement").length>0){var n=$(e).offset().top,a=$(window).scrollTop(),o=window.innerHeight,s=n-a,t=o-s,l=300;t>l?$(e).addClass("js-fade-element-show"):t<0&&($(e).removeClass("js-fade-element-show"),$(e).addClass("js-fade-element-hide"))}})});