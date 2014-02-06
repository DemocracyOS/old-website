$(document).ready(function() {

	//Open links in new window
	$("a[rel=external]").each(function(){
		this.target = "_blank";
	});
	
	//default validate action
	$('form').attr('novalidate',true);

	//printing Icons
	$("a.print").click(function(){
		window.print();
		return false;
	});
	
	$('#slides').slidesjs({
		width: 2000,
        height: 979,
		play: { auto: true, effect: 'fade', interval: 4000 },
		effect: { fade: { speed: 1000 } },
		navigation: { active: false },
		pagination: { active: false }
	});
	
	// Accordian
	$('#accordian .accContent').css({ 'display':'none' });
	$('#accordian > div > h3').click(function(){
		$('#accordian > div > h3').removeClass('clicked');
		$(this).addClass('clicked');
		if($(this).hasClass('active')){
			$(this).toggleClass('active');
			$(this).removeClass('clicked');
			$(this).next('.accContent').slideUp('fast');
		}else{
			$('#accordian > div > h3').removeClass('active');
			$('.accContent').slideUp('fast');
			$('#accordian > div > h3.clicked').addClass('active');
			$('#accordian > div > h3.clicked').next('.accContent').slideDown('fast');
		}
	});
	
	// One Page Nav
	$('.headerInner .section, #logo a').onePageNav({
		currentClass: 'current',
		filter: ':not(.external)',
		changeHash: false,
		scrollOffset: 0,
		begin: fixedHeader()
	});
	$('.next').click(function(){
		var target = $('#slide6');
		$('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
	});
	if($('#avatars').width() < 1920){
		$('#avatars > img').css({'left': - ((1920 - $('#avatars').width())/2) });
	}
	
	// Fixed Header
	function fixedHeader(){
		var msie6 = $.browser == 'msie' && $.browser.version < 7;
		if (!msie6) {
			$(window).scroll(function (e) {
			  var screenScroll = $(this).scrollTop();
			  if(screenScroll > 67){
				$('#header').addClass('fixed');
			  }else{
				$('#header').removeClass('fixed');
			  }
			});
		}
	}
	
	// Mobile Menu
	$('#mobileMenu > a').click(function(e){
		e.preventDefault();
		//$('#mobileMenu').toggleClass('opened');
		$(this).next('ul').slideToggle('fast');
	});
	
	//if($('#mobileMenu').hasClass('opened')){
		$('.page, #mobileMenu ul a').click(function(){
			//alert($(this).attr('class'));
			$('#mobileMenu ul').slideUp('fast');
		});
	//}
});

$(window).bind('load', function(){
	$s_height = $('#slide1').outerHeight();
	$('#slide1').css({'height': $s_height - 36, 'overflow': 'hidden' });
});

$(window).on("orientationchange", function( event ) {
	$s_height = $('#slide1').outerHeight();
	$('#slide1').css({'height': $s_height, 'overflow': 'hidden' });
});

/*
window.addEventListener("resize", function() {
	$s_height = $('#slide1 > img.first').realWidth();
	console.log($s_height);
	$('#slide1').css({'height': $s_height, 'overflow': 'hidden' });
}, false); */