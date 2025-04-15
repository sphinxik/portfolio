(() => {
"use strict";

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
  initHeader();
  initGotoAnchor();
  initCardsSlider();

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

    // Mobile submenu open/close
    const hasSubmenuItems = document.querySelectorAll('.header-menu > li.menu-item-has-children');

    if (hasSubmenuItems.length) {
      hasSubmenuItems.forEach((item) => {
        const submenu = item.querySelector('.sub-menu');
        slideToggle(submenu, 0);

        item.addEventListener('click', function (e) {
          if (e.target.hasAttribute('href') || e.target.closest('.sub-menu')) {
            return;
          }

          item.classList.toggle('_active');
          slideToggle(submenu, 400);
        });
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
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset - 40;
        const headerNavOpened = document.querySelector('.header-nav._active');

        if (headerNavOpened) {
          headerNavOpened.classList.remove('_active');
          document.querySelector('.header-burger').classList.remove('_active');
          bodyUnlock(500);
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

function initCardsSlider() {
  const cardsSlider = document.querySelectorAll('.cards-slider');

  if (cardsSlider.length) {
    cardsSlider.forEach((slider) => {
      new Splide(slider, {
        type: "slide",
        perPage: 3,
        perMove: 1,
        gap: 30,
        arrows: true,
        pagination: false,
        snap: true,
        speed: 600,
        breakpoints: {
          576: {
            perPage: 1
          },
          992: {
            perPage: 2
          },
          1200: {
            gap: 20
          }
        }
      }).mount();
    });
  }
}

// SLIDE - down, up, toggle animation
function slideUp(target) {let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
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

function slideDown(target) {let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
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

function slideToggle(target) {let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
  if (target.hidden) {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
}
})();