"use strict";
//WEBP checkbrowser ===============================================================
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

// BODY lock/unlock ===============================================================
const body = document.querySelector("body");
const paddingFix = document.querySelectorAll("[data-padding-fix]");
let bodyLockStatus = true;

function bodyLock() {
  let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 400;
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

function bodyUnlock() {
  let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 400;
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

// DEBOUNCE ======================================================================
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

// DOM ON LOAD ===================================================================
document.addEventListener("DOMContentLoaded", function () {
  initLazyLoad();
  initHeader();
  initTicker();
  initAccordeon();
  initProjectSlider();

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
        const videoID = currentBtn.dataset.ytvideoId;

        if (popupFormID && popupFormID !== "") {
          currentPopup.querySelector("input[name='form_id']").value = popupFormID;
        }

        if (videoID && videoID !== "") {
          const popupVideoWrapper = currentPopup.querySelector(".popup-video__wrapper");
          const popupIframe = createIframe(videoID);

          popupVideoWrapper.appendChild(popupIframe);
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

  function popupClose(popupActive) {
    let doUnlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (bodyLockStatus) {
      popupActive.classList.remove("_open");

      let iframes = popupActive.querySelectorAll(".video-iframe");
      for (let j = 0; j < iframes.length; j++) {
        iframes[j].remove();
      }

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

  // popup videos
  function createIframe(id) {
    const iframe = document.createElement("iframe");

    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute("allow", "autoplay");
    iframe.setAttribute("src", generateYTVideoURL(id));
    iframe.classList.add("video-iframe");
    return iframe;
  }

  function generateYTVideoURL(id) {
    const query = "?rel=0&showinfo=0&autoplay=1";
    return "https://www.youtube.com/embed/" + id + query;
  }

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

      if (input.classList.contains("email")) {
        if (emailValidation(input)) {
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

// WINDOW ON LOAD ================================================================
window.addEventListener("load", function () {
  setTimeout(function () {
    document.documentElement.classList.add("_loaded");
  }, 0);

  AOS.init({
    disable: function () {
      const maxWidth = 1024;
      return window.innerWidth <= maxWidth;
    },
    duration: 800,
    easing: "ease-in-out",
    anchorPlacement: "top-bottom",
    once: true,
  });
});

// FUNCTIONS =====================================================================
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
  const header = document.querySelector(".header");

  if (header) {
    // Menu burger
    const headerBurger = header.querySelector(".header-burger");
    const headerMenu = header.querySelector(".header-nav");

    if (headerBurger) {
      headerBurger.addEventListener("click", () => {
        headerBurger.classList.toggle("_active");
        headerMenu.classList.toggle("_active");

        if (headerBurger.classList.contains("_active")) {
          bodyLock(600);
        } else {
          bodyUnlock(600);
        }
      });
    }

    // Scrolled header
    let winScrolled = window.pageYOffset;

    if (winScrolled > 80) {
      header.classList.add("_scrolled");
    }

    window.addEventListener("scroll", function () {
      const curWinScrolled = window.pageYOffset;

      if (curWinScrolled - winScrolled >= 0 && curWinScrolled > 80) {
        header.classList.add("_scrolled");
      } else {
        header.classList.remove("_scrolled");
      }

      winScrolled = curWinScrolled;
    });
  }
}

function initTicker() {
  const tickers = document.querySelectorAll("[data-ticker]");
  let winWidth = window.innerWidth;

  if (tickers.length) {
    tickers.forEach((ticker) => {
      cloneTickerBody(ticker);
      setTickerAnimationTime(ticker);
      startTicker(ticker);
    });

    window.addEventListener("resize", debounce(onResizeTicker, 500));
  }

  function onResizeTicker() {
    if (winWidth !== window.innerWidth) {
      winWidth = window.innerWidth;

      tickers.forEach((ticker) => {
        startTicker(ticker);
      });
    }
  }

  function startTicker(ticker) {
    ticker.classList.remove("_init");

    if (ticker.scrollWidth <= ticker.clientWidth * 2) {
      cloneTickerBody(ticker);
      startTicker(ticker);
      return;
    }

    ticker.classList.add("_init");
  }

  function cloneTickerBody(ticker) {
    const tickerBody = ticker.querySelector("[data-ticker-body]");
    const clone = tickerBody.cloneNode(true);
    ticker.appendChild(clone);
  }

  function setTickerAnimationTime(ticker) {
    const animationTime = ticker.dataset.tickerAnimationTime;
    const tickerBodies = ticker.querySelectorAll("[data-ticker-body]");
    const itemsQuantity = ticker.querySelectorAll("[data-ticker-item]").length;
    const animationDuration = `${itemsQuantity * animationTime}s`;

    tickerBodies[0].style.animationDuration = animationDuration;
    tickerBodies[1].style.animationDuration = animationDuration;
  }
}

function initAccordeon() {
  const accordeons = document.querySelectorAll("[data-accordeon]");

  accordeons.forEach((accordeon) => {
    accordeonStartupSettings(accordeon);

    accordeon.addEventListener("click", (e) => {
      let trgt = e.target;

      if (trgt && trgt.closest("[data-accordeon-btn]")) {
        trgt = trgt.hasAttribute("data-accordeon-btn") ? trgt : trgt.closest("[data-accordeon-btn]");

        if (!accordeon.querySelectorAll("._sliding").length) {
          if (!trgt.classList.contains("_active")) {
            accordeonActiveItemsHide(accordeon);
          }

          trgt.classList.toggle("_active");
          slideToggle(trgt.nextElementSibling, 500);
        }
      }
    });
  });

  function accordeonActiveItemsHide(accordeon) {
    const activeItem = accordeon.querySelector("[data-accordeon-btn]._active");

    if (activeItem) {
      activeItem.classList.remove("_active");
      slideUp(activeItem.nextElementSibling, 500);
    }
  }

  function accordeonStartupSettings(accordeon) {
    const items = accordeon.querySelectorAll("[data-accordeon-btn]");

    items.forEach((item) => {
      if (!item.classList.contains("_active")) {
        item.nextElementSibling.hidden = true;
      } else {
        item.nextElementSibling.hidden = false;
      }
    });
  }
}

// SLIDE - down, up, toggle animation
function slideUp(target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
  if (!target.classList.contains("_sliding")) {
    target.classList.add("_sliding");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = target.offsetHeight + "px";
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(function () {
      target.hidden = true;
      target.style.removeProperty("height");
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_sliding");
    }, duration);
  }
}

function slideDown(target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
  if (!target.classList.contains("_sliding")) {
    target.classList.add("_sliding");

    if (target.hidden) {
      target.hidden = false;
    }

    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(function () {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");

      target.classList.remove("_sliding");
    }, duration);
  }
}

function slideToggle(target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
  if (target.hidden) {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
}

function initProjectSlider() {
  const projectSlider = document.querySelector(".project-slider");

  if (projectSlider) {
    new Swiper(projectSlider, {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: 1,
      spaceBetween: 10,
      speed: 1000,
      freeMode: false,
      loop: true,
      // autoplay: {
      //   delay: 4000,
      //   disableOnInteraction: true
      // },
      allowTouchMove: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          spaceBetween: 0,
        },
        576: {
          spaceBetween: 20,
        },
      },
    });
  }
}
