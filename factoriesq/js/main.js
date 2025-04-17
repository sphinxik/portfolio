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
    document.querySelector("html").classList.add("webp");
  } else {
    document.querySelector("html").classList.add("no-webp");
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

// DOM ON LOAD ===================================================================
document.addEventListener("DOMContentLoaded", function () {
  initLazyLoad();
  initHeader();
  initGotoAnchor();
  initCatalog();
  initCardSliders();
  initVideosYT();
  initBaguetteBox();

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

      console.log(input.type);


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

// WINDOW ON LOAD ================================================================
window.addEventListener("load", function () {
  setTimeout(function () {
    document.documentElement.classList.add('_loaded');
  }, 0);
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
  const header = document.querySelector(".header");

  if (header) {
    // Burger menu
    const headerBurger = document.querySelector(".header-burger");
    const headerNav = document.querySelector(".header-nav");

    if (headerBurger && headerNav) {
      headerBurger.addEventListener("click", () => {
        headerBurger.classList.toggle("_active");
        headerNav.classList.toggle("_active");

        if (headerBurger.classList.contains("_active")) {
          bodyLock(500);
        } else {
          bodyUnlock(500);
        }
      });
    }

    // Scrolled header
    if (window.pageYOffset > 10) {
      header.classList.add("_scrolled");
    }

    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 10) {
        header.classList.add("_scrolled");
      } else {
        header.classList.remove("_scrolled");
      }
    });
  }
}


function initCatalog() {
  // Mobile sidebar
  const catalogFilterTrigger = document.querySelector('.catalog-filter__trigger');
  const catalogSidebar = document.querySelector('.catalog-sidebar');


  if (catalogSidebar && catalogFilterTrigger) {
    const catalogSidebarClose = catalogSidebar.querySelector('.catalog-sidebar__close');

    catalogFilterTrigger.addEventListener('click', () => {
      catalogSidebar.classList.add('_active');
      bodyLock(500);
    });

    catalogSidebarClose.addEventListener('click', () => {
      catalogSidebar.classList.remove('_active');
      bodyUnlock(500);
    });
  }
}

function initCardSliders() {
  const cardPhotosSlider1 = document.querySelector(".card-photos__slider1");
  if (cardPhotosSlider1) {
    new Swiper(cardPhotosSlider1, {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      initialSlide: 0,
      slidesPerView: 3,
      spaceBetween: 20,
      speed: 800,
      freeMode: false,
      allowTouchMove: true,
      navigation: {
        nextEl: ".card-photos__slider1-wrapper .swiper-button-next",
        prevEl: ".card-photos__slider1-wrapper .swiper-button-prev"
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        576: {
          slidesPerView: 2.2,
          spaceBetween: 15
        },
        768: {
          slidesPerView: 2.7,
          spaceBetween: 20
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    });
  }

  const cardPhotosSlider2 = document.querySelector(".card-photos__slider2");
  if (cardPhotosSlider2) {
    new Swiper(cardPhotosSlider2, {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      initialSlide: 0,
      slidesPerView: 8,
      spaceBetween: 20,
      speed: 800,
      freeMode: false,
      allowTouchMove: true,
      navigation: {
        nextEl: ".card-photos__slider2-wrapper .swiper-button-next",
        prevEl: ".card-photos__slider2-wrapper .swiper-button-prev"
      },
      breakpoints: {
        0: {
          slidesPerView: 4.5,
          spaceBetween: 10
        },
        576: {
          slidesPerView: 5.5,
          spaceBetween: 15
        },
        768: {
          slidesPerView: 6.5,
          spaceBetween: 20
        },
        992: {
          slidesPerView: 7,
          spaceBetween: 20
        },
        1200: {
          slidesPerView: 8,
          spaceBetween: 20
        }
      }
    });
  }

  const cardVideosSliderMain = document.querySelector(".card-videos__slider-main");
  const cardVideosSliderThumbs = document.querySelector(".card-videos__slider-thumbs");
  let cardVideosSliderThumbsSwiper;

  if (cardVideosSliderThumbs) {
    cardVideosSliderThumbsSwiper = new Swiper(cardVideosSliderThumbs, {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      initialSlide: 0,
      slidesPerView: 4,
      spaceBetween: 20,
      speed: 800,
      freeMode: false,
      allowTouchMove: true,
      slideToClickedSlide: true,
      navigation: {
        nextEl: ".card-videos__slider-thumbs-wrapper .swiper-button-next",
        prevEl: ".card-videos__slider-thumbs-wrapper .swiper-button-prev"
      },
      breakpoints: {
        0: {
          slidesPerView: 2.1,
          spaceBetween: 10
        },
        576: {
          slidesPerView: 2.4,
          spaceBetween: 15
        },
        768: {
          slidesPerView: 2.7,
          spaceBetween: 20
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        1440: {
          slidesPerView: 4,
          spaceBetween: 20
        }
      }
    });
  }

  if (cardVideosSliderMain) {
    new Swiper(cardVideosSliderMain, {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      initialSlide: 0,
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 800,
      freeMode: false,
      allowTouchMove: false,
      effect: "fade",
      fadeEffect: {
        crossFade: true
      },
      on: {
        slideChange: function (swiper) {
          const iframe = swiper.el.querySelector('.video-iframe');
          if (iframe) {
            iframe.remove();
          }
        }
      },
      thumbs: {
        swiper: cardVideosSliderThumbsSwiper
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
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset - 80;
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

function initVideosYT() {
  const videos = document.querySelectorAll(".video");

  if (videos.length) {
    for (let i = 0; i < videos.length; i++) {
      setupVideo(videos[i]);
    }
  }

  function setupVideo(video) {
    const link = video.querySelector(".video-link");
    const videoPlayer = video.querySelector(".video-player");
    const id = parseVideoURL(link);

    video.addEventListener("click", function () {
      const iframe = createIframe(id);

      // при клике на новое видео - закрываются предыдущие
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


function initBaguetteBox() {
  const bbGalleries = document.querySelectorAll('.bb-gallery');

  if (bbGalleries.length) {
    baguetteBox.run('.bb-gallery', {});
  }
}
})();