/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
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
let bodyLockStatus = true;

function bodyLock() {let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 400;
  const paddingFixValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

  if (paddingFix.length > 0) {
    for (let i = 0; i < paddingFix.length; i++) {
      paddingFix[i].style.paddingRight = paddingFixValue;
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
  initGotoAnchor();
  initHeader();
  initReviewsSlider();
  initCertificatesSlider();
  initBaguettebox();

  // MODALS
  const popupOpenBtn = document.querySelectorAll("[data-popup-open]");
  const popupCloseBtn = document.querySelectorAll("[data-popup-close]");
  const popupAnimationTime = 600;

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

      // formData.append("action", "send_mail");
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
      } else if (input.type === "checkbox") {
        if (!input.checked) {
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

  initReadMore();

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

  initAnimateNumbers();
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
    //script.src = "/wp-content/themes/vetrova_theme/assets/js/libs/lazysizes.min.js";
    script.src = "js/libs/lazysizes.min.js";
    document.body.appendChild(script);
  }
}

function initGotoAnchor() {
  const gotoLink = document.querySelectorAll('[data-goto]');

  if (gotoLink.length) {
    gotoLink.forEach((link) => {
      link.addEventListener('click', (e) => {
        const anchor = link.dataset.goto;

        if (anchor && document.querySelector(anchor)) {
          e.preventDefault();
          const offset = document.querySelector(anchor).getBoundingClientRect().top + window.pageYOffset - document.querySelector(".header").offsetHeight;

          link.blur();

          window.scrollTo({
            top: offset,
            behavior: "smooth"
          });

          document.querySelector('.header-burger').classList.remove('_active');
          document.querySelector('.header-menu').classList.remove('_active');
          bodyUnlock(800);
        }
      });
    });
  }
}

function initHeader() {
  const header = document.querySelector(".header");

  if (!header) return;

  // Menu burger
  const headerBurger = header.querySelector('.header-burger');
  const headerMenu = header.querySelector('.header-menu');

  if (headerBurger && headerMenu) {
    headerBurger.addEventListener('click', () => {
      headerBurger.classList.toggle('_active');
      headerMenu.classList.toggle('_active');

      if (headerMenu.classList.contains('_active')) {
        bodyLock(800);
      } else {
        bodyUnlock(800);
      }
    });
  }

  // Scrolled header
  let winScrolled = window.pageYOffset;

  if (winScrolled > 30) {
    header.classList.add("_scrolled");
    header.classList.add("_not-top");
  }

  window.addEventListener("scroll", function () {
    const curWinScrolled = window.pageYOffset;

    if (window.pageYOffset > 30) {
      header.classList.add("_not-top");
    } else {
      header.classList.remove("_not-top");
    }

    if (curWinScrolled - winScrolled >= 0 && curWinScrolled > 30) {
      header.classList.add("_scrolled");
    } else {
      header.classList.remove("_scrolled");
    }

    winScrolled = curWinScrolled;
  });
}

function initReviewsSlider() {
  const reviewsSlider = document.querySelector('.reviews-slider');

  if (reviewsSlider) {
    new Swiper(reviewsSlider, {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      initialSlide: 0,
      slidesPerView: 2,
      spaceBetween: 60,
      speed: 800,
      freeMode: false,
      loop: false,
      allowTouchMove: true,
      navigation: {
        nextEl: ".reviews-slider__parent .swiper-button-next",
        prevEl: ".reviews-slider__parent .swiper-button-prev"
      },
      pagination: {
        el: ".reviews-slider__parent .swiper-pagination",
        clickable: true
      },
      on: {
        slideChange: function (swiper) {
          resetReadMore(swiper.el);
        }
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 28
        },
        1200: {
          slidesPerView: 2,
          spaceBetween: 44
        },
        1440: {
          slidesPerView: 2,
          spaceBetween: 60
        }
      }
    });

    function resetReadMore(slider) {
      const activeReadMoreBtns = slider.querySelectorAll('.readmore-btn._hidden');

      if (activeReadMoreBtns.length) {
        activeReadMoreBtns.forEach((btn) => {
          btn.click();
        });
      }
    }
  }
}

function initCertificatesSlider() {
  const certificatesSlider = document.querySelector('.certificates-slider');

  if (certificatesSlider) {
    new Swiper(certificatesSlider, {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      initialSlide: 0,
      slidesPerView: 3,
      spaceBetween: 44,
      speed: 800,
      freeMode: false,
      loop: false,
      allowTouchMove: true,
      navigation: {
        nextEl: ".certificates-slider__parent .swiper-button-next",
        prevEl: ".certificates-slider__parent .swiper-button-prev"
      },
      pagination: {
        el: ".certificates-slider__parent .swiper-pagination",
        clickable: true
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        576: {
          slidesPerView: 1,
          spaceBetween: 28
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 28
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 36
        },
        1440: {
          slidesPerView: 3,
          spaceBetween: 44
        }
      }
    });
  }
}

function initReadMore() {
  const readMore = document.querySelectorAll("[data-readmore]");

  if (readMore) {
    resetReadMore();

    readMore.forEach((item) => {
      const currentBtnText = item.dataset.readmoreBtn;
      let initialHeight = item.dataset.readmore;

      if (item.dataset.readmoreAdaptive) {
        const readmoreSettings = item.dataset.readmoreAdaptive.split(",");
        if (window.matchMedia(`(max-width: ${readmoreSettings[0].trim()}px)`).matches) {
          initialHeight = readmoreSettings[1].trim();
        }
      }

      if (initialHeight < item.offsetHeight) {
        item.classList.add('_readmore-init');
      } else {
        return;
      }

      item.style.height = initialHeight + "px";

      const readmoreBtn = document.createElement("button");
      readmoreBtn.setAttribute("type", "button");
      readmoreBtn.classList.add("readmore-btn");
      readmoreBtn.textContent = currentBtnText || '';
      item.append(readmoreBtn);

      readmoreBtn.addEventListener("click", () => {
        item.classList.toggle("_visible");

        if (item.classList.contains("_visible")) {
          item.style.height = item.scrollHeight + "px";
          readmoreBtn.classList.add("_hidden");
        } else {
          item.style.height = initialHeight + "px";
          readmoreBtn.classList.remove("_hidden");
        }
      });
    });

    function resetReadMore() {
      readMore.forEach((item) => {
        if (item.classList.contains('_readmore-init')) {
          item.removeAttribute("style");
          item.classList.remove('_readmore-init');
          item.querySelector('.readmore-btn').remove();
        }
      });
    }
  }
}

function initBaguettebox() {
  const bbGalleries = document.querySelectorAll('.bb-gallery');

  if (bbGalleries.length) {
    baguetteBox.run('.bb-gallery', {});
  }
}

function initAnimateNumbers() {
  const dataAnimateNumber = document.querySelectorAll("[data-animate-number]");
  const animateDuration = 800;
  let observerOptions = {
    threshold: 0.3
  };

  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startAnimateNumber(entry.target, animateDuration);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  dataAnimateNumber.forEach((elem) => {
    observer.observe(elem);
  });

  function startAnimateNumber(elem, duration) {
    const startNumber = 0;
    const finalNumber = parseInt(elem.getAttribute("data-animate-number"));
    let startTimestamp = 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;

      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      elem.textContent = Math.floor(progress * (startNumber + finalNumber));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
}
/******/ })()
;