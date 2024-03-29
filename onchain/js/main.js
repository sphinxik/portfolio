(() => { 
  "use strict";
  // POLYFILLS
  // scrollTo smooth
  !function () { "use strict"; function o() { var o, t, e, c, n, l, f = window, p = document; function a(o, t) { this.scrollLeft = o, this.scrollTop = t; } function r(o) { if (null === o || "object" != typeof o || void 0 === o.behavior || "auto" === o.behavior || "instant" === o.behavior) return !0; if ("object" == typeof o && "smooth" === o.behavior) return !1; throw new TypeError("behavior member of ScrollOptions " + o.behavior + " is not a valid value for enumeration ScrollBehavior."); } function i(o, t) { return "Y" === t ? o.clientHeight + l < o.scrollHeight : "X" === t ? o.clientWidth + l < o.scrollWidth : void 0; } function s(o, t) { t = f.getComputedStyle(o, null)["overflow" + t]; return "auto" === t || "scroll" === t; } function d(o) { var t = (n() - o.startTime) / e, l = t = 1 < t ? 1 : t, t = .5 * (1 - Math.cos(Math.PI * l)), l = o.startX + (o.x - o.startX) * t, t = o.startY + (o.y - o.startY) * t; o.method.call(o.scrollable, l, t), l === o.x && t === o.y || f.requestAnimationFrame(d.bind(f, o)); } function h(o, t, l) { var e, r, i, s = n(), o = o === p.body ? (r = (e = f).scrollX || f.pageXOffset, i = f.scrollY || f.pageYOffset, c.scroll) : (r = (e = o).scrollLeft, i = o.scrollTop, a); d({ scrollable: e, method: o, startTime: s, startX: r, startY: i, x: t, y: l }); } "scrollBehavior" in p.documentElement.style && !0 !== f.__forceSmoothScrollPolyfill__ || (t = f.HTMLElement || f.Element, e = 468, c = { scroll: f.scroll || f.scrollTo, scrollBy: f.scrollBy, elementScroll: t.prototype.scroll || a, scrollIntoView: t.prototype.scrollIntoView }, n = f.performance && f.performance.now ? f.performance.now.bind(f.performance) : Date.now, o = f.navigator.userAgent, l = new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(o) ? 1 : 0, f.scroll = f.scrollTo = function () { void 0 !== arguments[0] && (!0 !== r(arguments[0]) ? h.call(f, p.body, void 0 !== arguments[0].left ? ~~arguments[0].left : f.scrollX || f.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : f.scrollY || f.pageYOffset) : c.scroll.call(f, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : f.scrollX || f.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : f.scrollY || f.pageYOffset)); }, f.scrollBy = function () { void 0 !== arguments[0] && (r(arguments[0]) ? c.scrollBy.call(f, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : h.call(f, p.body, ~~arguments[0].left + (f.scrollX || f.pageXOffset), ~~arguments[0].top + (f.scrollY || f.pageYOffset))); }, t.prototype.scroll = t.prototype.scrollTo = function () { if (void 0 !== arguments[0]) if (!0 !== r(arguments[0])) { var o = arguments[0].left, t = arguments[0].top; h.call(this, this, void 0 === o ? this.scrollLeft : ~~o, void 0 === t ? this.scrollTop : ~~t); } else { if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted"); c.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop); } }, t.prototype.scrollBy = function () { void 0 !== arguments[0] && (!0 !== r(arguments[0]) ? this.scroll({ left: ~~arguments[0].left + this.scrollLeft, top: ~~arguments[0].top + this.scrollTop, behavior: arguments[0].behavior }) : c.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop)); }, t.prototype.scrollIntoView = function () { var o, t, l; !0 !== r(arguments[0]) ? (t = (o = function (o) { for (; o !== p.body && !1 === (t = i(l = o, "Y") && s(l, "Y"), l = i(l, "X") && s(l, "X"), t || l);) o = o.parentNode || o.host; var t, l; return o; }(this)).getBoundingClientRect(), l = this.getBoundingClientRect(), o !== p.body ? (h.call(this, o, o.scrollLeft + l.left - t.left, o.scrollTop + l.top - t.top), "fixed" !== f.getComputedStyle(o).position && f.scrollBy({ left: t.left, top: t.top, behavior: "smooth" })) : f.scrollBy({ left: l.left, top: l.top, behavior: "smooth" })) : c.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0]); }); } "object" == typeof exports && "undefined" != typeof module ? module.exports = { polyfill: o } : o(); }();


  // GET DATA
  async function getData(url) {
    try {
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      alert(error);
    }
  }

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

  document.addEventListener("DOMContentLoaded", function () {
    initLazyLoad();
    initGotoAnchor();
    initHeader();
    initTicker();
    initTabs();
    initNewsFilter();
    initInsightsSlider();
    initVideosSlider();
    initBlogShowmore();

    // POPUP
    const popupAnimationTime = 700;

    document.addEventListener('click', function (e) {
      const target = e.target;

      if (target.closest('[data-popup-open]')) {
        e.preventDefault();
        const currentBtn = target.closest('[data-popup-open]');
        const popupName = currentBtn.dataset.popupOpen;
        const videoID = currentBtn.dataset.videoId;
        const currentPopup = document.getElementById(popupName);

        if (currentPopup) {
          popupOpen(currentPopup);

          if (videoID) {
            addPopupVideo(currentPopup, videoID);
          }
        }
        return;
      }

      if (target.closest('[data-popup-close]')) {
        e.preventDefault();
        popupClose(target.closest(".popup"));
        return;
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.keyCode === 27) {
        const popupActive = document.querySelector(".popup._open");
        if (popupActive) {
          popupClose(popupActive);
        }
      }
    });

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

        setTimeout(() => {
          let iframes = popupActive.querySelectorAll("iframe");
          for (let j = 0; j < iframes.length; j++) {
            iframes[j].remove();
          }
        }, popupAnimationTime);

        if (doUnlock) {
          bodyUnlock(popupAnimationTime);
        }
      }
    }

    function addPopupVideo(popup, videoID) {
      const content = popup.querySelector(".popup-content");
      const iframe = document.createElement("iframe");

      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("allow", "autoplay");
      iframe.setAttribute("src", `https://www.youtube.com/embed/${videoID}?rel=0&showinfo=0&autoplay=1`);
      iframe.className = "absolute top-0 left-0 w-full h-full z-1 object-cover";
      content.appendChild(iframe);
    }
  });

  window.addEventListener("load", function (e) {
    setTimeout(function () {
      document.documentElement.classList.add("_loaded");
    }, 0);

    initParallax();
    initGSAP();
  });

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

  // LAZY LOAD
  function initLazyLoad() {
    if ("loading" in HTMLImageElement.prototype) {
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      lazyImages.forEach(function (image) {
        image.src = image.dataset.src;
        image.parentElement.querySelectorAll("source").forEach(function (source) {
          source.srcset = source.dataset.srcset;
        });

        image.classList.remove('lazyload');
        image.classList.add('lazyloaded');
      });
    } else {
      const script = document.createElement("script");
      script.src = "js/libs/lazysizes.min.js";
      document.body.appendChild(script);
    }
  }


  // GO TO ANCHOR
  function initGotoAnchor() {
    const gotoLinks = document.querySelectorAll("[data-goto]");
    if (gotoLinks.length > 0) {
      gotoLinks.forEach((gotoLink) => {
        gotoLink.addEventListener("click", onGoToLinkClick);
      });

      function onGoToLinkClick(e) {
        e.preventDefault();
        const gotoLink = e.target;

        if (gotoLink.dataset.goto && document.querySelector(gotoLink.dataset.goto)) {
          const gotoBlock = document.querySelector(gotoLink.dataset.goto);
          const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset;

          window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
          });

          if (gotoLink.closest('.header-menu')) {
            const headerMenu = document.querySelector(".header-menu");
            headerMenu.classList.remove("_open");
            headerMenu.classList.add("_close");
          }
        }
      }
    }
  }

  function initHeader() {
    const header = document.querySelector('.header');

    if (header) {
      window.addEventListener('scroll', (e) => {
        if (window.scrollY > 1) {
          header.classList.add('_scrolled');
        } else {
          header.classList.remove('_scrolled');
        }
      });
    }

    const headerBurger = document.querySelector(".header-burger");

    if (headerBurger) {
      const headerMenu = document.querySelector(".header-menu");
      const headerMenuCloseBtn = headerMenu.querySelector(".header-menu__close-btn");

      headerBurger.addEventListener("click", (e) => {
        e.preventDefault();
        headerMenu.classList.remove("_close");
        headerMenu.classList.add("_open");
      });

      headerMenuCloseBtn.addEventListener("click", (e) => {
        e.preventDefault();
        headerMenu.classList.remove("_open");
        headerMenu.classList.add("_close");
      });
    }
  }

  // TICKER
  function initTicker() {
    const tickers = document.querySelectorAll("[data-ticker]");

    if (tickers) {
      tickers.forEach((ticker) => {
        cloneTickerBody(ticker);
        setTickerAnimationTime(ticker);
        startTicker(ticker);
      });

      window.addEventListener("resize", debounce(onResizeTicker, 500));
    }

    function onResizeTicker() {
      tickers.forEach((ticker) => {
        startTicker(ticker);
      });
    }

    function startTicker(ticker) {
      ticker.classList.remove("_init");

      if (ticker.scrollWidth <= window.innerWidth * 2) {
        cloneTickerBody(ticker);
        startTicker(ticker);
        return;
      }

      ticker.classList.add("_init");
    }

    function cloneTickerBody(ticker) {
      const tickerBody = ticker.querySelector("[data-ticker-body]");
      const clone = tickerBody.cloneNode(true);
      ticker.appendChild(clone);
    }

    function setTickerAnimationTime(ticker) {
      const animationTimeOneItem = ticker.dataset.tickerAnimationTimeOneitem;
      const tickerBodies = ticker.querySelectorAll("[data-ticker-body]");
      const itemsQuantity = ticker.querySelectorAll("[data-ticker-item]").length;
      const animatioDuration = `${itemsQuantity * animationTimeOneItem}s`;

      tickerBodies[0].style.animationDuration = animatioDuration;
      tickerBodies[1].style.animationDuration = animatioDuration;
    }
  }

  // TABS
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


  // NEWS FILTER
  function initNewsFilter() {
    const newsFilterBtns = document.querySelectorAll(".news-filter__btn");
    const newsBody = document.querySelector(".news-body");
    let newsData = [];

    if (newsFilterBtns.length) {
      newsFilterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (!btn.classList.contains("_active") && !newsBody.classList.contains("_loading")) {
            const filter = btn.dataset.filter;
            document.querySelector(".news-filter__btn._active").classList.remove('_active');
            btn.classList.add("_active");
            filterNews(filter);
          }
        });
      });
    }

    function filterNews(filter) {
      newsBody.innerHTML = "";

      if (newsData.length) {
        updateNewsBody(newsData, filter);
      } else {
        newsBody.classList.add("_loading");
        getData('./data/newsdata.json').then((data) => {
          newsBody.classList.remove("_loading");
          if (data) {
            newsData = data;
            updateNewsBody(newsData, filter);
          }
        });
      }
    }

    function updateNewsBody(data) {
      let filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "all";
      let filteredData = data;

      if (filter !== "all") {
        filteredData = data.filter((item) => item.filters.includes(filter));
      }

      filteredData.forEach((item) => {
        const itemHTML = `
        <div class="col-span-1 flex flex-col animate-fadeInUp" data-key="${item.id}">
          <a href="${item.link}" class="image-link mb-4 xs:mb-3 pb-[56%] h-0">
            <img src="${item.image}" alt="article preview">
          </a>

          <div class="mb-2 flex items-center flex-wrap text-sm">
            <span class="mr-2 inline-flex items-center">
              <span class="mr-2 flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
                <img class="w-full h-full object-cover rounded-full" src="${item.authorPhoto}" alt="author photo">
              </span>
              ${item.author}
            </span>
            <span class="text-mainColor"> | ${item.date} </span>
          </div>

          <a href="${item.link}" class="flex-auto mb-3 inline-block font-neue font-bold text-xl hover:text-mainColor transition-colors">
            ${item.title}
          </a>

          <div class="text-grey text-sm">${item.description}</div>
        </div>
      `;

        newsBody.insertAdjacentHTML('beforeend', itemHTML);
        ScrollTrigger.refresh();
      });
    }
  }

  function initBlogShowmore() {
    const blogShowmoreBtn = document.querySelector('.blog-showmore__btn');
    const blogBody = document.querySelector('.blog-body');
    const blogItemsToLoad = 3;
    let blogData = [];
    let showmoreStep = blogBody.children.length;

    if (blogShowmoreBtn) {
      blogShowmoreBtn.addEventListener('click', () => {
        if (!blogShowmoreBtn.classList.contains('_loading')) {
          getBlogData();
        }
      });
    }

    function getBlogData() {
      if (blogData.length) {
        updateBlogBody(blogData);
      } else {
        blogShowmoreBtn.classList.add("_loading");
        getData('./data/blogdata.json').then((data) => {
          blogShowmoreBtn.classList.remove("_loading");
          if (data) {
            blogData = data;
            updateBlogBody(blogData);
          }
        });
      }
    }

    function updateBlogBody(data) {
      const newData = data.slice(showmoreStep, showmoreStep + blogItemsToLoad);


      newData.forEach((item, index) => {
        const itemHTML = `
        <div class="col-span-1 flex flex-col animate-fadeInUp" data-key="${item.id}">
          <a href="${item.link}" class="image-link mb-4 p-[31%] h-0">
            <img src="${item.image}" alt="article preview">
          </a>

          <div class="mb-2 text-mainColor text-sm">${item.date}</div>

          <a href="${item.link}" class="flex-auto mb-2 inline-block font-neue font-bold text-xl hover:text-mainColor transition-colors">
            ${item.title}
          </a>

          <div class="text-grey text-sm">${item.description}</div>
        </div>
      `;

        blogBody.insertAdjacentHTML('beforeend', itemHTML);
        ScrollTrigger.refresh();
      });


      showmoreStep += blogItemsToLoad;

      if (showmoreStep >= data.length) {
        blogShowmoreBtn.classList.add('hidden');
      }
    }
  }

  // INSIGHTS SLIDER
  function initInsightsSlider() {
    new Swiper(".insights-slider", {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: 3,
      spaceBetween: 24,
      speed: 800,
      freeMode: false,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: true
      },
      allowTouchMove: true,
      navigation: {
        nextEl: ".insights-slider__wrapper > .swiper-button-next",
        prevEl: ".insights-slider__wrapper > .swiper-button-prev"
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
      },
      breakpoints: {
        0: {
          slidesPerView: 1.25,
          spaceBetween: 15
        },
        480: {
          slidesPerView: 1.5,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 24
        }
      }
    });
  }

  // VIDEOS SLIDER
  function initVideosSlider() {
    const videosSliderOptions = {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: 3,
      spaceBetween: 24,
      speed: 800,
      freeMode: false,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: true
      },
      allowTouchMove: true,
      navigation: {
        nextEl: ".videos-slider__wrapper > .swiper-button-next",
        prevEl: ".videos-slider__wrapper > .swiper-button-prev"
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
      },
      breakpoints: {
        0: {
          slidesPerView: 1.25,
          spaceBetween: 15
        },
        480: {
          slidesPerView: 1.5,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        }
      }
    };

    resizableSwiper("(max-width: 991.98px)", ".videos-slider", videosSliderOptions);
  }

  // RESIZABLE SWIPER
  function resizableSwiper(breakpoint, swiperClass, swiperSettings, callback) {
    let swiper;

    breakpoint = window.matchMedia(breakpoint);

    const enableSwiper = function (className, settings) {
      swiper = new Swiper(className, settings);

      if (callback) {
        callback(swiper);
      }
    };

    const checker = function () {
      if (breakpoint.matches) {
        return enableSwiper(swiperClass, swiperSettings);
      } else {
        if (swiper !== undefined) swiper.destroy(true, true);
        return;
      }
    };

    breakpoint.addEventListener("change", checker);
    checker();
  }

  // GSAP Animation
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  function initGSAP() {
    if (ScrollTrigger.isTouch !== 1) {
      const animationDuration = 0.8;

      firstScreenGSAP(animationDuration);
      onScrollAnimationGSAP(animationDuration);
      footerGSAP(animationDuration);
      //initSmoothScrollGSAP();
    }

    function initSmoothScrollGSAP() {
      ScrollSmoother.create({
        wrapper: ".wrapper",
        content: ".content",
        smooth: 1.85,
        effects: true
        //ignoreMobileResize: true // решает проблему при появлении адресс-бара на мобах
      });
    }

    function firstScreenGSAP(animationDuration) {
      gsap.fromTo(
        ".header",
        {
          y: -100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: animationDuration,
          ease: "none"
        }
      );

      gsap.fromTo(
        ".intro-sidebar",
        {
          x: -200,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: animationDuration,
          ease: "none"
        }
      );

      gsap.fromTo(
        ".intro-content",
        {
          x: 200,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: animationDuration,
          ease: "none"
        }
      );
    }

    function onScrollAnimationGSAP(animationDuration) {
      const animationElements = gsap.utils.toArray("[data-gsap]");

      if (animationElements.length) {
        animationElements.forEach((item) => {
          const animationType = item.dataset.gsap;
          const settingsFrom = {
            opacity: 0
          };
          const settingsTo = {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: animationDuration,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 90%"
            }
          };

          switch (animationType) {
            case 'scaleIn':
              settingsFrom.scale = 0;
              settingsTo.duration = animationDuration * 0.7;
              break;
            case 'fadeInUp':
              settingsFrom.y = 150;
              break;
            case 'fadeInRight':
              settingsFrom.x = -150;
              break;
            case 'fadeInLeft':
              settingsFrom.x = 150;
              break;
          }

          gsap.fromTo(item, settingsFrom, settingsTo);
        });
      }
    }

    function footerGSAP(animationDuration) {
      gsap.fromTo(
        ".footer-left",
        {
          x: -150,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: animationDuration,
          ease: "none",
          scrollTrigger: {
            trigger: ".footer-left",
            start: "top bottom"
          }
        }
      );

      gsap.fromTo(
        ".footer-right",
        {
          x: 150,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: animationDuration,
          ease: "none",
          scrollTrigger: {
            trigger: ".footer-right",
            start: "top bottom"
          }
        }
      );

      gsap.fromTo(
        ".footer-bottom",
        {
          opacity: 0
        },
        {
          opacity: 1,
          duration: animationDuration,
          ease: "none",
          scrollTrigger: {
            trigger: ".footer-bottom",
            start: "top bottom"
          }
        }
      );
    }
  }

  // PARALLAX
  function initParallax() {
    const paralaxMouseElements = document.querySelectorAll("[data-prlx-mouse]");
    const parallaxBreakpoint = '(max-width: 1025px)';

    if (paralaxMouseElements.length && !window.matchMedia(parallaxBreakpoint).matches) {
      mouseParallax(paralaxMouseElements);
    }

    function mouseParallax(paralaxElement) {
      const observerOptions = {
        threshold: 0.1
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('_onScreen');
          } else {
            entry.target.classList.remove('_onScreen');
          }
        });
      }, observerOptions);

      paralaxElement.forEach((el) => {
        observer.observe(el);
        mouseMoveParalax(el);
      });

      function setMouseParallaxStyle(element, parallaxSpeed, coordXpercent, coordYpercent) {
        element.style.transform = `translate3d(${coordXpercent / parallaxSpeed}%, ${coordYpercent / parallaxSpeed}%, 0)`;
      }

      function mouseMoveParalax(element) {
        const parallaxSpeed = Number(element.dataset.prlxMouse);
        const paralaxMouseWrapper = element.closest("[data-prlx-mouse-wrapper]");
        const parrent = paralaxMouseWrapper || window;

        parrent.addEventListener("mousemove", function (e) {
          if (element.classList.contains('_onScreen')) {
            const winWidth = window.innerWidth;
            const winHeight = window.innerHeight;
            const coordX = e.clientX - winWidth / 2;
            const coordY = e.clientY - winHeight / 2;
            const coordXpercent = coordX / winWidth * 100 * 2;
            const coordYpercent = coordY / winHeight * 100 * 2;
            requestAnimationFrame(() => setMouseParallaxStyle(element, parallaxSpeed, coordXpercent, coordYpercent));
          }
        });
      }
    }
  }
})();