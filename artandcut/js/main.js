// TOUCHSCREEN CHECK ==============================================================================
var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows()
		);
	}
};

if (isMobile.any()) {
	document.body.classList.add('_touchscreen');
} else {
	document.body.classList.add('_desktop');
}
//=================================================================================================

//WEBP checkbrowser ===============================================================================
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});
//=================================================================================================

// WINDOW RESIZE ==================================================================================
$(window).resize(function (event) {
	fullheight();
	paralaxStart();
});
//=================================================================================================

// HEIGHT: 100vh ==================================================================================
function fullheight() {
	var w = $(window).outerWidth();
	var h = $(window).innerHeight();

	$('.intro').css({
		height: h
	});

	if (w < 767) {
		$('.secondary-intro').css({
			height: h
		});
	} else {
		$('.secondary-intro').removeAttr('style');
	}
}
fullheight();
//=================================================================================================

// MENU BURGER ====================================================================================
$('.menu-burger').on('click', function () {
	$(this).toggleClass('active');
	$('.menu').toggleClass('active');
	$('body').toggleClass('lock');
});
//=================================================================================================

// IBG (делает картинку из HTML бэкграундом) ======================================================
function ibg() {
	$.each($('.ibg'), function (index, val) {
		if ($(this).find('img').length > 0) {
			$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
		}
	});
}
ibg();
//=================================================================================================

// SCROLL TO TOP ==================================================================================
$(window).scroll(function () {

	if ($(this).scrollTop() > 50) {
		$('.scroll-to-top').addClass('show');
	} else {
		$('.scroll-to-top').removeClass('show');
	}
});

$('.scroll-to-top').on('click', function () {
	$('body, html').animate({ scrollTop: 0 }, 500);
});
//=================================================================================================

// WOW JS =========================================================================================
new WOW(
	{
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 0,
		mobile: 0,
		live: true
	}
)
	.init();
//=================================================================================================

// PRALAX =========================================================================================
function paralaxStart() {
	var w = $(window).outerWidth();
	var paralaxItem = $('.paralax');

	if (!isMobile.any()) {

		if ($(window).scrollTop() > 5) {
			paralaxItem.addClass('paralax--scrolled');
		}

		$(window).scroll(function () {
			var winScrl = $(this).scrollTop();

			paralaxItem.addClass('paralax--scrolled');

			paralaxItem.each(function () {
				var paralxItemTop = $(this).offset().top;
				var paralx = ((paralxItemTop - winScrl - 300) / 5);

				if (paralx > 200) {
					paralx = 200;
				}

				$(this).css({
					'top': paralx + 'px'
				});
			});
		});
	} else {
		paralaxItem.addClass('paralax--scrolled');
	}
}
paralaxStart();
//=================================================================================================

// POPUP ==========================================================================================
var body = document.querySelector('body');
var popupLinks = document.querySelectorAll('.popup-link');
var lockPadding = document.querySelectorAll('.lock-padding');

var unlock = true;

var timeout = 800;		// ОБЯЗАТЕЛЬНО должен совпадать с длительностью анимации в CSS

if (popupLinks.length > 0) {
	for (var index = 0; index < popupLinks.length; index++) {

		popupLinks[index].addEventListener('click', function (e) {
			var popupName = this.getAttribute('href').replace('#', '');
			var currentPopup = document.getElementById(popupName);

			popupOpen(currentPopup);
			e.preventDefault();
		});
	}
}

var popupCloseIcon = document.querySelectorAll('.popup-close');
if (popupCloseIcon.length > 0) {
	for (var index = 0; index < popupCloseIcon.length; index++) {
		var el = popupCloseIcon[index];

		el.addEventListener('click', function (e) {
			e.preventDefault();
			popupClose(this.closest('.popup'));
		});
	}
}

function popupOpen(currentPopup) {
	if (currentPopup && unlock) {
		var popupActive = document.querySelector('.popup.open');

		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}

		currentPopup.classList.add('open');
		currentPopup.addEventListener('click', function (e) {

			if (!e.target.closest('.popup-content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');

		if (doUnlock) {
			bodyUnlock();
		}
	}
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		var popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

function bodyLock() {
	var lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (var index = 0; index < lockPadding.length; index++) {
			var el = lockPadding[index];

			el.style.paddingRight = lockPaddingValue;
		}
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (var index = 0; index < lockPadding.length; index++) {
				var el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}

		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

// полифилы для поддержки старых браузеров
(function () {
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();

(function () {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
//=================================================================================================

//OWL SLIDER ====================================================================================
$(document).ready(function () {
	$('.slider').owlCarousel({
		dots: false,
		nav: true,
		items: 1,
		margin: 0,
		stagePadding: 0,

		center: false,
		autoHeight: false,
		autoWidth: false,
		rtl: false,

		loop: true,
		smartSpeed: 250,
		autoplay: false,
		autoplayTimeout: 5000,
		autoplayHoverPause: false,
		slideTransition: 'ease-in',
		mouseDrag: true,
		touchDrag: true,

		animateOut: 'bounceOutLeft',
		animateIn: 'slideInRight',
	})
});
//=================================================================================================