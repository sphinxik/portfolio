"use strict";

// TOUCHSCREEN CHECK ==============================================================================
var isMobile = {
	Android: function Android() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function BlackBerry() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function iOS() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function Opera() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function Windows() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function any() {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
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

$(document).ready(function () {
	// WINDOW EVENTS ==================================================================================
	var winScrl = $(window).scrollTop();

	$(window).on('scroll', function () {
		winScrl = $(window).scrollTop();

		headerScrolled(winScrl);
	});
	//=================================================================================================

	// HEADER SCROLLED ================================================================================
	function headerScrolled(winScrl) {
		if (winScrl > 40) {
			$('.header').addClass('is-scrolled');
		} else {
			$('.header').removeClass('is-scrolled');
		}
	}
	headerScrolled(winScrl);
	//=================================================================================================

	// PROMOTION END DATE =============================================================================
	$('.promotion-item').each(function () {
		setPromotionEndDate($(this), $(this).attr('data-promo-days-left'));
	});

	function setPromotionEndDate(promoItem, daysLeft) {
		var today = new Date();
		var nextday = new Date();
		nextday.setDate(today.getDate() + parseInt(daysLeft));
		var month = nextday.getMonth();
		var arr = [
			'января',
			'февраля',
			'марта',
			'апреля',
			'мая',
			'июня',
			'июля',
			'августа',
			'сентября',
			'октября',
			'ноября',
			'декабря'
		];

		var nextdata = '- до ' + nextday.getDate() + ' ' + arr[month];

		promoItem.find('.promotion-item__period > span').text(nextdata);
	}
	//=================================================================================================

	// REVIEWS AUDIO ==================================================================================
	var audioPlayer = document.querySelectorAll('.reviews-item__audio');

	for (var i = 0; i < audioPlayer.length; i++) {
		new GreenAudioPlayer(audioPlayer[i], {
			stopOthersOnPlay: true
		});
	}
	//=================================================================================================

	// REVIEWS SHOWMORE ===============================================================================
	$('.reviews-btn').on('click', function () {
		$(this).toggleClass('is-active');
		$('.reviews-hidden').slideToggle(300);

		if ($(this).hasClass('is-active')) {
			$(this).find('span').text('Скрыть');
		} else {
			$(this).find('span').text('Смотреть еще');
		}
	});
	//=================================================================================================

	// TEAM SLIDER ====================================================================================
	$('.team-slider').owlCarousel({
		lazyLoad: false,
		dots: false,
		dotsContainer: false,
		dotsEach: false,
		nav: true,
		navContainer: false,
		navText: ['', ''],
		items: 4,
		margin: 60,
		stagePadding: 30,

		center: false,
		autoHeight: false,
		autoWidth: false,
		rtl: false,

		startPosition: 0,
		loop: false,
		smartSpeed: 400,
		autoplay: false,
		autoplayTimeout: 5000,
		autoplayHoverPause: false,
		slideTransition: 'linear',
		mouseDrag: true,
		touchDrag: true,
		responsiveRefreshRate: 300,
		responsive: {
			0: {
				items: 1,
				margin: 30,
				stagePadding: 15
			},

			576: {
				items: 2,
				margin: 30,
				stagePadding: 15
			},

			768: {
				items: 3,
				margin: 30,
				stagePadding: 15
			},

			1400: {
				items: 3,
				margin: 50,
				stagePadding: 25
			},

			1640: {
				items: 4,
				margin: 50,
				stagePadding: 25
			},

			1800: {
				items: 4,
				margin: 60,
				stagePadding: 30
			}
		}
	});
	//=================================================================================================

	// GALLERY ========================================================================================
	baguetteBox.run('.baguettebox-gallery', {});
	//=================================================================================================

	// FAQ ============================================================================================
	$('.faq-item__title.is-active').next().slideDown(300);

	$('.faq-item__title').on('click', function () {
		if (!$(this).hasClass('is-active')) {
			//$('.faq-item__title').removeClass('is-active');
			$(this).addClass('is-active');
			//$('.faq-item__content ').slideUp(300);
			$(this).next().slideDown(300);
		} else {
			$(this).removeClass('is-active');
			$(this).next().slideUp(300);
		}
	});
	//=================================================================================================

	// YOUTUBE VIDEO ==================================================================================
	function findVideos() {
		var videos = document.querySelectorAll('.video');

		for (var i = 0; i < videos.length; i++) {
			setupVideo(videos[i]);
		}
	}

	function setupVideo(video) {
		var link = video.querySelector('.video-link');
		var videoPlayer = video.querySelector('.video-player');
		var id = parseVideoURL(link);

		video.addEventListener('click', function () {
			var iframe = createIframe(id);

			var videoPlayers = document.querySelectorAll('.video-player');
			for (var j = 0; j < videoPlayers.length; j++) {
				videoPlayers[j].innerHTML = '';
			}

			videoPlayer.appendChild(iframe);
		});

		video.classList.add('video--enabled');
	}

	function parseVideoURL(link) {
		var regexp = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/i;
		var url = link.href;
		var match = url.match(regexp);

		return match[1];
	}

	function createIframe(id) {
		var iframe = document.createElement('iframe');

		iframe.setAttribute('allowfullscreen', '');
		iframe.setAttribute('allow', 'autoplay');
		iframe.setAttribute('src', generateURL(id));
		iframe.classList.add('video-iframe');

		return iframe;
	}

	// создаем ссылку на определенное видео для iFrame
	function generateURL(id) {
		var query = '?rel=0&showinfo=0&autoplay=1';
		return 'https://www.youtube.com/embed/' + id + query;
	}
	findVideos();
	//=================================================================================================

	// POPUP ==========================================================================================
	var body = $('body');
	var paddingFix = $('.padding-fix'); //присваеваем этот класс всем элементам с position: fixed;
	var popupOpenBtn = $('[data-popup-open]');

	var timeout = 400; // должен совпадать с длительностью анимации закрытия/открытия поп-апап в CSS
	var unlock = true;

	popupOpenBtn.on('click', function (e) {
		e.preventDefault();
		var currentPopup = '#' + $(this).data('popup-open');
		var currentPopupFormId = $(this).data('popup-form-id');

		popupOpen(currentPopup);

		if (currentPopupFormId) {
			setPopupFormId(currentPopup, currentPopupFormId);
		}
	});

	function popupOpen(currentPopup) {
		if ($(currentPopup).length && unlock) {
			$('.popup.is-open').removeClass('is-open');

			$(currentPopup).addClass('is-open');
			bodyLockPopup();
		}
	}

	$('.popup').on('mouseup', function (e) {
		var popupContent = $(this).find('.popup-content');

		if (!$(e.target).is(popupContent) && popupContent.has(e.target).length === 0) {
			popupClose();
		}
	});

	$('[data-popup-close]').on('click', function (e) {
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
			$('.popup.is-open').removeClass('is-open');
			bodyUnlockPopup();
		}
	};

	//===============================================
	function bodyLockPopup() {
		var paddingFixValue = $(window).outerWidth() - $('.wrapper').width() + 'px';

		if (paddingFix.length > 0) {
			paddingFix.each(function () {
				$(this).css('padding-right', paddingFixValue);
			});
		}

		body.attr('data-scroll', $(window).scrollTop());
		body.css('padding-right', paddingFixValue);
		body.addClass('is-locked');

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}

	function bodyUnlockPopup() {
		unlock = false;

		setTimeout(function () {
			if (paddingFix.length > 0) {
				paddingFix.each(function () {
					$(this).css('padding-right', '0px');
				});
			}

			body.css('padding-right', '0px');
			body.removeClass('is-locked');

			unlock = true;
		}, timeout);
		$('html, body').animate({
				scrollTop: parseInt(body.attr('data-scroll'))
			},
			10);
	}
	//=================================================================================================

	// MASKEDINPUT ====================================================================================
	$.each($('input[type="tel"]'), function () {
		$(this).mask('+7 (999) 999-99-99');
	});
	//=================================================================================================

	// GO TO ANCHOR ===================================================================================
	$('.footer-menu__list > li > a').on('click', function (e) {
		e.preventDefault();
		var el = $(this).attr('href');
		var offset = -$('header').outerHeight() + 30;

		if ($(el).length) {
			$('body,html').animate({
					scrollTop: $(el).offset().top + offset
				},
				800);
		}
	});
	//=================================================================================================

	// FORMS ==========================================================================================
	$('form').on('submit', function (e) {
		e.preventDefault();
		var form = $(this);
		var error = formValidate(form);

		if (error === 0) {
			$.ajax({
				url: "mail.php",
				type: "POST",
				dataType: "html",
				data: form.serialize(),
				beforeSend: function beforeSend() {
					form.find('button[type="submit"]').attr('disabled', 'disabled');
				},
				success: function success(msg) {
					form.find('button[type="submit"]').removeAttr('disabled');
					form.trigger('reset');
					popupOpen('#popup-thanks');
				},
				error: function error(msg) {
					form.find('button[type="submit"]').removeAttr('disabled');
					popupOpen('#popup-error');
				}
			});
		}
	});

	function formValidate(form) {
		var error = 0;
		var formRequiredFields = form.find('._req');

		formRequiredFields.each(function () {
			$(this).removeClass('_err');

			if ($(this).attr('type') === 'checkbox' && $(this).is(':checked') === false) {
				$(this).addClass('_err');
				error++;
			} else {
				if ($(this).val() === '') {
					$(this).addClass('_err');
					error++;
				}
			}
		});
		return error;
	}

	function setPopupFormId(popup, formID) {
		var formIdInput = $(popup).find('input[name="form-id"]');

		if (formIdInput.length) {
			formIdInput.val(formID);
		}
	}
	//=================================================================================================

	// YANDEX MAP =====================================================================================
	var specialistsMapBlock = document.querySelector('#map-specialists');
	var contactsMapBlock = document.querySelector('#contacts-map');

	// загружаем карту при скроле
	function loadYandexMap() {
		console.log('loading YandexMap');

		window.removeEventListener('scroll', loadYandexMap);
		createYandexMapScript();
	}
	window.addEventListener('scroll', loadYandexMap);

	// создаем скрипт карты
	function createYandexMapScript() {
		var script = document.createElement('script');

		script.type = "text/javascript";
		script.src = "https://api-maps.yandex.ru/2.1/?apikey=СЮДА_ВСТАВЛЯЕМ_СВОЙ_API_КЛЮЧ&lang=ru_RU"; // <<< СЮДА ВСТАВИТЬ СВОЙ КЛЮЧ !!!
		script.onload = yandexMapSettings;

		document.body.appendChild(script);
	}

	// настройки карты
	function yandexMapSettings() {
		ymaps.ready(function () {
			if (specialistsMapBlock) { //
				var mapSpecialistsCoordsList = document.querySelector('.map-specialists__coords');
				var mapSpecialistsCoordsListItems = mapSpecialistsCoordsList.querySelectorAll('li');

				var mapSpecialistsCenterCoords = mapSpecialistsCoordsList.dataset.mapCenter.split(',');
				var mapSpecialistsCenterCircle = mapSpecialistsCoordsList.dataset.mapCenterCircle;
				var mapSpecialistsCoords = [];
				var mapSpecialistsCircles = [];
				var mapSpecialistsZoom = mapSpecialistsCoordsList.dataset.mapZoom;

				if (!mapSpecialistsCenterCircle) {
					mapSpecialistsCenterCircle = 0;
				}

				for (var i = 0; i < mapSpecialistsCoordsListItems.length; i++) {
					var currentCoords = mapSpecialistsCoordsListItems[i].innerText.split(',');
					var currentCircle = mapSpecialistsCoordsListItems[i].dataset.mapMarkerCircle;

					mapSpecialistsCoords.push(currentCoords);

					if (currentCircle) {
						mapSpecialistsCircles.push(currentCircle);
					} else {
						mapSpecialistsCircles.push(0);
					}
				}

				var specialistsMap = new ymaps.Map(specialistsMapBlock, {
					controls: [],
					center: mapSpecialistsCenterCoords,
					zoom: mapSpecialistsZoom
				});

				var fsControl1 = new ymaps.control.FullscreenControl({
					options: {
						size: "large",
						position: {
							right: 10,
							top: 20
						}
					}
				});

				var zoomControl1 = new ymaps.control.ZoomControl({
					options: {
						size: "large",
						position: {
							right: 10,
							top: 70
						}
					}
				});

				var myPlacemark1 = new ymaps.Placemark(specialistsMap.getCenter(), {
					iconContent: ''
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'images/icons/marker.png',
					iconImageSize: [30, 35],
					iconImageOffset: [-15, -35],
					iconContentOffset: [15, 15]
				});

				var myPlacemark1Circle = new ymaps.Circle([
					mapSpecialistsCenterCoords, mapSpecialistsCenterCircle
				], {}, {
					outline: false,
					strokeColor: '#02a296',
					fillColor: '#02a296',
					fillOpacity: 0.4
				});

				var baloonsCollection = new ymaps.GeoObjectCollection();
				for (var i = 0; i < mapSpecialistsCoords.length; i++) {
					baloonsCollection.add(new ymaps.Placemark(mapSpecialistsCoords[i], {
						balloonContent: ''
					}, {
						iconLayout: 'default#image',
						iconImageHref: 'images/icons/marker.png',
						iconImageSize: [30, 35],
						iconImageOffset: [-15, -35],
						iconContentOffset: [15, 15]
					}));
				}

				var circlesCollection = new ymaps.GeoObjectCollection();
				for (var i = 0; i < mapSpecialistsCoords.length; i++) {
					circlesCollection.add(new ymaps.Circle([
						mapSpecialistsCoords[i], mapSpecialistsCircles[i]
					], {}, {
						outline: false,
						strokeColor: '#02a296',
						fillColor: '#02a296',
						fillOpacity: 0.4
					}));
				}

				// добавляем гео-объекты на карту
				specialistsMap.geoObjects.
				add(myPlacemark1).
				add(myPlacemark1Circle).
				add(baloonsCollection).
				add(circlesCollection);

				// включаем элементы управления карты
				specialistsMap.controls.add(fsControl1);
				specialistsMap.controls.add(zoomControl1);

				// отключаем зум карты колесиком мыши
				specialistsMap.behaviors.disable('scrollZoom');
			}

			//=========================================================
			if (contactsMapBlock) {
				var contactsMapCenterCoords = [55.89290006885191, 37.47979750000001];
				var contactsMapZoom = 17;

				var contactsMap = new ymaps.Map(contactsMapBlock, {
					controls: [],
					center: contactsMapCenterCoords,
					zoom: contactsMapZoom
				}, {
					searchControlProvider: 'yandex#search'
				});

				// разворот на весь экран
				var fsControl2 = new ymaps.control.FullscreenControl({
					options: {
						size: "large",
						position: {
							right: 10,
							top: 20
						}
					}
				});

				// бегунок зума
				var zoomControl2 = new ymaps.control.ZoomControl({
					options: {
						size: "large",
						position: {
							right: 10,
							top: 70
						}
					}
				});

				// иконка центра карты
				var myPlacemark2 = new ymaps.Placemark(contactsMap.getCenter(), {
					iconContent: 'ул. Пожарского, д.22'
				}, {
					//preset: 'islands#redMedicalIcon',
					preset: 'islands#redStretchyIcon',
					iconImageSize: [40, 45],
					iconImageOffset: [0, 0],
					iconContentOffset: [15, 15]
				});

				contactsMap.geoObjects.add(myPlacemark2);

				// включаем элементы управления карты
				contactsMap.controls.add(fsControl2);
				contactsMap.controls.add(zoomControl2);

				// отключаем зум карты колесиком мыши
				contactsMap.behaviors.disable('scrollZoom');
			}
		});
	}
});