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

// DEBOUNCE =======================================================================================
function debounce(func, time) {
	var timeout;

	return function () {
		var context = this;
		var args = arguments;

		clearTimeout(timeout);

		timeout = setTimeout(function () {
			timeout = null;
			func.apply(context, args);
		}, time);
	}
}
//=================================================================================================

// WINDOW RESIZE EVENTS ===========================================================================
var winWidth = $(window).outerWidth();

$(window).on('resize', debounce(_onResizeWindow, 300));

function _onResizeWindow() {
	winWidth = $(this).outerWidth();

	blockTransfer(winWidth);
	setMainContentMinHeight();

	if ($('.team-list__nav').length > 0) {
		teamNavScrollbar(winWidth);
	}

	if (winWidth > 992) {
		teamMemberAttrStyleRemove();
		servicesSidebarMenuReset();
		pricesMenuReset();
	}
}
//=================================================================================================

// BLOCKS TRANSFER (adaptive) =====================================================================
function blockTransfer(winWidth) {
	var headerMenu = $('.header-menu');
	var headerMenuWrapperDesktop = $('.header-menu__wrapper-desktop');
	var headerMenuWrapperMobile = $('.header-menu__warapper-mobile');

	var headerCallOrder = $('.header-call__order');
	var headerContactsWrapperDesktop = $('.header-contacts__wrapper-desktop');

	var headerPhoneLinkMain = $('.header-phone__link--main');
	var headerPhoneLinkWrapperDesktop = $('.header-phones');
	var headerPhoneLinkWrapperMobile = $('.header-phones__list');

	if (winWidth < 993) {
		headerMenu.appendTo(headerMenuWrapperMobile);
	} else {
		headerMenu.appendTo(headerMenuWrapperDesktop);
	}

	if (winWidth < 768) {
		headerCallOrder.appendTo(headerMenuWrapperMobile);
	} else {
		headerCallOrder.appendTo(headerContactsWrapperDesktop);
	}

	if (winWidth <= 480) {
		headerPhoneLinkMain.prependTo(headerPhoneLinkWrapperMobile);
	} else {
		headerPhoneLinkMain.prependTo(headerPhoneLinkWrapperDesktop);
	}

}
blockTransfer(winWidth);
//=================================================================================================

// GO TO ANCHOR ===================================================================================
$('.goto').on('click', function (e) {
	e.preventDefault();

	goToAnchor($(this));
});

function goToAnchor(currentLink) {
	var headerHeight = $('.header').outerHeight();
	var el = currentLink.attr('href');
	var offset = -20 - headerHeight;

	$('body,html').animate({ scrollTop: $(el).offset().top + offset }, 500);
}
//=================================================================================================

// HEADER PHONES MINI POP-UP ======================================================================
$('.header-phone__arrow').on('click', function () {
	$(this).toggleClass('active');
	$('.header-phones__list').slideToggle(300);
});
//=================================================================================================

// HEADER BURGER ==================================================================================
$('.header-burger').on('click', function () {
	$(this).toggleClass('active');
	$('.header-menu__warapper-mobile').toggleClass('active');
});
//=================================================================================================

// SET MIN HEIGHT of .main ========================================================================
function setMainContentMinHeight() {
	var mainContent = $('.main');
	var winHeight = $(window).height();
	var footerHeight = $('.footer').outerHeight();
		
	var mainContentMinHeight = winHeight - footerHeight;
		
	mainContent.css('min-height', mainContentMinHeight);
}
setMainContentMinHeight();
//=================================================================================================

// INTRO SLIDER ===================================================================================
var introSlider = $('.intro-slider');

if (introSlider.length > 0) {
	sliderCounter(introSlider);

	introSlider.owlCarousel({
		lazyLoad: false,
		dots: true,
		dotsContainer: $('.intro-slider__dots'),
		dotsEach: false,
		nav: false,
		navContainer: false,
		items: 1,
		margin: 0,
		stagePadding: 0,

		startPosition: 0,
		loop: true,
		smartSpeed: 250,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: false,
		slideTransition: 'linear',
		mouseDrag: true,
		touchDrag: true
	});
}

// СЧЕТЧИК КОЛИЧЕСТВА СЛАЙДОВ =======================
function sliderCounter(slider) {
	var counter = slider.parent().find('.slider-counter');

	slider.on('initialized.owl.carousel', function (event) {
		var totalSlidesCounter = $(this).parent().find('.slider-counter__total');
		var i = event.item.count;

		totalSlidesCounter.text(i);
	});

	slider.on('changed.owl.carousel', function (event) {
		var currentSlideCounter = $(this).parent().find('.slider-counter__current');
		var j = event.page.index + 1;

		//для правильной нумерации 1го слайда при загрузке страницы
		if (j < 1) { j = 1; }

		currentSlideCounter.text(j);
	});
}
//=================================================================================================

// TEAM NAV SCROLLBAR =============================================================================
var teamListNav = $('.team-list__nav');

if (teamListNav.length > 0) {
	function teamNavScrollbar(winWidth) {
		if (winWidth < 993) {
			teamListNav.getNiceScroll().remove();
		} else {
			teamListNav.niceScroll({
				cursorcolor: "#C7DADE",
				cursorwidth: "7px",
				cursorborder: "none",
				cursorborderradius: 10,
				background: "#ffffff",
				autohidemode: false,
				railpadding: { top: 0, right: 1, bottom: 0, left: 0 },
				scrollbarid: 'team-nav-scrollbar',
				cursorborder: "1px solid transparent",
				railalign: 'left',
				touchbehavior: false,
			});
		}
	}
	teamNavScrollbar(winWidth);
}
//=================================================================================================

// TEAM MEMBER SELECT =============================================================================
$('.team-member').on('click', function () {
	if (!$(this).hasClass('active')) {
		var currentTeamID = $(this).attr('data-team-id');

		$('.team-member').removeClass('active');
		$(this).addClass('active');

		if (currentTeamID) {
			var parent = $(this).parents('.team');

			if (winWidth < 993) {
				parent.find('.team-member__details').slideUp(400);
				parent.find('.team-member__details[data-team-id=' + currentTeamID + ']').slideDown(400);
			} else {
				parent.find('.team-member__details').removeClass('active');
				parent.find('.team-member__details[data-team-id=' + currentTeamID + ']').addClass('active');
			}
		}
	}
});

// фикс для ресайза экрана
function teamMemberAttrStyleRemove() {
	$('.team-member__details').removeAttr('style');
}
//=================================================================================================

// SERVICES TEXT SHOWMORE =========================================================================
var servicesTxtShowmoreBtn = $('.services-txt__showmore');

servicesTxtShowmoreBtn.on('click', function () {
	var currentParent = $(this).parents('.services-txt');
	var currentHiddenTxt = currentParent.find('.services-txt__hidden');

	$(this).toggleClass('active');

	if ($(this).hasClass('active')) {
		$(this).text('Скрыть');
		currentHiddenTxt.slideDown(300);
	} else {
		$(this).text('Подробнее об услугах');
		currentHiddenTxt.slideUp(300);
	}
});
//=================================================================================================

// SERVICES SIDEBAR MENU (mobile) =================================================================
var servicesMenuBtn = $('.services-menu__btn');
var servicesSidebarMenu = $('.services-sidebar__menu');

servicesMenuBtn.on('click', function () {
	servicesMenuBtn.toggleClass('active');

	if ($(this).hasClass('active')) {
		servicesSidebarMenu.slideDown(300);
	} else {
		servicesSidebarMenu.slideUp(300);
	}
});

function servicesSidebarMenuReset() {
	servicesMenuBtn.removeClass('active');
	servicesSidebarMenu.removeAttr('style');
}
//=================================================================================================

// PRICES SIDEBAR MENU ============================================================================
var pricesSubmenu = $('.prices-menu__list .submenu');

if (pricesSubmenu.length > 0) {
	pricesSubmenu.parent('li').addClass('has-submenu');

	$('.prices-menu__list li a').on('click', function (e) {
		e.preventDefault();
		var parent = $(this).parent('li');
		var currentSubmenu = parent.find('.submenu');

		if (parent.hasClass('has-submenu')) {
			parent.toggleClass('active');
			currentSubmenu.slideToggle(300);
		} else {
			goToAnchor($(this));
		}
	});
}
//=================================================================================================

// PRICES MENU (mobile) ===========================================================================
var pricesMenuBtn = $('.prices-sidebar__btn');
var pricesMenu = $('.prices-menu');

pricesMenuBtn.on('click', function () {
	pricesMenuBtn.toggleClass('active');

	if ($(this).hasClass('active')) {
		pricesMenu.slideDown(300);
	} else {
		pricesMenu.slideUp(300);
	}
});

function pricesMenuReset() {
	pricesMenuBtn.removeClass('active');
	pricesMenu.removeAttr('style');
}
//=================================================================================================

// MASKEDINPUT ====================================================================================
$.each($('input[type="tel"]'), function () {
	$(this).mask('+375 (99) 999-99-99');
});
//=================================================================================================

// DATETIMEPICKER plugin for forms ================================================================
$('.timedate-input--time').datetimepicker({
	datepicker: false,
	format: 'H:i',
	step: 30,
	minTime: '09:00',
	maxTime: '20:00',
});

$('.timedate-input--date').datetimepicker({
	timepicker: false,
	format: 'd.m.Y',
	minDate: new Date()
});
//=================================================================================================

// POPUP ==========================================================================================
var body = $('body');
var bodyLockPadding = $('.body-lock-padding');
var popupLink = $('.popup-link');

var timeout = 500; // должен совпадать с длительностью анимации закрытия/открытия поп-апап в CSS
var unlock = true;

popupLink.on('click', function (e) {
	e.preventDefault();
	var currentPopup = $(this).attr('href');

	popupOpen(currentPopup);
});

function popupOpen(currentPopup) {
	if (currentPopup && unlock) {
		$('.popup.open').removeClass('open');

		$(currentPopup).addClass('open');
		bodyLockPopup();
	}
}

$('.popup').on('mouseup', function (e) {
	var popupContent = $(this).find('.popup-content');

	if (!$(e.target).is(popupContent) && popupContent.has(e.target).length === 0) {
		popupClose();
	}
});

$('.popup-close').on('click', function (e) {
	e.preventDefault();
	popupClose();
});

$(document).on('keydown', function (e) {
	if (e.which == 27) {
		popupClose();
	}
});

function popupClose() {
	if (unlock) {
		$('.popup.open').removeClass('open');
		bodyUnlockPopup();
	}
};

//===============================================
function bodyLockPopup() {
	var lockPaddingValue = $(window).outerWidth() - $('.wrapper').width() + 'px';

	if (bodyLockPadding.length > 0) {
		bodyLockPadding.each(function () {
			$(this).css('padding-right', lockPaddingValue);
		});
	}

	body.attr('data-scroll', $(window).scrollTop());
	body.css('padding-right', lockPaddingValue);
	body.addClass('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnlockPopup() {
	unlock = false;

	setTimeout(function () {
		if (bodyLockPadding.length > 0) {
			bodyLockPadding.each(function () {
				$(this).css('padding-right', '0px');
			});
		}

		body.css('padding-right', '0px');
		body.removeClass('lock');

		unlock = true;
	}, timeout);
	$('html, body').animate({ scrollTop: parseInt(body.attr('data-scroll')) }, 10);
}
//=================================================================================================

// BAGUETTEBOX GALLERY ============================================================================
if ($('.baguettebox-gallery').length > 0) {
	baguetteBox.run('.baguettebox-gallery');
}
//=================================================================================================

// Yandex MAP =====================================================================================
var myMapWrapper = document.querySelector('#map');

if (myMapWrapper) {
	// создаем скрипт карты
	function createYandexMapScript() {
		var script = document.createElement('script');

		script.type = "text/javascript";
		script.src = "https://api-maps.yandex.ru/2.1/?apikey=СЮДА_ВСТАВЛЯЕМ_СВОЙ_API_КЛЮЧ&lang=ru_RU"; // <<< СЮДА ВСТАВИТЬ СВОЙ КЛЮЧ !!!
		script.onload = yandexMapSettings;

		myMapWrapper.appendChild(script);
	}

	// загружаем карту при скроле
	function loadYandexMap() {
		console.log('loading YandexMap');

		window.removeEventListener('scroll', loadYandexMap);
		createYandexMapScript();
	}
	window.addEventListener('scroll', loadYandexMap);

	// настройки карты
	function yandexMapSettings() {
		var myMap;
		var myMapCenterCoords = [53.902135, 30.337886];
		var myMapZoom = 17;

		ymaps.ready(function () {
			myMap = new ymaps.Map('map', {
				controls: [],
				center: myMapCenterCoords,
				zoom: myMapZoom
			}, {
				searchControlProvider: 'yandex#search'
			}),

				// разворот на весь экран
				fsControl = new ymaps.control.FullscreenControl({
					options: {
						size: "large",
						position: {
							left: 10,
							top: 20
						}
					}
				});

			// бегунок зума
			zoomControl = new ymaps.control.ZoomControl({
				options: {
					size: "large",
					position: {
						left: 10,
						top: 70
					}
				}
			});

			// иконка центра карты
			myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
				iconContent: ''
			}, {
				preset: 'islands#redMedicalIcon',
				iconImageSize: [40, 45],
				iconImageOffset: [0, 0],
				iconContentOffset: [15, 15]
			}),
				myMap.geoObjects.add(myPlacemark);

			// включаем элементы управления карты
			myMap.controls.add(fsControl);
			myMap.controls.add(zoomControl);

			// отключаем зум карты колесиком мыши
			myMap.behaviors.disable('scrollZoom');
		});

		// возврат в центр карты
		var mapInfoWatchmap = document.querySelector('.map-info__watchmap');
		mapInfoWatchmap.addEventListener('click', function (e) {
			e.preventDefault();
			myMap.setCenter(myMapCenterCoords, myMapZoom)
		});
	}
}
//=================================================================================================