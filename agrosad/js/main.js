/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  var __webpack_exports__ = {};
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

  // LAZYLOAD =======================================================================================
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
    script.src = "js/libs/lazysizes.min.js";
    document.body.appendChild(script);
  }

  // 100vh mobile fix ===============================================================================
  window.addEventListener("resize", VHtoPX);
  function VHtoPX() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  VHtoPX();

  // BODY click/lock/unlock =========================================================================
  const body = document.querySelector("body");
  const paddingFix = document.querySelectorAll("[data-padding-fix]");
  let bodyLockStatus = true;

  body.addEventListener("click", (e) => {
    const target = e.target;
    const activeBodyItems = document.querySelectorAll("._active[data-body-click]");

    if (activeBodyItems && !target.closest("[data-body-click]")) {
      activeBodyItems.forEach((item) => {
        item.classList.remove("_active");
        bodyUnlock();
      });
    }
  });

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

  document.addEventListener("DOMContentLoaded", function () {
    initDropdownMenu();
    initHeaderContactsMobile();
    initPopup();
    initAnimateNumbers();
    initAccordeon();
    initCatalogSidebar();
    initTabs();
    initReadmore();
  });

  window.addEventListener("load", function () {
    // SPLIDE SLIDERS
    const splide = document.createElement("script");
    splide.src = "js/libs/splide.min.js";
    splide.onload = initSliders;
    document.body.appendChild(splide);

    // BAGUETTEBOX GALLERY
    const bbGallery = document.createElement("script");
    bbGallery.src = "js/libs/baguetteBox.min.js";
    bbGallery.onload = initGallery;
    document.body.appendChild(bbGallery);

    // MAP
    initMap();

    // FORMS
    initForms();
  });

  // PHONE MASK INIT FUNCTION
  window.addEventListener("click", initPhoneMask);
  function initPhoneMask() {
    var phoneMask = document.createElement("script");
    phoneMask.src = "js/libs/maska.min.js";
    phoneMask.onload = function () {
      Maska.create('input[type="tel"]', {
        mask: "+38 ### ###-##-##",
      });
      window.removeEventListener("click", initPhoneMask);
    };
    document.body.appendChild(phoneMask);
  }

  // MOBILE DROPDOWN MENU INIT FUNCTION
  function initDropdownMenu() {
    const burger = document.querySelector(".header-burger");
    const menuWrapper = document.querySelector(".menu-wrapper");
    const menu = menuWrapper.querySelector(".menu");
    const menuCloseBtn = document.querySelector("[data-menu-close]");

    burger.addEventListener("click", function () {
      burger.classList.toggle("_active");
      menuWrapper.classList.toggle("_active");

      if (menuWrapper.classList.contains("_active")) {
        bodyLock(200);
      } else {
        bodyUnlock(200);
      }
    });

    menuCloseBtn.addEventListener("click", () => {
      burger.classList.remove("_active");
      menuWrapper.classList.remove("_active");
    });

    menu.addEventListener("click", function (e) {
      const target = e.target;

      if (target && target.closest(".submenu-open__btn")) {
        const parent = target.closest("._has-submenu");
        parent.querySelector("._submenu").classList.add("_active");
        changeActiveMenu();
      }

      if (target && target.closest(".menu-back__btn")) {
        const openSubmenus = menu.querySelectorAll("._submenu._active");
        if (openSubmenus.length) {
          openSubmenus[openSubmenus.length - 1].classList.remove("_active");
          changeActiveMenu();
        }
      }
    });

    function changeActiveMenu() {
      const openSubmenus = menu.querySelectorAll("._submenu._active");
      const menuWithScroll = menu.querySelector("._menu-scroll");

      if (menuWithScroll) {
        menuWithScroll.scrollTo(0, 0);
        menuWithScroll.classList.remove("_menu-scroll");
      }

      if (openSubmenus.length) {
        openSubmenus[openSubmenus.length - 1].classList.add("_menu-scroll");
      } else {
        menu.removeAttribute("style");
      }
    }
  }

  // MOBILE HEADER CONTACTS MODAL INIT FUNCTION
  function initHeaderContactsMobile() {
    const headerContactsTrigger = document.querySelector(".header-contacts__trigger");
    if (headerContactsTrigger) {
      const headerContacts = document.querySelector(".header-contacts");
      headerContactsTrigger.addEventListener("click", () => {
        headerContactsTrigger.classList.toggle("_active");
        headerContacts.classList.toggle("_active");
      });
    }
  }

  // ANIMATE NUMBERS INIT FUNCTION
  function initAnimateNumbers() {
    const animateNumbers = document.querySelectorAll("[data-animate-number]");

    if (animateNumbers) {
      const animateDuration = 1000;
      let observerOptions = {
        threshold: 0.3,
      };

      let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entrie) => {
          if (entrie.isIntersecting) {
            startAnimateNumber(entrie.target, animateDuration);
            observer.unobserve(entrie.target); // анимация запускается 1 раз (удалить если надо при каждом появлении на экране)
          }
        });
      }, observerOptions);

      animateNumbers.forEach((elem) => {
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
  }

  // POPUP INIT FUNCTION
  function initPopup() {
    const popupOpenBtns = document.querySelectorAll("[data-popup-open]");

    if (popupOpenBtns) {
      const popupCloseBtn = document.querySelectorAll("[data-popup-close]");
      const popupAnimationTime = 400;

      if (popupOpenBtns.length > 0) {
        for (let i = 0; i < popupOpenBtns.length; i++) {
          popupOpenBtns[i].addEventListener("click", function (e) {
            e.preventDefault();
            const popupName = this.dataset.popupOpen;
            const currentPopup = document.getElementById(popupName);

            if (currentPopup) {
              popupOpen(currentPopup);

              if (popupName === "popup-order") {
                setPopupOrderContent(this, currentPopup);
              }
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
          const popupActive = document.querySelector(".popup._active");

          if (popupActive) {
            popupClose(popupActive, false);
          } else {
            bodyLock(popupAnimationTime);
          }

          currentPopup.classList.add("_active");
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
          popupActive.classList.remove("_active");

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
        if (e.which === 27) {
          const popupActive = document.querySelector(".popup._active");
          if (popupActive) {
            popupClose(popupActive);
          }
        }
      });

      function setPopupOrderContent(currentBtn, currentPopup) {
        const productCard = currentBtn.closest("[data-product]");
        const productTitle = productCard.querySelector("[data-product-title]").textContent.trim();
        const productPrice = productCard.querySelector("[data-product-price]").textContent.trim();
        const popupProductTitle = currentPopup.querySelector("[data-product-title]");
        const popupProductPrice = currentPopup.querySelector("[data-product-price]");
        const popupProductInput = currentPopup.querySelector("[data-product-input]");

        popupProductTitle.textContent = productTitle;
        popupProductPrice.textContent = productPrice;
        popupProductInput.value = productTitle;
      }
    }
  }

  // ACCORDEON INIT FUNCTION
  function initAccordeon() {
    const accordeons = document.querySelectorAll("[data-accordeon]");

    if (accordeons) {
      accordeons.forEach((accordeon) => {
        accordeonStartupSettings(accordeon);

        accordeon.addEventListener("click", (e) => {
          let target = e.target;

          if (target && target.closest("[data-accordeon-btn]")) {
            target = target.closest("[data-accordeon-btn]");

            target.classList.toggle("_active");

            if (target.classList.contains("_active")) {
              target.nextElementSibling.style.height = target.nextElementSibling.scrollHeight + "px";
            } else {
              target.nextElementSibling.style.height = "0px";
            }
          }
        });
      });

      function accordeonStartupSettings(accordeon) {
        const items = accordeon.querySelectorAll("[data-accordeon-btn]");

        items.forEach((item) => {
          if (!item.classList.contains("_active")) {
            item.nextElementSibling.style.height = "0px";
          } else {
            item.nextElementSibling.style.height = item.nextElementSibling.scrollHeight + "px";
          }
        });
      }
    }
  }

  // MOBILE CATALOG SIDEBAR INIT FUNCTION
  function initCatalogSidebar() {
    const sidebar = document.querySelector(".catalog-sidebar");

    if (sidebar) {
      const sidebarOpenBtn = document.querySelector(".catalog-sidebar__btn-open");
      const sidebarCloseBtn = document.querySelector(".catalog-sidebar__btn-close");

      sidebarOpenBtn.addEventListener("click", () => {
        sidebar.classList.add("_active");
        bodyLock(200);
      });

      sidebarCloseBtn.addEventListener("click", () => {
        sidebar.classList.remove("_active");
        bodyUnlock(200);
      });
    }
  }

  // SPLIDE SLIDERS INIT FUNCTION
  function initSliders() {
    const productsSlider = document.querySelector(".products-slider");
    if (productsSlider) {
      const productsSliderSplide = new Splide(productsSlider, {
        perPage: 1,
        perMove: 1,
        rewind: true,
        arrows: true,
        pagination: true,
        snap: true,
        mediaQuery: "min",
        breakpoints: {
          0: {
            perPage: 1,
            gap: 8,
          },
          576: {
            perPage: 2,
            gap: 8,
          },
          768: {
            perPage: 3,
            gap: 8,
          },
          992: {
            perPage: 3,
          },
          1200: {
            perPage: 4,
          },
        },
      });

      productsSliderSplide.mount();
    }

    const servicesSlider = document.querySelector(".services-slider");
    if (servicesSlider) {
      const servicesSliderSplide = new Splide(servicesSlider, {
        perPage: 1,
        perMove: 1,
        rewind: true,
        arrows: true,
        pagination: false,
        snap: true,
        mediaQuery: "min",
        breakpoints: {
          0: {
            perPage: 1,
            gap: 8,
          },
          576: {
            perPage: 2,
            gap: 8,
          },
          768: {
            perPage: 2,
            gap: 20,
          },
          992: {
            perPage: 3,
            gap: 0,
          },
        },
      });

      servicesSliderSplide.mount();
    }

    const cardSliders = document.querySelector(".card-sliders");
    if (cardSliders) {
      const cardSliderMain = cardSliders.querySelector(".card-slider__main");
      const cardSliderThumbs = cardSliders.querySelector(".card-slider__thumbs");

      const main = new Splide(cardSliderMain, {
        type: "fade",
        rewind: true,
        pagination: false,
        arrows: false,
        drag: false,
      });

      const thumbnails = new Splide(cardSliderThumbs, {
        gap: 8,
        rewind: false,
        pagination: false,
        isNavigation: true,
        mediaQuery: "min",
        breakpoints: {
          0: {
            perPage: 4,
            gap: 8,
            direction: "ltr",
            height: "auto",
            arrows: false,
          },
          576: {
            perPage: 5,
            gap: 8,
            direction: "ttb",
            height: "292px",
            arrows: true,
          },
        },
      });

      main.sync(thumbnails);
      main.mount();
      thumbnails.mount();

      thumbnails.on("updated", function () {
        thumbnails.refresh();
      });
    }
  }

  // BAGUETTEBOX GALLERY INIT FUNCTION
  function initGallery() {
    if (document.querySelector("._baguetteBox-gallery")) {
      const galleries = baguetteBox.run("._baguetteBox-gallery", {});

      const openGalleryBtn = document.querySelectorAll("[data-open-gallery]");
      openGalleryBtn.forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault;
          baguetteBox.show(0, galleries[index]);
        });
      });
    }
  }

  // MAP INIT FUNCTION
  function initMap() {
    const contactsMap = document.querySelector("#map");

    if (contactsMap) {
      if (contactsMap.getBoundingClientRect().top < window.innerHeight) {
        createMapScript();
      } else {
        window.addEventListener("scroll", loadMap);
      }

      // создаем скрипт карты
      function createMapScript() {
        const styles = document.createElement("link");
        styles.rel = "stylesheet";
        styles.href = "leaflet/leaflet.min.css";
        document.body.appendChild(styles);
  
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "leaflet/leaflet.min.js";
        script.onload = mapSettings;
        document.body.appendChild(script);
      }

      function loadMap() {
        console.log("loading Map");
        window.removeEventListener("scroll", loadMap);
        createMapScript();
      }

      function mapSettings() {
        const contactsMapCenterCoords = contactsMap.dataset.mapCoords.split(",");
        const contactsMapZoom = contactsMap.dataset.mapZoom;

        const map = L.map(contactsMap, {
          center: contactsMapCenterCoords,
          zoom: contactsMapZoom,
          scrollWheelZoom: false,
          fullscreenControl: true,
        });

        map.zoomControl.setPosition("topright");

        const contactsMapTiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        const mapMarkerIcon = L.icon({
          iconUrl: "./leaflet/marker.svg",
          iconSize: [32, 48],
          iconAnchor: [16, 47],
        });

        L.marker(contactsMapCenterCoords, { icon: mapMarkerIcon }).addTo(map);
      }
    }
  }

  // TABS INIT FUNCTION
  function initTabs() {
    const tabs = document.querySelectorAll("[data-tabs]");

    tabs.forEach(function (currentTabs) {
      const currentTabsBtns = currentTabs.querySelectorAll("[data-tabs-btn]");
      const currentTabsItems = currentTabs.querySelectorAll("[data-tabs-item]");

      currentTabs.addEventListener("click", function (e) {
        const target = e.target;

        if (target && target.closest("[data-tabs-btn]")) {
          currentTabsBtns.forEach(function (tabBtn, i) {
            if (target.closest("[data-tabs-btn]") == tabBtn) {
              hideTabs(currentTabsBtns, currentTabsItems);
              showTabs(currentTabsBtns, currentTabsItems, i);
            }
          });
        }
      });

      hideTabs(currentTabsBtns, currentTabsItems);
      showTabs(currentTabsBtns, currentTabsItems);
    });

    function hideTabs(tabBtns, tabItems) {
      tabItems.forEach(function (item) {
        item.classList.remove("_active");
      });

      tabBtns.forEach(function (item) {
        item.classList.remove("_active");
      });
    }

    function showTabs(tabBtns, tabItems) {
      let i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      tabItems[i].classList.add("_active");
      tabBtns[i].classList.add("_active");
    }
  }

  // READMORE INIT FUNCTION
  function initReadmore() {
    const readMore = document.querySelectorAll("[data-readmore]");

    if (readMore) {
      readMore.forEach((item) => {
        let initialHeight = item.dataset.readmore;

        if (item.scrollHeight <= initialHeight) {
          return;
        } else {
          item.classList.add("_readmore-init");
        }

        item.style.height = initialHeight + "px";

        const readmoreBtn = document.createElement("button");
        readmoreBtn.setAttribute("type", "button");
        readmoreBtn.classList.add("readmore-btn");
        readmoreBtn.textContent = "Читать подробнее";
        item.append(readmoreBtn);

        readmoreBtn.addEventListener("click", () => {
          item.classList.toggle("_visible");

          if (item.classList.contains("_visible")) {
            item.style.height = item.scrollHeight + "px";
            readmoreBtn.classList.add("_active");
            readmoreBtn.textContent = "Скрыть";
          } else {
            item.style.height = initialHeight + "px";
            readmoreBtn.classList.remove("_active");
            readmoreBtn.textContent = "Читать подробнее";
          }
        });
      });
    }
  }

  // FORMS INIT FUNCTION
  function initForms() {
    const forms = document.querySelectorAll("form");

    if (forms) {
      forms.forEach((form) => {
        form.addEventListener("submit", formSend);
      });

      async function formSend(e) {
        e.preventDefault();
        const error = formValidate(this);
        const formData = new FormData(this);

        if (error === 0) {
          // Отправка формы
          // const response = await fetch("", {
          //   method: "POST",
          //   body: formData,
          // });
          // if (response.ok) {
          //   const result = await response.json();
          //   this.reset();
          // } else {
          //   alert("Произошла ошибка, попробуйте снова.");
          // }
        }
      } // VALIDATION
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
          } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
            formAddError(input);
            error++;
          } else {
            if (input.value === "") {
              formAddError(input);
              error++;
            }
          }
        }
        return error;
      }

      function emailValidation(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
      }

      function formAddError(input) {
        input.classList.add("_error");
      }

      function formRemoveError(input) {
        input.classList.remove("_error");
      }
    }
  }
  /******/
})();
