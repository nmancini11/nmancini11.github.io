$(document).ready(function(){$(".intro").delay(3e3).fadeOut(200,function(){$(this).text("I'M A WEB DEVELOPER..").addClass("bounceIn").fadeIn(500).delay(1e3).fadeOut(500,function(){$(this).text("SKATEBOARDER / ADRENALINE JUNKY..").fadeIn(500).delay(2e3).fadeOut(200,function(){$(this).text("I LIVE IN SAN FRANCISCO").fadeIn(500).delay(2e3).fadeOut(200,function(){$(this).text("SCROLL DOWN FOR MORE!").fadeIn(500).delay(2e3).fadeOut(200)})})})});var t=$(".intro");$(".cd-main-nav").on("click",function(t){$(t.target).is(".cd-main-nav")&&$(this).children("ul").toggleClass("is-visible")}),t.each(function(){$(this).offset().top>$(window).scrollTop()+.75*$(window).height()&&$(this).addClass("is-hidden")}),$(window).on("scroll",function(){t.each(function(){$(this).offset().top<=$(window).scrollTop()+.75*$(window).height()&&$(this).hasClass("is-hidden")&&$(this).removeClass("is-hidden").addClass("bounce-in")})}),$(function(){$("a[href*=#]:not([href=#])").click(function(){if(location.pathname.replace(/^\//,"")===this.pathname.replace(/^\//,"")&&location.hostname===this.hostname){var t=$(this.hash);if(t=t.length?t:$("[name="+this.hash.slice(1)+"]"),t.length)return $("html,body").animate({scrollTop:t.offset().top},1e3),!1}})})});