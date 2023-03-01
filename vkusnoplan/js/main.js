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
  // WINDOW RESIZE ==================================================================================
  var winWidth = window.innerWidth;

  $(window).resize(function () {
    winWidth = window.innerWidth;

    blocksTransfer(winWidth);
    foodSliderStartOrDestroy(winWidth);
  });
  //=================================================================================================

  // BLOCK TRANSFER ADAPTIVE ========================================================================
  var questionsTitle = $('.questions-title');
  var questionsTitle_mob = $('.questions-title__wrapper-mobile');
  var questionsTitle_desk = $('.questions-title__wrapper-desktop');

  var botImg = $('.bot-img');
  var botImg_mob = $('.bot-img__mobile');
  var botImg_desk = $('.bot-img__desktop');

  var founderContentTop = $('.founder-content__top');
  var founderOcupation = $('.founder-occupation');
  var founderInfo_mob = $('.founder-info__mobile');
  var founderInfo_desk = $('.founder-info__desktop');

  function blocksTransfer(winWidth) {
    if (winWidth <= 1100) {
      blockTransferMobile(questionsTitle, questionsTitle_mob);
    } else {
      blockTransferDesktop(questionsTitle, questionsTitle_desk);
    }

    if (winWidth <= 576) {
      blockTransferMobile(botImg, botImg_mob);
      blockTransferMobile(founderContentTop, founderInfo_mob);
      blockTransferMobile(founderOcupation, founderInfo_mob);
    } else {
      blockTransferDesktop(botImg, botImg_desk);
      blockTransferDesktop(founderContentTop, founderInfo_desk);
      blockTransferDesktop(founderOcupation, founderInfo_desk);
    }
  }
  blocksTransfer(winWidth);

  function blockTransferMobile(el, parent) {
    if (el.length && !el.hasClass('_transfered')) {
      el.appendTo(parent).addClass('_transfered');
    }
  }

  function blockTransferDesktop(el, parent) {
    if (el.length && el.hasClass('_transfered')) {
      el.appendTo(parent).removeClass('_transfered');
    }
  }
  //=================================================================================================

  // GO TO ANCHOR ===================================================================================
  $('.header-menu__list > li > a, .footer-menu__list > li > a').on('click', function (e) {
    var el = $(this).attr('href');

    if (el[0] === '#') {
      e.preventDefault();
      var offset = -$('header').outerHeight() + 30;

      if ($(el).length) {
        $('body,html').animate({
            scrollTop: $(el).offset().top + offset
          },
          800);
      }
    }
  });
  //=================================================================================================

  // MOBILE MENU ====================================================================================
  var header = $('.header');
  var headerMenu = $('.header-menu');

  header.on('click', function (e) {
    if ($(this).hasClass('_overlay')) {
      if (!$(e.target).closest(headerMenu).length ||
        $(e.target).closest('.header-menu__close').length ||
        $(e.target).closest('.header-menu__list > li > a').length ||
        $(e.target).closest('.header-menu__btn').length) {

        $(this).removeClass('_overlay');
        headerMenu.removeClass('is-active');
      }
    }
  });

  $('.burger').on('click', function (e) {
    e.stopPropagation();
    header.addClass('_overlay');
    headerMenu.addClass('is-active');
  });
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
  //================================================================================================

  // TARIFF ROW TITLE CLONE ========================================================================
  var tarifItem = $('.tariff-item');
  var tariffRow = $('.tariff-rows .tariff-row');

  if (tarifItem.length) {
    tarifItem.each(function () {
      for (var i = 0; i < tariffRow.length; i++) {
        var currentTxt = tariffRow[i].textContent;
        $(this).find('.tariff-row__title')[i].textContent = currentTxt;
      }
    });
  }
  //================================================================================================

  // SLIDERS =======================================================================================

  // FOOD SLIDER
  var foodSlider = $('.food-inner');
  var foodSliderSettings = {
    items: 1,
    dots: true,
    nav: false,
    startPosition: 0
  };

  function foodSliderStartOrDestroy(winWidth) {
    if (foodSlider.length) {
      if (winWidth <= 576 && !foodSlider.hasClass('owl-loaded')) {
        foodSlider.owlCarousel(foodSliderSettings);
      } else if (winWidth > 576 && foodSlider.hasClass('owl-loaded')) {
        foodSlider.trigger('destroy.owl.carousel');
      }
    }
  }
  foodSliderStartOrDestroy(winWidth);

  // REVIEWS SLIDER
  var reviewsSlider = $('.reviews-slider');

  if (reviewsSlider.length) {
    reviewsSlider.owlCarousel({
      dots: false,
      nav: true,
      navContainer: '.reviews-slider__nav',
      navText: ['', ''],
      items: 2,
      margin: 20,
      stagePadding: 20,

      center: false,
      autoHeight: false,

      startPosition: 0,
      loop: false,
      smartSpeed: 400,
      autoplay: false,
      slideTransition: 'linear',
      mouseDrag: true,
      touchDrag: true,
      responsiveRefreshRate: 300,
      responsive: {
        0: {
          items: 1,
          dots: true,
          nav: false,
          autoHeight: true
        },
        576: {
          items: 1,
          dots: false,
          nav: true,
          stagePadding: 20,
          autoHeight: false
        },
        1100: {
          items: 2,
          dots: false,
          nav: true,
          stagePadding: 20,
          autoHeight: false
        }
      }
    });
  }
  //=================================================================================================

  // POPUP ==========================================================================================
  var paddingFix = $('.padding-fix');
  var popupOpenBtn = $('[data-popup-open]');

  var timeout = 600; // должен совпадать с длительностью анимации закрытия/открытия поп-апап в CSS
  var unlock = true;

  popupOpenBtn.on('click', function (e) {
    e.preventDefault();
    var currentPopup = '#' + $(this).data('popup-open');

    popupOpen(currentPopup);
  });

  function popupOpen(currentPopup) {
    if ($(currentPopup).length && unlock) {
      $('.popup.is-open').removeClass('is-open');

      $(currentPopup).addClass('is-open');
      bodyLock();
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
      bodyUnlock();
    }
  }
  //=================================================================================================

  // BODY LOCK ======================================================================================
  var body = $('body');

  function bodyLock() {
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

  function bodyUnlock() {
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
});