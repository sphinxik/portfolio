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

// TYPED TEXT plugin ==============================================================================
var typed = new Typed(".header-title", {
  strings: ["Nothing happens untill something moves"],
  typeSpeed: 60,
  showCursor: false,
});
// ================================================================================================

// WINDOW EVENTS ==================================================================================
var winScrollTop = $(window).scrollTop();
var winWidth = $(window).outerWidth();
var winHeight = $(window).outerHeight();

$(window).on("scroll", function () {
  winScrollTop = $(window).scrollTop();

  addClassScrolled(winScrollTop);
  blocksTransfer(winScrollTop, winWidth);
  sideMenusHeight(winScrollTop, winWidth, winHeight);
});

$(window).on("resize", function () {
  winWidth = $(window).outerWidth();
  winHeight = $(window).outerHeight();

  blocksTransfer(winScrollTop, winWidth);
  mobileMiniCartHeight(winWidth, winHeight);
  sideMenusHeight(winScrollTop, winWidth, winHeight);
  linkTextChange();
  breadcrumbsSubmenu(winWidth);
  changeCatalogItemView(winWidth);
  photoswitcher(winWidth);

  startCardSliderNavigation(winWidth);
  cardSliderTransfer(winWidth);
  cardInfoBadgesTransfer(winWidth);

  searchPageGoodsItemsVisibility(winWidth);
});
// ================================================================================================

// ADD CLASS after scroll =========================================================================
var headerMenuList = $(".header-menu__list");
var headerTopInner = $(".header-top__inner");
var headerBurger = $(".header-burger");
var headerBurgerBackArrow = $(".header-burger__back-arrow");

function addScrolled() {
  headerMenuList.addClass("scrolled");
  headerTopInner.addClass("scrolled");
  headerBurger.addClass("black-hover");
  headerBurgerBackArrow.addClass("black-hover");
}

function removeScrolled() {
  headerMenuList.removeClass("scrolled");
  headerTopInner.removeClass("scrolled");
  headerBurger.removeClass("black-hover");
  headerBurgerBackArrow.removeClass("black-hover");
}

function addClassScrolled(winScrollTop) {
  if (winScrollTop > 20) {
    addScrolled();
  } else {
    removeScrolled();
  }
}
addClassScrolled(winScrollTop);
//=================================================================================================

// BLOCKS TRANSFER ================================================================================
function blocksTransfer(winScrollTop, winWidth) {
  var headerBurger = $(".header-burger");
  var headerBackArrow = $(".header-burger__back-arrow");
  var headerCart = $(".header-cart");
  var headerMenu = $(".header-menu__list");
  var headerSearchBtn = $(".header-search__btn");

  var saleCeckboxDesktopParent = $(".catalog-content__sale-desktop");
  var saleCeckboxMobileParent = $(".catalog-content__sale-mobile");
  var saleCeckbox = $(".catalog-content__sale");

  if (winScrollTop > 20 || winWidth <= 1145) {
    headerBurger.appendTo($(".header-burger__wrapper-mobile")).addClass("black-hover");
    headerBackArrow.appendTo($(".header-burger__wrapper-mobile")).addClass("black-hover");
    headerCart.appendTo($(".header-cart__wrapper-mobile")).addClass("black-hover");
  } else {
    headerBurger.appendTo($(".header-burger__wrapper")).removeClass("black-hover");
    headerBackArrow.appendTo($(".header-burger__wrapper")).removeClass("black-hover");
    headerCart.appendTo($(".header-cart__wrapper")).removeClass("black-hover");
  }

  if (winWidth <= 1145) {
    headerMenu.appendTo($(".header-menu__mobile"));
    headerSearchBtn.appendTo($(".header-search__wrapper-mobile")).addClass("black-hover");
  } else {
    headerMenu.appendTo($(".header-menu"));
    headerSearchBtn.appendTo($(".header-search__wrapper")).removeClass("black-hover");
  }

  if (winWidth <= 577) {
    saleCeckbox.appendTo(saleCeckboxMobileParent);
  } else {
    saleCeckbox.appendTo(saleCeckboxDesktopParent);
  }
}
blocksTransfer(winScrollTop, winWidth);
//=================================================================================================

// BODY lock/unlock ===============================================================================
var body = $("body");

function bodyLock() {
  var lockPaddingValue = $(window).outerWidth() - $(".wrapper").width() + "px";
  body.css("padding-right", lockPaddingValue);
  body.addClass("lock");
}

function bodyUnlock() {
  body.css("padding-right", "0px");
  body.removeClass("lock");
}
//=================================================================================================

// OVERLAY ========================================================================================
var overlay = $(".overlay");

overlay.on("click", function () {
  if ($(this).hasClass("on")) {
    overlayDisable();
  } else {
    overlayEnable();
  }
});

function overlayEnable() {
  overlay.addClass("on");
  bodyLock();
}

function overlayDisable() {
  overlay.removeClass("on");

  $(".header-search__btn").removeClass("active");
  $(".search-form").removeClass("open").trigger("reset");
  $(".search-form__result").slideUp(300);
  bodyUnlock();
}
//=================================================================================================

// BURGER MENU ====================================================================================
$(".header-burger").on("click", function () {
  $(this).toggleClass("active");
  $(".header__change-language").toggleClass("active");
  $(".header-menu").toggleClass("active");
  $(".sidemenu").toggleClass("active");
  $(".header-title").toggleClass("hidden");
  $(".header-phone > picture").toggleClass("animate");
  $("body").toggleClass("lock-mobile");

  $(".submenu-list").removeClass("open");
  $(".header-menu__list").removeClass("open");
  $(".submenu-list").removeClass("overflow-hidden");
});
// ================================================================================================

// SUBMENU ========================================================================================
$(".submenu-list").parent().find("> a").addClass("has-submenu");

// open
$(".has-submenu").on("click", function (e) {
  e.preventDefault();

  $(".header-burger").hide();
  $(".header-burger__back-arrow").fadeIn();

  // если список сабменю слишком большой, для корректной работы скролла
  if ($(this).closest(".submenu-list").length > 0) {
    var parentSubmenu = $(this).closest(".submenu-list.open");

    parentSubmenu.animate({ scrollTop: 0 }, 200);
    parentSubmenu.addClass("overflow-hidden");
  }

  $(this).parent().find("> .submenu-list").addClass("open");
});

// back btn
$(".header-burger__back-arrow").on("click", function () {
  if ($(".submenu-list.open").length === 1) {
    $(".header-burger__back-arrow").hide();
    $(".header-burger").fadeIn();
    $(".submenu-list.open").removeClass("open");
  }

  if ($(".header-menu__list").hasClass("open")) {
    $(".header-burger__back-arrow").hide();
    $(".header-burger").fadeIn();
    $(".header-menu__list").removeClass("open");
  }

  $(".submenu-list.open:last").removeClass("open");
  $(".submenu-list.open:last").removeClass("overflow-hidden");
});
// ================================================================================================

// MAIN MENU mobile ===============================================================================
$(".header-menu__mobile > a").on("click", function (e) {
  e.preventDefault();

  $(".header-burger").hide();
  $(".header-burger__back-arrow").fadeIn();
  $(this).parent().find(".header-menu__list").addClass("open");
});
// ================================================================================================

// MENU LANGUAGE SWITCHER =========================================================================
$(".header__change-language").on("click", function (e) {
  e.preventDefault();

  if (!$(this).hasClass("header__change-language--en")) {
    $(this).addClass("header__change-language--en").text("Ru");
  } else {
    $(this).removeClass("header__change-language--en").text("En");
  }

  $(".sidemenu a span.link-text__changer").toggleClass("link-text__changer--active");
});
// ================================================================================================

// SEARCH BAR =====================================================================================
$(".header-search__btn").on("click", function (e) {
  e.preventDefault();

  $(this).toggleClass("active");
  //$('.overlay').toggleClass('on');

  if ($(this).hasClass("active")) {
    $(".search-form").addClass("open");
    overlayEnable();
  } else {
    $(".search-form").removeClass("open").trigger("reset");
    $(".search-form__result").slideUp(300);
    $(".header").removeAttr("style");
    overlayDisable();
  }
});

$(".search-form__close").on("click", function () {
  $(".header-search__btn").removeClass("active");
  $(".search-form").removeClass("open").trigger("reset");
  $(".search-form__result").slideUp(300);
  $(".header").removeAttr("style");
  overlayDisable();
});

$(".search-form__input").on("keyup", function () {
  if ($(this).val() !== "") {
    $(".search-form__result").slideDown(300);
    $(".header").css("z-index", "6");
  } else {
    $(".search-form__result").slideUp(300);
    $(".header").removeAttr("style");
  }
});

// Search-result TABS
$(".search-form__navigation-btn").on("click", function () {
  if (!$(this).hasClass("active")) {
    var dataFilter = $(this).attr("data-filter");

    $(".search-form__navigation-btn").removeClass("active");
    $(this).addClass("active");

    $(".search-form__content").slideUp(300);
    $('.search-form__content[data-category="' + dataFilter + '"]').slideDown(300);
  }
});
// ================================================================================================

// MINI CART ======================================================================================
$(".header-cart").on("click", function (e) {
  e.preventDefault();
  $(this).toggleClass("active");
  $(".mini-cart").toggleClass("open");
  $("body").toggleClass("lock-mobile");
});

$(".mini-cart__header-close").on("click", function () {
  $(".mini-cart").removeClass("open");
  $(".header-cart").removeClass("active");
  $("body").removeClass("lock-mobile");
});

function mobileMiniCartHeight(winWidth, winHeight) {
  if (winWidth <= 1023) {
    $(".mini-cart").css("height", +winHeight - 30 + "px");
  } else {
    $(".mini-cart").removeAttr("style");
  }
}
mobileMiniCartHeight(winWidth, winHeight);
// ================================================================================================

// SIDEMENU HEIGHT ================================================================================
function sideMenusHeight(winScrollTop, winWidth, winHeight) {
  var catalogSidebar = $(".catalog-sidebar");

  if (winScrollTop > 0) {
    sidemenuScrolled();
  } else {
    sidemenuOriginal();
  }

  function sidemenuOriginal() {
    var headerBottomHeight = $(".header-bottom").innerHeight();

    $(".sidemenu").css("top", +headerBottomHeight + "px");
    $(".sidemenu-list").css("height", "calc(" + (winHeight - headerBottomHeight) + "px)");

    if (winWidth <= 1145) {
      catalogSidebar.css("top", +headerBottomHeight + "px");
      catalogSidebar.css("height", "calc(" + (winHeight - headerBottomHeight) + "px)");
    } else {
      catalogSidebar.removeAttr("style");
    }
  }

  function sidemenuScrolled() {
    var headerTopHeight = $(".header-top").innerHeight();

    $(".sidemenu").css("top", +headerTopHeight + "px");
    $(".sidemenu-list").css("height", "calc(" + (winHeight - headerTopHeight) + "px)");

    if (winWidth <= 1145) {
      catalogSidebar.css("top", +headerTopHeight + "px");
      catalogSidebar.css("height", "calc(" + (winHeight - headerTopHeight) + "px)");
    } else {
      catalogSidebar.removeAttr("style");
    }
  }
}
sideMenusHeight(winScrollTop, winWidth, winHeight);
// ================================================================================================

// LINK TEXT CHANGER ==============================================================================
function linkTextChange() {
  var linkTextChanger = $(".link-text__changer");

  linkTextChanger.each(function () {
    var width1 = $(this).find("span:first").outerWidth();
    var width2 = $(this).find("span:last").outerWidth();

    if (width1 >= width2) {
      $(this).css("width", width1);
    } else {
      $(this).css("width", width2);
    }
  });
}
linkTextChange();
// ================================================================================================

// BREADCRUMBS SUBMENU ============================================================================
function breadcrumbsSubmenu(winWidth) {
  var breadcrumbsItem = $(".breadcrumbs-list > li.breadcrumbs__has-submenu > a");

  if (winWidth <= 1024) {
    breadcrumbsItem.off("click");
    breadcrumbsItem.on("click", function (e) {
      e.preventDefault();
      var breadcrumbsSubmenu = $(this).parent().find(".breadcrumbs-submenu");

      breadcrumbsSubmenu.toggleClass("open");

      $(document).off("click");
      $(document).on("click", function (e) {
        if (!$(e.target).is(breadcrumbsSubmenu) && !$(e.target).is(breadcrumbsItem)) {
          breadcrumbsSubmenu.removeClass("open");
        }
      });
    });
  } else {
    $(".breadcrumbs-list > li.breadcrumbs__has-submenu > a").off("click");
  }
}
breadcrumbsSubmenu(winWidth);
//=================================================================================================

// SPOILER ========================================================================================
$(".spoiler").each(function () {
  if (!$(this).hasClass("active")) {
    $(this).next(".spoiler-content").slideUp(400);
  }
});

$(".spoiler").on("click", function () {
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    $(this).next(".spoiler-content").slideUp(400);
  } else {
    $(this).addClass("active");
    $(this).next(".spoiler-content").slideDown(400);
  }
});
//=================================================================================================

// SLIDING BLOCK ==================================================================================
var slidingBlockParent = $(".sliding-block__wrapper");
var slidingLink = $(".sliding-link");

slidingLink.on("click", function (e) {
  e.preventDefault();
  var currentSlidingBlockWrapper = $(this).parent().find(".sliding-block__wrapper");
  var currentSlidingBlockFullHeight = currentSlidingBlockWrapper.find(".sliding-block").innerHeight();

  if (currentSlidingBlockWrapper.hasClass("close")) {
    currentSlidingBlockWrapper.css({ height: +currentSlidingBlockFullHeight + "px" });
    currentSlidingBlockWrapper.removeClass("close");

    $(this).text("Скрыть");
  } else {
    currentSlidingBlockWrapper.removeAttr("style");
    currentSlidingBlockWrapper.addClass("close");
    $(this).text("Все");
  }
});
//=================================================================================================

// CATALOG SIDEBAR mobile =========================================================================
var catalogSidebar = $(".catalog-sidebar");

$(".catalog-content__filter-btn").on("click", function (e) {
  catalogSidebar.addClass("open");
  $("body").addClass("lock-mobile");
});

$(".catalog-sidebar__close-btn").on("click", function (e) {
  e.preventDefault();
  catalogSidebar.removeClass("open");
  $("body").removeClass("lock-mobile");
});
//=================================================================================================

// CATALOG CONTENT VIEW ===========================================================================
var catalogViewBlockBtn = $(".catalog-content__view-block");
var catalogViewListBtn = $(".catalog-content__view-list");
var catalogContentInner = $(".catalog-content__inner");

catalogViewBlockBtn.on("click", function (e) {
  e.preventDefault();
  catalogViewBlock();
});

catalogViewListBtn.on("click", function (e) {
  e.preventDefault();
  catalogViewList();
});

function catalogViewBlock() {
  catalogViewListBtn.removeClass("active");
  catalogViewBlockBtn.addClass("active");

  catalogContentInner.addClass("invisible");

  setTimeout(function () {
    catalogContentInner.removeClass("catalog-content__inner--list").addClass("catalog-content__inner--block");
    changeCatalogItemView(winWidth);
  }, 200);

  setTimeout(function () {
    catalogContentInner.removeClass("invisible");
  }, 500);
}

function catalogViewList() {
  catalogViewBlockBtn.removeClass("active");
  catalogViewListBtn.addClass("active");

  catalogContentInner.addClass("invisible");

  setTimeout(function () {
    catalogContentInner.removeClass("catalog-content__inner--block").addClass("catalog-content__inner--list");
    changeCatalogItemView(winWidth);
  }, 200);

  setTimeout(function () {
    catalogContentInner.removeClass("invisible");
  }, 500);
}
//=================================================================================================

// CATALOG ITEM VIEW ==============================================================================
function changeCatalogItemView(winWidth) {
  $(".catalog-content__item").each(function () {
    var navDots = $(this).find(".catalog-content__item-slider-navigation");
    var navDotsWrapperList = $(this).find(".catalog-content__item-slider-navigation--list");
    var navDotsWrapperBlock = $(this).find(".catalog-content__item-slider-navigation--block");
    var badge = $(this).find(".catalog-content__item-bage");
    var badgeWrapperList = $(this).find(".catalog-content__item-bage--list");
    var badgeWrapperBlock = $(this).find(".catalog-content__item-bage--block");

    if ($(".catalog-content__inner").hasClass("catalog-content__inner--block") || winWidth <= 485) {
      badge.appendTo(badgeWrapperBlock);
      navDots.appendTo(navDotsWrapperBlock);
    } else if ($(".catalog-content__inner").hasClass("catalog-content__inner--list")) {
      badge.appendTo(badgeWrapperList);
      navDots.appendTo(navDotsWrapperList);
    }
  });

  sliderCatalogItemImg();
}
changeCatalogItemView(winWidth);
//=================================================================================================

// PHOTOSWITCHER ==================================================================================
function photoswitcher(winWidth) {
  if (winWidth <= 485) {
    checkPhotoswitcher();

    $(".catalog-content__photoswitcher").off("click");
    $(".catalog-content__photoswitcher").on("click", function (e) {
      $(this).toggleClass("off");

      if ($(this).hasClass("off")) {
        $(".catalog-content__item-photoswitcher").addClass("off");
        $(".catalog-content__item-img").slideUp(200);
      } else {
        $(".catalog-content__item-photoswitcher").removeClass("off");
        $(".catalog-content__item-img").slideDown(200);
      }
    });

    $(".catalog-content__item-photoswitcher").off("click");
    $(".catalog-content__item-photoswitcher").on("click", function (e) {
      e.preventDefault();
      $(this).toggleClass("off");

      if ($(this).hasClass("off")) {
        $(this).parents(".catalog-content__item").find(".catalog-content__item-img").slideUp(300);
      } else {
        $(this).parents(".catalog-content__item").find(".catalog-content__item-img").slideDown(300);
      }
    });
  } else {
    $(".catalog-content__item-img").slideDown(200);
  }
}
photoswitcher(winWidth);

function checkPhotoswitcher() {
  $(".catalog-content__item-photoswitcher").each(function () {
    if ($(this).hasClass("off")) {
      $(this).parents(".catalog-content__item").find(".catalog-content__item-img").slideUp(300);
    } else {
      $(this).parents(".catalog-content__item").find(".catalog-content__item-img").slideDown(300);
    }
  });
}
//=================================================================================================

// SLIDER CATALOG ITEM IMG ========================================================================
function sliderCatalogItemImg() {
  $(".catalog-content__item").each(function () {
    var currentParent = $(this);
    var currentDots = currentParent.find(".catalog-content__item-slider-dot");

    currentDots.off("click");

    currentDots.on("click", function (e) {
      e.preventDefault();
      var currentIndex = $(this).index();

      currentDots.removeClass("active");
      $(this).addClass("active");

      currentParent.find(".catalog-content__item-slide").fadeOut(300).delay(300);
      currentParent.find(".catalog-content__item-slide").eq(currentIndex).fadeIn(300);
    });
  });
}
//=================================================================================================

// QUANTITY COUNTER ===============================================================================
function quantityCounter() {
  var plusBtn = $(".quantity-plus");
  var minusBtn = $(".quantity-minus");

  plusBtn.on("click", function (e) {
    e.preventDefault();
    var inputValue = $(this).parents(".quantity-counter__wrapper").find(".quantity-counter").val();

    if (inputValue < 99) {
      inputValue++;
      $(this).parents(".quantity-counter__wrapper").find(".quantity-counter").val(inputValue);
    }
  });

  minusBtn.on("click", function (e) {
    e.preventDefault();
    var inputValue = $(this).parents(".quantity-counter__wrapper").find(".quantity-counter").val();

    if (inputValue > 1) {
      inputValue--;
      $(this).parents(".quantity-counter__wrapper").find(".quantity-counter").val(inputValue);
    }
  });
}
quantityCounter();
// ================================================================================================

// CARD SLIDER ====================================================================================
var cardSliderNavigation;
var cardSlider;

// Card Slider Navigation
function startCardSliderNavigation(winWidth) {
  if ($(".card-slider__navigation").length && winWidth > 865) {
    if (!$(".card-slider__navigation").hasClass("swiper-container-initialized")) {
      cardSliderNavigation = new Swiper(".card-slider__navigation", {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,

        observer: true,
        observerParents: true,
        observerSlideChildren: true,
        watchOverflow: true,
      });
    }
  } else if ($(".card-slider__navigation").length && winWidth <= 865 && $(".card-slider__navigation").hasClass("swiper-container-initialized")) {
    cardSliderNavigation.destroy();
  }
}
startCardSliderNavigation(winWidth);

// Card Slider
if ($(".card-slider").length && winWidth > 865) {
  $(".card-slider").addClass("card-slider--desktop");
  startCardSliderDesktop();
} else {
  $(".card-slider").addClass("card-slider--mobile");
  $(".card-slider").appendTo(".card-slider__wrapper--mobile");
  startCardSliderMobile();
}

function startCardSliderDesktop() {
  if ($(".card-slider").length) {
    cardSlider = new Swiper(".card-slider", {
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      allowTouchMove: false,
      speed: 400,
      slidersPerView: 1,
      spaceBetween: 10,

      thumbs: {
        swiper: cardSliderNavigation,
      },
    });
  }
}

function startCardSliderMobile() {
  if ($(".card-slider").length) {
    cardSlider = new Swiper(".card-slider", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      speed: 400,
      slidersPerView: 1,
      spaceBetween: 10,
    });
  }
}

function cardSliderTransfer(winWidth) {
  if ($(".card-slider").length && winWidth > 865) {
    $(".card-slider").removeClass("card-slider--mobile");

    if (!$(".card-slider").hasClass("card-slider--desktop")) {
      cardSlider.destroy();
      $(".card-slider").prependTo(".card-slider__wrapper");
      startCardSliderDesktop();
    }

    $(".card-slider").addClass("card-slider--desktop");
  } else if ($(".card-slider").length && winWidth <= 865) {
    $(".card-slider").removeClass("card-slider--desktop");

    if (!$(".card-slider").hasClass("card-slider--mobile")) {
      cardSlider.destroy();
      $(".card-slider").appendTo(".card-slider__wrapper--mobile");
      startCardSliderMobile();
    }
    $(".card-slider").addClass("card-slider--mobile");
  }
}

//Badges Transfer
function cardInfoBadgesTransfer(winWidth) {
  if (winWidth > 865) {
    $(".card-info__badge").appendTo(".card-info__top-col1");
  } else {
    $(".card-info__badge").appendTo(".card-info__badges-mobile");
  }
}
cardInfoBadgesTransfer(winWidth);

// ================================================================================================

// CART SUMM ======================================================================================
var cartItems = $(".cart-item");
var cartTotalPrice = $(".cart-total__price");
var quantityCounter = $(".cart-item__quantity .quantity-counter");
var quantityCounterBtnMinus = $(".cart-item__quantity .quantity-minus");
var quantityCounterBtnPlus = $(".cart-item__quantity .quantity-plus");

// сохраняем в data атрибуты цену за 1 единицу для каждого товара
cartItems.each(function () {
  var oldItemPrice = $(this).find(".cart-item__oldprice").text();
  var curentItemPrice = $(this).find(".cart-item__currentprice").text();

  if (oldItemPrice) {
    $(this).attr("data-oneItem-oldPrice", priceWithoutSpaces(oldItemPrice));
  }

  $(this).attr("data-oneItem-currentPrice", priceWithoutSpaces(curentItemPrice));
});

// подсчет цен каждого товара в зависимости от количества
function cartItemPriceUpdate(currentCounter) {
  var parentItem = currentCounter.parents(".cart-item");
  var currentCounterValue = parseInt(currentCounter.val());
  var itemCurrentPrice = currentCounter.parents(".cart-item").find(".cart-item__currentprice");
  var itemOldPrice = currentCounter.parents(".cart-item").find(".cart-item__oldprice");

  if (itemOldPrice.text()) {
    var oneItemOldPrice = +parentItem.attr("data-oneItem-oldPrice");

    var itemOldPriceNew = oneItemOldPrice * currentCounterValue;

    itemOldPrice.text(normalPrice(itemOldPriceNew));
  }

  var oneItemCurrentPrice = +parentItem.attr("data-oneItem-currentPrice");
  var itemCurrentPriceNew = oneItemCurrentPrice * currentCounterValue;

  itemCurrentPrice.text(normalPrice(itemCurrentPriceNew));
}

quantityCounter.each(function () {
  cartItemPriceUpdate($(this));
});

// отслеживаем изменение количества штук товара
quantityCounterBtnMinus.on("click", function () {
  var currentCounter = $(this).parent().find(".quantity-counter");

  cartItemPriceUpdate(currentCounter);
  totalPriceUpdate();
});

quantityCounterBtnPlus.on("click", function () {
  var currentCounter = $(this).parent().find(".quantity-counter");

  cartItemPriceUpdate(currentCounter);
  totalPriceUpdate();
});

// cчитаем общую сумму
function totalPriceUpdate() {
  var curentTotalPrice = cartTotalPrice.text("0");
  var deliveryInput = $('.cart-form .radio-input[name="delivery"]:checked');

  cartItems.each(function () {
    var curentItemPrice = $(this).find(".cart-item__currentprice").text();
    curentTotalPrice = cartTotalPrice.text();

    var newTotalPrice = priceWithoutSpaces(curentTotalPrice) + priceWithoutSpaces(curentItemPrice);

    cartTotalPrice.text(normalPrice(newTotalPrice));
  });

  if (deliveryInput.length) {
    curentTotalPrice = cartTotalPrice.text();
    var dliveryPrice = parseInt(deliveryInput.data("delivery-price"));

    var newTotalPriceWithDelivery = priceWithoutSpaces(curentTotalPrice) + dliveryPrice;

    cartTotalPrice.text(normalPrice(newTotalPriceWithDelivery));
  }
}
totalPriceUpdate();

// преобразовать цену в число и убрать пробелы
function priceWithoutSpaces(price) {
  return parseInt(price.replace(/\s/g, ""));
}

// вернуть пробелы в цену
function normalPrice(price) {
  return String(price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
}
// ================================================================================================

// CART FORM STEPS ================================================================================
var cartFormSteps = $(".cart-form__steps");
var cartFormBack = $(".cart-form__btn-back");
var cartFormReset = $(".cart-form__btn-reset");
var cartFormInfoBTN_final = $(".cart-form__btn-info");
var cartFormItem = $(".cart-form__item");
var cartFormStep = $(".cart-form__step");
var cartFormInputs = $(".cart-form .radio-input");
var cartFormFinalStep = $(".cart-form__final");
var cartFormSettingsList = $(".cart-form__settings-list");
var cartFormSubmitBlock = $(".cart-submit");
var cartFormSubmitBTN = $(".cart-submit__btn");

// эффект наведения на айтемы
cartFormStep.hover(function () {
  $(this).parents(".cart-form__item").toggleClass("hovered");
});
// ===============================================

// шаг вперед
cartFormInputs.on("change", function () {
  var formStep = cartFormSteps.attr("data-cart-form-step");

  if (formStep < 5) {
    formStep++;
    cartFormSteps.attr("data-cart-form-step", formStep);
  }

  cartFormStepMove();
  cartItemFlip();

  // выбор способа доставки
  if ($(this).attr("name") == "delivery" && $(this).prop("checked") && $(this).data("delivery-price")) {
    totalPriceUpdate();

    $("<li>", {
      text: $(this).val() + " (+" + $(this).data("delivery-price") + " ₽)",
    })
      .appendTo(cartFormSettingsList)
      .slideDown(300);
  } else {
    $("<li>", {
      text: $(this).val(),
    })
      .appendTo(cartFormSettingsList)
      .slideDown(300);
  }

  // выбор способа оплаты
  if ($(this).attr("name") == "payment" && $(this).prop("checked")) {
    var paymentInputValue = $(this).val();

    if (paymentInputValue == "Оплата онлайн") {
      cartFormSubmitBTN.text("Оплатить");
    } else {
      cartFormSubmitBTN.text("ОК");
    }
  }
});
// ===============================================

// шаг назад
cartFormBack.on("click", function () {
  var formStep = cartFormSteps.attr("data-cart-form-step");

  if (formStep > 1) {
    formStep--;
    cartFormSteps.attr("data-cart-form-step", formStep);
  }

  cartFormStepMove();
  cartItemFlip();
  totalPriceUpdate();

  $(".cart-form__settings-list li:last").slideUp(300);

  setTimeout(function () {
    $(".cart-form__settings-list li:last").remove();
  }, 300);
});
// ===============================================

// меняем текущий шаг
function cartFormStepMove(stepUp) {
  var formStep = cartFormSteps.attr("data-cart-form-step");

  cartFormStep.each(function () {
    var curStepNumber = $(this).attr("data-step");

    if (curStepNumber == formStep) {
      $(this).addClass("current").find(".radio-input").prop("checked", false);
    } else {
      $(this).removeClass("current");
    }
  });

  cartFormStepViewChanger(formStep);
  cartFormItemsVisibility();
}
// ===============================================

// видимость айтемов
function cartFormItemsVisibility() {
  var formStep = cartFormSteps.attr("data-cart-form-step");

  // в зависимости от текущего шага
  cartFormItem.each(function () {
    var itemSteps = $(this).find(".cart-form__step[data-step=" + formStep + "]");

    if (itemSteps.length) {
      $(this).removeClass("hidden");
    } else {
      $(this).addClass("hidden");
    }
  });

  // в зависимости от выбранного пункта
  cartFormInputs.each(function () {
    if ($(this).attr("name") == "pickup" && $(this).prop("checked") && $(this).val() != "Москва" && formStep == 2) {
      $(".cart-form__item.cart-form__item--3").addClass("hidden");
    }
  });
}
cartFormItemsVisibility();
// ===============================================

// вид каждого шага (изменение отображения элементов)
function cartFormStepViewChanger(formStep) {
  if (formStep == 1) {
    cartFormBack.removeClass("visible");

    cartFormSettingsList.addClass("step-1");
  } else {
    cartFormSettingsList.removeClass("step-1");
  }

  if (formStep == 2) {
    cartFormReset.removeClass("visible");

    cartFormBack.addClass("visible");
    $(".cart-form__item.cart-form__item--3").addClass("cart-form__item--info");
  } else {
    $(".cart-form__item.cart-form__item--3").removeClass("cart-form__item--info");
  }

  if (formStep == 3) {
    cartFormReset.addClass("visible");
  }

  if (formStep == 4) {
  }

  if (formStep == 5) {
    cartFormInfoBTN_final.addClass("visible");
    cartFormFinalStep.slideDown(400);
    cartFormSubmitBlock.slideDown(400);
  } else {
    cartFormInfoBTN_final.removeClass("visible");
    cartFormFinalStep.slideUp(400);
    cartFormSubmitBlock.slideUp(400);
  }
}
// ===============================================

// сброс формы
cartFormReset.on("click", function () {
  cartFormSettingsList.html("").addClass("step-1");
  cartFormSteps.attr("data-cart-form-step", 1);
  cartFormInputs.prop("checked", false);

  cartFormBack.removeClass("visible");
  cartFormReset.removeClass("visible");
  cartFormInfoBTN_final.removeClass("visible");
  cartFormStep.removeClass("current");
  cartFormItem.find(".cart-form__step:first").addClass("current");

  cartFormFinalStep.slideUp(400);
  cartFormSubmitBlock.slideUp(400);

  cartItemFlip();
  cartFormItemsVisibility();
  totalPriceUpdate();
});
// ===============================================

// анимация переворота
function cartItemFlip() {
  if (cartFormItem.hasClass("flip")) {
    cartFormItem.removeClass("flip");
  } else {
    cartFormItem.addClass("flip");
  }
}
// ================================================================================================

// CART MASKEDINPUT start =========================================================================
if ($(".cart-form__input--tel").length) {
  $(".cart-form__input--tel").mask("+7 (999) 999-99-99", {
    autoclear: false,
  });
}
// ================================================================================================

// BRANDS VIEW SWITCHER ===========================================================================
var brandsViewSwitcher = $(".brands-view__switcher");
var brandsContent = $(".brands-content");
var brandsRow = $(".brands-row");

brandsViewSwitcher.on("click", function () {
  if (brandsContent.hasClass("brands-content--logos")) {
    $(this).text("Графика");
    brandsRow.addClass("hidden");
    setTimeout(function () {
      brandsContent.removeClass("brands-content--logos").addClass("brands-content--labels");
    }, 300);

    setTimeout(function () {
      brandsRow.removeClass("hidden");
    }, 400);
  } else {
    $(this).text("Текст");
    brandsRow.addClass("hidden");
    setTimeout(function () {
      brandsContent.removeClass("brands-content--labels").addClass("brands-content--logos");
    }, 300);

    setTimeout(function () {
      brandsRow.removeClass("hidden");
    }, 400);
  }
});
// ================================================================================================

// SERACH-PAGE TABS ===============================================================================
$(".search-page__navigation-btn").on("click", function () {
  if (!$(this).hasClass("active")) {
    var dataFilter = $(this).attr("data-filter");

    $(".search-page__navigation-btn").removeClass("active");
    $(this).addClass("active");

    $(".search-page__content-item").slideUp(400);
    $('.search-page__content-item[data-category="' + dataFilter + '"]').slideDown(400);
  }
});
// ================================================================================================

// SERACH-PAGE GOODS-ITEMS ========================================================================
function searchPageGoodsItemsVisibility(winWidth) {
  $(".search-page__goods-content").each(function () {
    var goodsItemsQuantity = $(this).find(".catalog-content__item").length;
    var goodsBTN = $(this).parents(".search-page__goods").find(".search-page__goods-btn");

    if (winWidth <= 1145 && winWidth > 767) {
      if (goodsItemsQuantity > 3) {
        goodsBTN.addClass("show");
      } else {
        goodsBTN.removeClass("show");
      }
    } else {
      if (goodsItemsQuantity > 4) {
        goodsBTN.addClass("show");
      } else {
        goodsBTN.removeClass("show");
      }
    }
  });

  $(".search-page__goods-btn").off("click");
  $(".search-page__goods-btn").on("click", function () {
    var parent = $(this).parents(".search-page__goods");
    var itemBTNs = parent.find(".search-page__goods-btn");
    var goodsItems = parent.find(".catalog-content__item");

    itemBTNs.toggleClass("active");
    goodsItems.slideDown(400);

    if (itemBTNs.hasClass("active")) {
      itemBTNs.text("Скрыть");
    } else {
      itemBTNs.text("Показать все");
    }

    var goodsItemsAdded = $(this).parents(".search-page__goods").find('.catalog-content__item[style="display: block;"]');
    if (goodsItemsAdded.length) {
      goodsItemsAdded.slideUp(400);
    }
  });
}
searchPageGoodsItemsVisibility(winWidth);
// ================================================================================================

// SELECT STYLE ===================================================================================
$(".form-select").each(function () {
  var currentSelect = $(this);
  var selectArrow = $(this).next(".form-select__arrow").html();
  var currentOptionName = currentSelect.find("option:selected").text();
  var selectOption = currentSelect.find("option");
  var selectOptionLength = selectOption.length;

  currentSelect.hide();

  $("<div>", {
    class: "select__fake",
    html: '<span class="select__fake-label">' + currentOptionName + '</span><span class="select__fake-arrow">' + selectArrow + "</span>",
  }).insertAfter(currentSelect);
  var selectFake = currentSelect.next(".select__fake");

  $("<ul>", { class: "select__list" }).insertAfter(selectFake);
  var selectList = selectFake.next(".select__list");

  for (var i = 1; i < selectOptionLength; i++) {
    $("<li>", {
      class: "select__item",
      html: $("<span>", {
        text: selectOption.eq(i).text(),
      }),
    })
      .attr("data-value", selectOption.eq(i).val())
      .appendTo(selectList);
  }

  var selectItem = selectList.find("li");

  selectFake.on("click", function () {
    if (!$(this).hasClass("on")) {
      $(this).addClass("on");
      selectList.addClass("open");

      selectItem.off("mouseup");
      selectItem.on("mouseup", function () {
        var chooseItem = $(this).data("value");

        currentSelect.val(chooseItem).change();
        selectFake.find(".select__fake-label").text($(this).find("span").text());

        selectList.removeClass("open");
        selectFake.removeClass("on");
      });
    } else {
      $(this).removeClass("on");
      selectList.removeClass("open");
    }
  });
});
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
    $(".popup.open").removeClass("open"); // если поп-ап в поп-апе - закрываем текущий

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
    resetPopupFormSteps();
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
//=================================================================================================

// POPUP FORM STEPS ===============================================================================
if ($(".popup-content__form-input").length) {
  // 1st STEP
  $(".popup-content__item-btn").on("click", function (e) {
    e.preventDefault();
    var currentForm = $(this).parents(".popup-content").find(".popup-content__form");
    var step1 = currentForm.find(".popup-content__form-step1");
    var step2 = currentForm.find(".popup-content__form-step2");

    if (!$(this).hasClass("active")) {
      resetPopupFormSteps();
    }

    $(this).addClass("active");

    if (!step2.hasClass("open")) {
      step1.slideDown(300);
      $(this)
        .parents(".popup")
        .animate({ scrollTop: $(currentForm).offset().top }, 1000);
    }
  });

  // MASKEDINPUT plugin + 2nd STEP
  $(".popup-content__form-input").mask("+7 (999) 999-99-99", {
    autoclear: false,
    completed: function () {
      var currentForm = $(this).parents(".popup-content").find(".popup-content__form");
      var step1 = currentForm.find(".popup-content__form-step1");
      var step2 = currentForm.find(".popup-content__form-step2");

      $(".popup-content__form-currentphone").html($(this).val());
      step1.slideUp(300);
      step2.delay(400).slideDown(300).addClass("open");
      $(this)
        .parents(".popup")
        .animate({ scrollTop: $(currentForm).offset().top }, 1000);
    },
  });

  // BACK BTN
  $(".popup-content__form-backbtn").on("click", function () {
    var currentForm = $(this).parents(".popup-content").find(".popup-content__form");
    var currentInput = currentForm.find(".popup-content__form-input");
    var currentInputValue = currentInput.val();
    var step1 = currentForm.find(".popup-content__form-step1");
    var step2 = currentForm.find(".popup-content__form-step2");

    step2.slideUp(300).removeClass("open");
    currentInput.val(currentInputValue.slice(0, -1));

    setTimeout(function () {
      step1.slideDown(300);
      currentInput.focus();
    }, 400);

    $(this)
      .parents(".popup")
      .animate({ scrollTop: $(currentForm).offset().top }, 1000);
  });

  // STEPS RESET
  function resetPopupFormSteps() {
    $(".popup-content__item-btn").removeClass("active");
    $(".popup-content__form-input").val("");
    $(".popup-content__form-step1").slideUp(300);
    $(".popup-content__form-step2").slideUp(300).removeClass("open");
  }
}