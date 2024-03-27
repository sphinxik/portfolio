"use strict";
//WEBP checkbrowser ===============================================================================
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

// BODY lock/unlock ==================================================================================
const body = document.querySelector("body");
const paddingFix = document.querySelectorAll("[data-padding-fix]");
let bodyLockStatus = true;

// блокируем BODY при открытом поп-апе
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

// снимаем блокировку с BODY
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

// OVERLAY ========================================================================================
const overlay = document.querySelector("#overlay");

if (overlay) {
  overlay.addEventListener("click", () => {
    overlay.classList.toggle("_active");

    if (overlay.classList.contains("_active")) {
      overlayOpen();
    } else {
      overlayClose();
    }
  });
}

function overlayOpen() {
  let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 400;
  overlay.classList.add("_active");
  bodyLock(delay);
}

function overlayClose() {
  let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 400;
  const elements = document.querySelectorAll("[data-overlay-action]");
  overlay.classList.remove("_active");
  elements.forEach((item) => {
    item.classList.remove("_active");
  });
  bodyUnlock(delay);
}

// WINDOW LOADED ==================================================================================
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

// DOM LOADED =====================================================================================
document.addEventListener("DOMContentLoaded", function () {
  initLazyLoad();
  initHeaderMenuMobile();
  initDropdownMenuMobile();
  initServicesItemHover();
  initSwiperSliders();
  initTextClamp();
  initFslightbox();
  initInputPhoneMask();

  // POPUP ========================================================================================
  const popupOpenBtn = document.querySelectorAll("[data-popup-open]");
  const popupCloseBtn = document.querySelectorAll("[data-popup-close]");
  const popupAnimationTime = 600;

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
    if (currentPopup && bodyLockStatus) {
      const popupActive = document.querySelector(".popup._open");

      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock(popupAnimationTime);
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

      let iframes = document.querySelectorAll(".video-iframe");
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
});

// INIT FUNCTIONS =================================================================================
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

function initHeaderMenuMobile() {
  const header = document.querySelector(".header");
  const headerBurger = header.querySelector(".header-burger");
  const headerControls = header.querySelector(".header-controls");

  if (headerBurger && headerControls) {
    headerBurger.addEventListener("click", () => {
      headerBurger.classList.toggle("_active");
      headerControls.classList.toggle("_active");
      header.classList.toggle("_active");

      if (headerControls.classList.contains("_active")) {
        overlayOpen();
      } else {
        overlayClose();
      }
    });
  }
}

function initDropdownMenuMobile() {
  const menuItemsWithSubmenu = document.querySelectorAll("._has-submenu");

  if (menuItemsWithSubmenu) {
    menuItemsWithSubmenu.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const dataSubmenu = item.dataset.submenu;
        const currentSubmenu = item.closest(".menu").querySelector(".submenu--mobile[data-submenu=" + dataSubmenu + "]");
        item.classList.toggle("_active");

        if (item.classList.contains("_active")) {
          currentSubmenu.style.height = currentSubmenu.scrollHeight + "px";
        } else {
          currentSubmenu.style.height = "0px";
        }
      });
    });
  }
}

function initServicesItemHover() {
  const servicesItems = document.querySelectorAll(".services-item");

  servicesItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.classList.remove("_hover-out");
      item.classList.add("_hover-in");
    });

    item.addEventListener("mouseleave", () => {
      item.classList.remove("_hover-in");
      item.classList.add("_hover-out");
    });
  });
}

function initSwiperSliders() {
  const worksSlider = document.querySelector(".works-slider");
  if (worksSlider) {
    new Swiper(worksSlider, {
      observer: true,
      observerParents: true,
      watchOverflow: true,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: 3,
      spaceBetween: 20,
      speed: 800,
      freeMode: false,
      allowTouchMove: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-scrollbar",
        type: "progressbar",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1.34,
          spaceBetween: 12,
        },
        575.98: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        767.98: {
          slidesPerView: 2.5,
          spaceBetween: 16,
        },
        1199.98: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    });
  }

  const clientsSlider = document.querySelector(".clients-slider");
  if (clientsSlider) {
    const clientsItems = document.querySelectorAll(".clients-item");

    if (clientsItems.length === 2) {
      clientsSlider.classList.add("_2slides");
    }

    new Swiper(clientsSlider, {
      observer: true,
      observerParents: true,
      watchOverflow: true,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: 3,
      spaceBetween: 20,
      speed: 800,
      freeMode: false,
      allowTouchMove: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-scrollbar",
        type: "progressbar",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1.2,
          spaceBetween: 10,
          grid: {
            rows: 2,
            fill: "row",
          },
        },
        575.98: {
          slidesPerView: 1.7,
          spaceBetween: 16,
          grid: {
            rows: 1,
            fill: "row",
          },
        },
        768: {
          slidesPerView: 2.3,
          spaceBetween: 16,
          grid: {
            rows: 1,
            fill: "row",
          },
        },
        991.98: {
          slidesPerView: 3,
          spaceBetween: 16,
          grid: {
            rows: 1,
            fill: "row",
          },
        },
        1199.98: {
          slidesPerView: 3,
          spaceBetween: 20,
          grid: {
            rows: 1,
            fill: "row",
          },
        },
      },
    });
  }
}

function initTextClamp() {
  const maxLengthTextElements = document.querySelectorAll("[data-text-max-rows]");

  if (maxLengthTextElements) {
    textTruncate(maxLengthTextElements);

    function textTruncate(elements) {
      elements.forEach((element) => {
        const maxRows = Number(element.dataset.textMaxRows);
        $clamp(element, { clamp: maxRows });
      });
    }
  }
}

function initFslightbox() {
  if (fsLightbox) {
    fsLightbox.props.onOpen = function () {
      bodyLock();
    };

    fsLightbox.props.onClose = function () {
      bodyUnlock();
    };
  }
}

function initInputPhoneMask() {
  Maska.create('input[type="tel"]', {
    mask: "+38 ### ###-##-##",
  });
}
