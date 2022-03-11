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
    ibgWebp();
  } else {
    document.querySelector("body").classList.add("no-webp");
    ibg();
  }
});
//=================================================================================================

// ADDCLASS HAS-SUBMENU ===========================================================================
$(".catalog-menu__submenu-list").parent("li").addClass("has-submenu");
//=================================================================================================

// IBG ============================================================================================
function ibg() {
  $.each($(".ibg"), function (index, val) {
    if ($(this).find("img").length > 0) {
      $(this).css("background-image", 'url("' + $(this).find("img").attr("src") + '")');
    }
  });
}

function ibgWebp() {
  $.each($(".ibg"), function (index, val) {
    if ($(this).find("source").length > 0) {
      $(this).css("background-image", 'url("' + $(this).find("source").attr("srcset") + '")');
    }
  });
}
//=================================================================================================

// BODY LOCK / UNLOCK =============================================================================
var body = $("body");

function bodyLock() {
  body.attr("data-scroll", $(window).scrollTop());
  body.addClass("lock");
}

function bodyUnlock() {
  body.removeClass("lock");
  $("html, body").animate({ scrollTop: parseInt(body.attr("data-scroll")) }, 10);
}
//=================================================================================================

// OVERLAY ========================================================================================
var overlay = $(".overlay");

function overlayEnable() {
  overlay.addClass("enabled");
}

function overlayDisable() {
  overlay.removeClass("enabled");
}

overlay.on("click", function () {
  overlayDisable();
  $(".header-menu").removeClass("open");
  $(".catalog-filter__mobile").removeClass("open");
  $(".news-filter__mobile").removeClass("open");
  $(".services-menu__mobile").removeClass("open");
  $(".catalog-menu__submenu-list").removeClass("open");

  $("html, body").animate({ scrollTop: $(window).scrollTop() }, 10);
  body.removeClass("lock");
});
//=================================================================================================

// MOBILE MENU ====================================================================================
var openMobileMenuBtn = $(".header-menu__burger");
var closeMobileMenuBtn = $(".header-menu__close");
var mobileMenu = $(".header-menu");

openMobileMenuBtn.on("click", function () {
  mobileMenu.addClass("open");

  overlayEnable();
  bodyLock();
});

closeMobileMenuBtn.on("click", function () {
  mobileMenu.removeClass("open");

  overlayDisable();
  bodyUnlock();
});
//=================================================================================================

// SEARCH MENU (MOBILE) ===========================================================================
var formSearch = $(".form-search");
var openSearchMenuBtn = $(".header-search__btn-mobile");
var closeSearchMenuBtn = $(".form-search__close");

openSearchMenuBtn.on("click", function (e) {
  e.preventDefault();

  if (!formSearch.hasClass("open")) {
    formSearch.addClass("open");
  }
});

closeSearchMenuBtn.on("click", function (e) {
  e.preventDefault();

  if (formSearch.hasClass("open")) {
    formSearch.removeClass("open");
  }
});
//=================================================================================================

// NO-OVERFLOW CLASS add / remove =================================================================
function addNoOverflowClass(element) {
  element.addClass("no-overflow");
}

function removeNoOverflowClass(element) {
  element.removeClass("no-overflow");
}
//=================================================================================================

// CATALOG MENU (mobile) ==========================================================================
var catalogMenuMobile = $(".catalog-menu__header-wrapper");
var catalogMenuMobileBtn = $(".catalog-menu__burger-link");

function openCatalogMenuMobile(e) {
  e.preventDefault();
  catalogMenuMobile.addClass("open");
}

function closeCatalogMenuMobile() {
  catalogMenuMobile.removeClass("open");
}

catalogMenuMobileBtn.on("click", openCatalogMenuMobile);
//=================================================================================================

// SUBCATALOG MENU (mobile) =======================================================================
$(".has-submenu").on("mouseup", function (e) {
  e.stopPropagation();

  if ($(e.target).is("a")) {
    return;
  } //не открывать сабменю при клике на ссылку

  var parent = $(this).closest(".open");

  // фиксит проблему с прокруткой при клике на нижние пункты меню при overflow: auto
  parent.animate({ scrollTop: 0 }, 200);

  addNoOverflowClass(parent);

  $(this).find("> .catalog-menu__submenu-list").addClass("open");

  checkCatalogMenuStage();
});
//=================================================================================================

// CATALOG MENU MOBILE CLOSE AND BACK BTNs ========================================================
var catalogMenuMobileBtnClose = $(".catalog-menu__mobile-close");
var catalogMenuMobileBtnBack = $(".catalog-menu__mobile-back");
var catalogSubmenuMobile = $(".catalog-menu__submenu-list");

catalogMenuMobileBtnClose.on("click", function () {
  catalogSubmenuMobile.removeClass("open");

  closeCatalogMenuMobile();
  checkCatalogMenuStage();

  $("html, body").animate({ scrollTop: parseInt(body.attr("data-scroll")) }, 10);
});

catalogMenuMobileBtnBack.on("click", function (e) {
  if ($(".catalog-menu__submenu-list.open").length > 0) {
    $(".catalog-menu__submenu-list.open:last").removeClass("open");

    checkCatalogMenuStage();

    $(".catalog-menu__submenu-list.open:last").removeClass("no-overflow");
  } else {
    $("html, body").animate({ scrollTop: parseInt(body.attr("data-scroll")) }, 10);
    closeCatalogMenuMobile();
  }
});
//=================================================================================================

// CHECK CATALOG MENU STAGES ======================================================================
function checkCatalogMenuStage() {
  if ($(".catalog-menu__submenu-list.open").length > 0) {
    var currentSubmenu = $(".catalog-menu__submenu-list.open:last");
    var currentSubmenuName = currentSubmenu.parent().find("> a").text();

    $(".catalog-menu__title-mobile").text(currentSubmenuName);
  } else {
    $(".catalog-menu__title-mobile").text("Каталог товаров");
    removeNoOverflowClass(catalogMenuMobile);
  }
}
//=================================================================================================

// CATALOG FILTER MENU (MOBILE) ===================================================================
var openCatalogFilterMenuBtn = $(".catalog-filter__mobile-link");
var closeCatalogFilterMenuBtn = $(".catalog-filter__mobile-close");
var catalogFilterMenu = $(".catalog-filter__mobile");

openCatalogFilterMenuBtn.on("click", function (e) {
  e.preventDefault();
  catalogFilterMenu.addClass("open");

  overlayEnable();
  bodyLock();
});

closeCatalogFilterMenuBtn.on("click", function (e) {
  e.preventDefault();
  catalogFilterMenu.removeClass("open");

  overlayDisable();
  bodyUnlock();
});
//=================================================================================================

// NEWS FILTER MENU (MOBILE) ======================================================================
var openNewsFilterMenuBtn = $(".news-filter__mobile-link");
var closeNewsFilterMenuBtn = $(".news-filter__mobile-close");
var newsFilterMenu = $(".news-filter__mobile");

openNewsFilterMenuBtn.on("click", function (e) {
  e.preventDefault();
  newsFilterMenu.addClass("open");

  overlayEnable();
  bodyLock();
});

closeNewsFilterMenuBtn.on("click", function (e) {
  e.preventDefault();
  newsFilterMenu.removeClass("open");

  overlayDisable();
  bodyUnlock();
});
//=================================================================================================

// SERVICES MENU (MOBILE) ======================================================================
var openServicesMenuBtn = $(".services-menu__mobile-link");
var closeServicesMenuBtn = $(".services-menu__mobile-close");
var servicesMenu = $(".services-menu__mobile");

openServicesMenuBtn.on("click", function (e) {
  e.preventDefault();
  servicesMenu.addClass("open");

  overlayEnable();
  bodyLock();
});

closeServicesMenuBtn.on("click", function (e) {
  e.preventDefault();
  servicesMenu.removeClass("open");

  overlayDisable();
  bodyUnlock();
});
//=================================================================================================

// WINDOW WIDTH CHECK =============================================================================
var windowWidth = $(window).outerWidth();

// WINDOW RESIZE
$(window).on("resize", function () {
  var windowWidth = $(this).outerWidth();

  catalogMenuOverlay(windowWidth);
  blocksTransfer(windowWidth);
  cardTitleAdaptive(windowWidth);
  spoilerFooter(windowWidth);
  getSlidingBlockHeight();
});
//=================================================================================================

// CATALOG-MENU + OVERLAY =========================================================================
function catalogMenuOverlay(winWidth) {
  var catalogMenuBurger = $(".catalog-menu__burger");
  var catalogMenuList = $(".catalog-menu__list");

  if (winWidth > 1024) {
    catalogMenuBurger.off("mouseover");
    catalogMenuBurger.off("mouseout");
    catalogMenuList.off("mouseover");
    catalogMenuList.off("mouseout");

    catalogMenuBurger.on("mouseover", overlayEnable);
    catalogMenuBurger.on("mouseout", overlayDisable);
    catalogMenuList.on("mouseover", overlayEnable);
    catalogMenuList.on("mouseout", overlayDisable);
    catalogMenuList.on("mouseout", function () {
      $(".catalog-menu__submenu-list").removeClass("open");
    });
  } else {
    catalogMenuBurger.off("mouseover");
    catalogMenuBurger.off("mouseout");
    catalogMenuList.off("mouseover");
    catalogMenuList.off("mouseout");
  }
}
catalogMenuOverlay(windowWidth);
//=================================================================================================

// ADAPTIVE BLOCKS TRANSFER =======================================================================
function blocksTransfer(winWidth) {
  var catalogFilter = $(".catalog-filter");
  var newsFilter = $(".news-filter");
  var servicesMenu = $(".services-menu");
  var wishlistLink = $(".wishlist-link");

  if (winWidth <= 1024) {
    wishlistLink.appendTo($(".wishlist-wrapper--mobile"));
    catalogFilter.appendTo($(".catalog-filter__mobile"));
    newsFilter.appendTo($(".news-filter__mobile"));
    servicesMenu.appendTo($(".services-menu__mobile"));
  } else {
    wishlistLink.appendTo($(".wishlist-wrapper--desktop"));
    catalogFilter.appendTo($(".catalog-filter__desktop"));
    newsFilter.appendTo($(".news-filter__desktop"));
    servicesMenu.appendTo($(".services-menu__desktop"));
  }
}
blocksTransfer(windowWidth);
//=================================================================================================

// SPOILER FOOTER =================================================================================
function spoilerFooter(winWidth) {
  var footerSpoiler = $(".footer-spoiler");
  var footerMenuInner = $(".footer-menu__inner");
  var footerList = $(".footer-list");

  if (winWidth <= 767) {
    footerSpoiler.off("click");

    footerSpoiler.on("click", function () {
      console.log("click");

      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).next(".footer-spoiler__content").slideUp(300);
      } else {
        $(this).addClass("active");
        $(this).next(".footer-spoiler__content").slideDown(300);
      }
    });
  } else {
    footerSpoiler.off("click");
    footerMenuInner.removeAttr("style");
    footerList.removeAttr("style");
  }
}
spoilerFooter(windowWidth);
//=================================================================================================

// SPOILER ========================================================================================
$(".spoiler").on("click", function () {
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    $(this).next(".spoiler-content").slideUp(300);
  } else {
    $(this).addClass("active");
    $(this).next(".spoiler-content").slideDown(300);
  }
});
//=================================================================================================

// ADAPTIVE CARD TITLE CHANGES ====================================================================
function cardTitleAdaptive(winWidth) {
  var cardTitle = $(".card-title");
  var cardTitleText = cardTitle.text();
  var cardTitleMobile = $(".card-title--mobile");

  if (winWidth <= 1285) {
    cardTitleMobile.text(cardTitleText);
    cardTitle.hide();
  } else {
    cardTitleMobile.text("");
    cardTitle.show();
  }
}
cardTitleAdaptive(windowWidth);
//=================================================================================================

// CARD TABS ======================================================================================
$(".card-tabs__navigation-link").on("click", function (e) {
  e.preventDefault();
  $(".card-tabs__navigation-link").removeClass("active");
  $(this).addClass("active");

  var href = $(this).attr("href");

  $(".card-tabs__item").hide(0);
  $(href).fadeIn(100);
});
//=================================================================================================

// SLIDING BLOCK ==================================================================================
var slidingParent = $(".sliding-block__parent");
var slidingBlock = $(".sliding-block");
var slidingLink = $(".sliding-link");

function getSlidingBlockHeight() {
  slidingBlock.each(function () {
    var curentHeight = $(this).find(".sliding-block__child").innerHeight();

    $(this).attr("data-height", curentHeight);
    $(this).removeAttr("style").addClass("close");
    slidingLink.text("Показать все");
  });
}
getSlidingBlockHeight();

slidingLink.on("click", function (e) {
  e.preventDefault();
  var currentSlidingBlock = $(this).parents(".sliding-block__parent").find(".sliding-block");
  var currentSlidingBlockFullHeight = currentSlidingBlock.attr("data-height");

  if (currentSlidingBlock.hasClass("close")) {
    currentSlidingBlock.css({ height: +currentSlidingBlockFullHeight + "px" });
    currentSlidingBlock.removeClass("close");

    $(this).text("Скрыть");
  } else {
    currentSlidingBlock.removeAttr("style");
    currentSlidingBlock.addClass("close");
    $(this).text("Показать все");
  }
});

function homepageCatalogSlidingHeingt() {
  $(".homepage-catalog__item-list-wrapper").each(function () {
    var curentHeight = $(this).find(".sliding-block__child").innerHeight();

    if (curentHeight <= 55) {
      $(this).next(".sliding-link").css("display", "none");
    }
  });
}
homepageCatalogSlidingHeingt();
//=================================================================================================

// QUANTITY COUNTER ===============================================================================
var quantiyPlusBtn = $(".quantity-plus");
var quantiyMinusBtn = $(".quantity-minus");

quantiyPlusBtn.on("click", function (e) {
  e.preventDefault();
  var currentCounter = $(this).parent().find(".quantity-counter");
  var quantityCounterValue = currentCounter.val();

  quantityCounterValue++;

  currentCounter.val(quantityCounterValue);
});

quantiyMinusBtn.on("click", function (e) {
  e.preventDefault();
  var currentCounter = $(this).parent().find(".quantity-counter");
  var quantityCounterValue = currentCounter.val();

  if (quantityCounterValue <= 1) {
    quantityCounterValue = 1;
  } else {
    quantityCounterValue--;
  }

  currentCounter.val(quantityCounterValue);
});
//=================================================================================================

// CART PRICES ====================================================================================
var cartItemPrice = $(".cart-item__price");
var cartItemTotalPrice = $(".cart-item__total-price");
var cartTotalPrice = $(".cart-items__total-price");
var cartRecountBtn = $(".cart-recount__btn");

// проставляем общую сумму для каждого товара в отдельности и общую сумму всей покупки
function cartCountPrices() {
  cartItemPrice.each(function () {
    var itemPrice = $(this).text();
    var cartItemTotalPrice = $(this).parents(".cart-item").find(".cart-item__total-price");
    var itemQuantityCounterValue = $(this).parents(".cart-item").find(".quantity-counter").val();

    cartItemTotalPrice.text(itemPrice * itemQuantityCounterValue);
  });

  cartItemTotalPrice.each(function () {
    var currentItemTotalPrice = $(this).text();
    cartTotalPriceSum(currentItemTotalPrice);
  });

  function cartTotalPriceSum(price) {
    var currentTotalPrice = cartTotalPrice.text();
    var newTotalPrice = +currentTotalPrice + +price;

    cartTotalPrice.text(newTotalPrice);
  }
}
cartCountPrices();

// пересчитываем все суммы при клике на кнопку
cartRecountBtn.on("click", function (e) {
  e.preventDefault();

  cartTotalPrice.text(0);
  cartCountPrices();
});
//=================================================================================================

// NOUI SLIDER ====================================================================================
if (document.getElementById("price-slider") !== null) {
  var priceSlider = document.getElementById("price-slider");

  noUiSlider.create(priceSlider, {
    start: [10, 1000000],
    connect: true,
    step: 1,
    connect: true,
    tooltips: false,
    padding: 0,
    margin: 10,
    range: {
      min: 10,
      max: 1000000,
    },
  });

  var priceMin = document.getElementById("minPrice");
  var priceMax = document.getElementById("maxPrice");

  //отслеживаем изменение инпута priceMin и присваеваем его зеачение слайдеру
  priceMin.oninput = function () {
    var priceMinValue = priceMin.value;
    var priceMaxValue = priceMax.value;
    priceSlider.noUiSlider.set([priceMinValue, priceMaxValue]);
  };

  //отслеживаем изменение инпута priceMax и присваеваем его зеачение слайдеру
  priceMax.oninput = function () {
    var priceMinValue = priceMin.value;
    var priceMaxValue = priceMax.value;
    priceSlider.noUiSlider.set([priceMinValue, priceMaxValue]);
  };

  //отслеживаем изменение положения маркеров слайдера и отображаем их значение в инпутах
  priceSlider.noUiSlider.on("change", function (values) {
    priceMin.value = parseInt(values[0]);
    priceMax.value = parseInt(values[1]);
  });
}
//=================================================================================================

// VIDEO ==========================================================================================
var playVideo = $(".video-preview");

playVideo.on("click", function () {
  var parentBlock = $(this).parents(".video");
  var currentVideo = parentBlock.find(".video-player");
  var youtubeVideo = parentBlock.find(".youtube-iframe");
  var youtubeVideoSrc = youtubeVideo.attr("src");

  $(".video-player").removeClass("active");

  currentVideo.addClass("active");
  youtubeVideo.attr("src", youtubeVideoSrc + "?rel=0&showinfo=0&autoplay=1;");
});
//=================================================================================================
//SLICK SLIDER ====================================================================================
$(document).ready(function () {
  if ($(".intro-slider").length > 0) {
    $(".intro-slider").slick({
      arrows: true,
      dots: true,
      slidesToShow: 1,
      speed: 400,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      draggable: false,
      zIndex: 1,
    });
  }

  if ($(".bestsellers-slider").length > 0) {
    $(".bestsellers-slider").slick({
      arrows: true,
      dots: false,
      appendArrows: $(".bestsellers-slider__navigation"),
      slidesToShow: 4,
      infinite: false,
      draggable: false,
      responsive: [
        {
          breakpoint: 1370,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 767,
          settings: { slidesToShow: 2 },
        },
        {
          breakpoint: 485,
          settings: { slidesToShow: 1 },
        },
      ],
    });
  }

  if ($(".sale-slider").length > 0) {
    $(".sale-slider").slick({
      arrows: true,
      dots: false,
      appendArrows: $(".sale-slider__navigation"),
      slidesToShow: 4,
      infinite: false,
      draggable: false,
      responsive: [
        {
          breakpoint: 1370,
          settings: { slidesToShow: 3 },
        },
        {
          breakpoint: 767,
          settings: { slidesToShow: 2 },
        },
        {
          breakpoint: 485,
          settings: { slidesToShow: 1 },
        },
      ],
    });
  }

  if ($(".manufacturers-slider").length > 0) {
    $(".manufacturers-slider").slick({
      arrows: true,
      dots: false,
      appendArrows: $(".manufacturers-slider__navigation"),
      slidesToShow: 5,
      infinite: true,
      draggable: false,
      responsive: [
        {
          breakpoint: 768,
          settings: { slidesToShow: 4 },
        },
        {
          breakpoint: 576,
          settings: { slidesToShow: 2 },
        },
      ],
    });
  }

  if ($(".buy-with__slider").length > 0) {
    $(".buy-with__slider").slick({
      arrows: true,
      dots: false,
      appendArrows: $(".buy-with__slider-navigation"),
      slidesToShow: 5,
      infinite: true,
      draggable: false,
      responsive: [
        {
          breakpoint: 1285,
          settings: { slidesToShow: 4 },
        },
        {
          breakpoint: 1024,
          settings: { slidesToShow: 3 },
        },
        {
          breakpoint: 767,
          settings: { slidesToShow: 2 },
        },
        {
          breakpoint: 485,
          settings: { slidesToShow: 1 },
        },
      ],
    });
  }

  if ($(".similar-goods__slider").length > 0) {
    $(".similar-goods__slider").slick({
      arrows: true,
      dots: false,
      appendArrows: $(".similar-goods__slider-navigation"),
      slidesToShow: 5,
      infinite: true,
      draggable: false,
      responsive: [
        {
          breakpoint: 1285,
          settings: { slidesToShow: 4 },
        },
        {
          breakpoint: 1024,
          settings: { slidesToShow: 3 },
        },
        {
          breakpoint: 767,
          settings: { slidesToShow: 2 },
        },
        {
          breakpoint: 485,
          settings: { slidesToShow: 1 },
        },
      ],
    });
  }

  if ($(".card-image__slider").length > 0) {
    $(".card-image__slider").slick({
      arrows: false,
      dots: false,
      slidesToShow: 1,
      infinite: false,
      fade: true,
      draggable: false,
      zIndex: 10,
      responsive: [
        {
          breakpoint: 1370,
        },
        {
          breakpoint: 767,
        },
        {
          breakpoint: 480,
        },
      ],
    });

    $(".card-image__slider-nav").slick({
      asNavFor: ".card-image__slider",
      slidesToShow: 4,
      infinite: false,
      draggable: false,

      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 485,
          settings: { slidesToShow: 3 },
        },
      ],
    });
  }

  if ($(".services-slider").length > 0) {
    $(".services-slider").slick({
      arrows: true,
      dots: false,
      appendArrows: $(".services-slider__navigation"),
      slidesToShow: 4,
      infinite: false,
      draggable: false,
      responsive: [
        {
          breakpoint: 1370,
          settings: { slidesToShow: 3 },
        },
        {
          breakpoint: 767,
          settings: { slidesToShow: 2 },
        },
        {
          breakpoint: 485,
          settings: { slidesToShow: 1 },
        },
      ],
    });
  }
});
//=================================================================================================

// BAGUETTEBOX ====================================================================================
if ($(".section-gallery").length > 0) {
  baguetteBox.run(".section-gallery", {});
}

if ($(".baguettebox-gallery").length > 0) {
  baguetteBox.run(".baguettebox-gallery", {});
}

if ($(".two-img__block").length > 0) {
  baguetteBox.run(".two-img__block", {});
}

if ($(".services-slider").length > 0) {
  baguetteBox.run(".services-slider", {});
}
//=================================================================================================

// POPUP ==========================================================================================
var body = $("body");
var bodyLockPadding = $(".body-lock-padding"); //присваеваем этот класс всем элементам с position: fixed;
var popupLink = $(".popup-link");

var timeout = 800; // должен совпадать с длительностью анимации закрытия/открытия поп-апап в CSS
var unlock = true;

// отслеживаем клик по ссылке
popupLink.on("click", function (e) {
  e.preventDefault();
  var currentPopup = $(this).attr("href");

  popupOpen(currentPopup);
});

// открываем поп-ап
function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    console.log("click");
    $(".popup.open").removeClass("open"); // если поп-ап в поп-апе - закрываем 1й

    $(currentPopup).addClass("open");
    bodyLockPopup();
  }
}

// закрываем при клике по документу
$(".popup").on("mouseup", function (e) {
  var popupContent = $(this).find(".popup-content");

  if (!$(e.target).is(popupContent) && popupContent.has(e.target).length === 0) {
    popupClose();
  }
});

// закрываем при клике на крестик
$(".popup-close").on("click", function (e) {
  e.preventDefault();
  popupClose();
});

// закрываем при клике на ESC
$(document).on("keydown", function (e) {
  if (e.which == 27) {
    popupClose();
  }
});

// функция закрытия поп-апа
function popupClose() {
  if (unlock) {
    // удаление iframe при закрытии поп-апа
    //$('.popup.open').find('iframe').remove();

    $(".popup.open").removeClass("open");
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
  body.addClass("lock");

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnlockPopup() {
  unlock = false;

  setTimeout(() => {
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
