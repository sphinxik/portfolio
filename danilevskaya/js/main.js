"use strict";

function _typeof(obj) {
	"@babel/helpers - typeof";
	if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
		_typeof = function _typeof(obj) {
			return typeof obj;
		};
	} else {
		_typeof = function _typeof(obj) {
			return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
		};
	}
	return _typeof(obj);
}

window.onload = function () {

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

	// 1vh to px ======================================================================================
	function oneVH_toPX() {
		var vh = window.innerHeight * 0.01;

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
	}
	oneVH_toPX();
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
		};
	}
	//=================================================================================================

	// WINDOW EVENTS ==================================================================================
	var header = document.querySelector('.header');
	var winWidthOnLoad = window.innerWidth;
	var winWidth = window.innerWidth;
	var winHeight = window.innerHeight;

	window.addEventListener('resize', debounce(_onResizeWindow, 300));
	window.addEventListener('scroll', _onScrollWindow);

	function _onResizeWindow() {
		winWidth = window.innerWidth;
		winHeight = window.innerHeight;

		if (winWidthOnLoad != winWidth) {
			winWidthOnLoad = winWidth;

			blocksTransfer(winWidth);
			priceCheckboxesShowmoreReset();
			resetReviewsShowmore();
			checkReviewsShowmore();
		}

		oneVH_toPX();
		fullPageResetStyles(winWidth, winHeight);
	}

	function _onScrollWindow() {
		if (window.scrollY > 40) {
			header.classList.add('is-scrolled');
		} else {
			header.classList.remove('is-scrolled');
		}
	}
	//=================================================================================================

	// FULLPAGE =======================================================================================
	var fullPageWrapper = document.querySelector('#fullpage');

	if (fullPageWrapper) {
		var fullPageSettings = {
			lazyLoading: false,
			lockAnchors: true,
			sectionSelector: '.fp-block',
			verticalCentered: false,
			scrollingSpeed: 800,
			fitToSectionDelay: 1800,
			afterRender: function afterRender() {
				$(this).addClass('fullpage-init');
			},
			onLeave: function onLeave(index, nextIndex, direction) {
				if (nextIndex !== 1) {
					$('.header').addClass('is-hidden');
				} else {
					$('.header').removeClass('is-hidden');
				}

				resetReviewsShowmore();
			}
		};

		$('#fullpage').fullpage(fullPageSettings);

		fullPageResetStyles(winWidth, winHeight);
	}

	function fullPageMoveToAnchor(currentAnchor) {
		$.fn.fullpage.moveTo(currentAnchor);
	}

	function fullPageResetStyles(winWidth, winHeight) {
		if (fullPageWrapper) {
			if (isMobile.any()) {
				if ($('#fullpage').hasClass('fullpage-init')) {
					$.fn.fullpage.destroy('all');
					$('#fullpage').removeClass('fullpage-init');
					$('.header').removeClass('is-hidden');
				}
				return;
			}

			if (winWidth > 1400 && winHeight < 850) {
				if ($('#fullpage').hasClass('fullpage-init')) {
					$.fn.fullpage.destroy('all');
					$('#fullpage').removeClass('fullpage-init');
					$('.header').removeClass('is-hidden');
				}
			} else if (winWidth <= 1400 && winHeight < 710) {
				if ($('#fullpage').hasClass('fullpage-init')) {
					$.fn.fullpage.destroy('all');
					$('#fullpage').removeClass('fullpage-init');
					$('.header').removeClass('is-hidden');
				}
			} else if (winWidth <= 1200) {
				if ($('#fullpage').hasClass('fullpage-init')) {
					$.fn.fullpage.destroy('all');
					$('#fullpage').removeClass('fullpage-init');
					$('.header').removeClass('is-hidden');
				}
			} else {
				if (!$('#fullpage').hasClass('fullpage-init')) {
					$('#fullpage').fullpage(fullPageSettings);
				}
			}
		}
	}
	//=================================================================================================

	// BLOCK TRANSFER =================================================================================
	function blocksTransfer(winWidth) {
		var blogSectionInfo = document.querySelector('.blog-section__info');

		if (blogSectionInfo) {
			var blogSectionInner = document.querySelector('.blog-section__inner');
			var blogSectionContent = document.querySelector('.blog-section__content');

			if (winWidth < 992) {
				blogSectionInner.prepend(blogSectionInfo);
			} else {
				blogSectionContent.prepend(blogSectionInfo);
			}
		}
	}
	blocksTransfer(winWidth);
	//=================================================================================================

	// MENU ===========================================================================================
	var body = document.querySelector('body');
	var menuBurger = document.querySelector('.burger');
	var menuWrapper = document.querySelector('.menu-wrapper');
	var menuList = document.querySelector('.menu-list');
	var hasSubmenu = document.querySelectorAll('.menu .has-submenu');
	var submenus = document.querySelectorAll('.menu .submenu');
	var menuClose = document.querySelector('.menu-close__btn');
	var menuBackBtn = document.querySelector('.menu-back__btn');

	// открываем меню
	menuBurger.addEventListener('click', function () {
		menuWrapper.classList.add('is-open');
		body.classList.add('is-locked-byMenu');
	});

	// закрываем меню
	menuClose.addEventListener('click', menuCloseAndReset);

	// шаг назад
	menuBackBtn.addEventListener('click', function () {
		var openSubmenus = document.querySelectorAll('.menu .submenu.is-open');
		var lastOpenSubmenu = openSubmenus[openSubmenus.length - 1];

		lastOpenSubmenu.classList.remove('is-open');
		if (openSubmenus.length === 1) {
			this.classList.remove('is-active');
		}
		setMenuListHeight();
	});

	// слушаем клик по пункту .has-submenu
	hasSubmenu.forEach(function (el) {
		el.addEventListener('click', function (e) {
			e.stopPropagation();
			var currentSubmenu = this.querySelector('.submenu');

			console.log(currentSubmenu);
			

			currentSubmenu.classList.add('is-open');

			if (!menuBackBtn.classList.contains('is-active')) {
				menuBackBtn.classList.add('is-active');
			}

			setMenuListHeight();
		});
	});

	// задаем высоту активного списка меню, для корректного скрола внутри списка
	function setMenuListHeight() {
		var openSubmenus = document.querySelectorAll('.menu .submenu.is-open');

		if (openSubmenus.length > 0 && openSubmenus.length === 1) {
			var lastOpenSubmenu = openSubmenus[openSubmenus.length - 1];

			lastOpenSubmenu.removeAttribute('style');
			menuList.style.height = menuList.clientHeight + 'px';
			menuList.style.overflowY = 'hidden';
			menuScrollToTop(menuList);
			menuScrollToTop(lastOpenSubmenu);
		} else if (openSubmenus.length > 1) {
			var _lastOpenSubmenu = openSubmenus[openSubmenus.length - 1];
			var lastOpenSubmenuParent = openSubmenus[openSubmenus.length - 2];

			_lastOpenSubmenu.removeAttribute('style');
			lastOpenSubmenuParent.style.height = menuList.clientHeight + 'px';
			lastOpenSubmenuParent.style.overflowY = 'hidden';
			menuScrollToTop(lastOpenSubmenuParent);
		} else {
			menuList.removeAttribute('style');
		}
	}

	// скролим меню в начало списка
	function menuScrollToTop(currentMenuList) {
		currentMenuList.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	// сброс меню до первоначального состояния
	function menuCloseAndReset() {
		menuWrapper.classList.remove('is-open');
		body.classList.remove('is-locked-byMenu');

		setTimeout(function () {
			menuBackBtn.classList.remove('is-active');
			menuList.removeAttribute('style');
			submenus.forEach(function (el) {
				el.classList.remove('is-open');
				el.removeAttribute('style');
			});
		}, 300);
	}
	//=================================================================================================

	// PRICE CHECKBOXES SHOWMORE ======================================================================
	var priceCheckboxesShowmoreBtn = document.querySelector('.price-checkboxes__showmore-btn');
	var priceCheckboxesInner = document.querySelector('.price-checkboxes__inner');

	if (priceCheckboxesShowmoreBtn) {
		priceCheckboxesShowmoreBtn.addEventListener('click', function () {
			var priceCheckboxesInnerHeight = priceCheckboxesInner.scrollHeight;

			this.classList.toggle('is-active');

			if (this.classList.contains('is-active')) {
				this.innerText = 'Скрыть';
				priceCheckboxesInner.style.height = priceCheckboxesInnerHeight + 'px';
			} else {
				this.innerText = 'Показать все';
				priceCheckboxesInner.removeAttribute('style');
			}
		});
	}

	function priceCheckboxesShowmoreReset() {
		if (priceCheckboxesShowmoreBtn) {
			priceCheckboxesShowmoreBtn.classList.remove('is-active');
			priceCheckboxesShowmoreBtn.innerText = 'Показать все';
			priceCheckboxesInner.removeAttribute('style');
		}
	}
	//=================================================================================================

	// PROCESS BLOCK positioning ======================================================================
	var processList = document.querySelector('.process-list');

	if (processList) {
		var processListItems = processList.querySelectorAll('.process-item');

		if (processListItems.length <= 3) {
			processList.classList.add('one-row');
		} else if (processListItems.length === 4) {
			processList.classList.add('four-items');
		} else if (processListItems.length === 5) {
			processList.classList.add('five-items');
		} else if (processListItems.length >= 6) {
			processList.classList.add('max-items');
		}
	}
	//=================================================================================================

	// SLIDERS ========================================================================================
	// PORTFOLIO slider
	var portfolioSliderBlock = document.querySelector('.portfolio-slider');
	var portfolioSlider;

	if (portfolioSliderBlock) {
		var portfolioSwiperArrowPrev = document.querySelector('.portfolio-slider__nav .swiper-arr--prev');
		var portfolioSwiperArrowNext = document.querySelector('.portfolio-slider__nav .swiper-arr--next');
		var portfolioSwiperPages = document.querySelector('.portfolio-slider__nav .swiper-pages');

		portfolioSlider = new Swiper(portfolioSliderBlock, {
			slidesPerView: 2.1,
			spaceBetween: 50,
			speed: 1000,
			freeMode: false,
			loop: true,
			allowTouchMove: true,
			autoHeight: true,
			navigation: {
				nextEl: portfolioSwiperArrowNext,
				prevEl: portfolioSwiperArrowPrev
			},

			pagination: {
				el: portfolioSwiperPages,
				type: 'custom',
				renderCustom: function renderCustom(swiper, current, total) {
					return current + ' из ' + total;
				}
			},

			observer: true,
			observerParents: true,
			watchOverflow: true,
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 10
				},

				370: {
					slidesPerView: 1.2,
					spaceBetween: 18
				},

				576: {
					slidesPerView: 1.4,
					spaceBetween: 25
				},

				768: {
					slidesPerView: 1.4,
					spaceBetween: 25
				},

				992: {
					slidesPerView: 1.6,
					spaceBetween: 50
				},

				1400: {
					slidesPerView: 2.1,
					spaceBetween: 50
				}
			}
		});
	}

	// REVIEWS slider
	var reviewsSliderBlock = document.querySelector('.reviews-slider');
	var reviewsSlider;

	if (reviewsSliderBlock) {
		var reviewsSwiperArrowPrev = document.querySelector('.reviews-slider__nav .swiper-arr--prev');
		var reviewsSwiperArrowNext = document.querySelector('.reviews-slider__nav .swiper-arr--next');
		var reviewsSwiperPages = document.querySelector('.reviews-slider__nav .swiper-pages');

		reviewsSlider = new Swiper(reviewsSliderBlock, {
			slidesPerView: 2.1,
			spaceBetween: 50,
			speed: 1000,
			freeMode: false,
			loop: true,
			allowTouchMove: true,
			autoHeight: true,
			navigation: {
				nextEl: reviewsSwiperArrowNext,
				prevEl: reviewsSwiperArrowPrev
			},

			pagination: {
				el: reviewsSwiperPages,
				type: 'custom',
				renderCustom: function renderCustom(swiper, current, total) {
					return current + ' из ' + total;
				}
			},

			observer: true,
			observerParents: true,
			watchOverflow: true,
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 10
				},

				370: {
					slidesPerView: 1.2,
					spaceBetween: 18
				},

				576: {
					slidesPerView: 1.4,
					spaceBetween: 25
				},

				768: {
					slidesPerView: 1.4,
					spaceBetween: 25
				},

				992: {
					slidesPerView: 1.6,
					spaceBetween: 50
				},

				1400: {
					slidesPerView: 2.1,
					spaceBetween: 50
				}
			}
		});

		reviewsSlider.on('afterInit', reviewsShowmoreInit());
		reviewsSlider.on('slideChange', resetReviewsShowmore);

		reviewsSliderBlock.addEventListener('click', function (e) {
			var targetElement = e.target;

			if (targetElement.classList.contains('reviews-showmore__btn')) {
				var currentShowmore = targetElement.parentNode.querySelector('.reviews-showmore');
				var currentShowmoreFullHeight = currentShowmore.scrollHeight;

				targetElement.classList.toggle('is-open');

				if (targetElement.classList.contains('is-open')) {
					currentShowmore.style.maxHeight = currentShowmoreFullHeight + 'px';
					targetElement.innerText = 'Скрыть';
					reviewsSliderUpdateHeight();
				} else {
					currentShowmore.removeAttribute('style');
					targetElement.innerText = 'Читать далее';
					reviewsSliderUpdateHeight();
				}
			}
		});
	}

	// REVIEWS SHOWMORE ===============================================================================
	function reviewsShowmoreInit() {
		var reviewsShowmoreBlock = document.querySelectorAll('.reviews-showmore');
		var reviewsShowmoreBtnHTML = '<button class="reviews-showmore__btn" type="button">Читать далее</button>';

		if (reviewsShowmoreBlock) {
			reviewsShowmoreBlock.forEach(function (el) {
				var parent = el.parentNode;
				parent.insertAdjacentHTML('beforeend', reviewsShowmoreBtnHTML);
			});

			checkReviewsShowmore();
		}
	}

	function reviewsSliderUpdateHeight() {
		setTimeout(function () {
			reviewsSlider.updateAutoHeight(300);
		}, 310); // таймаут = длительности анимации открытия/закрытия .reviews-showmore
	}

	function checkReviewsShowmore() {
		var reviewsShowmoreBlock = document.querySelectorAll('.reviews-showmore');

		if (reviewsShowmoreBlock) {
			reviewsShowmoreBlock.forEach(function (el) {
				var parent = el.parentNode;
				var reviewsShowmoreBtn = parent.querySelector('.reviews-showmore__btn');

				if (el.clientHeight === el.scrollHeight) {
					reviewsShowmoreBtn.style.display = 'none';
				} else {
					reviewsShowmoreBtn.style.display = 'block';
				}
			});
		}
	}

	function resetReviewsShowmore() {
		var reviewsShowmoreBlock = document.querySelectorAll('.reviews-showmore');

		if (reviewsShowmoreBlock) {
			reviewsShowmoreBlock.forEach(function (el) {
				var parent = el.parentNode;
				var reviewsShowmoreBtn = parent.querySelector('.reviews-showmore__btn');

				el.removeAttribute('style');
				reviewsShowmoreBtn.classList.remove('is-open');
				reviewsShowmoreBtn.innerText = 'Читать далее';

				reviewsSliderUpdateHeight();
			});
		}
	}
	//=================================================================================================

	// POPUP ==========================================================================================
	var popupOpenBtn = document.querySelectorAll('.popup-open-btn');
	var bodyLockPadding = document.querySelectorAll('.body-lock-padding');

	var unlock = true;

	var timeout = 600; // должен совпадать с длительностью анимации в CSS

	if (popupOpenBtn.length > 0) {
		for (var index = 0; index < popupOpenBtn.length; index++) {

			popupOpenBtn[index].addEventListener('click', function (e) {
				var popupName = this.dataset.popupId;
				var currentPopup = document.getElementById(popupName);

				popupOpen(currentPopup);
				e.preventDefault();
			});
		}
	}

	var popupCloseBtn = document.querySelectorAll('.popup-close');
	if (popupCloseBtn.length > 0) {
		for (var index = 0; index < popupCloseBtn.length; index++) {
			var el = popupCloseBtn[index];

			el.addEventListener('click', function (e) {
				e.preventDefault();
				popupClose(this.closest('.popup'));
			});
		}
	}

	function popupOpen(currentPopup) {
		if (currentPopup && unlock) {
			var popupActive = document.querySelector('.popup.is-open');

			if (menuWrapper.classList.contains('is-open')) {
				menuCloseAndReset();
			}

			if (popupActive) {
				popupClose(popupActive, false);
			} else {
				bodyLock();
			}

			currentPopup.classList.add('is-open');
			currentPopup.addEventListener('click', function (e) {
				if (!e.target.closest('.popup-content')) {
					popupClose(e.target.closest('.popup'));
				}
			});
		}
	}

	function popupClose(popupActive) {
		var doUnlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
		if (unlock) {
			popupActive.classList.remove('is-open');

			if (doUnlock) {
				bodyUnlock();
			}
		}
	}

	document.addEventListener('keydown', function (e) {
		if (e.which === 27) {
			var popupActive = document.querySelector('.popup.is-open');
			popupClose(popupActive);
		}
	});

	function bodyLock() {
		var lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

		if (bodyLockPadding.length > 0) {
			for (var index = 0; index < bodyLockPadding.length; index++) {
				var _el = bodyLockPadding[index];

				_el.style.paddingRight = lockPaddingValue;
			}
		}

		body.style.paddingRight = lockPaddingValue;
		body.classList.add('is-locked');

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}

	function bodyUnlock() {
		setTimeout(function () {
			if (bodyLockPadding.length > 0) {
				for (var index = 0; index < bodyLockPadding.length; index++) {
					var _el2 = bodyLockPadding[index];

					_el2.style.paddingRight = '0px';
				}
			}

			body.style.paddingRight = '0px';
			body.classList.remove('is-locked');
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
					else
						node = node.parentElement;
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

	// INPUTMASK ======================================================================================
	Inputmask("+7 (999) 999-99-99").mask(document.querySelectorAll('.form-input--phone'));
	//=================================================================================================

	// INSTAFEED ======================================================================================
	var instagramBlock = document.querySelector('.instagram');

	if (instagramBlock) {
		var instagram = new Instafeed({
			accessToken: 'IGQVJVUDdJa2M5Qy11bmM4NE50cjlXY1ZAZAem1BM1J0RXpRZA0dEV2VzdERrRTdhYlVFVkhFbUNIREdnWDVGZADlRbFl5aWxQTkMyV2dfaEpOMUJOS2gzZAGwzVG55enhMSVNKU1ZAGUk9XT3F1U1JCc25tWQZDZD', // ТОКЕН ТОКЕН ТОКЕН ТОКЕН ТОКЕН ТОКЕН ТОКЕН ТОКЕН ТОКЕН ТОКЕН ТОКЕН ТОКЕН ТОКЕН ТОКЕН ТОКЕН
			limit: 5,
			template: '<a href="{{link}}" class="instagram-item" target="_blank"><img src="{{image}}" alt="{{caption}}"></a>'
		});

		instagram.run();
	}
	//=================================================================================================

	// GOTO - плавная прокурутка к якорю ==============================================================
	var gotoLinks = document.querySelectorAll('[data-goto]');

	if (gotoLinks.length > 0) {
		var onGoToLinkClick = function onGoToLinkClick(e) {
			e.preventDefault();
			var gotoLink = e.target;

			if (gotoLink.dataset.goto && document.querySelector(gotoLink.dataset.goto)) {
				var gotoLinkData = gotoLink.dataset.goto;
				var gotoBlock = document.querySelector(gotoLinkData);
				var gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

				if (menuWrapper.classList.contains('is-open')) {
					menuCloseAndReset();
				}

				window.scrollTo({
					top: gotoBlockValue,
					behavior: 'smooth'
				});

				var fullPageInitWrapper = document.querySelector('.fullpage-init');
				if (fullPageInitWrapper) {
					var currentAnchor = gotoLinkData + '-anc';
					fullPageMoveToAnchor(currentAnchor);
				}
			}
		};

		gotoLinks.forEach(function (gotoLink) {
			gotoLink.addEventListener('click', onGoToLinkClick);
		});
	}

	// polyfill
	! function () {
		"use strict";

		function o() {
			var o = window,
				t = document;
			if (!("scrollBehavior" in t.documentElement.style && !0 !== o.__forceSmoothScrollPolyfill__)) {
				var l, e = o.HTMLElement || o.Element,
					r = 468,
					i = {
						scroll: o.scroll || o.scrollTo,
						scrollBy: o.scrollBy,
						elementScroll: e.prototype.scroll || n,
						scrollIntoView: e.prototype.scrollIntoView
					},
					s = o.performance && o.performance.now ? o.performance.now.bind(o.performance) : Date.now,
					c = (l = o.navigator.userAgent, new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(l) ? 1 : 0);
				o.scroll = o.scrollTo = function () {
					void 0 !== arguments[0] && (!0 !== f(arguments[0]) ? h.call(o, t.body, void 0 !== arguments[0].left ? ~~arguments[0].left : o.scrollX || o.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : o.scrollY || o.pageYOffset) : i.scroll.call(o, void 0 !== arguments[0].left ? arguments[0].left : "object" != _typeof(arguments[0]) ? arguments[0] : o.scrollX || o.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : o.scrollY || o.pageYOffset));
				}, o.scrollBy = function () {
					void 0 !== arguments[0] && (f(arguments[0]) ? i.scrollBy.call(o, void 0 !== arguments[0].left ? arguments[0].left : "object" != _typeof(arguments[0]) ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : h.call(o, t.body, ~~arguments[0].left + (o.scrollX || o.pageXOffset), ~~arguments[0].top + (o.scrollY || o.pageYOffset)));
				}, e.prototype.scroll = e.prototype.scrollTo = function () {
					if (void 0 !== arguments[0])
						if (!0 !== f(arguments[0])) {
							var o = arguments[0].left,
								t = arguments[0].top;
							h.call(this, this, void 0 === o ? this.scrollLeft : ~~o, void 0 === t ? this.scrollTop : ~~t);
						} else {
							if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted");
							i.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != _typeof(arguments[0]) ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop);
						}
				}, e.prototype.scrollBy = function () {
					void 0 !== arguments[0] && (!0 !== f(arguments[0]) ? this.scroll({
						left: ~~arguments[0].left + this.scrollLeft,
						top: ~~arguments[0].top + this.scrollTop,
						behavior: arguments[0].behavior
					}) : i.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop));
				}, e.prototype.scrollIntoView = function () {
					if (!0 !== f(arguments[0])) {
						var l = function (o) {
								for (; o !== t.body && !1 === (e = p(l = o, "Y") && a(l, "Y"), r = p(l, "X") && a(l, "X"), e || r);) {
									o = o.parentNode || o.host;
								}
								var l, e, r;
								return o;
							}(this),
							e = l.getBoundingClientRect(),
							r = this.getBoundingClientRect();
						l !== t.body ? (h.call(this, l, l.scrollLeft + r.left - e.left, l.scrollTop + r.top - e.top), "fixed" !== o.getComputedStyle(l).position && o.scrollBy({
							left: e.left,
							top: e.top,
							behavior: "smooth"
						})) : o.scrollBy({
							left: r.left,
							top: r.top,
							behavior: "smooth"
						});
					} else i.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0]);
				};
			}

			function n(o, t) {
				this.scrollLeft = o, this.scrollTop = t;
			}

			function f(o) {
				if (null === o || "object" != _typeof(o) || void 0 === o.behavior || "auto" === o.behavior || "instant" === o.behavior) return !0;
				if ("object" == _typeof(o) && "smooth" === o.behavior) return !1;
				throw new TypeError("behavior member of ScrollOptions " + o.behavior + " is not a valid value for enumeration ScrollBehavior.");
			}

			function p(o, t) {
				return "Y" === t ? o.clientHeight + c < o.scrollHeight : "X" === t ? o.clientWidth + c < o.scrollWidth : void 0;
			}

			function a(t, l) {
				var e = o.getComputedStyle(t, null)["overflow" + l];
				return "auto" === e || "scroll" === e;
			}

			function d(t) {
				var l, e, i, c, n = (s() - t.startTime) / r;
				c = n = n > 1 ? 1 : n, l = .5 * (1 - Math.cos(Math.PI * c)), e = t.startX + (t.x - t.startX) * l, i = t.startY + (t.y - t.startY) * l, t.method.call(t.scrollable, e, i), e === t.x && i === t.y || o.requestAnimationFrame(d.bind(o, t));
			}

			function h(l, e, r) {
				var c, f, p, a, h = s();
				l === t.body ? (c = o, f = o.scrollX || o.pageXOffset, p = o.scrollY || o.pageYOffset, a = i.scroll) : (c = l, f = l.scrollLeft, p = l.scrollTop, a = n), d({
					scrollable: c,
					method: a,
					startTime: h,
					startX: f,
					startY: p,
					x: e,
					y: r
				});
			}
		}
		"object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = {
			polyfill: o
		} : o();
	}();
};