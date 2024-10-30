"use strict";
// POLYFILLs
!function () {"use strict";function o() {var o,t,e,c,n,l,f = window,p = document;function a(o, t) {this.scrollLeft = o, this.scrollTop = t;}function r(o) {if (null === o || "object" != typeof o || void 0 === o.behavior || "auto" === o.behavior || "instant" === o.behavior) return !0;if ("object" == typeof o && "smooth" === o.behavior) return !1;throw new TypeError("behavior member of ScrollOptions " + o.behavior + " is not a valid value for enumeration ScrollBehavior.");}function i(o, t) {return "Y" === t ? o.clientHeight + l < o.scrollHeight : "X" === t ? o.clientWidth + l < o.scrollWidth : void 0;}function s(o, t) {t = f.getComputedStyle(o, null)["overflow" + t];return "auto" === t || "scroll" === t;}function d(o) {var t = (n() - o.startTime) / e,l = t = 1 < t ? 1 : t,t = .5 * (1 - Math.cos(Math.PI * l)),l = o.startX + (o.x - o.startX) * t,t = o.startY + (o.y - o.startY) * t;o.method.call(o.scrollable, l, t), l === o.x && t === o.y || f.requestAnimationFrame(d.bind(f, o));}function h(o, t, l) {var e,r,i,s = n(),o = o === p.body ? (r = (e = f).scrollX || f.pageXOffset, i = f.scrollY || f.pageYOffset, c.scroll) : (r = (e = o).scrollLeft, i = o.scrollTop, a);d({ scrollable: e, method: o, startTime: s, startX: r, startY: i, x: t, y: l });}"scrollBehavior" in p.documentElement.style && !0 !== f.__forceSmoothScrollPolyfill__ || (t = f.HTMLElement || f.Element, e = 468, c = { scroll: f.scroll || f.scrollTo, scrollBy: f.scrollBy, elementScroll: t.prototype.scroll || a, scrollIntoView: t.prototype.scrollIntoView }, n = f.performance && f.performance.now ? f.performance.now.bind(f.performance) : Date.now, o = f.navigator.userAgent, l = new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(o) ? 1 : 0, f.scroll = f.scrollTo = function () {void 0 !== arguments[0] && (!0 !== r(arguments[0]) ? h.call(f, p.body, void 0 !== arguments[0].left ? ~~arguments[0].left : f.scrollX || f.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : f.scrollY || f.pageYOffset) : c.scroll.call(f, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : f.scrollX || f.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : f.scrollY || f.pageYOffset));}, f.scrollBy = function () {void 0 !== arguments[0] && (r(arguments[0]) ? c.scrollBy.call(f, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : h.call(f, p.body, ~~arguments[0].left + (f.scrollX || f.pageXOffset), ~~arguments[0].top + (f.scrollY || f.pageYOffset)));}, t.prototype.scroll = t.prototype.scrollTo = function () {if (void 0 !== arguments[0]) if (!0 !== r(arguments[0])) {var o = arguments[0].left,t = arguments[0].top;h.call(this, this, void 0 === o ? this.scrollLeft : ~~o, void 0 === t ? this.scrollTop : ~~t);} else {if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted");c.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop);}}, t.prototype.scrollBy = function () {void 0 !== arguments[0] && (!0 !== r(arguments[0]) ? this.scroll({ left: ~~arguments[0].left + this.scrollLeft, top: ~~arguments[0].top + this.scrollTop, behavior: arguments[0].behavior }) : c.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop));}, t.prototype.scrollIntoView = function () {var o, t, l;!0 !== r(arguments[0]) ? (t = (o = function (o) {for (; o !== p.body && !1 === (t = i(l = o, "Y") && s(l, "Y"), l = i(l, "X") && s(l, "X"), t || l);) o = o.parentNode || o.host;var t, l;return o;}(this)).getBoundingClientRect(), l = this.getBoundingClientRect(), o !== p.body ? (h.call(this, o, o.scrollLeft + l.left - t.left, o.scrollTop + l.top - t.top), "fixed" !== f.getComputedStyle(o).position && f.scrollBy({ left: t.left, top: t.top, behavior: "smooth" })) : f.scrollBy({ left: l.left, top: l.top, behavior: "smooth" })) : c.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0]);});}"object" == typeof exports && "undefined" != typeof module ? module.exports = { polyfill: o } : o();}();

// TOUCHSCREEN CHECK
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
  }
};

if (isMobile.any()) {
  document.body.classList.add("_touchscreen");
} else {
  document.body.classList.add("_desktop");
}

//WEBP checkbrowser
function testWebP(callback) {
  let webP = new Image();
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

// BODY lock/unlock
const body = document.querySelector("body");
const paddingFix = document.querySelectorAll("[data-padding-fix]");
const paddingFixPFR = document.querySelectorAll("[data-padding-fix-pfr]");
let bodyLockStatus = true;

function bodyLock() {let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 400;
  const paddingFixValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

  if (paddingFix.length > 0) {
    for (let i = 0; i < paddingFix.length; i++) {
      paddingFix[i].style.paddingRight = paddingFixValue;
    }
  }

  if (paddingFixPFR.length > 0) {
    for (let i = 0; i < paddingFixPFR.length; i++) {
      paddingFixPFR[i].style.marginRight = paddingFixValue;
    }
  }

  body.style.paddingRight = paddingFixValue;
  body.classList.add("_locked");

  bodyLockStatus = false;
  setTimeout(function () {
    bodyLockStatus = true;
  }, delay);
}

function bodyUnlock() {let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 400;
  setTimeout(() => {
    if (paddingFix.length > 0) {
      for (let i = 0; i < paddingFix.length; i++) {
        paddingFix[i].style.paddingRight = "0px";
      }
    }

    if (paddingFixPFR.length > 0) {
      for (let i = 0; i < paddingFixPFR.length; i++) {
        paddingFixPFR[i].style.marginRight = "0px";;
      }
    }

    body.style.paddingRight = "0px";
    body.classList.remove("_locked");
  }, delay);

  bodyLockStatus = false;
  setTimeout(function () {
    bodyLockStatus = true;
  }, delay);
}

// DOM ON LOAD
document.addEventListener("DOMContentLoaded", function () {
  initLazyLoad();
  initHeader();
  initGoto();
  //initSideMenuObserver();
  initTextClamp();
  initTrips();
  initEvents();
  initInputMask();

  if (!isMobile.any()) {
    initCustomSelect();
  }

  // MODALS
  const popupOpenBtn = document.querySelectorAll("[data-popup-open]");
  const popupCloseBtn = document.querySelectorAll("[data-popup-close]");
  const popupAnimationTime = 800;

  if (popupOpenBtn.length > 0) {
    for (let i = 0; i < popupOpenBtn.length; i++) {
      popupOpenBtn[i].addEventListener("click", function (e) {
        e.preventDefault();
        const popupName = this.dataset.popupOpen;
        const currentPopup = document.getElementById(popupName);

        popupOpen(currentPopup, this);
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

  function popupOpen(currentPopup, currentBtn) {
    if (currentPopup && bodyLockStatus) {
      const popupActive = document.querySelector(".popup._open");

      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock(popupAnimationTime);
      }

      if (currentBtn) {
        const popupFormID = currentBtn.dataset.popupFormId;

        if (popupFormID && popupFormID !== "") {
          currentPopup.querySelector("input[name='form_id']").value = popupFormID;
        }
      }

      currentPopup.classList.add("_open");
      currentPopup.addEventListener("click", function (e) {
        if (!e.target.closest(".popup-content")) {
          popupClose(e.target.closest(".popup"));
        }
      });
    }
  }

  function popupClose(popupActive) {let doUnlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (bodyLockStatus) {
      popupActive.classList.remove("_open");

      if (doUnlock) {
        bodyUnlock(popupAnimationTime);
      }
    }
  }

  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 27) {
      const popupActive = document.querySelector(".popup._open");
      if (popupActive) {
        popupClose(popupActive);
      }
    }
  });

  // FORMS
  const forms = document.querySelectorAll(".form");

  for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", formSend);
  }

  async function formSend(e) {
    e.preventDefault();
    const thankYou = document.querySelector("#popup-thanks");
    const error = formValidate(this);
    const formData = new FormData(this);

    if (error === 0) {
      this.classList.add("_sending");

      // formData.append("action", "send_email_function");
      // const response = await fetch("/wp-admin/admin-ajax.php", {
      //   method: "POST",
      //   body: formData,
      // });

      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ ok: true });
        }, 2000);
      });

      if (response.ok) {
        this.reset();
        this.classList.remove("_sending");
        popupOpen(thankYou);
      } else {
        alert("Error! Please try again later.");
        this.classList.remove("_sending");
      }
    }
  }

  function formValidate(form) {
    const formRequiredFields = form.querySelectorAll("._required");
    let error = 0;

    for (let j = 0; j < formRequiredFields.length; j++) {
      const input = formRequiredFields[j];

      formRemoveError(input);

      if (input.classList.contains("form-input--email")) {
        if (emailValidation(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.classList.contains("form-input--phone")) {
        if (input.value.length !== 15) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.classList.add("_error");
  }

  function formRemoveError(input) {
    input.classList.remove("_error");
  }

  function emailValidation(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
});

// WINDOW ON LOAD
window.addEventListener("load", function () {
  setTimeout(function () {
    document.documentElement.classList.add('_loaded');
  }, 0);

  AOS.init({
    disable: function () {
      const maxWidth = 1024;
      return window.innerWidth <= maxWidth;
    },
    duration: 800,
    easing: "ease-out",
    anchorPlacement: "top-bottom",
    once: true
  });
});

// FUNCTIONS
function initLazyLoad() {
  if ("loading" in HTMLImageElement.prototype) {
    const images = document.querySelectorAll("img[data-src], source[data-srcset]");
    for (var i = 0; i < images.length; i++) {
      if (images[i].dataset.src) {
        images[i].src = images[i].dataset.src;
        images[i].removeAttribute("data-src");
      } else if (images[i].dataset.srcset) {
        images[i].srcset = images[i].dataset.srcset;
        images[i].removeAttribute("data-srcset");
      }
    }
  } else {
    const script = document.createElement("script");
    //script.src = "/wp-content/themes/theme/static/js/libs/lazysizes.min.js";
    script.src = "js/libs/lazysizes.min.js";
    document.body.appendChild(script);
  }
}

function initHeader() {
  // Menu-burger
  const headerBurgerBtn = document.querySelector('.header-burger__btn');
  const burgerMenu = document.querySelector('.burger-menu');

  if (headerBurgerBtn && burgerMenu) {
    const burgerMenuCloseBtn = burgerMenu.querySelector('.burger-menu__close');

    headerBurgerBtn.addEventListener('click', () => {
      bodyLock();
      burgerMenu.classList.add('_active');
    });

    burgerMenuCloseBtn.addEventListener('click', () => {
      bodyUnlock();
      burgerMenu.classList.remove('_active');
    });
  }
}

function initGoto() {
  const gotoLinks = document.querySelectorAll("[data-goto]");

  if (gotoLinks.length) {
    gotoLinks.forEach((gotoLink) => {
      gotoLink.addEventListener("click", onGoToLinkClick);
    });

    function onGoToLinkClick(e) {
      e.preventDefault();

      if (this.dataset.goto && document.querySelector(this.dataset.goto)) {
        const gotoBlock = document.querySelector(this.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
          top: gotoBlockValue,
          behavior: "smooth"
        });
      }
    }
  }
}

/* function initSideMenuObserver() {
  const sideMenuList = document.querySelector('.side-menu__list');

  const observerOptions = {
    threshold: 0.5,
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const entryID = entry.target.getAttribute('data-observer');
        const matchedMenuItem = sideMenuList.querySelector('li > a[data-observer-link="' + entryID + '"]');

        if(matchedMenuItem) {
          matchedMenuItem.classList.add('_active');
        }
      } else {
        const activeMenu  = sideMenuList.querySelector('li > a._active');

        if(activeMenu) {
          activeMenu.classList.remove('_active');
        }
      }
    });
  }, observerOptions);
  
  const observerBlocks = document.querySelectorAll('[data-observer]');

  if(observerBlocks.length) {
    observerBlocks.forEach(elem => {
      observer.observe(elem);
    });
  }
} */

function initTextClamp() {
  const clampTexts = document.querySelectorAll("[data-text-rows]");

  if (clampTexts.length) {
    textTruncate(clampTexts);

    function textTruncate(elements) {
      elements.forEach((element) => {
        const maxRows = Number(element.dataset.textRows);
        $clamp(element, { clamp: maxRows });
      });
    }
  }
}

function initTrips() {
  // TRIPS SLIDER
  const tripSliderElem = document.querySelector(".trips-slider");
  const tripSliderBGElem = document.querySelector(".trips-slider__bg");

  if (tripSliderElem && tripSliderBGElem) {
    const tripSliderBGSettings = {
      observer: true,
      observerParents: true,
      watchOverflow: true,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
      speed: 800,
      freeMode: false,
      allowTouchMove: false,
      loop: false,
      effect: "fade",
      fadeEffect: {
        crossFade: true
      }
    };
    const tripSliderBG = new Swiper(tripSliderBGElem, tripSliderBGSettings);

    const tripSliderMainSettings = {
      observer: true,
      observerParents: true,
      watchOverflow: true,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
      speed: 800,
      freeMode: false,
      allowTouchMove: true,
      loop: false,

      navigation: {
        nextEl: ".trips-slider__nav .swiper-btn-next",
        prevEl: ".trips-slider__nav .swiper-btn-prev"
      },

      pagination: {
        el: ".trips-slider__pages",
        type: "fraction",

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
        }
      },

      breakpoints: {
        0: {
          spaceBetween: 40
        },
        992: {
          spaceBetween: 0
        }
      },

      controller: {
        control: tripSliderBG
      }
    };
    let tripSliderMain = new Swiper(tripSliderElem, tripSliderMainSettings);

    // TRIPS GRID TOGGLER
    const tripsTogglerBtn = document.querySelector(".trips-page__controls-btn");

    if (tripsTogglerBtn) {
      tripsTogglerBtn.addEventListener("click", function () {
        tripsTogglerBtn.classList.toggle("_active");
        tripSliderElem.classList.toggle('slider-grid');

        if (tripsTogglerBtn.classList.contains("_active")) {
          disableMainSlider();
        } else {
          enableMainSlider();
        }
      });
    }

    function enableMainSlider() {
      tripSliderMain = new Swiper(tripSliderElem, tripSliderMainSettings);
    }

    function disableMainSlider() {
      if (tripSliderMain !== undefined) {
        tripSliderMain.destroy(true, true);
        tripSliderBG.slideTo(0);
      }
    }
  }
}

function initEvents() {
  // EVENTS SLIDER
  const eventsSlider = document.querySelector(".events-slider");
  const eventsSliderBG = document.querySelector(".events-slider__bg");

  if (eventsSlider && eventsSliderBG) {
    const eventsSliderBGSwiperSettings = {
      observer: true,
      observerParents: true,
      watchOverflow: true,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
      speed: 800,
      freeMode: false,
      allowTouchMove: false,
      loop: false,
      effect: "fade",
      fadeEffect: {
        crossFade: true
      }
    };
    const eventsSliderBGSwiper = new Swiper(eventsSliderBG, eventsSliderBGSwiperSettings);

    const eventsSliderMainSettings = {
      observer: true,
      observerParents: true,
      watchOverflow: true,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
      speed: 800,
      freeMode: false,
      allowTouchMove: true,
      loop: false,

      navigation: {
        nextEl: ".events-slider__nav .swiper-btn-next",
        prevEl: ".events-slider__nav .swiper-btn-prev"
      },

      pagination: {
        el: ".events-slider__pages",
        type: "fraction",

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
        }
      },

      breakpoints: {
        0: {
          spaceBetween: 40
        },
        992: {
          spaceBetween: 0
        }
      },

      controller: {
        control: eventsSliderBGSwiper
      }
    };
    let eventsSliderMain = new Swiper(eventsSlider, eventsSliderMainSettings);

    // EVENTS GRID TOGGLER
    const eventsTogglerBtn = document.querySelector(".events-page__controls-btn");

    if (eventsTogglerBtn) {
      eventsTogglerBtn.addEventListener("click", () => {
        eventsTogglerBtn.classList.toggle("_active");
        eventsSlider.classList.toggle('slider-grid');

        if (eventsTogglerBtn.classList.contains("_active")) {
          disableMainSlider(eventsSliderMain);
        } else {
          enableMainSlider();
        }
      });
    }

    function enableMainSlider() {
      eventsSliderMain = new Swiper(eventsSlider, eventsSliderMainSettings);
    }

    function disableMainSlider() {
      if (eventsSliderMain !== undefined) {
        eventsSliderMain.destroy(true, true);
        eventsSliderBGSwiper.slideTo(0);
      }
    }
  }
}

function initCustomSelect() {
  const selects = document.querySelectorAll("select[data-custom-select]");

  if (selects.length > 0) {
    createCustomSelect();

    document.addEventListener("click", function (e) {
      const target = e.target;

      if (target && target.closest(".custom-select")) {
        const currentCustomSelect = target.closest(".custom-select");
        const activeCustomOption = currentCustomSelect.querySelector(".custom-select__option._active");

        if (currentCustomSelect.classList.contains("_open")) {
          if (target.closest(".custom-select__option")) {
            const currentCustomOption = target.closest(".custom-select__option");
            const parent = currentCustomOption.closest(".custom-select__wrapper");
            const currentRealSelect = parent.querySelector("select");
            const currentCustomLabel = parent.querySelector(".custom-select__label");

            if (activeCustomOption) {
              activeCustomOption.classList.remove("_active");
              activeCustomOption.classList.remove("_focus");
            }
            currentCustomOption.classList.add("_active");

            currentRealSelect.value = currentCustomOption.dataset.value;
            currentRealSelect.dispatchEvent(new Event('change'));
            currentCustomLabel.textContent = currentCustomOption.textContent;
          }

          customSelectClose();
        } else {
          const customSelectList = currentCustomSelect.querySelector(".custom-select__list");

          customSelectClose(); // закрываем предыдущий
          customSelectOpen(currentCustomSelect);

          if (activeCustomOption) {
            customSelectList.scrollTo({
              top: activeCustomOption.offsetTop
            });
            activeCustomOption.focus();
            activeCustomOption.classList.add("_focus");
          } else {
            customSelectList.children[0].focus();
            customSelectList.children[0].classList.add("_focus");
          }
        }
      } else {
        customSelectClose();
      }
    });

    document.addEventListener("keydown", function (e) {
      const openedCustomSelect = document.querySelector(".custom-select._open");

      if (openedCustomSelect) {
        const key = e.key;
        const focusedCustomOption = openedCustomSelect.querySelector(".custom-select__option._focus");

        if (key === "ArrowUp") {
          e.preventDefault();
          if (focusedCustomOption.previousElementSibling) {
            focusedCustomOption.classList.remove("_focus");
            focusedCustomOption.previousElementSibling.classList.add("_focus");
            focusedCustomOption.previousElementSibling.focus();
          }
        }

        if (key === "ArrowDown") {
          e.preventDefault();
          if (focusedCustomOption.nextElementSibling) {
            focusedCustomOption.classList.remove("_focus");
            focusedCustomOption.nextElementSibling.classList.add("_focus");
            focusedCustomOption.nextElementSibling.focus();
          }
        }

        if (key === "Enter") {
          focusedCustomOption.click();
        }

        if (key === "Escape" || key === "Tab") {
          if (!focusedCustomOption.classList.contains("_active")) {
            focusedCustomOption.classList.remove("_focus");
          }
          customSelectClose();
        }
      }
    });

    const customSelects = document.querySelectorAll(".custom-select");
    customSelects.forEach((customSelect) => {
      customSelect.addEventListener('mouseover', (e) => {
        const target = e.target;

        if (target.classList.contains('custom-select__option') && !target.classList.contains('_focus')) {
          const focusedOtion = customSelect.querySelector('.custom-select__option._focus');

          if (focusedOtion) {
            focusedOtion.classList.remove('_focus');
            setTimeout(() => {
              target.classList.add('_focus');
            }, 0);
          }
        }
      });
    });
  }

  function createCustomSelect() {
    for (var i = 0; i < selects.length; i++) {
      const currentSelect = selects[i];
      const selectOptions = currentSelect.querySelectorAll("option");
      const selectedOption = currentSelect.querySelector("option[selected]");
      let selectedOptionName = "Select...";

      if (selectedOption) {
        selectedOptionName = selectedOption.textContent;
      } else {
        selectedOptionName = selectOptions[0].textContent;
      }

      currentSelect.style.display = "none";
      currentSelect.setAttribute("tabindex", "-1");

      const selectWrapper = document.createElement("div");
      selectWrapper.className = "custom-select__wrapper";
      currentSelect.after(selectWrapper);
      selectWrapper.appendChild(currentSelect);

      const customSelect = document.createElement("div");
      customSelect.className = "custom-select";
      customSelect.insertAdjacentHTML("afterbegin", '<button class="custom-select__label" type="button">' + selectedOptionName + "</button>");
      selectWrapper.appendChild(customSelect);

      const customSelectListWrapper = document.createElement("div");
      customSelectListWrapper.className = "custom-select__list-wrapper";
      customSelect.appendChild(customSelectListWrapper);

      const customSelectList = document.createElement("ul");
      customSelectList.className = "custom-select__list";
      customSelectListWrapper.appendChild(customSelectList);

      for (let j = 0; j < selectOptions.length; j++) {
        if (selectOptions[j].hasAttribute("disabled")) {
          continue;
        }
        const customSelectOption = document.createElement("li");
        customSelectOption.className = "custom-select__option";

        if (selectOptions[j].hasAttribute("disabled")) {
          customSelectOption.classList.add("_disabled");
        } else {
          customSelectOption.setAttribute("tabindex", "-1");
        }

        if (selectOptions[j].hasAttribute("selected")) {
          customSelectOption.classList.add("_active");
          customSelectOption.classList.add("_focus");
        }

        customSelectOption.setAttribute("role", "option");
        customSelectOption.dataset.value = selectOptions[j].value;

        let customSelectOptionName = selectOptions[j].textContent;
        customSelectOption.insertAdjacentHTML("afterbegin", "<span>" + customSelectOptionName + "</span>");
        customSelectList.appendChild(customSelectOption);
      }
    }
  }

  function customSelectOpen(customSelect) {
    const currentCustomSelectList = customSelect.querySelector(".custom-select__list-wrapper");

    currentCustomSelectList.classList.remove("_toTop");
    let currentCustomSelectListMaxHeight = window.innerHeight - currentCustomSelectList.getBoundingClientRect().top - 40;

    customSelect.classList.add("_open");

    if (currentCustomSelectListMaxHeight < 100) {
      currentCustomSelectList.classList.add("_toTop");
    }
  }

  function customSelectClose() {
    const activeCustomSelect = document.querySelector(".custom-select._open");

    if (activeCustomSelect) {
      const currentCustomSelectList = activeCustomSelect.querySelector(".custom-select__list");
      const focusedCustomOption = currentCustomSelectList.querySelector(".custom-select__option._focus");

      activeCustomSelect.classList.remove("_open");

      if (focusedCustomOption) {
        focusedCustomOption.classList.remove("_focus");
      }

      setTimeout(() => {
        activeCustomSelect.querySelector(".custom-select__label").focus();
      }, 0);
    }
  }
}

function initInputMask() {
  Maska.create('.form-input--phone', {
    mask: "+1-###-###-####"
  });
}