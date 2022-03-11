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
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
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
  };
}
//=================================================================================================

// WINDOW EVENTS ==================================================================================
var winWidth = $(window).outerWidth();

$(window).on("resize", debounce(_onResizeWindow, 500));

function _onResizeWindow() {
  winWidth = $(this).outerWidth();

  blocksTransfer(winWidth);
}
//=================================================================================================

// DOCUMENT CLICK =================================================================================
$(document).on("click", function (e) {
  var target = e.target;

  // if (isMobile.any()) {
  // 	closeOpenedBurgerMenu_touchscreen(target);
  // } else {
  // 	closeOpenedBurgerMenu_desktop(target);
  // }
  closeOpenedBurgerMenu(target);

  closeActiveCardFilter(target);
});
//=================================================================================================

// BLOCKS TRANSFER (adaptive) =====================================================================
var headerMenuList = $(".header-menu__list");
var headerMenuListDesktopWrapper = $(".header-menu");
var headerMenuListMobileWrapper = $(".mobile-menu__body");

var headerContacts = $(".header-contacts").clone();
var headerBtn = $(".header-btn");
var headerBottom = $(".header-bottom");
var mobileMenuBottom = $(".mobile-menu__bottom");

function blocksTransfer(winWidth) {
  if (winWidth <= 768) {
    headerMenuList.appendTo(headerMenuListMobileWrapper);
    headerBtn.appendTo(mobileMenuBottom);
    mobileMenuBottom.prepend(headerContacts);
  } else {
    headerMenuList.appendTo(headerMenuListDesktopWrapper);
    headerBtn.appendTo(headerBottom);
  }
}
blocksTransfer(winWidth);
//=================================================================================================

// GOTO (плавный скролл к якорю) ==================================================================
$(".goto").on("click", function () {
  var el = $(this).attr("href");
  var offset = 0;

  $("body,html").animate({ scrollTop: $(el).offset().top + offset }, 500, function () {});
});
//=================================================================================================

// MENU BURGER ====================================================================================
// if (isMobile.any()) {
// 	$('.header-burger').on('touchstart', function () {
// 		$(this).toggleClass('is-active');
// 		$('.header').toggleClass('is-active');
// 		$('.burger-menu').slideToggle(300).toggleClass('is-open');
// 	});
// } else {
// 	$('.header-burger').on('click', function () {
// 		$(this).toggleClass('is-active');
// 		$('.header').toggleClass('is-active');
// 		$('.burger-menu').slideToggle(300).toggleClass('is-open');
// 	});

// 	$('.header-burger').on('mouseenter', function () {
// 		if (!$(this).hasClass('is-active')) {
// 			$(this).toggleClass('is-active');
// 			$('.header').toggleClass('is-active');
// 			$('.burger-menu').slideToggle(300).toggleClass('is-open');
// 		}
// 	});

// 	$(document).on('mouseleave', '.burger-menu.is-open', function () {
// 		$(this).slideUp(300).removeClass('is-open');
// 		$('.header-burger').removeClass('is-active');
// 		$('.header').removeClass('is-active');
// 	});
// }

$(".header-burger").on("click", function () {
  $(this).toggleClass("is-active");
  $(".header").toggleClass("is-active");
  $(".burger-menu").slideToggle(300).toggleClass("is-open");
});

if (!isMobile.any()) {
  $(".header-burger").on("mouseenter", function () {
    if (!$(this).hasClass("is-active")) {
      $(this).toggleClass("is-active");
      $(".header").toggleClass("is-active");
      $(".burger-menu").slideToggle(300).toggleClass("is-open");
    }
  });

  $(document).on("mouseleave", ".burger-menu.is-open", function () {
    $(this).slideUp(300).removeClass("is-open");
    $(".header-burger").removeClass("is-active");
    $(".header").removeClass("is-active");
  });
}

// закрываем burger-menu (при клике по документу)
function closeOpenedBurgerMenu(target) {
  var openedBurgerMenu = $(".burger-menu.is-open");
  var activeHeaderBurger = $(".header-burger.is-active");

  if (openedBurgerMenu.length > 0) {
    if (!$(target).is(openedBurgerMenu) && openedBurgerMenu.has(target).length === 0 && !$(target).is(activeHeaderBurger) && activeHeaderBurger.has(target).length === 0) {
      openedBurgerMenu.slideUp(300).removeClass("is-open");
      $(".header-burger.is-active").removeClass("is-active");
      $(".header").removeClass("is-active");
    }
  }
}

// закрываем burger-menu (при клике по документу) - для десктопа
// function closeOpenedBurgerMenu_desktop(target) {
// 	var openedBurgerMenu = $('.burger-menu.is-open');

// 	if (openedBurgerMenu.length > 0) {
// 		if (!$(target).is(openedBurgerMenu) && openedBurgerMenu.has(target).length === 0) {
// 			openedBurgerMenu.slideUp(300).removeClass('is-open');
// 			$('.header-burger.is-active').removeClass('is-active');
// 			$('.header').removeClass('is-active');
// 		}
// 	}
// }

// закрываем burger-menu (при клике по документу) - для тачскринов
// function closeOpenedBurgerMenu_touchscreen(target) {
// 	var openedBurgerMenu = $('.burger-menu.is-open');
// 	var activeHeaderBurger = $('.header-burger.is-active');

// 	if (openedBurgerMenu.length > 0) {
// 		if (!$(target).is(openedBurgerMenu)
// 			&& openedBurgerMenu.has(target).length === 0
// 			&& !$(target).is(activeHeaderBurger)
// 			&& activeHeaderBurger.has(target).length === 0
// 		) {
// 			openedBurgerMenu.slideUp(300).removeClass('is-open');
// 			$('.header-burger.is-active').removeClass('is-active');
// 			$('.header').removeClass('is-active');
// 		}
// 	}
// }
//=================================================================================================

// MENU MOBILE ====================================================================================
$(".mobile-burger").on("click", function () {
  $(".mobile-menu").addClass("is-open");
  $("body").addClass("is-locked--byMenu");
});

$(".mobile-menu__close").on("click", function () {
  $(".mobile-menu").removeClass("is-open");
  $("body").removeClass("is-locked--byMenu");
});
//=================================================================================================

// SELECT STYLING =================================================================================
$(".select-original").each(function () {
  var currentSelect = $(this);
  var currentOptionName = currentSelect.find("option:selected").text();
  var selectOption = currentSelect.find("option");
  var selectOptionLength = selectOption.length;

  // длительность анимации
  var duration = 300;

  currentSelect.hide();

  currentSelect.wrap('<div class="select-wrapper"></div>');

  $("<div>", {
    class: "select-fake",
    html: '<span class="select-fake__label">' + currentOptionName + "</span>",
  }).insertAfter(currentSelect);
  var selectFake = currentSelect.next(".select-fake");

  $("<ul>", { class: "select-list" }).insertAfter(selectFake);
  var selectList = selectFake.next(".select-list");

  for (var i = 0; i < selectOptionLength; i++) {
    if (selectOption.eq(i).attr("selected")) {
      $("<li>", {
        class: "select-item is-selected",
        html: $("<span>", {
          text: selectOption.eq(i).text(),
        }),
      })
        .attr("data-value", selectOption.eq(i).val())
        .appendTo(selectList);
    } else {
      $("<li>", {
        class: "select-item",
        html: $("<span>", {
          text: selectOption.eq(i).text(),
        }),
      })
        .attr("data-value", selectOption.eq(i).val())
        .appendTo(selectList);
    }
  }

  selectList.slideUp(0);

  selectFake.on("click", function () {
    if (!$(this).hasClass("on")) {
      $(this).addClass("on");
      selectList.slideDown(duration);

      var selectItem = selectList.find("li");

      selectItem.off("mouseup", function () {});
      selectItem.on("mouseup", function () {
        var choosenItemValue = $(this).data("value");

        selectItem.removeClass("is-selected");
        $(this).addClass("is-selected");

        currentSelect.val(choosenItemValue).change();
        selectFake.find(".select-fake__label").text($(this).find("span").text());
        selectList.slideUp(duration);
        selectFake.removeClass("on");
      });
    } else {
      $(this).removeClass("on");
      selectList.slideUp(duration);
    }
  });
});
//=================================================================================================

// CATALOG SELECT =================================================================================
$(".catalog-select .select-original").on("change", function () {
  $(this).parents("form").submit();
});
//=================================================================================================

// TABS ===========================================================================================
var tabsNavBtn = $(".tabs-btn");

if (tabsNavBtn.length > 0) {
  tabsNavBtn.on("click", function () {
    if (!$(this).hasClass("is-active")) {
      var currentFilterID = $(this).data("filter-id");
      var parent = $(this).parents(".tabs");

      parent.find(".tabs-item").slideUp(300);

      setTimeout(function () {
        parent.find(".tabs-item").removeClass("is-active");
        parent.find('.tabs-item[data-filter-id="' + currentFilterID + '"]').slideDown(300);
      }, 400);

      parent.find(".tabs-btn").removeClass("is-active");
      $(this).addClass("is-active");
    }
  });
}
//=================================================================================================

// MASKEDINPUT ====================================================================================
$.each($('input[type="tel"]'), function () {
  $(this).mask("+375 (99) 999-99-99");
});
//=================================================================================================

// BAGUETTEBOX GALLERY ============================================================================
if ($(".baguettebox-gallery").length > 0) {
  baguetteBox.run(".baguettebox-gallery");
}
//=================================================================================================

// SLIDERS ========================================================================================
// SERVICE-VIEWS SLIDER
if ($(".service-views__slider").length > 0) {
  sliderCounter($(".service-views__slider"));

  $(".service-views__slider").owlCarousel({
    dots: false,
    nav: true,
    navContainer: $(".service-views__slider-nav"),
    navText: ["", ""],
    stagePadding: 0,
    autoHeight: true,
    center: false,
    startPosition: 0,
    loop: true,
    smartSpeed: 300,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    slideTransition: "linear",
    mouseDrag: true,
    touchDrag: true,
    responsiveRefreshRate: 800,
    responsive: {
      0: {
        items: 1,
        margin: 0,
      },
      768: {
        items: 2,
        margin: 15,
      },
      1250: {
        items: 3,
        margin: 30,
      },
    },
  });
}
//=================================================

// SERVICE-GALLERY SLIDER
if ($(".service-gallery__slider").length > 0) {
  sliderCounter($(".service-gallery__slider"));

  $(".service-gallery__slider").owlCarousel({
    dots: false,
    nav: true,
    navContainer: $(".service-gallery__slider-nav"),
    navText: ["", ""],
    stagePadding: 0,
    center: false,
    startPosition: 0,
    loop: true,
    smartSpeed: 300,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    slideTransition: "linear",
    mouseDrag: true,
    touchDrag: true,
    responsiveRefreshRate: 800,
    responsive: {
      0: {
        items: 1,
        margin: 0,
      },
      480: {
        items: 2,
        margin: 15,
      },
      993: {
        items: 3,
        margin: 30,
      },
    },
  });
}
//=================================================

// SHOP-SLIDER
if ($(".shop-slider").length > 0) {
  sliderCounter($(".shop-slider"));

  $(".shop-slider").owlCarousel({
    dots: false,
    nav: true,
    navContainer: $(".shop-slider__nav"),
    navText: ["", ""],
    stagePadding: 0,
    center: false,
    startPosition: 0,
    loop: true,
    smartSpeed: 300,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    slideTransition: "linear",
    mouseDrag: true,
    touchDrag: true,
    responsiveRefreshRate: 800,
    responsive: {
      0: {
        items: 1,
        margin: 0,
      },
      480: {
        items: 2,
        margin: 15,
      },
      993: {
        items: 3,
        margin: 38,
      },
    },
  });
}
//=================================================

// CARD-SLIDER
var cardSlider = $(".card-slider");
var cardNavSlider = $(".card__nav-slider");

if (cardSlider.length > 0) {
  cardSlider.owlCarousel({
    dots: false,
    nav: false,
    stagePadding: 0,
    center: false,
    startPosition: 0,
    loop: false,
    smartSpeed: 300,
    autoplay: false,
    slideTransition: "linear",
    mouseDrag: false,
    touchDrag: false,
    items: 1,
    responsiveRefreshRate: 800,
  });

  cardNavSlider.owlCarousel({
    dots: false,
    nav: true,
    navText: ["", ""],
    margin: 9,
    stagePadding: 0,
    center: false,
    startPosition: 0,
    loop: false,
    smartSpeed: 300,
    autoplay: false,
    slideTransition: "linear",
    mouseDrag: true,
    touchDrag: true,
    responsiveRefreshRate: 800,
    responsive: {
      0: {
        items: 2,
      },
      577: {
        items: 3,
      },
      768: {
        items: 4,
      },
    },
  });

  // выделяем 1й слайд
  $(".card__nav-slider .owl-item:first").addClass("choosen");

  // отслеживаем клик по слайдам и перелистываем главный слайдер
  $(".card__nav-slider .owl-item").each(function () {
    var currentIndex = $(this).index();

    $(this).on("click", function () {
      $(".card__nav-slider .owl-item").removeClass("choosen");
      $(this).addClass("choosen");
      cardSlider.trigger("to.owl.carousel", [currentIndex, 300]);
    });
  });
}
//=================================================

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
//=================================================================================================

// POP-UP =========================================================================================
var body = $("body");
var bodyLockPadding = $(".body-lock-padding");
var popupOpenBtn = $(".popup-open-btn");

var timeout = 600; // должен совпадать с длительностью анимации закрытия/открытия поп-апап в CSS
var unlock = true;

popupOpenBtn.on("click", function (e) {
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

//===============================================
function bodyLockPopup() {
  var lockPaddingValue = $(window).outerWidth() - $(".wrapper").width() + "px";

  if (bodyLockPadding.length > 0) {
    bodyLockPadding.each(function () {
      $(this).css("padding-right", lockPaddingValue);
    });
  }

  body.attr("data-scroll", $(window).scrollTop());
  body.css("padding-right", lockPaddingValue);
  body.addClass("is-locked");

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
    body.removeClass("is-locked");

    unlock = true;
  }, timeout);
  $("html, body").animate({ scrollTop: parseInt(body.attr("data-scroll")) }, 10);
}
//=================================================================================================

// CARD FILTERS ===================================================================================
var card = $(".card");

// открываем определенный card-filter__list
$(".card-filter--clickable").on("click", function () {
  var parent = $(this).parent();
  var currentFilterList = parent.find(".card-filter__list");

  if (!$(this).hasClass("is-active")) {
    $(".card-filter").removeClass("is-active");
    $(".card-filter__list").removeClass("is-active");
    $(this).addClass("is-active");
    currentFilterList.addClass("is-active");
  } else {
    $(this).toggleClass("is-active");
    currentFilterList.toggleClass("is-active");
  }
});

// изменияем card-filter__title's и card-price на старте, в зависимости от выбранных input-radio в card-filter__list
$(".card-filter__list-radio").each(function () {
  if ($(this).is(":checked")) {
    checkedCardFilterRadio($(this));

    if (!card.hasClass("card--fixedPrice")) {
      changeCardPrice($(this));
    }
  }
});

// отслеживаем изменение значения input-radio в card-filter__list
$(".card-filter__list-radio").on("change", function () {
  checkedCardFilterRadio($(this));
  setInputHiddenValue();
});

// подставляем в card-filter__title значение выбранного input-radio и закрываем всплывающий список
function checkedCardFilterRadio(currentInput) {
  var currentInutValue = currentInput.val();
  var parent = currentInput.parents(".card-filters__col");
  var parentFilterItem = currentInput.parent();
  var parentFilterList = currentInput.parents(".card-filter__list");
  var currentFilter = parent.find(".card-filter");
  var currentFilterImg = currentFilter.find(".card-filter__img");
  var currentFilterTitle = currentFilter.find(".card-filter__title");

  currentFilter.removeClass("is-active");
  parentFilterList.removeClass("is-active");
  currentFilterTitle.text(currentInutValue);

  if (currentFilterImg.length > 0) {
    var currentFilterListItemImg = parentFilterItem.find(".card-filter__list-item-img").html();
    currentFilterImg.html(currentFilterListItemImg);
  }

  if (!card.hasClass("card--fixedPrice")) {
    changeCardPrice(currentInput);
  }
}

// изменям card-price в зависимости от выбранного input-radio в card-filter__list
function changeCardPrice(currentInput) {
  if (currentInput.data("filter-size") || currentInput.data("filter-price")) {
    var cardPrice = $(".card-price > span");
    var currentFilterSize = $('.card-filter__list-radio[name="card-size"]:checked').data("filter-size");
    var currentFilterPrice = parseInt($('.card-filter__list-radio[name="card-material"]:checked').data("filter-price"));

    cardPrice.text(parseInt(eval(currentFilterSize) * currentFilterPrice));
  }
}

// отслеживаем изменение значения textarea в card-filter__list
$(".card-filter__list-textarea").on("keyup", function () {
  var currentTextareaValue = $(this).val();
  var parent = $(this).parents(".card-filters__col");
  var parentFilterList = $(this).parents(".card-filter__list");
  var currentFilter = parent.find(".card-filter");
  var currentFilterTitle = currentFilter.find(".card-filter__title");

  if (currentTextareaValue == "") {
    $(this).removeClass("is-not-empty");
  } else {
    $(this).addClass("is-not-empty");
  }

  if (parentFilterList.find(".card-filter__list-textarea.is-not-empty").length > 0) {
    currentFilterTitle.addClass("delete-btn").text("Удалить");
  } else {
    currentFilterTitle.removeClass("delete-btn").text("Добавить");
  }

  setInputHiddenValue();
});

// очищаем значения textarea в card-filter__list
$(".card-filter__title").on("click", function () {
  if ($(this).hasClass("delete-btn")) {
    var parent = $(this).parents(".card-filters__col");
    var currentTextareas = parent.find(".card-filter__list-textarea");

    currentTextareas.val("");
    $(this).removeClass("delete-btn").text("Добавить");
    setInputHiddenValue();
  }
});

// закрываем card-filter__list (при клике по документу)
function closeActiveCardFilter(target) {
  var openedCardFilter = $(".card-filter--clickable.is-active");
  var openedCardFilterList = $(".card-filter__list.is-active");

  if (openedCardFilter.length > 0) {
    if (!$(target).is(openedCardFilter) && openedCardFilter.has(target).length === 0 && !$(target).is(openedCardFilterList) && openedCardFilterList.has(target).length === 0) {
      openedCardFilter.removeClass("is-active");
      openedCardFilterList.removeClass("is-active");
    }
  }
}

// присваиваем скрытым инпутам соответствующие значения
function setInputHiddenValue() {
  var pageUrlInput = $('input[name="page-url"]');
  var finalCardTitleInput = $('input[name="final-card-title"]');
  var finalCardPriceInput = $('input[name="final-card-price"]');
  var finalCardSizeInput = $('input[name="final-card-size"]');
  var finalCardMaterialInput = $('input[name="final-card-material"]');
  var finalCardTxtLeft = $('input[name="final-card-inscription-left"]');
  var finalCardTxtRight = $('input[name="final-card-inscription-right"]');

  var cardFilterSizeChecked = $('.card-filter__list-radio[name="card-size"]:checked');
  var cardFilterMaterialChecked = $('.card-filter__list-radio[name="card-material"]:checked');
  var cardTextareaInscriptionLeft = $('.card-filter__list-textarea[name="insсription-left"]');
  var cardTextareaInscriptionRight = $('.card-filter__list-textarea[name="insсription-right"]');

  if (pageUrlInput.length > 0) {
    pageUrlInput.val($(location).attr("href"));
  }

  if (finalCardTitleInput.length > 0) {
    finalCardTitleInput.val($(".card-title").text());
  }

  if (finalCardPriceInput.length > 0) {
    finalCardPriceInput.val($(".card-price > span").text() + " руб.");
  }

  if (cardFilterSizeChecked.length > 0) {
    finalCardSizeInput.val(cardFilterSizeChecked.val());
  }

  if (cardFilterMaterialChecked.length > 0) {
    finalCardMaterialInput.val(cardFilterMaterialChecked.val());
  }

  if (cardTextareaInscriptionLeft.length > 0) {
    finalCardTxtLeft.val(cardTextareaInscriptionLeft.val());
  }

  if (cardTextareaInscriptionRight.length > 0) {
    finalCardTxtRight.val(cardTextareaInscriptionRight.val());
  }
}
setInputHiddenValue();
//=================================================================================================

// CARD INFO BTN ==================================================================================
$(".card-info__btn[data-filter-id]").on("click", function (e) {
  e.preventDefault();
  var currentFilterID = $(this).data("filter-id");
  var currentAboutNavBtn = $('.card-about__nav-btn[data-filter-id="' + currentFilterID + '"]');

  if (currentAboutNavBtn.length > 0) {
    currentAboutNavBtn.click();
  }
});
//=================================================================================================

// MAP ============================================================================================
if ($("#map").length > 0) {
  var map;
  var mapCenter;
  var mapCoords = [];
  var mapZoom = 10;
  var mapNavItems = document.querySelectorAll(".map-nav__item");
  var mapNavBtns = document.querySelectorAll(".map-nav__item-btn");

  // получаем все координаты для карты
  for (var mapNavItem of mapNavItems) {
    var currentCoords = mapNavItem.dataset.mapCoords;
    var currentCoordsArr = currentCoords.split(", ");

    if (mapNavItem.classList.contains("is-active")) {
      mapCenter = currentCoordsArr;
    } else {
      mapCoords.push(currentCoordsArr);
    }
  }

  // смена центра карты при клике на кнопку
  for (var mapNavBtn of mapNavBtns) {
    mapNavBtn.addEventListener("click", function () {
      var parentItem = this.closest(".map-nav__item");

      if (!parentItem.classList.contains("is-active")) {
        var currentItemCoords = parentItem.dataset.mapCoords;
        var currentItemCoordsArr = currentItemCoords.split(",");

        map.setCenter(currentItemCoordsArr, mapZoom);

        mapNavItems.forEach(function (curentItem) {
          curentItem.classList.remove("is-active");
        });

        parentItem.classList.add("is-active");
      }
    });
  }

  // смена центра карты ( SHOPS-ITEM )
  var shopsItemWatchmapLinks = document.querySelectorAll(".shops-item__watchmap-link");

  for (var shopsItemWatchmapLink of shopsItemWatchmapLinks) {
    shopsItemWatchmapLink.addEventListener("click", function (e) {
      e.preventDefault();
      var currentItemCoords = this.dataset.mapCoords;
      var currentItemCoordsArr = currentItemCoords.split(", ");
      var currentMapNavItem = document.querySelector('.map-nav__item[data-map-coords="' + currentItemCoords + '"]');

      map.setCenter(currentItemCoordsArr, mapZoom);

      if (currentMapNavItem) {
        mapNavItems.forEach(function (curentItem) {
          curentItem.classList.remove("is-active");
        });
        currentMapNavItem.classList.add("is-active");

        $(".map-nav .simplebar-content-wrapper").animate({ scrollTop: currentMapNavItem.offsetTop }, 500);
      }
    });
  }

  // загружаем карту (для страницы Магазины - сразу, для остальных - при скроле)
  if (document.querySelector(".shops")) {
    loadYandexMap();
  } else {
    function mapLoader() {
      console.log("loading YandexMap");

      window.removeEventListener("scroll", mapLoader);
      loadYandexMap();
    }
    window.addEventListener("scroll", mapLoader);
  }

  // создаем скрипт карты
  function loadYandexMap() {
    var script = document.createElement("script");

    script.type = "text/javascript";
    script.src = "https://api-maps.yandex.ru/2.1/?apikey=СЮДА_ВСТАВЛЯЕМ_СВОЙ_API_КЛЮЧ&lang=ru_RU"; // <<< СЮДА ВСТАВИТЬ СВОЙ КЛЮЧ !!!
    script.onload = startYandexMap;

    document.getElementById("map").appendChild(script);
  }

  // настройки карты
  function startYandexMap() {
    ymaps.ready(function () {
      (map = new ymaps.Map(
        "map",
        {
          controls: [],
          center: mapCenter,
          zoom: mapZoom,
        },
        {
          searchControlProvider: "yandex#search",
        }
      )),
        // разворот на весь экран
        (fsControl = new ymaps.control.FullscreenControl({
          options: {
            size: "large",
            position: {
              left: 10,
              top: 20,
            },
          },
        }));

      // бегунок зума
      zoomControl = new ymaps.control.ZoomControl({
        options: {
          size: "large",
          position: {
            left: 10,
            top: 70,
          },
        },
      });

      // метка центра карты
      centerPlacemark = new ymaps.Placemark(
        map.getCenter(),
        {
          iconContent: "",
        },
        {
          iconLayout: "default#image",
          iconImageHref: "images/icons/map-mark.svg",
          iconImageSize: [40, 55],
          iconImageOffset: [-20, -65],
        }
      );

      // добавляем остальные метки
      var baloonsCollection = new ymaps.GeoObjectCollection();
      for (let i = 0; i < mapCoords.length; i++) {
        baloonsCollection.add(
          new ymaps.Placemark(
            mapCoords[i],
            {
              balloonContent: "",
            },
            {
              iconLayout: "default#image",
              iconImageHref: "images/icons/map-mark.svg",
              iconImageSize: [40, 55],
              iconImageOffset: [-20, -65],
            }
          )
        );
      }
      map.geoObjects.add(centerPlacemark).add(baloonsCollection);

      // включаем элементы управления карты
      map.controls.add(fsControl);
      map.controls.add(zoomControl);

      // отключаем зум карты колесиком мыши
      map.behaviors.disable("scrollZoom");
    });
  }
}