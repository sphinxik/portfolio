"use strict";
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

// 100vh mobile fix ===============================================================================
window.addEventListener("resize", function () {
  oneVH_toPX();
});

function oneVH_toPX() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
oneVH_toPX();

// POLYFILLS ======================================================================================
// scrollTo smooth
!(function () {
  "use strict";
  function o() {
    var o,
      t,
      e,
      c,
      n,
      l,
      f = window,
      p = document;
    function a(o, t) {
      (this.scrollLeft = o), (this.scrollTop = t);
    }
    function r(o) {
      if (null === o || "object" != typeof o || void 0 === o.behavior || "auto" === o.behavior || "instant" === o.behavior) return !0;
      if ("object" == typeof o && "smooth" === o.behavior) return !1;
      throw new TypeError("behavior member of ScrollOptions " + o.behavior + " is not a valid value for enumeration ScrollBehavior.");
    }
    function i(o, t) {
      return "Y" === t ? o.clientHeight + l < o.scrollHeight : "X" === t ? o.clientWidth + l < o.scrollWidth : void 0;
    }
    function s(o, t) {
      t = f.getComputedStyle(o, null)["overflow" + t];
      return "auto" === t || "scroll" === t;
    }
    function d(o) {
      var t = (n() - o.startTime) / e,
        l = (t = 1 < t ? 1 : t),
        t = 0.5 * (1 - Math.cos(Math.PI * l)),
        l = o.startX + (o.x - o.startX) * t,
        t = o.startY + (o.y - o.startY) * t;
      o.method.call(o.scrollable, l, t), (l === o.x && t === o.y) || f.requestAnimationFrame(d.bind(f, o));
    }
    function h(o, t, l) {
      var e,
        r,
        i,
        s = n(),
        o = o === p.body ? ((r = (e = f).scrollX || f.pageXOffset), (i = f.scrollY || f.pageYOffset), c.scroll) : ((r = (e = o).scrollLeft), (i = o.scrollTop), a);
      d({ scrollable: e, method: o, startTime: s, startX: r, startY: i, x: t, y: l });
    }
    ("scrollBehavior" in p.documentElement.style && !0 !== f.__forceSmoothScrollPolyfill__) ||
      ((t = f.HTMLElement || f.Element),
      (e = 468),
      (c = { scroll: f.scroll || f.scrollTo, scrollBy: f.scrollBy, elementScroll: t.prototype.scroll || a, scrollIntoView: t.prototype.scrollIntoView }),
      (n = f.performance && f.performance.now ? f.performance.now.bind(f.performance) : Date.now),
      (o = f.navigator.userAgent),
      (l = new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(o) ? 1 : 0),
      (f.scroll = f.scrollTo =
        function () {
          void 0 !== arguments[0] &&
            (!0 !== r(arguments[0])
              ? h.call(f, p.body, void 0 !== arguments[0].left ? ~~arguments[0].left : f.scrollX || f.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : f.scrollY || f.pageYOffset)
              : c.scroll.call(
                  f,
                  void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : f.scrollX || f.pageXOffset,
                  void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : f.scrollY || f.pageYOffset
                ));
        }),
      (f.scrollBy = function () {
        void 0 !== arguments[0] &&
          (r(arguments[0])
            ? c.scrollBy.call(
                f,
                void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0,
                void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0
              )
            : h.call(f, p.body, ~~arguments[0].left + (f.scrollX || f.pageXOffset), ~~arguments[0].top + (f.scrollY || f.pageYOffset)));
      }),
      (t.prototype.scroll = t.prototype.scrollTo =
        function () {
          if (void 0 !== arguments[0])
            if (!0 !== r(arguments[0])) {
              var o = arguments[0].left,
                t = arguments[0].top;
              h.call(this, this, void 0 === o ? this.scrollLeft : ~~o, void 0 === t ? this.scrollTop : ~~t);
            } else {
              if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted");
              c.elementScroll.call(
                this,
                void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft,
                void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop
              );
            }
        }),
      (t.prototype.scrollBy = function () {
        void 0 !== arguments[0] &&
          (!0 !== r(arguments[0])
            ? this.scroll({ left: ~~arguments[0].left + this.scrollLeft, top: ~~arguments[0].top + this.scrollTop, behavior: arguments[0].behavior })
            : c.elementScroll.call(
                this,
                void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft,
                void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop
              ));
      }),
      (t.prototype.scrollIntoView = function () {
        var o, t, l;
        !0 !== r(arguments[0])
          ? ((t = (o = (function (o) {
              for (; o !== p.body && !1 === ((t = i((l = o), "Y") && s(l, "Y")), (l = i(l, "X") && s(l, "X")), t || l); ) o = o.parentNode || o.host;
              var t, l;
              return o;
            })(this)).getBoundingClientRect()),
            (l = this.getBoundingClientRect()),
            o !== p.body
              ? (h.call(this, o, o.scrollLeft + l.left - t.left, o.scrollTop + l.top - t.top),
                "fixed" !== f.getComputedStyle(o).position && f.scrollBy({ left: t.left, top: t.top, behavior: "smooth" }))
              : f.scrollBy({ left: l.left, top: l.top, behavior: "smooth" }))
          : c.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0]);
      }));
  }
  "object" == typeof exports && "undefined" != typeof module ? (module.exports = { polyfill: o }) : o();
})();

document.addEventListener("DOMContentLoaded", function () {
  // BODY lock/unlock =============================================================================
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

  // OVERLAY ======================================================================================
  const overlay = document.querySelector("#psk-overlay");

  if (overlay) {
    overlay.addEventListener("click", () => {
      const activeModals = document.querySelectorAll("[data-overlay]._active");

      if (activeModals) {
        activeModals.forEach((item) => {
          item.classList.remove("_active");
          item.classList.remove("_active-submenu");
        });
        closeOverlay();
      }
    });
  }

  function openOverlay() {
    overlay.classList.add("_active");
    bodyLock(200);
  }

  function closeOverlay() {
    overlay.classList.remove("_active");
    bodyUnlock(200);
  }

  // MODAL MENU ===================================================================================
  const modalMenu = document.querySelector(".modal-menu");

  if (modalMenu) {
    const modalMenuInner = document.querySelector(".modal-menu__inner");
    const modalMenuOpenBtn = document.querySelector(".modal-menu__trigger");
    const modalMenuCloseBtn = modalMenu.querySelector(".modal-menu__close");
    const modalMenuBackBtn = modalMenu.querySelector(".modal-menu__back");
    const modalMenuLinks = modalMenu.querySelectorAll(".modal-menu__list > li > a");

    modalMenuLinks.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (item.closest("._has-child")) {
          e.preventDefault();
          removeActiveClassModalMenuLink();
          modalMenu.classList.add("_active-submenu");
          item.classList.add("_active");
          modalMenuBackBtn.classList.add("_active");
          modalMenuInner.scrollTo(0, 0);
        }
      });
    });

    modalMenuOpenBtn.addEventListener("click", () => {
      modalMenu.classList.add("_active");
      openOverlay();
    });

    modalMenuCloseBtn.addEventListener("click", () => {
      modalMenu.classList.remove("_active");
      modalMenu.classList.remove("_active-submenu");
      modalMenuBackBtn.classList.remove("_active");
      closeOverlay();
    });

    modalMenuBackBtn.addEventListener("click", () => {
      modalMenuBackBtn.classList.remove("_active");
      modalMenu.classList.remove("_active-submenu");
      modalMenuInner.scrollTo(0, 0);
    });

    function removeActiveClassModalMenuLink() {
      modalMenuLinks.forEach((el) => el.classList.remove("_active"));
    }
  }

  // HEADER SCROLLED ================================================================================
  const header = document.querySelector(".header");

  if (header) {
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

  // SEARCH BAR ===================================================================================
  const headerSearch = document.querySelector(".header-search");

  if (headerSearch) {
    const headerSearchTrigger = document.querySelector(".header-search__trigger");
    const headerSearchCloseBtn = document.querySelector(".header-search__close");

    headerSearchTrigger.addEventListener("click", () => {
      headerSearch.classList.toggle("_active");
    });

    headerSearchCloseBtn.addEventListener("click", () => {
      headerSearch.classList.remove("_active");
    });
  }

  // GO TO ANCHOR ===================================================================================
  const gotoLinks = document.querySelectorAll("[data-goto]");

  if (gotoLinks.length > 0) {
    gotoLinks.forEach((gotoLink) => {
      gotoLink.addEventListener("click", onGoToLinkClick);
    });

    function onGoToLinkClick(e) {
      e.preventDefault();

      if (this.dataset.goto && document.querySelector(this.dataset.goto)) {
        const gotoBlock = document.querySelector(this.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset - document.querySelector(".header").offsetHeight;

        window.scrollTo({
          top: gotoBlockValue,
          behavior: "smooth",
        });
      }
    }
  }

  // MAIN BANNER ==================================================================================
  const mainBannerSlider = document.querySelector(".main-banner__slider");

  if (mainBannerSlider) {
    const mainBannerSliderSwiper = new Swiper(mainBannerSlider, {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      lazy: false,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 600,
      freeMode: false,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      // effect: 'fade',
      // fadeEffect: {
      //   crossFade: true // чтобы исчезал предыдущий слайд
      // },
      allowTouchMove: true,
      pagination: {
        el: ".main-banner__slider-pagination",
        clickable: true,
      },
    });
  }

  // ANNOUNCEMENTS SLIDER =========================================================================
  const announcementsSlider = document.querySelector(".announcements-slider");

  if (announcementsSlider) {
    let announcementsSliderSwiper;

    const announcementsSliderSettings = {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      lazy: false,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: 1.00000001,
      spaceBetween: 15,
      speed: 600,
      freeMode: false,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      allowTouchMove: true,
    };

    setAnnouncementsSliderStatus();
    window.addEventListener("resize", setAnnouncementsSliderStatus);

    function setAnnouncementsSliderStatus() {
      if (window.innerWidth < 768 && !announcementsSlider.classList.contains("swiper-initialized")) {
        announcementsSliderSwiper = new Swiper(announcementsSlider, announcementsSliderSettings);
      } else if (window.innerWidth >= 768 && announcementsSlider.classList.contains("swiper-initialized")) {
        announcementsSliderSwiper.destroy();
      }
    }
  }

  //PRODUCTS SLIDER ===============================================================================
  const productsSlider = document.querySelectorAll(".products-slider");

  if (productsSlider) {
    const productsSliderSettings = {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      lazy: false,
      preloadImages: true,
      initialSlide: 0,
      speed: 600,
      freeMode: false,
      rewind: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      allowTouchMove: true,
      slideToClickedSlide: false,
      touchMoveStopPropagation: true,
      touchStartForcePreventDefault: true,
      breakpoints: {
        0: {
          slidesPerView: 1.0000001,
          spaceBetween: 15,
          initialSlide: 1,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 15,
          initialSlide: 0,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 15,
          initialSlide: 0,
        },
        1100: {
          slidesPerView: 4,
          spaceBetween: 20,
          initialSlide: 0,
        },
        1300: {
          slidesPerView: 5,
          spaceBetween: 20,
          initialSlide: 0,
        },
        1600: {
          slidesPerView: 6,
          spaceBetween: 20,
          initialSlide: 0,
        },
      },
    };

    productsSlider.forEach((slider) => {
      const parent = slider.closest(".products-slider__wrapper");
      const prevBtn = parent.querySelector(".swiper-button-prev");
      const nextBtn = parent.querySelector(".swiper-button-next");
      const currentSliderSettings = {
        ...productsSliderSettings,
        navigation: {
          nextEl: nextBtn,
          prevEl: prevBtn,
        },
      };

      if (slider.classList.contains("products-slider--2rows")) {
        currentSliderSettings.grid = {
          rows: 2,
          fill: "row",
        };
      }

      if (slider.classList.contains("products-slider--big")) {
        currentSliderSettings.breakpoints = {
          0: {
            slidesPerView: 1.0000001,
            spaceBetween: 15,
            initialSlide: 1,
          },
          576: {
            slidesPerView: 1.3,
            spaceBetween: 15,
            initialSlide: 0,
          },
          768: {
            slidesPerView: 2.3,
            spaceBetween: 15,
            initialSlide: 0,
          },
          1100: {
            slidesPerView: 3,
            spaceBetween: 20,
            initialSlide: 0,
          },
          1300: {
            slidesPerView: 4,
            spaceBetween: 20,
            initialSlide: 0,
          },
        };
      }

      if (slider.classList.contains("products-slider--small")) {
        currentSliderSettings.breakpoints = {
          0: {
            slidesPerView: 1.0000001,
            spaceBetween: 15,
            initialSlide: 1,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 15,
            initialSlide: 0,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
            initialSlide: 0,
          },
          1100: {
            slidesPerView: 2,
            spaceBetween: 20,
            initialSlide: 0,
          },
          1400: {
            slidesPerView: 3,
            spaceBetween: 20,
            initialSlide: 0,
          },
        };
      }

      new Swiper(slider, currentSliderSettings);
    });
  }

  // PRODUCT SLIDE IMAGES =========================================================================
  initProductImagesSlider();

  function initProductImagesSlider() {
    const products = document.querySelectorAll(".product");

    if (products) {
      products.forEach((product) => {
        const productImages = product.querySelectorAll(".product-img");

        if (productImages.length > 1 && !product.classList.contains("_images-slider-initialized")) {
          product.classList.add("_images-slider-initialized");

          createProductImagesSliderNavigation(product, productImages.length, ".product-img__bullets");
          createProductImagesSliderNavigation(product, productImages.length, ".product-img__controls");
          startProductImagesSliderNavigation(product, productImages);
        }
      });
    }
  }

  function createProductImagesSliderNavigation(currentProduct, imagesQuantity, navParentSelector) {
    const navParent = currentProduct.querySelector(navParentSelector);

    for (let i = 0; i < imagesQuantity; i++) {
      const navItem = document.createElement("li");
      if (i === 0) {
        navItem.classList.add("_active");
      }
      navParent.append(navItem);
    }
  }

  function startProductImagesSliderNavigation(product, productImages) {
    const itemImgControls = product.querySelector(".product-img__controls");
    const itemImgBulletsItems = product.querySelectorAll(".product-img__bullets > li");

    itemImgControls.querySelectorAll("li").forEach((listItem, index) => {
      listItem.addEventListener("mouseenter", () => {
        toggleProductImagesSliderItemActiveClass(productImages, index);
        toggleProductImagesSliderItemActiveClass(itemImgBulletsItems, index);
      });
    });

    product.addEventListener("mouseleave", () => {
      toggleProductImagesSliderItemActiveClass(productImages, 0);
      toggleProductImagesSliderItemActiveClass(itemImgBulletsItems, 0);
    });
  }

  function toggleProductImagesSliderItemActiveClass(itemsArr) {
    let currentIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    itemsArr.forEach((item) => item.classList.remove("_active"));
    itemsArr[currentIndex].classList.add("_active");
  }

  // SALE BANNERS SLIDER ==========================================================================
  const saleBannersSlider = document.querySelector(".sale-banners__slider");

  if (saleBannersSlider) {
    let saleBannersSliderSwiper;

    const saleBannersSliderSettings = {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      lazy: false,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: 1.00000001,
      spaceBetween: 15,
      speed: 600,
      freeMode: false,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      allowTouchMove: true,
    };

    setSaleBannersSliderStatus();
    window.addEventListener("resize", setSaleBannersSliderStatus);

    function setSaleBannersSliderStatus() {
      if (window.innerWidth < 768 && !saleBannersSlider.classList.contains("swiper-initialized")) {
        saleBannersSliderSwiper = new Swiper(saleBannersSlider, saleBannersSliderSettings);
      } else if (window.innerWidth >= 768 && saleBannersSlider.classList.contains("swiper-initialized")) {
        saleBannersSliderSwiper.destroy();
      }
    }
  }

  // INTERACTIVE CATALOG SLIDERS ==================================================================
  const intercatNavigationSlider = document.querySelector(".intercat-navigation__slider");

  if (intercatNavigationSlider) {
    const intercatNavigationTitle = document.querySelector(".intercat-navigation__title");

    const intercatNavigationSliderSwiper = new Swiper(intercatNavigationSlider, {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      lazy: false,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 600,
      freeMode: false,
      loop: false,
      slideToClickedSlide: true,
      allowTouchMove: true,
      effect: "coverflow",
      coverflowEffect: {
        rotate: 40,
        depth: 220,
        modifier: 1,
        slideShadows: false,
      },
      allowTouchMove: true,
      pagination: {
        el: ".intercat-navigation__slider-pagination",
        type: "bullets",
        clickable: true,
      },
      on: {
        slideChange: function () {
          const index_currentSlide = this.realIndex;
          const currentSlide = this.slides[index_currentSlide];
          intercatNavigationTitle.textContent = currentSlide.dataset.title;
        },
      },
      breakpoints: {
        0: {
          coverflowEffect: {
            stretch: 70,
          },
        },
        576: {
          coverflowEffect: {
            stretch: 110,
          },
        },
      },
    });

    const intercatBodySliderSwiper = new Swiper(".intercat-body__slider", {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      lazy: false,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 600,
      freeMode: false,
      loop: false,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      allowTouchMove: false,
    });

    intercatNavigationSliderSwiper.controller.control = intercatBodySliderSwiper;

    // INTERCAT IFRAME
    const intercatBodySlides = document.querySelectorAll(".intercat-body__slide");

    if (intercatBodySlides) {
      const intercatIframeWrapper = document.querySelector(".intercat-iframe__wrapper");
      const intercatIframeCloseBtn = intercatIframeWrapper.querySelector(".intercat-iframe__close");
      const intercatIframe = intercatIframeWrapper.querySelector(".intercat-iframe");

      intercatBodySlides.forEach((slide) => {
        slide.addEventListener("click", (e) => {
          e.preventDefault();
          const iframeSrc = slide.getAttribute("href");

          intercatIframe.setAttribute("src", iframeSrc);
          intercatIframeWrapper.classList.add("_active");
        });
      });

      intercatIframeCloseBtn.addEventListener("click", (e) => {
        e.preventDefault();
        intercatIframe.setAttribute("src", "");
        intercatIframeWrapper.classList.remove("_active");
      });
    }
  }

  // REVIEWS SLIDER ===============================================================================
  const reviewsSlider = document.querySelector(".reviews-slider");

  if (reviewsSlider) {
    new Swiper(reviewsSlider, {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      lazy: false,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: 4,
      spaceBetween: 40,
      speed: 600,
      freeMode: false,
      rewind: true,
      allowTouchMove: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".reviews-slider__nav > .swiper-button-next",
        prevEl: ".reviews-slider__nav > .swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        576: {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 2.5,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1600: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
    });
  }

  // MAIN-NEWS TABS ===============================================================================
  const mainNewsItems = document.querySelectorAll(".main-news__item");

  if (mainNewsItems) {
    mainNewsItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        const target = e.target;

        if (window.innerWidth >= 768) {
          if (target.closest(".main-news__item-img") || target.closest(".main-news__item-text")) {
            e.preventDefault();
          }

          mainNewsItems.forEach((el) => {
            el.classList.remove("_active");
          });

          item.classList.add("_active");
        }
      });
    });
  }

  // CATALOG FILTERS RESET ========================================================================
  const catalogFiltersItemResetBtns = document.querySelectorAll(".catalog-filters__item-reset");

  if (catalogFiltersItemResetBtns) {
    catalogFiltersItemResetBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const parent = btn.closest(".catalog-filters__item");
        const inputs = parent.querySelectorAll(".catalog-filters__list input");

        if (inputs) {
          for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].type === "radio") {
              inputs[0].click();
              break;
            }

            if (inputs[i].type === "checkbox") {
              inputs[i].checked = false;
            }
          }
        }
      });
    });
  }

  // CATALOG BODY VIEW TOGGLE =====================================================================
  const catalogBodyViewBtns = document.querySelectorAll(".catalog-body__view-btn");

  if (catalogBodyViewBtns) {
    const catalogList = document.querySelector(".catalog-list");

    catalogBodyViewBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!btn.classList.contains("_active")) {
          const catalogView = btn.dataset.catalogView;
          catalogBodyViewBtns.forEach((item) => item.classList.remove("_active"));
          btn.classList.add("_active");

          if (catalogView === "big") {
            catalogList.classList.add("catalog-list--big");
          } else {
            catalogList.classList.remove("catalog-list--big");
          }
        }
      });
    });
  }

  // CATALOG SIDEBAR MOBILE ========================================================================
  const catalogSidebar = document.querySelector(".catalog-sidebar");

  if (catalogSidebar) {
    const catalogFilterTrigger = document.querySelector(".catalog-filter__trigger");
    const catalogSidebarCloseBtn = catalogSidebar.querySelector(".catalog-sidebar__close");

    catalogFilterTrigger.addEventListener("click", () => {
      catalogSidebar.classList.add("_active");
      openOverlay();
    });

    catalogSidebarCloseBtn.addEventListener("click", () => {
      catalogSidebar.classList.remove("_active");
      closeOverlay();
    });
  }

  // VIDEO SLIDER ==================================================================================
  const videoSlider = document.querySelector(".video-section__slider");

  if (videoSlider) {
    new Swiper(videoSlider, {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      lazy: false,
      preloadImages: true,
      initialSlide: 0,
      speed: 600,
      freeMode: false,
      rewind: true,
      allowTouchMove: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".video-section__slider-nav > .swiper-button-next",
        prevEl: ".video-section__slider-nav > .swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        576: {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1400: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    });
  }

  // CARD SIDEBAR SIZES ===========================================================================
  const cardSizesSidebar = document.querySelector(".card-sidebar.card-sidebar--sizes");
  const cardSizesBtnOpen = document.querySelector(".card-sizes__btn");

  if (cardSizesSidebar && cardSizesBtnOpen) {
    const cardSizesBtnClose = cardSizesSidebar.querySelectorAll("[data-sidebar-close]");

    cardSizesBtnOpen.addEventListener("click", () => {
      cardSizesSidebar.classList.add("_active");
      openOverlay();
    });

    cardSizesBtnClose.forEach(function (btn) {
      btn.addEventListener("click", () => {
        cardSizesSidebar.classList.remove("_active");
        closeOverlay();
      });
    });
  }

  // LOGOS SLIDER ===================================================================================
  const logosSlider = document.querySelector(".logos-slider");

  if (logosSlider) {
    new Swiper(logosSlider, {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: 8,
      spaceBetween: 10,
      speed: 600,
      freeMode: false,
      loop: true,
      //rwind: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      allowTouchMove: true,
      maxBackfaceHiddenSlides: 20,
      breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 8,
        },
        576: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        992: {
          slidesPerView: 6,
          spaceBetween: 10,
        },
        1640: {
          slidesPerView: 8,
          spaceBetween: 10,
        },
      },
    });
  }

  // CARD SLIDER ====================================================================================
  const cardSliderMain = document.querySelector(".card-slider__main");
  const cardSliderThumbs = document.querySelector(".card-slider__thumbs");

  if (cardSliderMain && cardSliderThumbs) {
    const initialCardSlides = cardSliderMain.querySelectorAll(".card-slider__img");

    const cardSliderMainSwiper = new Swiper(cardSliderMain, {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      preloadImages: true,
      initialSlide: 1,
      slidesPerView: 1,
      spaceBetween: 10,
      speed: 600,
      freeMode: false,
      loop: false,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      allowTouchMove: false,
    });

    const cardSliderThumbsSwiper = new Swiper(cardSliderThumbs, {
      slideToClickedSlide: true,
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      initialSlide: 1,
      spaceBetween: 30,
      slidesPerView: 3,
      speed: 600,
      centeredSlides: true,
      freeMode: false,
      loop: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    cardSliderThumbsSwiper.controller.control = cardSliderMainSwiper;
    cardSliderMainSwiper.controller.control = cardSliderThumbsSwiper;

    cardSliderMain.querySelectorAll(".card-slider__img").forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        Fancybox.fromNodes(Array.from(initialCardSlides), {
          startIndex: index,
          Thumbs: {
            type: "classic",
            showOnStart: false,
          },
        });
      });
    });
  }

  // CARD CONTENT SLIDER ============================================================================
  const cardContentSliders = document.querySelectorAll(".card-content__slider");

  if (cardContentSliders) {
    cardContentSliders.forEach((slider) => {
      initCardContentSlider(slider);
    });
  }

  function initCardContentSlider(slider) {
    const wrapper = slider.closest(".card-content__slider-wrapper");
    const btnPrev = wrapper.querySelector(".swiper-button-prev");
    const btnNext = wrapper.querySelector(".swiper-button-next");

    new Swiper(slider, {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      lazy: false,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: 4,
      spaceBetween: 10,
      speed: 600,
      freeMode: false,
      allowTouchMove: true,
      navigation: {
        nextEl: btnNext,
        prevEl: btnPrev,
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        576: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 6,
        },
        1200: {
          slidesPerView: 5,
        },
        1401: {
          slidesPerView: 4,
        },
      },
    });
  }

  // CARD SIDEBAR CHECKED PRODUCTS ==================================================================
  const cardSidebarSizeCounters = document.querySelectorAll(".card-sidebar__size .quantity-counter__input");
  const cardSidebarResultText = document.querySelector(".card-sidebar__result-text > span");

  if (cardSidebarSizeCounters.length) {
    cardSidebarSizeCounters.forEach(function (counter) {
      counter.addEventListener("change", setCheckedProductsQuantity);
    });

    function setCheckedProductsQuantity() {
      let quantity = 0;

      cardSidebarSizeCounters.forEach(function (counter) {
        if (counter.value > 0) {
          quantity += 1;
        }
      });

      cardSidebarResultText.textContent = quantity + " " + declOfNum(Number(quantity), ["предмет", "предмета", "предметов"]);
    }

    function declOfNum(number, titles) {
      var cases = [2, 0, 1, 1, 1, 2];
      return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
    }
  }

  // CART PRODUCT CLICK LISTENER
  const cartProducts = document.querySelectorAll(".cart-product");

  if (cartProducts.length) {
    cartProducts.forEach((item) => {
      item.addEventListener("click", function (e) {
        const target = e.target;

        // CART PARAMS SLIDETOGGLE MOBILE
        if (target.closest(".cart-product__param-btn")) {
          const paramsBtn = target.closest(".cart-product__param-btn");
          const paramsParent = paramsBtn.closest(".cart-product__param");
          const paramItems = paramsParent.querySelector(".cart-product__param-items");

          e.preventDefault();
          paramsBtn.classList.toggle("_active");
          paramItems.classList.toggle("_active");
        }

        // CART PARAMS ON CHANGE
        if (target.closest(".check-input")) {
          const paramItem = target.closest(".check-input");
          const paramsParent = paramItem.closest(".cart-product__param");
          const paramsBtn = paramsParent.querySelector(".cart-product__param-btn");

          paramsBtn.textContent = paramItem.value;
        }
      });
    });
  }

  // PRODUCT REVIEWS SLIDER =======================================================================
  const productReviewsSlider = document.querySelector(".product-reviews__slider");

  if (productReviewsSlider) {
    new Swiper(productReviewsSlider, {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      lazy: false,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: 3,
      spaceBetween: 20,
      speed: 600,
      freeMode: false,
      rewind: true,
      allowTouchMove: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 15,
          //autoHeight: true,
        },
        768: {
          slidesPerView: 1.5,
          spaceBetween: 15,
          autoHeight: false,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 20,
          autoHeight: false,
        },
        1100: {
          slidesPerView: 2.5,
          spaceBetween: 20,
          autoHeight: false,
        },
        1400: {
          slidesPerView: 3,
          spaceBetween: 20,
          autoHeight: false,
        },
      },
    });
  }

  // TEXT CLAMP =====================================================================================
  const maxLengthTexts = document.querySelectorAll("[data-text-max-rows]");

  if (maxLengthTexts) {
    textTruncate(maxLengthTexts);

    function textTruncate(elements) {
      elements.forEach((element) => {
        const maxRows = Number(element.dataset.textMaxRows);
        $clamp(element, { clamp: maxRows });
      });
    }
  }

  // TOOLTIPS TIPPY =================================================================================
  const tippyElements = document.querySelectorAll("[data-tippy-content-default]");

  if (tippyElements) {
    tippyElements.forEach((element) => {
      tippy(element, {
        touch: false,
        hideOnClick: false,
        placement: "right",
        onTrigger(instance, event) {
          const trigger = event.target;
          toggleTippyContent(trigger);
          trigger.addEventListener("click", tippyTriggerListener);
        },
        onUntrigger(instance, event) {
          const trigger = event.target;
          trigger.removeEventListener("click", tippyTriggerListener);
        },
      });
    });
  }

  function tippyTriggerListener(e) {
    const trigger = e.target.closest("[data-tippy-content-default]");

    if (trigger) {
      toggleTippyContent(trigger);
    }
  }

  function toggleTippyContent(trigger) {
    if (trigger.classList.contains("_active") && trigger.dataset.tippyContentActive) {
      trigger._tippy.setContent(trigger.dataset.tippyContentActive);
    } else if (trigger.dataset.tippyContentDefault) {
      trigger._tippy.setContent(trigger.dataset.tippyContentDefault);
    }
  }

  // PRODUCT CONTROLLS BTNS ACTIVE CLASS TOGGLE
  const productControlsBtns = document.querySelectorAll(".product-controls__btn");
  if (productControlsBtns) {
    productControlsBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        btn.classList.toggle("_active");
      });
    });
  }

  const cardControlsBtns = document.querySelectorAll(".card-controls__btn");
  if (cardControlsBtns) {
    cardControlsBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.classList.toggle("_active");
      });
    });
  }

  // TABS ===========================================================================================
  const tabs = document.querySelectorAll("[data-tabs]");

  if (tabs) {
    tabs.forEach(function (currentTabs) {
      let currentTabsBtns;
      let currentTabsItems;

      if (currentTabs.hasAttribute("data-tabs-inner")) {
        currentTabsBtns = currentTabs.querySelectorAll("[data-tabs-btn]");
        currentTabsItems = currentTabs.querySelectorAll("[data-tabs-item]");
      } else {
        currentTabsBtns = currentTabs.querySelectorAll("[data-tabs-btn]:not([data-tabs-btn-inner])");
        currentTabsItems = currentTabs.querySelectorAll("[data-tabs-item]:not([data-tabs-item-inner])");
      }

      currentTabs.addEventListener("click", function (e) {
        const target = e.target;

        if (target && target.closest("[data-tabs-btn]")) {
          currentTabsBtns.forEach(function (tabBtn, i) {
            if (target.closest("[data-tabs-btn]") == tabBtn) {
              hideTabs(currentTabsBtns, currentTabsItems);
              showTabs(currentTabsBtns, currentTabsItems, i);
              scrollToActiveTab(currentTabsBtns, currentTabsItems, i);
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

    function scrollToActiveTab(tabBtns, tabItems) {
      let i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      const tabPosition = tabItems[i].getBoundingClientRect().top - window.innerHeight + tabItems[i].clientHeight;

      if (tabBtns[i].hasAttribute("data-tabs-btn-goto") && tabPosition > 0) {
        const scrollCoordY = tabPosition + window.scrollY;
        window.scrollTo({
          top: scrollCoordY,
          behavior: "smooth",
        });
      }
    }
  }

  // TABS SLIDER ====================================================================================
  const tabsSliders = document.querySelectorAll(".tabs-slider");

  if (tabsSliders) {
    tabsSliders.forEach((slider) => {
      initTabsSlider(slider);
    });
  }

  function initTabsSlider(slider) {
    new Swiper(slider, {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      lazy: false,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: "auto",
      spaceBetween: 0,
      speed: 600,
      freeMode: false,
      allowTouchMove: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: "auto",
        },
      },
      on: {
        init: function () {
          this.slides.forEach((item, index) => {
            if (item.classList.contains("_active")) {
              this.slideTo(index);
            }
          });
        },
      },
    });
  }

  // FILTER =========================================================================================
  const filters = document.querySelectorAll("[data-filter]");

  if (filters) {
    filters.forEach(function (currentFilter) {
      const currentFilterBtns = currentFilter.querySelectorAll("[data-filter-btn]");
      const currentFilterItems = currentFilter.querySelectorAll("[data-filter-item]");

      currentFilter.addEventListener("click", function (e) {
        const target = e.target;

        if (target && target.closest("[data-filter-btn]:not(._active)")) {
          currentFilterBtns.forEach(function (currentBtn) {
            currentBtn.classList.remove("_active");

            if (target.closest("[data-filter-btn]") == currentBtn) {
              const dataFilter = currentBtn.dataset.filterBtn;
              currentBtn.classList.add("_active");
              filterItems(currentFilterItems, dataFilter);
            }
          });
        }
      });
    });

    function filterItems(items, filter) {
      items.forEach(function (item) {
        if (item.dataset.filterItem === filter || filter === "all") {
          item.classList.add("_active");
        } else {
          item.classList.remove("_active");
        }
      });
    }
  }

  // STAR RATING ====================================================================================
  const starRating = document.querySelectorAll(".star-rating");

  if (starRating) {
    starRating.forEach(function (currentStarRating) {
      const currentValue = currentStarRating.dataset.ratingValue;
      const currentValuePercent = currentValue / 0.05;

      currentStarRating.querySelector(".star-rating__result").style.width = currentValuePercent + "%";
    });
  }

  // SHOWMORE =======================================================================================
  const showMore = document.querySelectorAll("[data-showmore]");

  if (showMore) {
    showMore.forEach((item) => {
      let initialHeight = item.dataset.showmore;

      if (initialHeight === "auto") {
        item.style.height = "0px";

        if (item.parentElement.offsetHeight >= item.scrollHeight) {
          item.removeAttribute("style");
          return;
        }

        initialHeight = item.parentElement.offsetHeight;
      }

      if (item.dataset.showmoreAdaptive) {
        const showmoreSettings = item.dataset.showmoreAdaptive.split(",");
        if (window.matchMedia(`(max-width: ${showmoreSettings[0].trim()}px)`).matches) {
          initialHeight = showmoreSettings[1].trim();
        }
      }

      item.style.height = initialHeight + "px";

      const showmoreBtn = document.createElement("button");
      showmoreBtn.setAttribute("type", "button");
      showmoreBtn.classList.add("showmore-btn");
      showmoreBtn.textContent = "Показать полностью";
      item.append(showmoreBtn);

      showmoreBtn.addEventListener("click", () => {
        item.classList.toggle("_visible");

        if (item.classList.contains("_visible")) {
          item.style.height = item.scrollHeight + "px";
          showmoreBtn.textContent = "Скрыть";
        } else {
          item.style.height = initialHeight + "px";
          showmoreBtn.textContent = "Показать полностью";
        }
      });
    });
  }

  // ACCORDEON ======================================================================================
  const accordeonsArray = document.querySelectorAll("[data-accordeon]");

  if (accordeonsArray) {
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
          accordeon.classList.add("_init");
          initAccordeonsBody(accordeon);
          accordeon.addEventListener("click", setAccordeonAction);
        } else {
          accordeon.classList.remove("_init");
          initAccordeonsBody(accordeon, false);
          accordeon.removeEventListener("click", setAccordeonAction);
        }
      });
    }

    function initAccordeonsBody(accordeon) {
      let hideAccordeonBody = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      const accordeonBtns = accordeon.querySelectorAll("[data-accordeon-btn]");

      if (accordeonBtns.length > 0) {
        accordeonBtns.forEach(function (accordeonBtn) {
          if (hideAccordeonBody) {
            accordeonBtn.removeAttribute("tabindex");
            if (!accordeonBtn.classList.contains("_active")) {
              accordeonBtn.nextElementSibling.hidden = true;
            }
          } else {
            accordeonBtn.setAttribute("tabindex", "-1");
            accordeonBtn.nextElementSibling.hidden = false;
          }
        });
      }
    }

    function setAccordeonAction(e) {
      const el = e.target;

      if (el && el.closest("[data-accordeon-btn]")) {
        const accordeonBtn = el.hasAttribute("data-accordeon-btn") ? el : el.closest("[data-accordeon-btn]");
        const accordeon = accordeonBtn.closest("[data-accordeon]");
        const oneItemActive = accordeon.hasAttribute("data-accordeon-one-active") ? true : false;

        if (!accordeon.querySelectorAll(".is-sliding").length) {
          if (oneItemActive && !accordeonBtn.classList.contains("_active")) {
            hideAccordeonContent(accordeon);
          }
          accordeonBtn.classList.toggle("_active");
          slideToggle(accordeonBtn.nextElementSibling, 500);
        }

        e.preventDefault();
      }
    }

    function hideAccordeonContent(accordeon) {
      const accordeonActiveBtn = accordeon.querySelector("[data-accordeon-btn]._active");

      if (accordeonActiveBtn) {
        accordeonActiveBtn.classList.remove("_active");
        slideUp(accordeonActiveBtn.nextElementSibling, 500);
      }
    }
  }

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

  // CUSTOM SELECT ==================================================================================
  const customSelects = document.querySelectorAll("select[data-custom-select]");

  if (customSelects && !isMobile.any()) {
    createCustomSelect();

    document.addEventListener("click", function (e) {
      const target = e.target;

      if (target && target.closest(".custom-select")) {
        const currentCustomSelect = target.closest(".custom-select");

        if (currentCustomSelect.classList.contains("_open")) {
          if (target.closest(".custom-select__option")) {
            const currentCustomOption = target.querySelector("span");
            const parent = currentCustomOption.closest(".custom-select__wrapper");
            const currentRealSelect = parent.querySelector("select");
            const currentCustomLabel = parent.querySelector(".custom-select__label");

            currentRealSelect.value = currentCustomOption.parentElement.dataset.value;
            currentCustomLabel.innerHTML = currentCustomOption.innerHTML;

            parent.querySelectorAll(".custom-select__option").forEach((item) => {
              item.classList.remove("_active");
            });

            target.classList.add("_active");
          }

          currentCustomSelect.classList.remove("_open");
        } else {
          currentCustomSelect.classList.add("_open");
        }
      } else {
        const activeCustomSelect = document.querySelectorAll(".custom-select._open");

        if (activeCustomSelect.length) {
          for (let i = 0; i < activeCustomSelect.length; i++) {
            activeCustomSelect[i].classList.remove("_open");
          }
        }
      }
    });
  }

  function createCustomSelect() {
    for (var i = 0; i < customSelects.length; i++) {
      const currentSelect = customSelects[i];
      const selectedOption = currentSelect.querySelector("option[selected]");
      const selectOptions = currentSelect.querySelectorAll("option");
      const selectedOptionName = selectedOption.textContent;

      currentSelect.style.display = "none";

      const selectWrapper = document.createElement("div");
      selectWrapper.className = "custom-select__wrapper";
      currentSelect.after(selectWrapper);
      selectWrapper.appendChild(currentSelect);

      const customSelect = document.createElement("div");
      customSelect.className = "custom-select";
      customSelect.insertAdjacentHTML("afterbegin", '<span class="custom-select__label">' + selectedOptionName + "</span>");
      selectWrapper.appendChild(customSelect);

      const customSelectList = document.createElement("ul");
      customSelectList.className = "custom-select__list";
      customSelect.appendChild(customSelectList);

      for (let j = 0; j < selectOptions.length; j++) {
        const customSelectOption = document.createElement("li");
        const customSelectOptionName = selectOptions[j].textContent;

        customSelectOption.className = "custom-select__option";
        if (selectOptions[j].selected) {
          customSelectOption.classList.add("_active");
        }
        customSelectOption.insertAdjacentHTML("afterbegin", "<span>" + customSelectOptionName + "</span>");
        customSelectOption.dataset.value = selectOptions[j].value;
        customSelectList.appendChild(customSelectOption);
      }
    }
  }

  // FORM ===========================================================================================
  const fileInputs = document.querySelectorAll(".form-input__file");

  if (fileInputs.length) {
    fileInputs.forEach(function (input) {
      input.addEventListener("change", function (e) {
        const fileNameElement = input.nextElementSibling;
        fileNameElement.textContent = input.files[0].name;
      });
    });
  }

  // QUANTITY COUNTER ==============================================================================
  function quantityCounter() {
    const quantityCounters = document.querySelectorAll(".quantity-counter");

    if (quantityCounters) {
      quantityCounters.forEach(function (quantityCounter) {
        const currentCounterInput = quantityCounter.querySelector(".quantity-counter__input");
        const currentMinusBtn = quantityCounter.querySelector(".quantity-counter__btn--minus");
        const currentPlusBtn = quantityCounter.querySelector(".quantity-counter__btn--plus");
        const currentClearBtn = quantityCounter.querySelector(".quantity-counter__btn--clear");

        currentPlusBtn.addEventListener("click", function () {
          if (currentCounterInput.value < 9999 && currentCounterInput.value >= 0) {
            this.classList.remove("_disabled");
            currentMinusBtn.classList.remove("_disabled");
            currentCounterInput.value = ++currentCounterInput.value;
            currentCounterInput.dispatchEvent(new Event("change"));
          } else {
            this.classList.add("_disabled");
          }
        });

        currentMinusBtn.addEventListener("click", function () {
          if (currentCounterInput.value > 0 && currentCounterInput.value <= 9999) {
            this.classList.remove("_disabled");
            currentPlusBtn.classList.remove("_disabled");
            currentCounterInput.value = --currentCounterInput.value;
            currentCounterInput.dispatchEvent(new Event("change"));
          } else {
            this.classList.add("_disabled");
          }
        });

        if (currentClearBtn) {
          currentClearBtn.addEventListener("click", function () {
            currentMinusBtn.classList.remove("_disabled");
            currentPlusBtn.classList.remove("_disabled");
            currentCounterInput.value = 0;
            currentCounterInput.dispatchEvent(new Event("change"));
          });
        }
      });
    }
  }
  quantityCounter();

  // FANCYBOX ======================================================================================
  Fancybox.bind("[data-fancybox]", {
    Thumbs: {
      type: "classic",
      showOnStart: false,
    },
  });

  // DYNAMIC ADAPTIVE ==============================================================================
  (function () {
    let originalPositions = [];
    let daElements = document.querySelectorAll("[data-da]");
    let daElementsArray = [];
    let daMatchMedia = [];

    if (daElements.length > 0) {
      let number = 0;
      for (let index = 0; index < daElements.length; index++) {
        const daElement = daElements[index];
        const daMove = daElement.getAttribute("data-da");
        if (daMove != "") {
          const daArray = daMove.split(",");
          const daPlace = daArray[1] ? daArray[1].trim() : "last";
          const daBreakpoint = daArray[2] ? daArray[2].trim() : "767";
          const daType = daArray[3] === "min" ? daArray[3].trim() : "max";
          const daDestination = document.querySelector("." + daArray[0].trim());
          if (daArray.length > 0 && daDestination) {
            daElement.setAttribute("data-da-index", number);
            originalPositions[number] = {
              parent: daElement.parentNode,
              index: indexInParent(daElement),
            };

            daElementsArray[number] = {
              element: daElement,
              destination: document.querySelector("." + daArray[0].trim()),
              place: daPlace,
              breakpoint: daBreakpoint,
              type: daType,
            };
            number++;
          }
        }
      }
      dynamicAdaptSort(daElementsArray);

      for (let index = 0; index < daElementsArray.length; index++) {
        const el = daElementsArray[index];
        const daBreakpoint = el.breakpoint;
        const daType = el.type;

        daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
        daMatchMedia[index].addListener(dynamicAdapt);
      }
    }

    function dynamicAdapt(e) {
      for (let index = 0; index < daElementsArray.length; index++) {
        const el = daElementsArray[index];
        const daElement = el.element;
        const daDestination = el.destination;
        const daPlace = el.place;
        const daBreakpoint = el.breakpoint;
        const daClassname = "_dynamic_adapt_" + daBreakpoint;

        if (daMatchMedia[index].matches) {
          if (!daElement.classList.contains(daClassname)) {
            let actualIndex = indexOfElements(daDestination)[daPlace];
            if (daPlace === "first") {
              actualIndex = indexOfElements(daDestination)[0];
            } else if (daPlace === "last") {
              actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
            }
            daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
            daElement.classList.add(daClassname);
          }
        } else {
          if (daElement.classList.contains(daClassname)) {
            dynamicAdaptBack(daElement);
            daElement.classList.remove(daClassname);
          }
        }
      }
      customAdapt();
    }

    dynamicAdapt();

    function dynamicAdaptBack(el) {
      const daIndex = el.getAttribute("data-da-index");
      const originalPlace = originalPositions[daIndex];
      const parentPlace = originalPlace["parent"];
      const indexPlace = originalPlace["index"];
      const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
      parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
    }

    function indexInParent(el) {
      var children = Array.prototype.slice.call(el.parentNode.children);
      return children.indexOf(el);
    }

    function indexOfElements(parent, back) {
      const children = parent.children;
      const childrenArray = [];
      for (let i = 0; i < children.length; i++) {
        const childrenElement = children[i];
        if (back) {
          childrenArray.push(i);
        } else {
          if (childrenElement.getAttribute("data-da") == null) {
            childrenArray.push(i);
          }
        }
      }
      return childrenArray;
    }

    function dynamicAdaptSort(arr) {
      arr.sort(function (a, b) {
        if (a.breakpoint > b.breakpoint) {
          return -1;
        } else {
          return 1;
        }
      });
      arr.sort(function (a, b) {
        if (a.place > b.place) {
          return 1;
        } else {
          return -1;
        }
      });
    }

    //Дополнительные сценарии адаптации
    function customAdapt() {
      //const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
  })();
});

// LAZYLOAD ========================================================================================
window.addEventListener("load", function () {
  if ("loading" in HTMLImageElement.prototype) {
    const lozadImgs = document.querySelectorAll(".lozad");
    if (lozadImgs) {
      lozadImgs.forEach((img) => img.classList.add("lozad_loaded"));
    }
  } else {
    const script = document.createElement("script");
    script.src = "js/libs/lozad.min.js";
    script.onload = initLozad;
    document.body.appendChild(script);
  }

  function initLozad() {
    console.log("Lozad - init");
    const observer = lozad(".lozad", {
      loaded: function (el) {
        el.classList.add("lozad_loaded");
      },
    });
    observer.observe();
  }
});
