"use strict";

// TOUCHSCREEN CHECK ==============================================================================
const isMobile = {
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
  let timeout;

  return function () {
    let context = this;
    let args = arguments;

    clearTimeout(timeout);

    timeout = setTimeout(function () {
      timeout = null;
      func.apply(context, args);
    }, time);
  };
}

// POLYFILL =========================================================================================
// scrollTo smooth
!function () {"use strict";function o() {var o,t,e,c,n,l,f = window,p = document;function a(o, t) {this.scrollLeft = o, this.scrollTop = t;}function r(o) {if (null === o || "object" != typeof o || void 0 === o.behavior || "auto" === o.behavior || "instant" === o.behavior) return !0;if ("object" == typeof o && "smooth" === o.behavior) return !1;throw new TypeError("behavior member of ScrollOptions " + o.behavior + " is not a valid value for enumeration ScrollBehavior.");}function i(o, t) {return "Y" === t ? o.clientHeight + l < o.scrollHeight : "X" === t ? o.clientWidth + l < o.scrollWidth : void 0;}function s(o, t) {t = f.getComputedStyle(o, null)["overflow" + t];return "auto" === t || "scroll" === t;}function d(o) {var t = (n() - o.startTime) / e,l = t = 1 < t ? 1 : t,t = .5 * (1 - Math.cos(Math.PI * l)),l = o.startX + (o.x - o.startX) * t,t = o.startY + (o.y - o.startY) * t;o.method.call(o.scrollable, l, t), l === o.x && t === o.y || f.requestAnimationFrame(d.bind(f, o));}function h(o, t, l) {var e,r,i,s = n(),o = o === p.body ? (r = (e = f).scrollX || f.pageXOffset, i = f.scrollY || f.pageYOffset, c.scroll) : (r = (e = o).scrollLeft, i = o.scrollTop, a);d({ scrollable: e, method: o, startTime: s, startX: r, startY: i, x: t, y: l });}"scrollBehavior" in p.documentElement.style && !0 !== f.__forceSmoothScrollPolyfill__ || (t = f.HTMLElement || f.Element, e = 468, c = { scroll: f.scroll || f.scrollTo, scrollBy: f.scrollBy, elementScroll: t.prototype.scroll || a, scrollIntoView: t.prototype.scrollIntoView }, n = f.performance && f.performance.now ? f.performance.now.bind(f.performance) : Date.now, o = f.navigator.userAgent, l = new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(o) ? 1 : 0, f.scroll = f.scrollTo = function () {void 0 !== arguments[0] && (!0 !== r(arguments[0]) ? h.call(f, p.body, void 0 !== arguments[0].left ? ~~arguments[0].left : f.scrollX || f.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : f.scrollY || f.pageYOffset) : c.scroll.call(f, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : f.scrollX || f.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : f.scrollY || f.pageYOffset));}, f.scrollBy = function () {void 0 !== arguments[0] && (r(arguments[0]) ? c.scrollBy.call(f, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : h.call(f, p.body, ~~arguments[0].left + (f.scrollX || f.pageXOffset), ~~arguments[0].top + (f.scrollY || f.pageYOffset)));}, t.prototype.scroll = t.prototype.scrollTo = function () {if (void 0 !== arguments[0]) if (!0 !== r(arguments[0])) {var o = arguments[0].left,t = arguments[0].top;h.call(this, this, void 0 === o ? this.scrollLeft : ~~o, void 0 === t ? this.scrollTop : ~~t);} else {if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted");c.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop);}}, t.prototype.scrollBy = function () {void 0 !== arguments[0] && (!0 !== r(arguments[0]) ? this.scroll({ left: ~~arguments[0].left + this.scrollLeft, top: ~~arguments[0].top + this.scrollTop, behavior: arguments[0].behavior }) : c.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop));}, t.prototype.scrollIntoView = function () {var o, t, l;!0 !== r(arguments[0]) ? (t = (o = function (o) {for (; o !== p.body && !1 === (t = i(l = o, "Y") && s(l, "Y"), l = i(l, "X") && s(l, "X"), t || l);) o = o.parentNode || o.host;var t, l;return o;}(this)).getBoundingClientRect(), l = this.getBoundingClientRect(), o !== p.body ? (h.call(this, o, o.scrollLeft + l.left - t.left, o.scrollTop + l.top - t.top), "fixed" !== f.getComputedStyle(o).position && f.scrollBy({ left: t.left, top: t.top, behavior: "smooth" })) : f.scrollBy({ left: l.left, top: l.top, behavior: "smooth" })) : c.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0]);});}"object" == typeof exports && "undefined" != typeof module ? module.exports = { polyfill: o } : o();}();
//===================================================================================================

document.addEventListener("DOMContentLoaded", function () {
  // BODY LOCK/UNLOCK ===============================================================================
  const body = document.querySelector("body");
  const paddingFix = document.querySelectorAll(".padding-fix");

  function bodyLock() {
    const paddingFixValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

    if (paddingFix.length > 0) {
      for (let i = 0; i < paddingFix.length; i++) {
        const el = paddingFix[i];

        el.style.paddingRight = paddingFixValue;
      }
    }

    body.style.paddingRight = paddingFixValue;
    body.classList.add("is-locked");

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  function bodyUnlock() {
    setTimeout(() => {
      if (paddingFix.length > 0) {
        for (let i = 0; i < paddingFix.length; i++) {
          const el = paddingFix[i];

          el.style.paddingRight = "0px";
        }
      }

      body.style.paddingRight = "0px";
      body.classList.remove("is-locked");
    }, timeout);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  // WINDOW RESIZE ==================================================================================
  let winHeight = window.innerHeight;
  let winWidth = window.innerWidth;

  window.addEventListener("resize", debounce(_onResizeWindow, 300));

  function _onResizeWindow() {
    winHeight = window.innerHeight;
    winWidth = window.innerWidth;

    adaptiveResultSlider(winWidth);
    adaptivePortfolioSliders(winWidth);
    adaptiveReviewsSlider(winWidth);
  }

  // WINDOW MOUSEMOVE ===============================================================================
  if (!isMobile.any()) {
    window.addEventListener("mousemove", _onMouseMove);

    const aboutImg = document.querySelector(".about-img > span");
    const reviewsImg = document.querySelector(".reviews-img > span");

    function _onMouseMove(e) {
      const x = e.pageX;
      const y = e.pageY;

      const xPrlx = -(e.clientX - winWidth / 2) * 0.025;
      const yPrlx = -(e.clientY - winHeight / 2) * 0.025;

      requestAnimationFrame(function () {
        runnerMove(x, y);
        parallax(aboutImg, xPrlx, yPrlx);
        parallax(reviewsImg, xPrlx, yPrlx);
      });
    }

    // PARALLAX
    function parallax(el, x, y) {
      let reverse = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      if (reverse) {
        el.style.top = "auto";
        el.style.left = "auto";
        el.style.bottom = y + "px";
        el.style.right = x + "px";
      } else {
        el.style.top = y + "px";
        el.style.left = x + "px";
      }
    }

    // RUNNER
    const mainBlock = document.querySelector(".main");
    const runner = mainBlock.querySelector(".runner");

    function runnerMove(x, y) {
      const index = Math.abs(mainBlock.getBoundingClientRect().top) - window.pageYOffset;
      runner.style.transform = "translate3d(".concat(x, "px, ").concat(y + index, "px, 0)");
    }
  }

  // LANGUAGE MENU ==================================================================================
  const headerLanguageTrigger = document.querySelector(".header-language__trigger");

  headerLanguageTrigger.addEventListener("click", function () {
    this.classList.toggle("is-active");
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".header-language__trigger")) {
      headerLanguageTrigger.classList.remove("is-active");
    }
  });

  // THEME TRIGGER ==================================================================================
  const headerThemeTrigger = document.querySelector(".header-theme__trigger");

  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    const themeTypeLS = localStorage.getItem("ikc-theme");

    if (themeTypeLS) {
      document.documentElement.className = themeTypeLS;

      switch (themeTypeLS) {
        case "_light-theme":
          headerThemeTrigger.classList.add("is-active");
          break;
        case "_dark-theme":
          headerThemeTrigger.classList.remove("is-active");
          break;
      }
    } else {
      setTheme("_dark-theme");
    }
  }

  headerThemeTrigger.addEventListener("click", function () {
    this.classList.toggle("is-active");
    toggleTheme();
  });

  function toggleTheme() {
    if (localStorage.getItem("ikc-theme") === "_dark-theme") {
      setTheme("_light-theme");
    } else {
      setTheme("_dark-theme");
    }
  }

  function setTheme(themeName) {
    localStorage.setItem("ikc-theme", themeName);
    document.documentElement.className = themeName;
  }

  // BURGER-MENU ====================================================================================
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");

  burger.addEventListener("click", function () {
    this.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });

  function closeBurgerMenu() {
    if (menu.classList.contains("is-active")) {
      menu.classList.remove("is-active");
      burger.classList.remove("is-active");
    }
  }

  // GO-TO ANCHOR ===================================================================================
  const gotoLinks = document.querySelectorAll("[data-goto]");

  function initGoTo() {
    if (document.querySelector(".main").classList.contains("fullpage-init")) {
      gotoLinks.forEach((gotoLink) => {
        gotoLink.removeEventListener("click", onGoToLinkClick);
      });
    } else {
      gotoLinks.forEach((gotoLink) => {
        gotoLink.removeEventListener("click", onGoToLinkClick);
        gotoLink.addEventListener("click", onGoToLinkClick);
      });
    }
  }
  if (winWidth <= 1100) {
    initGoTo();
  }

  function onGoToLinkClick(e) {
    e.preventDefault();
    const gotoLink = e.target;

    if (gotoLink.dataset.goto && document.querySelector(gotoLink.dataset.goto)) {
      const gotoBlock = document.querySelector(gotoLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset;

      closeBurgerMenu();

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
    }
  }

  // SCROLLDOWN BTN =================================================================================
  const scrollDownBtn = document.querySelector(".pages-menu__scrolldown");

  scrollDownBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (this.classList.contains("pages-menu__scrolldown--lastpage")) {
      $.fn.fullpage.moveTo("about");
      this.classList.remove("pages-menu__scrolldown--lastpage");
      this.classList.add("pages-menu__scrolldown--default");
    } else {
      $.fn.fullpage.moveSectionDown();
    }
  });

  // RESULT SLIDER ==================================================================================
  const resultSlider = document.querySelector(".result-slider");
  const resultSliderSlides = resultSlider.querySelectorAll(".result-slider__slide");
  const resultSliderNavItems = document.querySelectorAll(".result-slider__nav-item");
  let resultSliderHeight = 0;

  function adaptiveResultSlider(winWidth) {
    if (winWidth <= 576) {
      resultSlider.classList.add("_mobile");
      setResultSliderHeight_mob();
    } else {
      resultSlider.classList.remove("_mobile");
      setResultSliderHeight_desk();
    }
  }
  adaptiveResultSlider(winWidth);

  resultSliderNavItems.forEach((navItem, index) => {
    navItem.addEventListener("click", () => {
      for (let i = 0; i < resultSliderNavItems.length; i++) {
        resultSliderNavItems[i].classList.remove("is-active");
        resultSliderNavItems[i].removeAttribute("tabindex");
        resultSliderSlides[i].classList.remove("is-active");
      }

      navItem.classList.add("is-active");
      navItem.tabIndex = -1;

      resultSliderSlides[index].classList.add("is-active");

      if (resultSlider.classList.contains("_mobile")) {
        setResultSliderHeight_mob();
      }
    });
  });

  function setResultSliderHeight_mob() {
    resultSliderSlides.forEach((slide) => {
      if (slide.classList.contains("is-active")) {
        resultSliderHeight = slide.scrollHeight;
      }
    });
    resultSlider.style.height = resultSliderHeight + "px";
  }

  function setResultSliderHeight_desk() {
    resultSliderSlides.forEach((slide) => {
      if (slide.scrollHeight > resultSliderHeight) {
        resultSliderHeight = slide.scrollHeight;
      }
    });
    resultSlider.style.height = resultSliderHeight + "px";
  }
  //=================================================================================================

  // SWIPER SLIDERS =================================================================================
  // PORTFOLIO SLIDER
  const portfolioSliderNavSettings = {
    direction: "vertical",
    spaceBetween: 12,
    slidesPerView: "auto",
    speed: 1000,
    freeMode: false,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    observer: true,
    observerParents: true,
    observerSlideChildren: true,
    watchOverflow: true,
    navigation: {
      nextEl: ".portfolio-slider__btn-next",
      prevEl: ".portfolio-slider__btn-prev",
    },
  };

  const portfolioSliderSettings_desk = {
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },

    allowTouchMove: false,
    speed: 800,
    slidersPerView: 1,
    spaceBetween: 5,
    observer: true,
    observerParents: true,
    observerSlideChildren: true,
    watchOverflow: true,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
    },
  };

  const portfolioSliderSettings_mob = {
    //effect: "flip",
    allowTouchMove: true,
    speed: 1000,
    slidersPerView: 1,
    spaceBetween: 40,
    autoHeight: true,
    observer: true,
    observerParents: true,
    observerSlideChildren: true,
    watchOverflow: true,
    navigation: {
      nextEl: ".portfolio-slider__bottom-nav > .swiper-btn__next",
      prevEl: ".portfolio-slider__bottom-nav > .swiper-btn__prev",
    },

    pagination: {
      el: ".portfolio-slider__bottom-nav > .swiper-slides__counter",
      type: "fraction",
      clickable: true,

      formatFractionCurrent: function (number) {
        if (number < 10) {
          number = "0" + number;
        }
        return number;
      },
      formatFractionTotal: function (number) {
        if (number < 10) {
          number = "0" + number;
        }
        return number;
      },
    },
  };

  const portfolioSliderBlock = document.querySelector(".portfolio-slider");
  const portfolioSliderNavBlock = document.querySelector(".portfolio-slider__nav");
  let portfolioSlider;
  let portfolioSliderNav;

  initPortfolioSliders(winWidth);

  function initPortfolioSliders(winWidth) {
    if (winWidth > 1050) {
      portfolioSliderNav = new Swiper(".portfolio-slider__nav", portfolioSliderNavSettings);

      portfolioSlider = new Swiper(".portfolio-slider", portfolioSliderSettings_desk);
      portfolioSlider.thumbs.swiper = portfolioSliderNav;
      portfolioSlider.thumbs.init();
      portfolioSliderBlock.classList.add("_desktop");
    } else {
      portfolioSlider = new Swiper(".portfolio-slider", portfolioSliderSettings_mob);
      portfolioSliderBlock.classList.add("_mobile");
    }
  }

  function adaptivePortfolioSliders(winWidth) {
    if (winWidth <= 1050) {
      if (portfolioSliderNavBlock.classList.contains("swiper-container-initialized")) {
        portfolioSliderNav.destroy();
      }

      portfolioSliderBlock.classList.remove("_desktop");
      if (!portfolioSliderBlock.classList.contains("_mobile")) {
        portfolioSliderBlock.classList.add("_mobile");
        portfolioSlider.destroy();
        portfolioSlider = new Swiper(".portfolio-slider", portfolioSliderSettings_mob);
      }
    } else {
      if (!portfolioSliderNavBlock.classList.contains("swiper-container-initialized")) {
        portfolioSliderNav = new Swiper(".portfolio-slider__nav", portfolioSliderNavSettings);
      }

      portfolioSliderBlock.classList.remove("_mobile");
      if (!portfolioSliderBlock.classList.contains("_desktop")) {
        portfolioSliderBlock.classList.add("_desktop");
        portfolioSlider.destroy();
        portfolioSlider = new Swiper(".portfolio-slider", portfolioSliderSettings_desk);
        portfolioSlider.thumbs.swiper = portfolioSliderNav;
        portfolioSlider.thumbs.init();
      }
    }
  }

  // REVIEWS SLIDER
  const reviewsSliderBlock = document.querySelector(".reviews-slider");
  let reviewsSlider;

  const reviewsSliderOptionsDefault = {
    observer: true,
    observerParents: true,
    watchOverflow: true,
    observerSlideChildren: true,
    lazy: false,
    slidesPerView: 1,
    spaceBetween: 40,
    speed: 1000,
    autoHeight: false,
    freeMode: false,
    loop: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
    },

    navigation: {
      nextEl: ".reviews-slider__nav > .swiper-btn__next",
      prevEl: ".reviews-slider__nav > .swiper-btn__prev",
    },

    pagination: {
      el: ".reviews-slider__nav > .swiper-slides__counter",
      type: "fraction",
      clickable: true,

      formatFractionCurrent: function (number) {
        if (number < 10) {
          number = "0" + number;
        }
        return number;
      },
      formatFractionTotal: function (number) {
        if (number < 10) {
          number = "0" + number;
        }
        return number;
      },
    },
  };

  const reviewsSliderOptions_desk = {
    ...reviewsSliderOptionsDefault,
    effect: "flip",
    autoHeight: false,
    allowTouchMove: false,
  };

  const reviewsSliderOptions_mob = {
    ...reviewsSliderOptionsDefault,
    autoHeight: true,
    allowTouchMove: true,
  };

  initReviewsSlider(winWidth);
  function initReviewsSlider(winWidth) {
    if (winWidth > 1050) {
      reviewsSlider = new Swiper(reviewsSliderBlock, reviewsSliderOptions_desk);
      reviewsSliderBlock.classList.add("_desktop");
    } else {
      reviewsSlider = new Swiper(reviewsSliderBlock, reviewsSliderOptions_mob);
      reviewsSliderBlock.classList.add("_mobile");
    }
  }

  function adaptiveReviewsSlider(winWidth) {
    if (winWidth > 1050) {
      if (reviewsSliderBlock.classList.contains("_mobile")) {
        reviewsSlider.destroy();
        reviewsSlider = new Swiper(reviewsSliderBlock, reviewsSliderOptions_desk);
        reviewsSliderBlock.classList.remove("_mobile");
        reviewsSliderBlock.classList.add("_desktop");
      }
    } else {
      if (reviewsSliderBlock.classList.contains("_desktop")) {
        reviewsSlider.destroy();
        reviewsSlider = new Swiper(reviewsSliderBlock, reviewsSliderOptions_mob);
        reviewsSliderBlock.classList.remove("_desktop");
        reviewsSliderBlock.classList.add("_mobile");
      }
    }
  }

  // FULLPAGE =======================================================================================
  if (winWidth > 1100) {
    loadJQuery();
  }

  function loadJQuery() {
    const jq = document.createElement("script");
    jq.src = "./assets/js/jquery-3.6.0.min.js";
    jq.onload = loadFullPage;
    document.body.appendChild(jq);
  }

  function loadFullPage() {
    const fpStyles = document.createElement("link");
    fpStyles.rel = "stylesheet";
    fpStyles.href = "./assets/css/vendor/jquery.fullpage.min.css";
    const fpScript = document.createElement("script");
    fpScript.src = "./assets/js/vendor/jquery.fullpage.min.js";
    fpScript.onload = initFullPage;
    document.body.appendChild(fpStyles);
    document.body.appendChild(fpScript);
  }

  function initFullPage() {
    window.addEventListener("resize", debounce(_onResizeWindow, 300));

    function _onResizeWindow() {
      const winHeight = window.innerHeight;
      const winWidth = window.innerWidth;

      fullPageResetStyles(winWidth, winHeight);
    }

    const fullPageSettings = {
      animateAnchor: false,
      lazyLoading: false,
      lockAnchors: false,
      sectionSelector: ".section",
      normalScrollElements: "#baguetteBox-overlay",
      menu: "#menu-list, #pages-menu__list",
      anchors: ["about", "result", "portfolio", "reviews", "contacts"],
      verticalCentered: false,
      scrollingSpeed: 1000,
      fitToSectionDelay: 1800,
      onLeave: function (index, nextIndex, direction) {
        changePagesMenuMarkerPosition(nextIndex);
      },
      afterLoad: function (anchorLink, index) {
        if (index === $(".section").length) {
          scrollDownBtn.classList.add("pages-menu__scrolldown--lastpage");
        } else if (scrollDownBtn.classList.contains("pages-menu__scrolldown--lastpage")) {
          scrollDownBtn.classList.remove("pages-menu__scrolldown--lastpage");
          scrollDownBtn.classList.add("pages-menu__scrolldown--default");
        }

        $(".main").addClass("fullpage-init");
        fullPageResetStyles(winWidth, winHeight);
      },
    };

    // START FULLPAGE
    $(".main").fullpage(fullPageSettings);

    // RESET FULLPAGE STYLES AFTER RESIZE
    function fullPageResetStyles(winWidth, winHeight) {
      if (isMobile.any()) {
        if ($(".main").hasClass("fullpage-init")) {
          $.fn.fullpage.destroy("all");
          $(".main").removeClass("fullpage-init");
          $(".menu-list > li > a").removeClass("active");
        }
        return;
      }

      if ((winWidth > 1620 && winHeight < 860) || (winWidth <= 1620 && winWidth > 1400 && winHeight < 710) || (winWidth <= 1400 && winHeight < 570) || winWidth <= 1100) {
        if ($(".main").hasClass("fullpage-init")) {
          $.fn.fullpage.destroy("all");
          $(".main").removeClass("fullpage-init");
          $(".pages-menu").addClass("is-hidden");
          $(".menu-list > li > a").removeClass("active");
        }
      } else {
        $(".pages-menu").removeClass("is-hidden");

        if (!$(".main").hasClass("fullpage-init")) {
          if ($(".main").hasClass("fp-destroyed")) {
            $(".main").fullpage(fullPageSettings);
          } else {
            loadJQuery();
          }
        }
      }

      initGoTo();
    }

    // PAGES-MENU MARKER POSITION
    const pagesMenuItems = document.querySelectorAll(".pages-menu__list-item > a");
    const pagesMenuMarker = document.querySelector(".pages-menu__marker");
    const pagesMenuItemStep = 100 / pagesMenuItems.length;

    function changePagesMenuMarkerPosition(index) {
      const currentPercent = (index - 1) * pagesMenuItemStep;
      pagesMenuMarker.style.top = currentPercent + "%";
    }
  }

  // FORMS ==========================================================================================
  // CONTACTS FORM
  const contactsForm = document.querySelector(".contacts-form");
  const contactsFormFields = contactsForm.querySelectorAll(".contacts-form__input, .contacts-form__textarea");

  contactsFormFields.forEach((field) => {
    field.addEventListener("input", function () {
      if (this.value !== "") {
        this.classList.add("is-valid");
      } else {
        this.classList.remove("is-valid");
      }
    });
  });

  contactsForm.addEventListener("submit", formSend);

  // SEND FORM
  async function formSend(e) {
    e.preventDefault();
    const form = e.target;
    const error = formValidate(form);
    const formData = new FormData(form);

    if (error === 0) {
      form.classList.remove("_err");
      form.classList.add("is-sending");

      // для примера отправки письма
      setTimeout(() => {
        form.classList.remove("is-sending");
        popupOpen(document.querySelector("#popup-thanks"));
        form.reset();
        contactsFormFields.forEach((field) => {
          field.classList.remove("is-valid");
        });        
      }, 2000);

      // const response = await fetch("mail.php", {
      //   method: "POST",
      //   body: formData,
      // });

      // if (response.ok) {
      //   form.classList.remove("is-sending");
      //   popupOpen(document.querySelector("#popup-thanks"));
      //   form.reset();
      //   contactsFormFields.forEach((field) => {
      //     field.classList.remove("is-valid");
      //   });
      // } else {
      //   form.classList.remove("is-sending");
      //   popupOpen(document.querySelector("#popup-error"));
      // }
    } else {
      form.classList.add("_err");
    }
  }

  // VALIDATE FORM
  function formValidate(form) {
    const formRequiredFields = form.querySelectorAll("._req");
    let error = 0;

    formRequiredFields.forEach((field) => {
      formRemoveError(field);

      if (field.getAttribute("name") === "email") {
        if (emailValidation(field)) {
          formAddError(field);
          error++;
        }
      } else if (field.getAttribute("type") === "checkbox" && field.checked === false) {
        formAddError(field);
        error++;
      } else {
        if (field.value === "") {
          formAddError(field);
          error++;
        }
      }
    });

    return error;
  }

  function formAddError(field) {
    field.classList.add("_err");
  }

  function formRemoveError(field) {
    field.classList.remove("_err");
  }

  function emailValidation(field) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(field.value);
  }

  // POPUP ==========================================================================================
  const popupOpenBtn = document.querySelectorAll("[data-popup-open]");
  const popupCloseBtn = document.querySelectorAll("[data-popup-close]");

  const timeout = 800; // ОБЯЗАТЕЛЬНО должен совпадать с длительностью анимации в CSS
  let unlock = true;

  if (popupOpenBtn.length > 0) {
    for (let i = 0; i < popupOpenBtn.length; i++) {
      popupOpenBtn[i].addEventListener("click", function (e) {
        e.preventDefault();
        const popupName = this.dataset.popupOpen;
        const currentPopup = document.getElementById(popupName);

        if (currentPopup) {
          popupOpen(currentPopup);
        }
      });
    }
  }

  if (popupCloseBtn.length > 0) {
    for (let i = 0; i < popupCloseBtn.length; i++) {
      const el = popupCloseBtn[i];

      el.addEventListener("click", function (e) {
        e.preventDefault();
        popupClose(this.closest(".popup"));
      });
    }
  }

  function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
      const popupActive = document.querySelector(".popup.is-open");

      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }

      currentPopup.classList.add("is-open");
      currentPopup.addEventListener("click", function (e) {
        if (!e.target.closest(".popup-content")) {
          popupClose(e.target.closest(".popup"));
        }
      });
    }
  }

  function popupClose(popupActive) {
    let doUnlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (unlock) {
      popupActive.classList.remove("is-open");

      if (doUnlock) {
        bodyUnlock();
      }
    }
  }

  document.addEventListener("keydown", function (e) {
    if (e.which === 27) {
      const popupActive = document.querySelector(".popup.is-open");
      if (popupActive) {
        popupClose(popupActive);
      }
    }
  });

  // BAGUETTEBOX ====================================================================================
  baguetteBox.run(".baguetteBox-gallery", {
    buttons: true,
    afterShow: function (e) {
      body.classList.add("is-locked");
    },
    afterHide: function () {
      body.classList.remove("is-locked");
    },
  });
});
