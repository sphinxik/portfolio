(() => {
"use strict";

// WEBP checkbrowser
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

// DEBOUNCE
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

// DOM ON LOAD
document.addEventListener("DOMContentLoaded", function () {
  initLazyLoad();
  initHeader();
  initGotoAnchor();
  initProductsShowMore();
  initPartnersSlider();

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

      // testing
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
});

// WINDOW ON RESIZE
window.addEventListener("resize", debounce(_onResizeWindow, 500));
function _onResizeWindow() {
  initReadMore();
}

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
    //script.src = "/wp-content/themes/yihaiht_theme/static/js/libs/lazysizes.min.js";
    script.src = "js/libs/lazysizes.min.js";
    document.body.appendChild(script);
  }
}

function initHeader() {
  const headerBurger = document.querySelector('.header-burger');
  const headerNav = document.querySelector('.header-nav');

  if (headerBurger && headerNav) {
    headerBurger.addEventListener('click', () => {
      headerBurger.classList.toggle('_active');
      headerNav.classList.toggle('_active');

      if (headerNav.classList.contains('_active')) {
        bodyLock();
      } else {
        bodyUnlock();
      }
    });
  }
}

function initGotoAnchor() {
  const gotoLinks = document.querySelectorAll("[data-goto]");

  if (gotoLinks.length) {
    gotoLinks.forEach((gotoLink) => {
      gotoLink.addEventListener("click", onGoToLinkClick);
    });

    function onGoToLinkClick(e) {
      if (this.dataset.goto && document.querySelector(this.dataset.goto)) {
        e.preventDefault();
        const gotoBlock = document.querySelector(this.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset;
        const headerNavOpened = document.querySelector('.header-nav._active');

        if (headerNavOpened) {
          headerNavOpened.classList.remove('_active');
          document.querySelector('.header-burger').classList.remove('_active');
          bodyUnlock();
        }

        this.blur();

        window.scrollTo({
          top: gotoBlockValue,
          behavior: "smooth"
        });
      }
    }
  }
}

function initProductsShowMore() {
  const productsShowmoreBtn = document.querySelector('.products-showmore__btn');
  const productList = document.querySelector('.products-grid');

  if (productsShowmoreBtn && productList) {
    productsShowmoreBtn.addEventListener('click', () => {
      productsShowmoreBtn.classList.toggle('_active');

      if (productsShowmoreBtn.classList.contains('_active')) {
        productList.classList.add('_showall');
      } else {
        productList.classList.remove('_showall');
        productsShowmoreBtn.blur();

        window.scrollTo({
          top: productList.getBoundingClientRect().top + window.pageYOffset - 160,
          behavior: "smooth"
        });
      }
    });
  }
}

function initPartnersSlider() {
  const partnersSlider = document.querySelector(".partners-slider");
  if (partnersSlider) {
    new Swiper(partnersSlider, {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      initialSlide: 0,
      slidesPerView: 2.4,
      spaceBetween: 26,
      speed: 800,
      freeMode: false,
      allowTouchMove: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      on: {
        slideChange: function (swiper) {
          resetReadMore(swiper.el);
        }
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 12
        },
        576: {
          slidesPerView: 1,
          spaceBetween: 15
        },
        768: {
          slidesPerView: 1.3,
          spaceBetween: 15
        },
        992: {
          slidesPerView: 1.6,
          spaceBetween: 26
        },
        1200: {
          slidesPerView: 2.2,
          spaceBetween: 26
        },
        1400: {
          slidesPerView: 2.4,
          spaceBetween: 26
        }
      }

    });

    function resetReadMore(slider) {
      const activeReadMoreBtns = slider.querySelectorAll('.readmore-btn._active');

      if (activeReadMoreBtns.length) {
        activeReadMoreBtns.forEach((btn) => {
          btn.click();
        });
      }
    }
  }
}

function initReadMore() {
  const readMore = document.querySelectorAll("[data-readmore]");

  if (readMore) {
    resetReadMore();
    const btnsText = {
      'showContent': 'More info',
      'hideContent': 'Hide info'
    };

    readMore.forEach((item) => {
      const currentBtnText = item.dataset.readmoreBtn;
      let initialHeight = item.dataset.readmore;

      if (item.dataset.readmoreAdaptive) {
        const readmoreSettings = item.dataset.readmoreAdaptive.split(",");
        if (window.matchMedia(`(max-width: ${readmoreSettings[0].trim()}px)`).matches) {
          initialHeight = readmoreSettings[1].trim();
        }
      }

      if (initialHeight < item.parentElement.offsetHeight) {
        item.classList.add('_readmore-init');
      } else {
        return;
      }

      if (initialHeight === "auto") {
        item.style.height = "0px";

        if (item.parentElement.offsetHeight >= item.scrollHeight) {
          item.removeAttribute("style");
          return;
        }

        initialHeight = item.parentElement.offsetHeight;
      }

      if (currentBtnText) {
        const arr = currentBtnText.split('/');
        btnsText['showContent'] = arr[0].trim();
        btnsText['hideContent'] = arr[1].trim();
      }

      item.style.height = initialHeight + "px";

      const readmoreBtn = document.createElement("button");
      readmoreBtn.setAttribute("type", "button");
      readmoreBtn.classList.add("readmore-btn");
      readmoreBtn.textContent = btnsText['showContent'];
      item.append(readmoreBtn);

      readmoreBtn.addEventListener("click", () => {
        item.classList.toggle("_visible");

        if (item.classList.contains("_visible")) {
          item.style.height = item.scrollHeight + "px";
          readmoreBtn.classList.add("_active");
          readmoreBtn.textContent = btnsText['hideContent'];
        } else {
          item.style.height = initialHeight + "px";
          readmoreBtn.classList.remove("_active");
          readmoreBtn.textContent = btnsText['showContent'];
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
})();