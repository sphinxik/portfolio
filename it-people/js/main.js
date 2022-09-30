/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  var __webpack_exports__ = {};
  // TOUCHSCREEN CHECK ========================================================
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

  //WEBP checkbrowser =========================================================
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
  //===========================================================================

  // DEBOUNCE =================================================================
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
  //===========================================================================

  // WINDOW ON LOAD ===========================================================
  window.addEventListener("load", () => {
    setTimeout(function () {
      document.documentElement.classList.add("_loaded");
    }, 0);
  });

  //===========================================================================
  document.addEventListener("DOMContentLoaded", () => {
    // MEDIA QUERIES ============================================================
    const minWidth_576 = window.matchMedia("(min-width: 36em)");
    const minWidth_1100 = window.matchMedia("(min-width: 68.75em)");
    const minWidth_1400 = window.matchMedia("(min-width: 87.5em)");
    const minHeight_710 = window.matchMedia("(min-height: 44.375em)");

    // WINDOW EVENTS ============================================================
    // SCROLL
    let scrollDistance = window.scrollY;

    window.addEventListener("scroll", () => {
      scrollDistance = window.scrollY;

      toggleBGAnimationWithoutFullpage(scrollDistance);
      activeSectionAndMenuWithoutFullpage(scrollDistance);
    });

    // RESIZE
    const fullScreens = document.querySelectorAll("[data-fullscreen]");
    let winWidthOnLoad = window.innerWidth;
    let winWidth = winWidthOnLoad;

    window.addEventListener("resize", debounce(_onResizeWindow, 400));

    function _onResizeWindow() {
      winWidth = window.innerWidth;

      headerMenuScrollBarStatus();
      servicesSliderStatus();
      setServicesContentInnerHeight();
      setFullpageStatus();
      activeSectionAndMenuWithoutFullpage(scrollDistance);

      if (fullScreens.length && isMobile.any() && winWidthOnLoad != winWidth) {
        winWidthOnLoad = winWidth;
        oneVH_toPX();
      }
    }

    // SIMPLE BAR ===============================================================
    const headerMenu = document.querySelector(".header-menu");
    let headerSimpleBarInit = false;
    let headerMenuScrollBar;

    function headerMenuScrollBarStatus() {
      if (!minWidth_1100.matches && !headerSimpleBarInit) {
        headerMenuScrollBar = new SimpleBar(headerMenu);
        headerSimpleBarInit = true;
      } else if (minWidth_1100.matches && headerSimpleBarInit) {
        headerMenuScrollBar.unMount();
        headerSimpleBarInit = false;
      }

      if (headerMenuScrollBar) {
        headerMenuScrollBar.recalculate();
      }
    }
    headerMenuScrollBarStatus();

    // 100vh mobile fix =========================================================
    function oneVH_toPX() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", "".concat(vh, "px"));
    }

    if (fullScreens.length && isMobile.any()) {
      oneVH_toPX();
    }

    // YOUTUBE VIDEO ============================================================
    function findVideos() {
      const videos = document.querySelectorAll(".video");

      videos.forEach((video) => setupVideo(video));
    }

    function setupVideo(video) {
      const link = video.querySelector(".video-link");
      const videoPlayer = video.querySelector(".video-player");
      const id = parseVideoURL(link);

      video.addEventListener("click", () => {
        const iframe = createIframe(id);
        const videoPlayers = document.querySelectorAll(".video-player");

        videoPlayers.forEach((player) => (player.innerHTML = ""));
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

    // SERVICES TABS ============================================================
    const services = document.querySelector(".services");
    const servicesContentInner = services.querySelector(".services-content__inner");
    const servicesNavSlider = servicesContentInner.querySelector(".services-nav__slider");
    const servicesNavLinks = servicesNavSlider.querySelectorAll(".services-nav__link");
    const servicesContentBody = servicesContentInner.querySelector(".services-content__body");
    const servicesContentItems = servicesContentBody.querySelectorAll(".services-content__item");
    const servicesContentBackBtn = servicesContentBody.querySelector(".services-content__back-btn");

    servicesNavLinks.forEach((link, i) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        servicesContentInner.classList.add("is-active");
        document.querySelector(".services-content__item.is-active").classList.remove("is-active");
        servicesContentItems[i].classList.add("is-active");

        setTimeout(() => {
          setServicesContentInnerHeight();
          fixServicesScrollPosition();
        }, 100);
      });
    });

    servicesContentBackBtn.addEventListener("click", () => {
      servicesContentInner.classList.remove("is-active");
      setTimeout(() => {
        setServicesContentInnerHeight();
        fixServicesScrollPosition();
      }, 100);
    });

    function setServicesContentInnerHeight() {
      if (servicesContentInner.classList.contains("is-active")) {
        servicesContentInner.style.height = servicesContentBody.scrollHeight + "px";
      } else {
        servicesContentInner.style.height = servicesNavSlider.scrollHeight + "px";
      }
    }
    setServicesContentInnerHeight();

    function fixServicesScrollPosition() {
      const fixedPosition = services.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: fixedPosition,
        behavior: "smooth",
      });
    }

    // SWIPER SLIDERS ===========================================================
    // SERVICES SLIDER
    const servicesSliderParent = document.querySelector(".services-nav__slider");
    const servicesSliderSettings = {
      observer: true,
      observerParents: true,
      watchOverflow: true,
      lazy: false,
      preloadImages: true,
      slidesPerView: 1,
      initialSlide: 1,
      spaceBetween: 30,
      speed: 1000,
      autoHeight: true,
      freeMode: false,
      loop: true,
      allowTouchMove: true,
      navigation: {
        nextEl: ".services-nav__slider-navigation .swiper-button-next",
        prevEl: ".services-nav__slider-navigation .swiper-button-prev",
      },

      pagination: {
        el: ".services-nav__slider-navigation .swiper-pagination",
        type: "bullets",
        clickable: true,
      },

      on: {
        slideChangeTransitionEnd: function () {
          setServicesContentInnerHeight();
        },
      },
    };

    let servicesSlider;

    function servicesSliderStatus() {
      if (minWidth_576.matches && servicesSliderParent.classList.contains("swiper-initialized")) {
        servicesSlider.destroy();
      } else if (!minWidth_576.matches && !servicesSliderParent.classList.contains("swiper-initialized")) {
        servicesSlider = new Swiper(servicesSliderParent, servicesSliderSettings);
      }
    }
    servicesSliderStatus();

    // PROTFOLIO SLIDER
    const portfolioItems = document.querySelectorAll(".portfolio-item");
    const portfolioSlider = new Swiper(".portfolio-slider", {
      observer: true,
      observerParents: true,
      watchOverflow: true,
      lazy: false,
      preloadImages: true,
      slidesPerView: 1,
      initialSlide: 1,
      spaceBetween: 30,
      speed: 1000,
      autoHeight: true,
      freeMode: false,
      loop: true,
      allowTouchMove: true,
      navigation: {
        nextEl: ".portfolio-slider__nav .swiper-button-next",
        prevEl: ".portfolio-slider__nav .swiper-button-prev",
      },

      pagination: {
        el: ".portfolio-slider__pagination",
        type: "bullets",
        clickable: true,
      },

      on: {
        init: function () {
          if (minWidth_576.matches) {
            this.pagination.bullets.forEach((bullet, i) => {
              bullet.textContent = portfolioItems[i].dataset.slideName;
            });
          }
        },
        resize: function () {
          if (minWidth_576.matches) {
            this.pagination.bullets.forEach((bullet, i) => {
              if (bullet.textContent == "") {
                bullet.textContent = portfolioItems[i].dataset.slideName;
              }
            });
          } else {
            this.pagination.bullets.forEach((bullet, i) => {
              bullet.textContent = "";
            });
          }
        },
      },
    });

    // BACKGROUND ANIMATION =====================================================
    function setBackgroundAnimationView(animationView) {
      const bgAnimationBlock = document.querySelector(".bg-animation");

      if (animationView === "reverse" && !bgAnimationBlock.classList.contains("_reverse")) {
        bgAnimationBlock.classList.remove("_normal");
        bgAnimationBlock.classList.add("_reverse");
      } else if (animationView === "normal" && !bgAnimationBlock.classList.contains("_normal")) {
        bgAnimationBlock.classList.remove("_reverse");
        bgAnimationBlock.classList.add("_normal");
      }
    }

    // GSAP ANIMATION ===========================================================
    // ANIMATION ON LOAD
    function animateOnLoad() {
      const wrapper = document.querySelector(".wrapper");
      const logo = document.querySelectorAll(".header-logo");
      const menuItems = document.querySelectorAll(".header-menu__list>li>a");
      const headerSocialsLinks = document.querySelectorAll(".header-socials__link");

      let tl = gsap.timeline();
      let animationSettings = [
        {
          y: 50,
          opacity: 0,
          pointerEvents: "none",
        },

        {
          duration: 0.6,
          y: 0,
          opacity: 1,
          ease: "ease",
        },
      ];

      gsap.to(wrapper, { duration: 0.4, opacity: 1 });

      if (minWidth_1100.matches) {
        tl.fromTo(logo, { x: -150, opacity: 0 }, { duration: 0.6, x: 0, opacity: 1, ease: "ease" });
        animationCycle(menuItems);
        animationCycle(headerSocialsLinks);
      }

      function animationCycle(elCollection) {
        elCollection.forEach((el, i) => {
          if (i === 0) {
            tl.fromTo(el, ...animationSettings).set(el, { pointerEvents: "all" });
          } else {
            tl.fromTo(el, ...animationSettings, "-=0.5").set(el, { pointerEvents: "all" });
          }
        });
      }
    }
    animateOnLoad();

    // OTHER ANIMATION
    const gsapFadeInUp = [
      {
        y: 100,
        opacity: 0,
        pointerEvents: "none",
      },

      {
        duration: 0.8,
        y: 0,
        opacity: 1,
        ease: "ease",
      },
    ];

    const gsapFadeInLeft = [
      {
        x: 150,
        opacity: 0,
        pointerEvents: "none",
      },

      {
        duration: 0.8,
        x: 0,
        opacity: 1,
        ease: "ease",
      },
    ];

    const gsapFadeInRight = [
      {
        x: -150,
        opacity: 0,
        pointerEvents: "none",
      },

      {
        duration: 0.8,
        x: 0,
        opacity: 1,
        ease: "ease",
      },
    ];

    function checkActiveSection() {
      if (minWidth_1100.matches) {
        const activeSection = document.querySelector(".section.active");
        startGSAPAnimation(activeSection);
      }
    }

    function startGSAPAnimation(activeSection) {
      const gsapBoxes = activeSection.querySelectorAll("._gsap-box:not(._gsap-show)");
      let tl = gsap.timeline();

      gsapBoxes.forEach((el, i) => {
        const gsapEffect = el.dataset.gsapEffect;
        let animationSettings = [...gsapFadeInUp];

        if (gsapEffect && gsapEffect == "fadeInLeft") {
          animationSettings = [...gsapFadeInLeft];
        }

        if (gsapEffect && gsapEffect == "fadeInRight") {
          animationSettings = [...gsapFadeInRight];
        }

        if (i === 0) {
          tl.fromTo(el, ...animationSettings).set(el, { pointerEvents: "all" });
        } else {
          tl.fromTo(el, ...animationSettings, "-=0.4").set(el, { pointerEvents: "all" });
        }

        el.classList.add("_gsap-show");
      });
    }

    // FULLPAGE =================================================================
    const fullPage = document.querySelector("#fullPage");
    let fullpagePlugin;

    const fullPageSettings = {
      licenseKey: "YOUR_KEY_HERE",
      menu: "#header-menu__list",
      anchors: ["intro", "services", "portfolio", "contacts", "begin"],
      css3: true,
      scrollingSpeed: 1300,
      autoScrolling: true,
      fitToSection: true,
      scrollBar: false,
      easing: "easeInOutCubic",
      easingcss3: "ease",
      keyboardScrolling: true,
      animateAnchor: true,
      verticalCentered: false,
      sectionSelector: ".section",
      slideSelector: ".slide",
      lazyLoading: true,
      observer: true,
      normalScrollElements: ".services-content__item-content, .portfolio-slider__nav",
      credits: { enabled: false, label: "Made with fullPage.js", position: "right" },
      onLeave: function (origin, destination, direction, trigger) {
        setBackgroundAnimationView(destination.item.dataset.animation);
      },
      afterLoad: function (origin, destination, direction, trigger) {
        checkActiveSection();
      },
    };

    fullpagePlugin = new fullpage(fullPage, fullPageSettings);

    function setFullpageStatus() {
      if ((!minWidth_1400.matches || !minHeight_710.matches) && !fullPage.classList.contains("fp-destroyed")) {
        fullpagePlugin.destroy("all");
      } else if (minWidth_1400.matches && minHeight_710.matches && fullPage.classList.contains("fp-destroyed")) {
        fullpagePlugin = new fullpage(fullPage, fullPageSettings);
      }
    }
    setFullpageStatus();

    // GOTO ===================================================================
    const gotoLinks = document.querySelectorAll("[data-goto]");

    if (gotoLinks.length > 0) {
      gotoLinks.forEach((link) => {
        link.addEventListener("click", onGoToLinkClick);
      });

      function onGoToLinkClick(e) {
        e.preventDefault();
        const gotoLink = e.target;

        if (document.body.classList.contains("fp-scrollable")) {
          if (gotoLink.dataset.goto && document.querySelector(gotoLink.dataset.goto)) {
            const gotoBlock = document.querySelector(gotoLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset;

            window.scrollTo({
              top: gotoBlockValue,
              behavior: "smooth",
            });
          }
        } else {
          const linkHref = gotoLink.getAttribute("href").slice(1);
          fullpagePlugin.moveTo(linkHref);
        }
      }
    }

    // ACTIVITTIES WITHOUT FULLPAGE =============================================
    const sections = document.querySelectorAll(".section");
    const headerMenuItems = document.querySelectorAll(".header-menu__list > li");

    function activeSectionAndMenuWithoutFullpage(scrollDistance) {
      if (!minWidth_1400.matches || !minHeight_710.matches) {
        sections.forEach((section, i) => {
          if (section.offsetTop <= scrollDistance + window.innerHeight / 2 && scrollDistance + window.innerHeight / 2 < section.offsetTop + section.clientHeight) {
            headerMenuItems.forEach((item) => {
              if (item.classList.contains("active")) {
                item.classList.remove("active");
              }
            });

            section.classList.add("active");
            headerMenuItems[i].classList.add("active");
          } else {
            section.classList.remove("active");
          }
        });
        checkActiveSection();
      }
    }
    activeSectionAndMenuWithoutFullpage(scrollDistance);

    function toggleBGAnimationWithoutFullpage(scrollDistance) {
      sections.forEach((section) => {
        if (section.offsetTop <= scrollDistance && !section.classList.contains("_scrolled")) {
          section.classList.add("_scrolled");
          setBackgroundAnimationView(section.dataset.animation);
        } else if (section.offsetTop >= scrollDistance && section.classList.contains("_scrolled")) {
          section.classList.remove("_scrolled");
          setBackgroundAnimationView(section.dataset.animation);
        }
      });
    }
    toggleBGAnimationWithoutFullpage(scrollDistance);

    // FORMS ====================================================================
    const requiredFormInputs = document.querySelectorAll(".form-input._required");

    requiredFormInputs.forEach((input) => {
      createCustomPlaceholder(input);

      input.addEventListener("blur", function () {
        if (this.value.length > 0) {
          this.classList.add("_not-empty");
        } else {
          this.classList.remove("_not-empty");
        }
      });
    });

    function createCustomPlaceholder(requiredInput) {
      const inputPlaceholder = requiredInput.getAttribute("placeholder");

      if (inputPlaceholder) {
        requiredInput.removeAttribute("placeholder");
        const customPlaceholder = document.createElement("span");
        customPlaceholder.classList.add("form-input__placeholder");
        customPlaceholder.textContent = inputPlaceholder;
        requiredInput.after(customPlaceholder);
      }
    }
  });
})();