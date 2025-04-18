(() => {
  "use strict";
  // GLOBAL VARS
  let popupOpenGlobal;
  let popupCloseGlobal;

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

  // DOM ON LOAD
  document.addEventListener("DOMContentLoaded", function () {
    initLazyLoad();
    initHeader();
    initGotoAnchor();
    initStarRating();
    initServices();
    initPopups();
    initForms();
  });

  // WINDOW ON LOAD
  window.addEventListener("load", function () {
    const baguetteBoxPlugin = document.createElement("script");
    //baguetteBoxPlugin.src = "/wp-content/themes/theme_name_here/assets/js/libs/baguettebox.min.js";
    baguetteBoxPlugin.src = "js/libs/baguettebox.min.js";
    baguetteBoxPlugin.onload = initGallery;
    document.body.appendChild(baguetteBoxPlugin);

    initCookiesInfo();
    initMap();

    setTimeout(function () {
      document.documentElement.classList.add("_loaded");
    }, 0);
  });

  // PHONE MASK INIT FUNCTION
  window.addEventListener("click", initPhoneMask);

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
      //script.src = "/wp-content/themes/theme_name_here/assets/js/libs/lazysizes.min.js";  //for WP
      script.src = "js/libs/lazysizes.min.js";
      document.body.appendChild(script);
    }
  }

  function initHeader() {
    const header = document.querySelector(".header");

    if (!header) return;

    // MOBILE MENU
    const burger = header.querySelector(".header-burger");
    const menu = header.querySelector(".header-menu");

    burger.addEventListener("click", () => {
      burger.classList.toggle("_active");
      menu.classList.toggle("_active");

      if (menu.classList.contains("_active")) {
        bodyLock();
      } else {
        bodyUnlock();
      }
    });

    // SCROLLED HEADER
    if (window.pageYOffset > 30) {
      header.classList.add("_scrolled");
      header.classList.add("_not-top");
    }

    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 30) {
        header.classList.add("_scrolled");
      } else {
        header.classList.remove("_scrolled");
      }
    });
  }

  function initStarRating() {
    const starRating = document.querySelectorAll(".star-rating");

    starRating.forEach((currentStarRating) => {
      let currentValue = currentStarRating.dataset.ratingValue;
      let currentValuePercent = currentValue / 0.05;

      currentStarRating.querySelector(".star-rating__result").style.width = currentValuePercent + "%";
    });
  }

  function initServices() {
    const readMore = document.querySelectorAll("[data-readmore]");

    readMore.forEach((item) => {
      item.style.display = "block";
      const parent = item.closest("[data-readmore-parent]");
      const itemBody = item.querySelector("[data-readmore-body]");
      const itemBtn = parent.querySelector("[data-readmore-btn]");
      const itemLineHeight = parseFloat(getComputedStyle(itemBody).lineHeight);
      const totalRows = itemBody.scrollHeight / itemLineHeight;
      let maxRows = item.dataset.readmore;

      if (item.dataset.readmoreAdaptive) {
        const readmoreSettings = item.dataset.readmoreAdaptive.split(",");
        if (window.matchMedia(`(max-width: ${readmoreSettings[0].trim()}px)`).matches) {
          maxRows = readmoreSettings[1].trim();
        }
      }

      if (!maxRows) {
        return;
      }

      if (maxRows < totalRows) {
        item.classList.add("_readmore-init");
      } else {
        itemBtn.remove();
        return;
      }

      itemBody.style.height = maxRows * itemLineHeight + "px";

      itemBtn.addEventListener("click", () => {
        itemBody.style.height = itemBody.scrollHeight + "px";
        itemBody.classList.add("_active");
        itemBtn.remove();
      });
    });
  }

  function initGotoAnchor() {
    const gotoLink = document.querySelectorAll("[data-goto]");

    gotoLink.forEach((link) => {
      link.addEventListener("click", (e) => {
        const anchor = link.dataset.goto;

        if (anchor && document.querySelector(anchor)) {
          e.preventDefault();
          const offset = document.querySelector(anchor).getBoundingClientRect().top + window.pageYOffset - document.querySelector(".header").offsetHeight;

          link.blur();

          window.scrollTo({
            top: offset,
            behavior: "smooth",
          });

          document.querySelector(".header-burger").classList.remove("_active");
          document.querySelector(".header-menu").classList.remove("_active");
          bodyUnlock();
        }
      });
    });
  }

  function initGallery() {
    const gallerySection = document.querySelector(".gallery");

    if (gallerySection) {
      const gallery = baguetteBox.run(".gallery", {});
      const galleryLink = gallerySection.querySelector(".gallery-link");

      if (galleryLink) {
        galleryLink.addEventListener("click", () => {
          baguetteBox.show(0, gallery[0]);
        });
      }
    }
  }

  function initPopups() {
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
          } else {
            currentPopup.querySelector("input[name='form_id']").value = "";
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
    popupOpenGlobal = popupOpen;

    function popupClose(popupActive) {
      let doUnlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (bodyLockStatus) {
        popupActive.classList.remove("_open");

        if (doUnlock) {
          bodyUnlock(popupAnimationTime);
        }
      }
    }
    popupCloseGlobal = popupClose;

    document.addEventListener("keydown", function (e) {
      if (e.keyCode === 27) {
        const popupActive = document.querySelector(".popup._open");
        if (popupActive) {
          popupClose(popupActive);
        }
      }
    });
  }

  function initPhoneMask() {
    var phoneMask = document.createElement("script");
    //phoneMask.src = "/wp-content/themes/theme_name_here/assets/js/libs/maska.min.js"; //for WP
    phoneMask.src = "js/libs/maska.min.js";
    phoneMask.onload = function () {
      Maska.create(".form-input--phone", {
        mask: "+48 ### ### ###",
      });
      window.removeEventListener("click", initPhoneMask);
    };
    document.body.appendChild(phoneMask);
  }

  function initForms() {
    // INPUTS
    const formInputs = document.querySelectorAll(".form-input");
    formInputs.forEach((input) => {
      input.addEventListener("blur", () => {
        checkFormInputValue(input);
      });
    });

    // FORMS
    const forms = document.querySelectorAll(".form");
    forms.forEach((form) => {
      form.addEventListener("submit", formSend);
    });

    async function formSend(e) {
      e.preventDefault();
      const error = formValidate(this);
      const formData = new FormData(this);

      if (error === 0) {
        this.classList.add("_sending");

        /*
         *  СЮДА КОД ОТПРАВКИ ДАННЫХ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         */

        /* !!!!! это удалить, используется только для теста поведения формы !!!!! */
        const response = await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({ ok: true });
          }, 2000);
        });
        /**************************************************************************/

        if (response.ok) {
          const currentPopup = this.closest(".popup._open");
          this.reset();
          removeFormIputsValidClass(this);
          this.classList.remove("_sending");

          if (currentPopup) {
            popupCloseGlobal(currentPopup);
          }
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
          if (input.value.length < 15) {
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

    function checkFormInputValue(input) {
      const value = input.value;

      if (value.trim() === "") {
        input.classList.remove("_valid");
      } else {
        input.classList.add("_valid");
      }
    }

    function removeFormIputsValidClass(form) {
      const formInputs = form.querySelectorAll(".form-input");

      formInputs.forEach((input) => {
        input.classList.remove("_valid");
      });
    }
  }

  function initCookiesInfo() {
    const cookiesInfo = document.querySelector(".cookies");

    if (cookiesInfo) {
      const cookiesBtns = cookiesInfo.querySelectorAll(".cookies-btn");

      setTimeout(() => {
        cookiesInfo.classList.add("_open");
      }, 2000);

      cookiesBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          cookiesInfo.classList.remove("_open");
        });
      });
    }
  }

  function initMap() {
    const contactsMap = document.querySelector("#contacts-map");

    if (!contactsMap) return;

    if (window.scrollY > 50) {
      loadMap();
    } else {
      window.addEventListener("scroll", onScrollWindow);
    }

    function onScrollWindow() {
      if (window.scrollY > 50) {
        loadMap();
        window.removeEventListener("scroll", onScrollWindow);
      }
    }

    function loadMap() {
      const mapURL = contactsMap.dataset.mapUrl;

      if (mapURL) {
        console.log("Loading map...");
        contactsMap.insertAdjacentHTML("beforeend", `<iframe src="${mapURL}" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`);
        contactsMap.classList.add("_map-loaded");
      }
    }
  }
})();