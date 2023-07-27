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
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  },
};

if (isMobile.any()) {
  document.body.classList.add("_touchscreen");
} else {
  document.body.classList.add("_desktop");
}

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
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

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

// WINDOW EVENTS ==================================================================================
var winWidth = $(window).outerWidth();

$(window).on("resize", debounce(_onResizeWindow, 500));

function _onResizeWindow() {
  winWidth = $(this).outerWidth();

  blocksTransfer(winWidth);
  creditSliderStartOrDestroy(winWidth);
  creditShowMore(winWidth);
  googleMap(winWidth);
}

// BLOCKS TRANSFER (adaptive) =====================================================================
var headerContacts = $(".header-contacts");
var headerContactsDesktopWrapper = $(".header-contacts__desktop-wrapper");
var headerContactsMobileWrapper = $(".header-contacts__mobile-wrapper");

var gallerySliderNav = $(".gallery-slider__nav");
var gallerySliderNavDesktopWrapper = $(".gallery-slider__nav-desktop-wrapper");
var gallerySliderNavMobileWrapper = $(".gallery-slider__nav-mobile-wrapper");

function blocksTransfer(winWidth) {
  if (winWidth < 768) {
    gallerySliderNav.appendTo(gallerySliderNavMobileWrapper);
  } else {
    gallerySliderNav.appendTo(gallerySliderNavDesktopWrapper);
  }

  if (winWidth < 577) {
    headerContacts.appendTo(headerContactsMobileWrapper);
  } else {
    headerContacts.appendTo(headerContactsDesktopWrapper);
  }

  appartmentsItemElementsTransfer(winWidth);
}
blocksTransfer(winWidth);

// APPARTMENTS ITEM ELEMENTS TRANSFER
function appartmentsItemElementsTransfer(winWidth) {
  $(".apartments-item").each(function () {
    var apartmentsItemPrice = $(this).find(".apartments-item__price");
    var apartmentsItemBottomLeft = $(this).find(".apartments-item__bottom-left");

    var apartmentsItemInfoWrapper = $(this).find(".apartments-item__info-wrapper");
    var apartmentsItemInfoMobileWrapper = $(this).find(".apartments-item__info-mobile-wrapper");
    var apartmentsItemTop = $(this).find(".apartments-item__top");

    if (winWidth <= 1400) {
      apartmentsItemPrice.insertAfter(apartmentsItemBottomLeft);
    } else {
      apartmentsItemPrice.appendTo(apartmentsItemBottomLeft);
    }

    if (winWidth < 480) {
      apartmentsItemInfoWrapper.appendTo(apartmentsItemInfoMobileWrapper);
    } else {
      apartmentsItemInfoWrapper.appendTo(apartmentsItemTop);
    }
  });
}

// MENU BURGER ====================================================================================
var menuBurger = $(".menu-burger");
var headerBurger = $(".header-burger");
var sidemenu = $(".sidemenu");
var sidemenuCloseBtn = $(".sidemenu-close");

menuBurger.on("click", function (e) {
  e.preventDefault();
  sidemenu.addClass("is-open");
  $("body").addClass("menu-lock");
});

headerBurger.on("click", function () {
  sidemenu.addClass("is-open");
  $("body").addClass("menu-lock");
});

sidemenuCloseBtn.on("click", function () {
  sidemenu.removeClass("is-open");
  $("body").removeClass("menu-lock");
});

// GO TO ANCHOR ===================================================================================
$(".goto, .menu-list a").on("click", function () {
  var el = $(this).attr("href");
  var offset = -50;
  $("body,html").animate({ scrollTop: $(el).offset().top + offset }, 800);

  if (!$(this).hasClass("goto")) {
    sidemenu.removeClass("is-open");
    $("body").removeClass("menu-lock");
  }
});

// YOUTUBE VIDEO ==================================================================================
function findVideos() {
  var videos = document.querySelectorAll(".video");

  for (var i = 0; i < videos.length; i++) {
    setupVideo(videos[i]);
  }
}

function setupVideo(video) {
  var links = video.querySelectorAll(".video-link");
  var videoPlayer = video.querySelector(".video-player");

  for (var i = 0; i < links.length; i++) {
    var id = parseVideoURL(links[i]);

    links[i].addEventListener("click", function (e) {
      e.preventDefault();
      var iframe = createIframe(id);
      videoPlayer.innerHTML = "";
      videoPlayer.appendChild(iframe);
      videoPlayer.classList.add("is-active");
    });
  }
}

function parseVideoURL(link) {
  var regexp = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/i;
  var url = link.href;
  var match = url.match(regexp);

  return match[1];
}

function createIframe(id) {
  var iframe = document.createElement("iframe");

  iframe.setAttribute("allowfullscreen", "");
  iframe.setAttribute("allow", "autoplay");
  iframe.setAttribute("src", generateURL(id));
  iframe.classList.add("video-iframe");

  return iframe;
}

function generateURL(id) {
  var query = "?rel=0&showinfo=0&autoplay=1";

  return "https://www.youtube.com/embed/" + id + query;
}
findVideos();

// CREDIT NOUISLIDER ==============================================================================
var totalCostSlider = document.querySelector('.credit-controls__item-rangeslider[data-credit-control-id="total-cost"]');
var firstPaymentSlider = document.querySelector('.credit-controls__item-rangeslider[data-credit-control-id="first-payment"]');
var creditTermSlider = document.querySelector('.credit-controls__item-rangeslider[data-credit-control-id="credit-term"]');

var totalCostSettings = {
  start: 15000000,
  step: 5000000,
  connect: [true, false],
  tooltips: false,
  range: {
    min: 5000000,
    max: 40000000,
  },
};

var firstPaymentSettings = {
  start: 10000000,
  step: 5000000,
  connect: [true, false],
  tooltips: false,
  range: {
    min: 5000000,
    max: 30000000,
  },
};

var creditTermSettings = {
  start: 10,
  step: 1,
  connect: [true, false],
  tooltips: false,
  range: {
    min: 1,
    max: 25,
  },
};

noUiSlider.create(totalCostSlider, totalCostSettings);
noUiSlider.create(firstPaymentSlider, firstPaymentSettings);
noUiSlider.create(creditTermSlider, creditTermSettings);

totalCostSlider.noUiSlider.on("update", creditSlidersOnChangeEvents);
firstPaymentSlider.noUiSlider.on("update", creditSlidersOnChangeEvents);
creditTermSlider.noUiSlider.on("update", creditSlidersOnChangeEvents);

function creditSlidersOnChangeEvents(values) {
  var currentSlider = this.target;
  var currentSliderParent = currentSlider.parentNode;
  var currentSliderValueBlock = currentSliderParent.querySelector(".credit-controls__item-value > span");

  currentSliderValueBlock.innerText = priceWithSpaces(parseInt(values));
}

function priceWithSpaces(price) {
  return String(price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
}

// CREDIT OFFERS SHOW MORE + COUNTER ==============================================================
function creditShowMore(winWidth) {
  if (winWidth >= 993 && !$(".credit-content__showmore").hasClass("initialized")) {
    var creditContentShowmoreBtn = $(".credit-content__showmore");
    var creditOffer = $(".credit-offer");
    var creditOffersTotalQuantity = creditOffer.length;

    creditContentShowmoreBtn.addClass("initialized");

    creditContentShowmoreBtn.off("click");
    creditContentShowmoreBtn.on("click", function () {
      $(this).toggleClass("is-active");
      creditOffer.slideDown(400);

      if ($(this).hasClass("is-active")) {
        $(this).text("Скрыть");
        $(".credit-offers__visible-quantity").text(creditOffersTotalQuantity);
      } else {
        $(this).text("Показать больше");
      }

      var creditOfferAdded = $('.credit-offer[style="display: block;"]');
      var creditOfferAddedQuantity = creditOfferAdded.length;
      if (creditOfferAdded.length) {
        creditOfferAdded.slideUp(400);
        $(".credit-offers__visible-quantity").text(creditOffersTotalQuantity - creditOfferAddedQuantity);
      }
    });

    // COUNTER
    if (creditOffersTotalQuantity > 4) {
      $(".credit-offers__visible-quantity").text("4");
    } else {
      $(".credit-offers__visible-quantity").text(creditOffersTotalQuantity);
    }

    $(".credit-offers__total-quantity").text(creditOffersTotalQuantity);
  }
}
creditShowMore(winWidth);

// SLIDERS ========================================================================================
var sliderArrrowPrev = `
	<svg viewBox="0 0 8 12">
		<path d="M-2.62268e-07 6L7.5 0.803848L7.5 11.1962L-2.62268e-07 6Z" fill="currentColor"/>
	</svg>
`;

var sliderArrrowNext = `
	<svg viewBox="0 0 8 12">
		<path d="M8 6L0.5 0.803848L0.499999 11.1962L8 6Z" fill="currentColor"/>
	</svg>
`;

// GALLERY SLIDER
sliderCounter($(".gallery-slider"));

$(".gallery-slider").owlCarousel({
  lazyLoad: false,
  dots: false,
  nav: true,
  navContainer: $(".gallery-slider__nav"),
  navText: [sliderArrrowPrev, sliderArrrowNext],
  stagePadding: 0,
  center: false,
  startPosition: 0,
  loop: true,
  smartSpeed: 400,
  autoplay: false,
  autoplayTimeout: 5000,
  autoplayHoverPause: true,
  slideTransition: "linear",
  mouseDrag: true,
  touchDrag: true,
  responsiveRefreshRate: 800,
  responsive: {
    0: {
      items: 2,
      margin: 16,
    },
    768: {
      items: 3,
      margin: 34,
    },
  },
});

// CREDIT SLIDER
var creditSlider = $(".credit-slider");
var creditSliderSettings = {
  lazyLoad: false,
  dots: false,
  nav: true,
  navContainer: $(".credit-slider__nav-arrows"),
  navText: [sliderArrrowPrev, sliderArrrowNext],
  margin: 10,
  stagePadding: 1,
  center: false,
  startPosition: 0,
  loop: true,
  smartSpeed: 400,
  autoplay: false,
  autoplayTimeout: 5000,
  autoplayHoverPause: true,
  slideTransition: "linear",
  mouseDrag: true,
  touchDrag: true,
  responsiveRefreshRate: 800,
  responsive: {
    0: {
      items: 2,
    },
    768: {
      items: 3,
    },
  },
};

function creditSliderStartOrDestroy(winWidth) {
  if (winWidth < 993 && !creditSlider.hasClass("owl-loaded")) {
    sliderCounter(creditSlider);
    creditSlider.owlCarousel(creditSliderSettings);
  } else if (winWidth >= 993 && creditSlider.hasClass("owl-loaded")) {
    creditSlider.trigger("destroy.owl.carousel");
  }
}
creditSliderStartOrDestroy(winWidth);

// POPUP-DETAILS SLIDER
var popupDetailsSlider = $(".popup-details__slider");

popupDetailsSlider.owlCarousel({
  dots: false,
  nav: true,
  navText: [sliderArrrowPrev, sliderArrrowNext],
  stagePadding: 0,
  center: false,
  startPosition: 0,
  loop: false,
  smartSpeed: 400,
  autoplay: false,
  slideTransition: "linear",
  mouseDrag: true,
  touchDrag: true,
  items: 1,
  responsiveRefreshRate: 800,
});

popupDetailsSlider.on("changed.owl.carousel", function (event) {
  var currentIndex = event.property.value;

  $(".popup-details__slider-nav .owl-item").each(function () {
    if ($(this).index() === currentIndex) {
      $(this).addClass("choosen");
    } else {
      $(this).removeClass("choosen");
    }
  });
  popupDetailsSliderNav.trigger("to.owl.carousel", [currentIndex, 300]);
});

// POPUP-DETAILS NAVIGATION SLIDER
var popupDetailsSliderNav = $(".popup-details__slider-nav");

popupDetailsSliderNav.owlCarousel({
  dots: false,
  nav: false,
  stagePadding: 0,
  center: false,
  startPosition: 0,
  loop: false,
  smartSpeed: 400,
  autoplay: false,
  slideTransition: "linear",
  mouseDrag: true,
  touchDrag: true,
  responsiveRefreshRate: 800,
  responsive: {
    0: {
      items: 3,
      margin: 5,
    },
    577: {
      items: 4,
      margin: 10,
    },
    1150: {
      items: 4,
      margin: 20,
    },
  },
});

$(".popup-details__slider-nav .owl-item:first").addClass("choosen");

$(".popup-details__slider-nav .owl-item").each(function () {
  var currentIndex = $(this).index();

  $(this).on("click", function () {
    $(".popup-details__slider-nav .owl-item").removeClass("choosen");
    $(this).addClass("choosen");
    popupDetailsSlider.trigger("to.owl.carousel", [currentIndex, 300]);
  });
});

// СЧЕТЧИК КОЛИЧЕСТВА СЛАЙДОВ
function sliderCounter(slider) {
  slider.on("initialized.owl.carousel", function (event) {
    var totalSlidesCounter = $(this).parent().find(".slider-counter__total");
    var totalSlidesQuantity = event.item.count;

    totalSlidesCounter.text(totalSlidesQuantity);
  });

  slider.on("changed.owl.carousel", function (event) {
    var currentSlideCounter = $(this).parent().find(".slider-counter__current");
    var clonedSlidesQuantity = $(this).find(".cloned").length / 2;
    var currentSlideIndex = event.item.index;
    var totalSlidesQuantity = event.item.count;
    var currentIndex = currentSlideIndex - clonedSlidesQuantity + 1;

    if (currentIndex > totalSlidesQuantity) {
      currentSlideCounter.text("1");
    } else if (currentIndex === 0) {
      currentSlideCounter.text(totalSlidesQuantity);
    } else {
      currentSlideCounter.text(currentIndex);
    }
  });
}

// GALLERY ========================================================================================
baguetteBox.run(".baguettebox-gallery");

// PHONE INPUT MASK (maskedinput) =================================================================
$.each($('input[type="tel"]'), function () {
  $(this).mask("+38 (999) 999-99-99");
});

// POPUPs =========================================================================================
var body = $("body");
var bodyLockPadding = $(".body-lock-padding");
var popupStartBtn = $(".popup-start-btn");

var timeout = 400; // должен совпадать с длительностью анимации закрытия/открытия поп-апап в CSS
var unlock = true;

popupStartBtn.on("click", function (e) {
  e.preventDefault();
  var currentPopup = "#" + $(this).data("popup-id");

  popupOpen(currentPopup);
});

function popupOpen(currentPopup) {
  if ($(currentPopup).length && unlock) {
    $(".popup.is-open").removeClass("is-open");

    $(currentPopup).addClass("is-open");
    bodyLockPopup();
  }
}

$(".popup").on("mouseup", function (e) {
  var popupContent = $(this).find(".popup-content");

  if (!$(e.target).is(popupContent) && popupContent.has(e.target).length === 0) {
    popupClose();
  }
});

$(".popup-close").on("click", function (e) {
  e.preventDefault();
  popupClose();
});

$(document).on("keydown", function (e) {
  if (e.which == 27) {
    popupClose();
  }
});

function popupClose() {
  if (unlock) {
    $(".popup.is-open").removeClass("is-open");
    bodyUnlockPopup();
  }
}

function bodyLockPopup() {
  var lockPaddingValue = $(window).outerWidth() - $(".wrapper").width() + "px";

  if (bodyLockPadding.length > 0) {
    bodyLockPadding.each(function () {
      $(this).css("padding-right", lockPaddingValue);
    });
  }

  body.attr("data-scroll", $(window).scrollTop());
  body.css("padding-right", lockPaddingValue);
  body.addClass("lock");

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
        $(this).css("padding-right", "0px");
      });
    }

    body.css("padding-right", "0px");
    body.removeClass("lock");

    unlock = true;
  }, timeout);
  $("html, body").animate({ scrollTop: parseInt(body.attr("data-scroll")) }, 10);
}

// GSAP ANIMATION =================================================================================
// HEADER
window.onload = function () {
  $(".preloader").addClass("hidden");

  var headerTimeline = gsap.timeline({
    delay: 1,
    onComplete: headerMapDotsPulse,
  });
  headerTimeline.from(".header-title", {
    x: -100,
    opacity: 0,
    duration: 0.6,
    ease: "none",
  });
  headerTimeline.from(".header-txt", {
    x: -100,
    opacity: 0,
    duration: 0.6,
    ease: "none",
  });
  headerTimeline.from(".header-top", {
    y: -100,
    opacity: 0,
    duration: 0.6,
    ease: "none",
  });
  headerTimeline.from(".header-bottom", { y: 100, opacity: 0, duration: 0.6, ease: "none" }, 1.2);
  headerTimeline.from(".header-map__mark", {
    scale: 0,
    opacity: 0,
    duration: 0.6,
    stagger: 0.3,
    ease: "none",
  });
};

function headerMapDotsPulse() {
  $(".header-map__mark .dot").each(function () {
    $(this).addClass("dot-animate");
  });
}

// OTHER BLOCKS
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".gs-animate").forEach(function (elem) {
    ScrollTrigger.create({
      trigger: elem,
      start: "top bottom-=15%",
      onEnter() {
        elem.classList.add("is-active");
      },
      onLeaveBack() {
        elem.classList.remove("is-active");
      },
    });
  });

  gsap.utils.toArray(".gs-animate-footer").forEach(function (elem) {
    ScrollTrigger.create({
      trigger: elem,
      start: "top bottom",
      onEnter() {
        elem.classList.add("is-active");
      },
      onLeaveBack() {
        elem.classList.remove("is-active");
      },
    });
  });
});

// GOOGLE MAP ====================================================================================
var map = $(".map");
var googleMapActivated = false;

function googleMap(winWidth) {
  if (winWidth < 768) {
    removeGoogleMap();
    googleMapActivated = false;
  } else {
    $(window).on("scroll", function () {
      if (googleMapActivated === false) {
        googleMapActivated = true;
        addGoogleMap();
      }

      $(window).off("scroll");
    });
  }
}
googleMap(winWidth);

function addGoogleMap() {
  setTimeout(function () {
    console.log("Activate GoogleMap");

    map.html(
      '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d81729.70608935713!2d14.664099615734601!3d50.1975343521142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470bf1b1862b292b%3A0x3cb61d126d9b9bd!2zU3RhcsOhIEJvbGVzbGF2LCAyNTAgMDEg0JHRgNCw0L3QtNC40YEt0L3QsNC0LdCb0LDQsdC10Lwt0KHRgtCw0YDQsC3QkdC-0LvQtdGB0LvQsNCyLCDQp9C10YXQuNGP!5e0!3m2!1sru!2sua!4v1679920821392!5m2!1sru!2sua" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    );
  }, 1000);
}

function removeGoogleMap() {
  map.html("");
}
