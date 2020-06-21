

jQuery(document).ready(function(){
	//Установка правильного размера окна
	function resizemain() {
		jQuery(".main").css({"min-height":jQuery(window).innerHeight()});
		}
		resizemain();
		jQuery(window).resize(function() {
		resizemain();
	});


// jQuery(window).load(function(){
	jQuery(".main-slider").owlCarousel({
		loop:true,
		dots: true,
		autoHeight: true,
		items: 1,
		mouseDrag: false,
		touchDrag: false,
		dotsSpeed: 1000,
		dotsClass: 'container slider-nav',
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
	});

	jQuery(".entertainment-list .item").mouseover(function() {
		var entClass = 'item_' + jQuery(this).attr('data-name');
		jQuery(".entertainment .bg-list .item").removeClass('active');
		jQuery(".entertainment .bg-list .item").filter('.'+entClass).addClass('active');
	})
});

//Открытие меню
function menuActivate() {
	jQuery(".main-menu").addClass("active");
	jQuery(".burger-menu").addClass("active");
}

//Закрытие меню
function menuDisactivate() {
	jQuery(".main-menu").removeClass("active");
	jQuery(".burger-menu").removeClass("active");
}

//Клик по кнопке "меню""
jQuery(".burger-menu").click(function(){
	menuActivate();
	var width = jQuery(window).width();
	if (width < 768) {
			jQuery("body").addClass("overflow-hidden");
			jQuery("html").addClass("overflow-hidden");
		}
});

//Клик по крестику
jQuery(".close-button").click(function(){
	menuDisactivate();
	jQuery("body").removeClass("overflow-hidden");
	jQuery("html").removeClass("overflow-hidden");
});