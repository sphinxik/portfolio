"use strict";
// WEBP checkbrowser ==============================================================================
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

// WINDOW LOADED =================================================================
window.onload = function () {
  setTimeout(function () {
    document.documentElement.classList.add('_loaded');
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
};

// DOM LOADED ====================================================================
document.addEventListener("DOMContentLoaded", function () {
  initLazyLoad();
  init100vhFix();
  initHeaderSettings();
  initMobilePhoneTrigger();
  initAnimateNumbers();
  initSliders();
  initVideo();
  initRulesSpoiler();
  initFlatpickr();
  initBaguetteBoxGallery();
  initInputPhoneMask();

  // MOBILE MENU ==================================================================
  const header = document.querySelector(".header");
  const headerBurger = header.querySelector(".header-burger");
  const headerMenu = header.querySelector(".header-menu");
  
  if (headerBurger && headerMenu) {
    headerBurger.addEventListener("click", function () {
      this.classList.toggle("_active");
      header.classList.toggle("_active");
      headerMenu.classList.toggle("_active");

      if (headerMenu.classList.contains("_active")) {
        bodyLock();
      } else {
        bodyUnlock();
      }
    });
  }

  function closeMobileMenu() {
    headerBurger.classList.remove("_active");
    header.classList.remove("_active");
    headerMenu.classList.remove("_active");
  }

  // POUPS =======================================================================
  const popupOpenBtn = document.querySelectorAll("[data-popup-open]");
  const popupCloseBtn = document.querySelectorAll("[data-popup-close]");
  const popupAnimationTime = 800;

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
      popupCloseBtn[i].addEventListener("click", function (e) {
        e.preventDefault();
        popupClose(this.closest(".popup"));
      });
    }
  }

  function popupOpen(currentPopup) {
    if (currentPopup && bodyLockStatus) {
      const popupActive = document.querySelector(".popup._open");

      closeMobileMenu();

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

  // FROMS =========================================================================
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

      // const response = await fetch("mail/mail.php", {
      //   method: "POST",
      //   body: formData,
      // });

      // for testing
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ok: true})
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

// INIT FUNCTIONS ================================================================
function initLazyLoad() {
  if ("loading" in HTMLImageElement.prototype) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(function (image) {
      image.src = image.dataset.src;
      image.parentElement.querySelectorAll("source").forEach(function (source) {
        source.srcset = source.dataset.srcset;
      });
    });
  } else {
    const winHref = window.location.href;
    let srcBase = "js/libs/";
  
    if(winHref.includes('/en/') && winHref.includes('/apartments/')) {
      srcBase = "../../js/libs/";
    } else if (winHref.includes('/en/') || winHref.includes('/apartments/')) {
      srcBase = "../js/libs/";
    }
  
    const lazysizes = document.createElement("script");
    lazysizes.src = srcBase + "lazysizes.min.js";
    document.body.appendChild(lazysizes);
  }
}

function init100vhFix() {
  let winWidthOnLoad = window.innerWidth;
  let winWidth = winWidthOnLoad;

  window.addEventListener("resize", function () {
    winWidth = window.innerWidth;

    if (winWidthOnLoad != winWidth) {
      winWidthOnLoad = winWidth;
      vhFix();
    }
  });

  function vhFix() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  vhFix();
}

function initHeaderSettings() {
  const header = document.querySelector(".header");

  if (header) {
    let windowScrolled = window.pageYOffset;

    if (windowScrolled > 80) {
      header.classList.remove("_visible");
      header.classList.add("_scrolled");
    }

    window.addEventListener("scroll", function () {
      const currentWindowScrolled = window.pageYOffset;

      if (currentWindowScrolled <= 80) {
        header.classList.remove("_scrolled");
        header.classList.add("_visible");
      } else {
        header.classList.add("_scrolled");

        if (currentWindowScrolled < windowScrolled) {
          header.classList.add("_visible");
        } else {
          header.classList.remove("_visible");
        }
      }

      windowScrolled = currentWindowScrolled;
    });
  }
}

function initMobilePhoneTrigger() {
  const headerPhonesTriggerMobile = document.querySelector(".header-phones__trigger--mobile");
  const headerPhonesListMobile = document.querySelector(".header-phones__list--mobile");
  if (headerPhonesTriggerMobile) {
    headerPhonesTriggerMobile.addEventListener("click", function () {
      headerPhonesTriggerMobile.classList.toggle("_active");

      if (headerPhonesTriggerMobile.classList.contains("_active")) {
        headerPhonesListMobile.style.height = headerPhonesListMobile.scrollHeight + "px";
      } else {
        headerPhonesListMobile.style.height = "0px";
      }
    });
  }
}

function initAnimateNumbers() {
  const dataAnimateNumber = document.querySelectorAll("[data-animate-number]");
  const animateDuration = 1000;
  const windowHeight = window.innerHeight;
  let windowScrollTop = window.scrollY;

  animateNumber(animateDuration);

  window.addEventListener("scroll", function () {
    animateNumber(animateDuration);
  });

  function animateNumber(duration) {
    dataAnimateNumber.forEach((elem) => {
      const elemTop = elem.getBoundingClientRect().top;
      const elemAnimateInitialized = elem.getAttribute("data-animate-number-init");

      if (elemTop <= windowScrollTop + windowHeight * 0.8 && !elemAnimateInitialized) {
        startAnimateNumber(elem, duration);
      }
    });
  }

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
    elem.setAttribute("data-animate-number-init", "true");
  }
}

function initSliders() {
  const roomsSlider = document.querySelector(".rooms-slider");

  if (roomsSlider) {
    const roomsSliderSplide = new Splide(roomsSlider, {
      type: "loop",
      perPage: 2,
      perMove: 1,
      gap: 30,
      arrows: true,
      pagination: false,
      snap: true,
      speed: 800,
      mediaQuery: "max",
      breakpoints: {
        640: {
          perPage: 1,
          gap: 15,
        },
        767.98: {
          perPage: 2,
          gap: 15,
        },
        1199.98: {
          perPage: 2,
          gap: 20,
        },
      },
    });

    roomsSliderSplide.mount();
  }

  const reviewsSlider = document.querySelector(".reviews-slider");

  if (reviewsSlider) {
    const reviewsSliderSplide = new Splide(reviewsSlider, {
      type: "loop",
      perPage: 3,
      perMove: 1,
      gap: 30,
      arrows: true,
      pagination: false,
      snap: true,
      speed: 800,
      mediaQuery: "max",
      breakpoints: {
        575.98: {
          perPage: 1,
          gap: 15,
        },
        767.98: {
          perPage: 2,
          gap: 20,
        },
        991.98: {
          perPage: 3,
          gap: 20,
        },
      },
    });
    reviewsSliderSplide.mount();
  }
}

function initVideo() {
  const videos = document.querySelectorAll(".video");

  for (let i = 0; i < videos.length; i++) {
    setupVideo(videos[i]);
  }

  function setupVideo(video) {
    const link = video.querySelector(".video-link");
    const videoPlayer = video.querySelector(".video-player");
    const id = parseVideoURL(link);

    video.addEventListener("click", function () {
      const iframe = createIframe(id);
      const videoPlayers = document.querySelectorAll(".video-player");
      for (var j = 0; j < videoPlayers.length; j++) {
        videoPlayers[j].innerHTML = "";
      }
      videoPlayer.appendChild(iframe);
    });

    video.classList.add("video--enabled");
  }

  function parseVideoURL(link) {
    const regexp = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/i;
    let url = link.href;
    let match = url.match(regexp);
    return match[1];
  }

  function createIframe(id) {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute("allow", "autoplay");
    iframe.setAttribute("src", generateURL(id));
    iframe.classList.add("video-iframe");
    return iframe;
  }

  function generateURL(id) {
    const query = "?rel=0&showinfo=0&autoplay=1";
    return "https://www.youtube.com/embed/" + id + query;
  }
}

function initRulesSpoiler() {
  const rulesSpoilerBtn = document.querySelector('.rules-spoiler__btn');

  if(rulesSpoilerBtn) {
    rulesSpoilerBtn.addEventListener('click', function() {
      const spoilerContent = this.nextElementSibling;
      this.classList.toggle('_active');

      if(this.classList.contains('_active')) {
        spoilerContent.style.height = spoilerContent.scrollHeight + 'px';
      } else {
        spoilerContent.style.height = '0px';
      }
    });
  }
}

function initFlatpickr() {
  const dateInputs = document.querySelectorAll("[data-input-date]");

  if (dateInputs.length) {
    const currentURL = window.location.href;

    const flatpickrOptions = {
      disableMobile: false,
      dateFormat: "d.m.Y",
      minDate: "today",
    };

    const UkrainianLocale = {
      firstDayOfWeek: 1,
      weekdays: {
        shorthand: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        longhand: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"],
      },
      months: {
        shorthand: ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"],
        longhand: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
      },
      time_24hr: true,
    };

    if (!currentURL.includes("/en/")) {
      flatpickrOptions.locale = UkrainianLocale;
    }

    flatpickr(dateInputs, flatpickrOptions);
  }
}

function initBaguetteBoxGallery() {
  if (document.querySelectorAll("[data-baguettebox]").length) {
    baguetteBox.run("[data-baguettebox]", {});
  }
}

function initInputPhoneMask() {
  Maska.create('input[type="tel"]', {
    mask: "+38 ### ###-##-##",
  });
}
