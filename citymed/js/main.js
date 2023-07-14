/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  var __webpack_exports__ = {};

  // TOUCHSCREEN CHECK ==============================================================================
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
    },
  };

  if (isMobile.any()) {
    document.body.classList.add("_touchscreen");
  } else {
    document.body.classList.add("_desktop");
  }

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

  document.addEventListener("DOMContentLoaded", function () {
    // IMAGES LAZY-LOAD ===============================================================================
    const windowHeight = document.documentElement.clientHeight;
    const lazyImages = document.querySelectorAll("img[data-src], source[data-srcset]");
    let lazyImagesPositions = [];

    if (lazyImages.length > 0) {
      lazyImages.forEach((img) => {
        if (img.dataset.src || img.dataset.srcset) {
          lazyImagesPositions.push(img.getBoundingClientRect().top + window.pageYOffset);
          lazyScrollCheck();
        }
      });
    }

    function lazyScroll() {
      if (lazyImages) {
        lazyScrollCheck();
      }
    }

    function lazyScrollCheck() {
      let imgIndex = lazyImagesPositions.findIndex((item) => window.pageYOffset > item - windowHeight);

      if (imgIndex >= 0) {
        if (lazyImages[imgIndex].dataset.src) {
          lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
          lazyImages[imgIndex].removeAttribute("data-src");
        } else if (lazyImages[imgIndex].dataset.srcset) {
          lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset;
          lazyImages[imgIndex].removeAttribute("data-srcset");
        }
      }

      delete lazyImagesPositions[imgIndex];
    }

    // WINDOW SCROLL ================================================================================
    const header = document.querySelector(".header");
    const socialsSidebar = document.querySelector(".socials-sidebar");
    const goTopBtn = document.querySelector(".go-top-btn");

    window.addEventListener("scroll", function () {
      lazyScroll();

      if (window.scrollY > 0 && !header.classList.contains("is-scrolled")) {
        header.classList.add("is-scrolled");
      } else if (window.scrollY <= 0 && header.classList.contains("is-scrolled")) {
        header.classList.remove("is-scrolled");
      }

      if (window.scrollY > window.innerHeight) {
        socialsSidebar.classList.add("is-active");
        goTopBtn.classList.add("is-active");
      } else {
        socialsSidebar.classList.remove("is-active");
        goTopBtn.classList.remove("is-active");
      }

      if (window.innerWidth < 992) {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
          goTopBtn.style.transform = "translate3d(0, -50px, 0)";
        } else {
          goTopBtn.removeAttribute("style");
        }
      }
    });

    // PHONE MASK ===================================================================================
    const phoneInputs = document.querySelectorAll('.form-input[name="phone"]');

    phoneInputs.forEach(function (el) {
      IMask(el, {
        mask: "+38 (000) 000-00-00",
        lazy: false,
      });
    });

    // GOTO ==========================================================================================
    const gotoLinks = document.querySelectorAll("[data-goto]");

    if (gotoLinks.length > 0) {
      gotoLinks.forEach(function (gotoLink) {
        gotoLink.addEventListener("click", onGoToLinkClick);
      });

      function onGoToLinkClick(e) {
        e.preventDefault();
        const gotoLink = e.target.closest("[data-goto]");

        if (document.querySelector(gotoLink.dataset.goto)) {
          const gotoBlock = document.querySelector(gotoLink.dataset.goto);
          const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset - document.querySelector(".header").offsetHeight;

          window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth",
          });
        }
      }
    }

    // PROMOTION END DATE =============================================================================
    const promotionItem = document.querySelectorAll(".promotion-item");

    promotionItem.forEach(function (item) {
      setPromotionEndDate(item, item.dataset.promoDaysLeft);
    });

    function setPromotionEndDate(promoItem, daysLeft) {
      const today = new Date();
      const endDay = new Date();
      endDay.setDate(today.getDate() + parseInt(daysLeft));
      const month = endDay.getMonth();
      const arr = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

      const finalString = "до " + endDay.getDate() + " " + arr[month] + " " + endDay.getFullYear() + " года";

      promoItem.querySelector(".promotion-item__term-txt").textContent = finalString;
    }

    // STAR RATING ==================================================================================
    const starRating = document.querySelectorAll(".star-rating");

    starRating.forEach(function (currentStarRating) {
      let currentValue = currentStarRating.querySelector(".star-rating__value").value;
      let currentValuePercent = currentValue / 0.05;

      currentStarRating.querySelector(".star-rating__result").style.width = currentValuePercent + "%";
    });

    // REVIEWS AUDIO ================================================================================
    const audioPlayer = document.querySelectorAll(".reviews-list__item-audio");

    for (let i = 0; i < audioPlayer.length; i++) {
      new GreenAudioPlayer(audioPlayer[i], {
        stopOthersOnPlay: true,
      });
    }

    // REVIEWS SHOWMORE =============================================================================
    const reviewsShowmoreBtn = document.querySelector(".reviews-showmore__btn");
    const reviewsListHidden = document.querySelector(".reviews-list__hidden");

    reviewsShowmoreBtn.addEventListener("click", function () {
      reviewsListHidden.classList.add("is-open");
      reviewsShowmoreBtn.style.display = "none";
    });

    // YOUTUBE VIDEO ==================================================================================
    function findVideos() {
      const videos = document.querySelectorAll(".video");
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
        const videoPlayers = document.querySelectorAll(".video-player");

        for (let j = 0; j < videoPlayers.length; j++) {
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
    findVideos();

    // TABS ===========================================================================================
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
        item.classList.remove("is-active");
      });

      tabBtns.forEach(function (item) {
        item.classList.remove("is-active");
      });
    }

    function showTabs(tabBtns, tabItems) {
      let i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      tabItems[i].classList.add("is-active");
      tabBtns[i].classList.add("is-active");
    }

    // ACCORDEON ======================================================================================
    const accordeonsArray = document.querySelectorAll("[data-accordeon]");

    if (accordeonsArray.length > 0) {
      const accordeonsRegular = Array.from(accordeonsArray).filter(function (item, index, self) {
        return !item.dataset.accordeon.split(",")[0];
      });

      if (accordeonsRegular.length > 0) {
        initAccordeons(accordeonsRegular);
      }

      const accordeonsMedia = Array.from(accordeonsArray).filter(function (item, index, self) {
        return item.dataset.accordeon.split(",")[0];
      });

      if (accordeonsMedia.length > 0) {
        const breakpointsArray = [];

        accordeonsMedia.forEach(function (item) {
          const params = item.dataset.accordeon;
          const breakpoint = {};
          const paramsArray = params.split(",");
          breakpoint.value = paramsArray[0];
          breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
          breakpoint.item = item;
          breakpointsArray.push(breakpoint);
        });

        let mediaQueries = breakpointsArray.map(function (item) {
          return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
        });
        mediaQueries = mediaQueries.filter(function (item, index, self) {
          return self.indexOf(item) === index;
        });

        mediaQueries.forEach(function (breakpoint) {
          const paramsArray = breakpoint.split(",");
          const mediaBreakpoint = paramsArray[1];
          const mediaType = paramsArray[2];
          const matchMedia = window.matchMedia(paramsArray[0]);

          const accordeonsArray = breakpointsArray.filter(function (item) {
            if (item.value === mediaBreakpoint && item.type === mediaType) {
              return true;
            }
          });

          matchMedia.addListener(function () {
            initAccordeons(accordeonsArray, matchMedia);
          });
          initAccordeons(accordeonsArray, matchMedia);
        });
      }

      function initAccordeons(accordeonsArray) {
        let matchMedia = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        accordeonsArray.forEach(function (accordeon) {
          accordeon = matchMedia ? accordeon.item : accordeon;

          if (matchMedia.matches || !matchMedia) {
            accordeon.classList.add("is-init");
            initAccordeonsBody(accordeon);
            accordeon.addEventListener("click", setAccordeonAction);
          } else {
            accordeon.classList.remove("is-init");
            initAccordeonsBody(accordeon, false);
            accordeon.removeEventListener("click", setAccordeonAction);
          }
        });
      }

      function initAccordeonsBody(accordeon) {
        let hideAccordeonBody = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        const accordeonTitles = accordeon.querySelectorAll("[data-accordeon-title]");

        if (accordeonTitles.length > 0) {
          accordeonTitles.forEach(function (accordeonTitle) {
            if (hideAccordeonBody) {
              accordeonTitle.removeAttribute("tabindex");
              if (!accordeonTitle.classList.contains("is-active")) {
                accordeonTitle.nextElementSibling.hidden = true;
              }
            } else {
              accordeonTitle.setAttribute("tabindex", "-1");
              accordeonTitle.nextElementSibling.hidden = false;
            }
          });
        }
      }

      function setAccordeonAction(e) {
        const el = e.target;

        if (el && el.closest("[data-accordeon-title]")) {
          const accordeonTitle = el.hasAttribute("data-accordeon-title") ? el : el.closest("[data-accordeon-title]");
          const accordeon = accordeonTitle.closest("[data-accordeon]");
          const oneItemActive = accordeon.hasAttribute("data-accordeon-one-active") ? true : false;

          if (!accordeon.querySelectorAll(".is-sliding").length) {
            if (oneItemActive && !accordeonTitle.classList.contains("is-active")) {
              hideAccordeonContent(accordeon);
            }
            accordeonTitle.classList.toggle("is-active");
            slideToggle(accordeonTitle.nextElementSibling, 500);
          }

          e.preventDefault();
        }
      }

      function hideAccordeonContent(accordeon) {
        const accordeonActiveTitle = accordeon.querySelector("[data-accordeon-title].is-active");

        if (accordeonActiveTitle) {
          accordeonActiveTitle.classList.remove("is-active");
          slideUp(accordeonActiveTitle.nextElementSibling, 500);
        }
      }
    }

    // SWIPER SLIDER ==================================================================================
    // BRANCHES slider
    const branchesSliderPrevBtn = document.querySelector(".branches-slider__btn-prev");
    const branchesSliderNextBtn = document.querySelector(".branches-slider__btn-next");

    new Swiper(".branches-slider", {
      observer: true,
      observerParents: true,
      watchOverflow: true,
      preloadImages: false,
      lazy: {
        enabled: true,
        loadOnTransitionStart: true,
      },
      slidesPerView: 1,
      spaceBetween: 60,
      speed: 800,
      autoHeight: true,
      freeMode: false,
      loop: true,
      allowTouchMove: true,
      navigation: {
        nextEl: branchesSliderNextBtn,
        prevEl: branchesSliderPrevBtn,
      },

      breakpoints: {
        0: {
          spaceBetween: 32,
        },

        575.98: {
          spaceBetween: 32,
        },

        991.98: {
          spaceBetween: 60,
        },
      },
    });

    // HELP slider
    const helpSliderPrevBtn = document.querySelector(".help-slider__btn-prev");
    const helpSliderNextBtn = document.querySelector(".help-slider__btn-next");

    new Swiper(".help-slider", {
      observer: true,
      observerParents: true,
      watchOverflow: true,
      lazy: false,
      slidesPerView: 1,
      spaceBetween: 60,
      speed: 800,
      autoHeight: true,
      freeMode: false,
      loop: false,
      allowTouchMove: true,
      navigation: {
        nextEl: helpSliderNextBtn,
        prevEl: helpSliderPrevBtn,
      },

      pagination: {
        el: ".swiper-pagination",
        clickable: false,
      },

      breakpoints: {
        0: {
          spaceBetween: 32,
        },

        575.98: {
          spaceBetween: 32,
        },

        991.98: {
          spaceBetween: 60,
        },
      },
    });

    // LICENSES slider
    const licensesSliderPrevBtn = document.querySelector(".licenses-slider__btn-prev");
    const licensesSliderNextBtn = document.querySelector(".licenses-slider__btn-next");

    new Swiper(".licenses-slider", {
      observer: true,
      observerParents: true,
      watchOverflow: true,
      preloadImages: false,
      lazy: {
        enabled: true,
        loadOnTransitionStart: true,
      },
      slidesPerView: 3,
      spaceBetween: 52,
      speed: 800,
      autoHeight: true,
      freeMode: false,
      loop: true,
      allowTouchMove: true,
      navigation: {
        nextEl: licensesSliderNextBtn,
        prevEl: licensesSliderPrevBtn,
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 32,
        },

        575.98: {
          slidesPerView: 2,
          spaceBetween: 32,
        },

        991.98: {
          slidesPerView: 2,
          spaceBetween: 52,
        },

        1100: {
          slidesPerView: 3,
          spaceBetween: 52,
        },
      },
    });

    // BAGUETTEBOX ====================================================================================
    if (document.querySelector(".vehicles-gallery")) {
      baguetteBox.run(".vehicles-gallery", {});
    }

    if (document.querySelector(".clinic-gallery")) {
      baguetteBox.run(".clinic-gallery", {});
    }

    if (document.querySelector(".licenses-slider")) {
      baguetteBox.run(".licenses-slider", {});
    }

    // POPUP ==========================================================================================
    const body = document.querySelector("body");
    const paddingFix = document.querySelectorAll(".padding-fix");
    const popupOpenBtn = document.querySelectorAll("[data-popup-open]");
    const popupCloseBtn = document.querySelectorAll("[data-popup-close]");

    const timeout = 600; // ОБЯЗАТЕЛЬНО должен совпадать с длительностью анимации в CSS
    let unlock = true;

    if (popupOpenBtn.length > 0) {
      for (let i = 0; i < popupOpenBtn.length; i++) {
        popupOpenBtn[i].addEventListener("click", function (e) {
          e.preventDefault();
          const popupName = this.dataset.popupOpen;
          const dataPopupFormId = this.dataset.popupFormId;
          const currentPopup = document.getElementById(popupName);

          if (currentPopup) {
            popupOpen(currentPopup);

            if (dataPopupFormId) {
              currentPopup.querySelector('input[name="form-id"]').value = dataPopupFormId;
            } else {
              currentPopup.querySelector('input[name="form-id"]').value = "";
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
      if (currentPopup && unlock) {
        const popupActive = document.querySelector(".popup.is-open");

        if (popupActive) {
          popupClose(popupActive, false);
        } else {
          bodyLock();
        }

        currentPopup.classList.add("is-open");
        currentPopup.addEventListener("click", function (e) {
          if (!e.target.closest(".popup-content")) {
            popupClose(e.target.closest(".popup"));
          }
        });
      }
    }

    function popupClose(popupActive) {
      let doUnlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (unlock) {
        popupActive.classList.remove("is-open");

        if (doUnlock) {
          bodyUnlock();
        }
      }
    }

    document.addEventListener("keydown", function (e) {
      if (e.which === 27) {
        const popupActive = document.querySelector(".popup.is-open");
        if (popupActive) {
          popupClose(popupActive);
        }
      }
    });

    function bodyLock() {
      const paddingFixValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

      if (paddingFix.length > 0) {
        for (let i = 0; i < paddingFix.length; i++) {
          const el = paddingFix[i];

          el.style.paddingRight = paddingFixValue;
        }
      }

      body.style.paddingRight = paddingFixValue;
      body.classList.add("is-locked");

      unlock = false;
      setTimeout(function () {
        unlock = true;
      }, timeout);
    }

    function bodyUnlock() {
      setTimeout(function () {
        if (paddingFix.length > 0) {
          for (let i = 0; i < paddingFix.length; i++) {
            const el = paddingFix[i];

            el.style.paddingRight = "0px";
          }
        }

        body.style.paddingRight = "0px";
        body.classList.remove("is-locked");
      }, timeout);

      unlock = false;
      setTimeout(function () {
        unlock = true;
      }, timeout);
    }

    // FORMS ==========================================================================================
    // ON SUBMIT validation
    const forms = document.querySelectorAll("form");

    for (let i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", formSend);
    }

    // FETCH
    async function formSend(e) {
      e.preventDefault();
      const popupThanks = document.querySelector("#popup-thanks");
      const popupError = document.querySelector("#popup-error");
      const error = formValidate(this);
      const formData = new FormData(this);

      if (error === 0) {
        this.classList.add("is-sending");

        // const response = await fetch("mail/mail.php", {
        //   method: "POST",
        //   body: formData,
        // });

        //for test
        const response = await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({ ok: true });
          }, 300);
        });

        if (response.ok) {
          this.reset();
          this.classList.remove("is-sending");
          popupOpen(popupThanks);
        } else {
          popupOpen(popupError);
          this.classList.remove("is-sending");
        }
      }
    }

    function formValidate(form) {
      const formRequiredFields = form.querySelectorAll("._required");
      let error = 0;

      for (let j = 0; j < formRequiredFields.length; j++) {
        const input = formRequiredFields[j];

        formRemoveError(input);

        if (input.getAttribute("type") === "checkbox" && input.checked === false) {
          formAddError(input);
          error++;
        } else if (input.getAttribute("name") === "phone") {
          if (input.value.includes("_")) {
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

    // ADD class ERROR for input
    function formAddError(input) {
      input.classList.add("error");
    }

    // REMOVE class ERROR for input
    function formRemoveError(input) {
      input.classList.remove("error");
    }

    // MAPS =============================================================================================
    if (window.scrollY > 300) {
      createLeafletMapScript();
    } else {
      window.addEventListener("scroll", loadLeafletMap);
    }

    function loadLeafletMap() {
      window.removeEventListener("scroll", loadLeafletMap);
      createLeafletMapScript();
    }

    function createLeafletMapScript() {
      console.log("loading LeafletMap");

      const styles = document.createElement("link");
      styles.rel = "stylesheet";
      styles.href = "leaflet/leaflet.min.css";
      document.body.appendChild(styles);

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "leaflet/leaflet.min.js";
      script.onload = leafletMapSettings;
      document.body.appendChild(script);
    }

    function leafletMapSettings() {
      const mapMarkerIcon = L.icon({
        iconUrl: "./leaflet/marker.svg",
        iconSize: [44, 56],
        iconAnchor: [22, 55],
      });

      const specialistsMapBlock = document.querySelector("#specialists-map");
      if (specialistsMapBlock) {
        const mapSpecialistsCoordsList = document.querySelector(".specialists-map__coords");
        const mapSpecialistsCenterCoords = mapSpecialistsCoordsList.dataset.mapCenter.split(",");
        const mapSpecialistsCenterCircle = mapSpecialistsCoordsList.dataset.mapCenterCircle;
        const mapSpecialistsZoom = mapSpecialistsCoordsList.dataset.mapZoom;
        const mapSpecialistsCoordsListItems = mapSpecialistsCoordsList.querySelectorAll("li");

        const specialistsMap = L.map(specialistsMapBlock, {
          center: mapSpecialistsCenterCoords,
          zoom: mapSpecialistsZoom,
          scrollWheelZoom: false,
        });

        specialistsMap.zoomControl.setPosition("topright");

        const specialistsMapTiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(specialistsMap);

        // Center marker
        if (!mapSpecialistsCenterCircle) {
          mapSpecialistsCenterCircle = 0;
        }

        L.marker(mapSpecialistsCenterCoords, { icon: mapMarkerIcon }).addTo(specialistsMap);

        L.circle(mapSpecialistsCenterCoords, {
          color: "transparent",
          fillColor: "#15CE8C",
          fillOpacity: 0.4,
          radius: mapSpecialistsCenterCircle,
        }).addTo(specialistsMap);

        // Other markers
        for (let i = 0; i < mapSpecialistsCoordsListItems.length; i++) {
          const currentCoords = mapSpecialistsCoordsListItems[i].innerText.split(",");
          const currentCircle = mapSpecialistsCoordsListItems[i].dataset.mapMarkerCircle;

          L.marker(currentCoords, { icon: mapMarkerIcon }).addTo(specialistsMap);

          if (currentCircle) {
            L.circle(currentCoords, {
              color: "transparent",
              fillColor: "#15CE8C",
              fillOpacity: 0.25,
              radius: currentCircle,
            }).addTo(specialistsMap);
          }
        }
      }

      const contactsMapBlock = document.querySelector("#map");
      if (contactsMapBlock) {
        const contactsMapCenterCoords = contactsMapBlock.dataset.mapCoords.split(",");
        const contactsMapZoom = contactsMapBlock.dataset.mapZoom;

        const contactsMap = L.map(contactsMapBlock, {
          center: contactsMapCenterCoords,
          zoom: contactsMapZoom,
          scrollWheelZoom: false,
          fullscreenControl: true,
        });

        contactsMap.zoomControl.setPosition("topright");

        const contactsMapTiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(contactsMap);

        L.marker(contactsMapCenterCoords, { icon: mapMarkerIcon }).addTo(contactsMap);
      }
    }
  });

  // SLIDE - down, up, toggle =======================================================================
  function slideUp(target) {
    let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
    if (!target.classList.contains("is-sliding")) {
      target.classList.add("is-sliding");
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

        target.classList.remove("is-sliding");
      }, duration);
    }
  }

  function slideDown(target) {
    let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
    if (!target.classList.contains("is-sliding")) {
      target.classList.add("is-sliding");
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

        target.classList.remove("is-sliding");
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
  /******/
})();
