//WEBP checkbrowser ===============================================================================
function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
    ibgWebp();
  } else {
    document.querySelector("body").classList.add("no-webp");
    ibg();
  }
});
//=================================================================================================

// IBG ============================================================================================
function ibg() {
  $.each($(".ibg"), function (index, val) {
    if ($(this).find("img").length > 0) {
      $(this).css("background-image", 'url("' + $(this).find("img").attr("src") + '")');
    }
  });
}

function ibgWebp() {
  $.each($(".ibg"), function (index, val) {
    if ($(this).find("source").length > 0) {
      $(this).css("background-image", 'url("' + $(this).find("source").attr("srcset") + '")');
    }
  });
}
//=================================================================================================

// YOUTUBE VIDEO ==================================================================================
function findVideos() {
  var videos = document.querySelectorAll(".video");

  for (var i = 0; i < videos.length; i++) {
    setupVideo(videos[i]);
  }
}

function setupVideo(video) {
  var link = video.querySelector(".video-link");
  var videoPlayer = video.querySelector(".video-player");
  var id = parseVideoURL(link);

  video.addEventListener("click", function () {
    var iframe = createIframe(id);

    var videoPlayers = document.querySelectorAll(".video-player");
    for (var j = 0; j < videoPlayers.length; j++) {
      videoPlayers[j].innerHTML = "";
    }

    videoPlayer.appendChild(iframe);
  });

  video.classList.add("video--enabled");
}

function parseVideoURL(link) {
  var regexp = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/i;
  var url = link.href;
  var match = url.match(regexp);

  return match[1];
}

function createIframe(id) {
  var iframe = document.createElement("iframe");

  iframe.setAttribute("allowfullscreen", "");
  iframe.setAttribute("allow", "autoplay");
  iframe.setAttribute("src", generateURL(id));
  iframe.classList.add("video-iframe");

  return iframe;
}

function generateURL(id) {
  var query = "?rel=0&showinfo=0&autoplay=1";

  return "https://www.youtube.com/embed/" + id + query;
}

findVideos();
//=================================================================================================

//MASKS maskedinput plugin ========================================================================
$.each($('input[name="phone"]'), function () {
  $(this).mask("+7(999) 999-99-99");
});
//=================================================================================================

// CALCULATOR =====================================================================================
var calcSteps = $(".calc-step");
var nextStepBtn = $(".calc-btn__nextstep");
var totalSteps = calcSteps.length;

$(".calc-step--current").fadeIn();
$(".calc-step:last").addClass("calc-step--last");
$(".calc__total-steps").text(totalSteps);

calcSteps.each(function () {
  $(this).find(".calc-step__question-number").text($(this).index());
});

nextStepBtn.on("click", function () {
  if ($(".calc-step--current").hasClass("calc-step--last")) {
    $(".calc-steps").hide();
    $(".calc-final").fadeIn(300);
    $(".calc-body__bottom").fadeIn(300);
    return;
  }

  $(".calc-step--current").removeClass("calc-step--current").hide().next(".calc-step").addClass("calc-step--current").fadeIn(300);

  questionsLeft();
  progressBar();
});

// questions left
function questionsLeft() {
  var stepsLeft = totalSteps - $(".calc-step--current").index() + 1;

  if (stepsLeft === 0 || stepsLeft >= 5) {
    $(".calc__steps-left").text(stepsLeft + " вопросов");
  } else if (stepsLeft === 1) {
    $(".calc__steps-left").text(stepsLeft + " вопрос");
  } else {
    $(".calc__steps-left").text(stepsLeft + " вопроса");
  }
}
questionsLeft();

// progressBar
function progressBar() {
  var currentStepNumber = $(".calc-step--current").index();
  var currentProgressBarStep = (currentStepNumber / calcSteps.length) * 100;

  $(".calc-progressbar__line").css("width", currentProgressBarStep + "%");
}
progressBar();
//=================================================================================================

// POPUP ==========================================================================================
var body = $("body");
var bodyLockPadding = $(".body-lock-padding");
var popupLink = $(".popup-link");

var timeout = 800; // должен совпадать с длительностью анимации закрытия/открытия поп-апап в CSS
var unlock = true;

popupLink.on("click", function (e) {
  e.preventDefault();
  var currentPopup = $(this).attr("href");

  popupOpen(currentPopup);
});

function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    console.log("click");
    $(".popup.open").removeClass("open");

    $(currentPopup).addClass("open");
    bodyLockPopup();
  }
}

$(".popup").on("mouseup", function (e) {
  var popupContent = $(this).find(".popup-content");

  if (!$(e.target).is(popupContent) && popupContent.has(e.target).length === 0) {
    popupClose();
  }
});

$(".popup-close").on("click", function (e) {
  e.preventDefault();
  popupClose();
});

$(document).on("keydown", function (e) {
  if (e.which == 27) {
    popupClose();
  }
});

function popupClose() {
  if (unlock) {
    $(".popup.open").removeClass("open");
    bodyUnlockPopup();
  }
}

//===============================================
function bodyLockPopup() {
  var lockPaddingValue = $(window).outerWidth() - $(".wrapper").width() + "px";

  if (bodyLockPadding.length > 0) {
    bodyLockPadding.each(function () {
      $(this).css("padding-right", lockPaddingValue);
    });
  }

  body.attr("data-scroll", $(window).scrollTop());
  body.css("padding-right", lockPaddingValue);
  body.addClass("lock");

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnlockPopup() {
  unlock = false;

  setTimeout(function () {
    if (bodyLockPadding.length > 0) {
      bodyLockPadding.each(function () {
        $(this).css("padding-right", "0px");
      });
    }

    body.css("padding-right", "0px");
    body.removeClass("lock");

    unlock = true;
  }, timeout);
  $("html, body").animate({ scrollTop: parseInt(body.attr("data-scroll")) }, 10);
}
//=================================================================================================

//SLICK SLIDER ====================================================================================
$(document).ready(function () {
  $(".about-slider").slick({
    lazyload: "ondemand",
    arrows: true,
    appendArrows: $(".about-slider__navigation"),
    slidesToShow: 2,
    slidesToScroll: 2,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 577,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});
//=================================================================================================

// GSAP ===========================================================================================
// onload
window.onload = function () {
  const gsapAnimateElements = document.querySelectorAll("._gsap-animate");
  gsapAnimateElements.forEach((el) => {
    el.classList.add("_visible");
  });

  if (window.innerWidth >= 768) {
    gsap.registerPlugin(ScrollTrigger);

    // 1st screen
    gsap.from(".header-logo", {
      x: -200,
      opacity: 0,
      duration: 0.6,
      ease: "none",
    });

    gsap.from(".header-title", {
      y: -50,
      opacity: 0,
      duration: 0.6,
      ease: "none",
    });

    gsap.from(".header-contacts", {
      x: 200,
      opacity: 0,
      duration: 0.6,
      ease: "none",
    });

    gsap.from(".intro-title", {
      scale: 0.2,
      opacity: 0,
      duration: 0.6,
      delay: 0.6,
      ease: "none",
    });

    gsap.from(".intro-txt", {
      scale: 0.2,
      opacity: 0,
      duration: 0.6,
      delay: 0.6,
      ease: "none",
    });

    const introRowTimeline = gsap.timeline({ delay: 1.2 });
    introRowTimeline.from(".intro-item", {
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.3,
      ease: "none",
    });

    gsap.from(".intro-btn", {
      y: 100,
      opacity: 0,
      duration: 0.6,
      delay: 1.8,
      ease: "none",
    });

    // other elements
    const gsapAnimateFadeUp = document.querySelectorAll("._gsap-animate-fadeUp");
    const gsapAnimateFadeLeft = document.querySelectorAll("._gsap-animate-fadeLeft");
    const gsapAnimateFadeRight = document.querySelectorAll("._gsap-animate-fadeRight");
    const gsapAnimateScaleIn = document.querySelectorAll("._gsap-animate-scaleIn");
    const gsapAnimateFadeUpRow = document.querySelectorAll("._gsap-animate-fadeUp-row");
    const gsapAnimateFooter = document.querySelectorAll("._gsap-animate-footer");

    setGSAPAnimate(gsapAnimateFadeUp, "y", 100);
    setGSAPAnimate(gsapAnimateFadeLeft, "x", 200);
    setGSAPAnimate(gsapAnimateFadeRight, "x", -200);
    setGSAPAnimate(gsapAnimateScaleIn, "scale", 0, 1);

    function setGSAPAnimate(elements, property, propertyStartValue, propertyEndValue = 0) {
      if (elements) {
        elements.forEach((element) => {
          gsap.fromTo(
            element,
            {
              [property]: propertyStartValue,
              opacity: 0,
            },
            {
              [property]: propertyEndValue,
              opacity: 1,
              duration: 1.2,
              ease: "none",
              scrollTrigger: {
                trigger: element,
                start: "top 75%",
                end: "center 70%",
                scrub: 1.4, // поэтапная анимация, зависит от прокручивания скролла
              },
            }
          );
        });
      }
    }

    if (gsapAnimateFadeUpRow) {
      gsapAnimateFadeUpRow.forEach((el) => {
        gsap.fromTo(
          el.children,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "none",
            stagger: 0.6,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "bottom 80%",
              scrub: 1.4,
            },
          }
        );
      });
    }

    if (gsapAnimateFooter) {
      gsapAnimateFooter.forEach((el) => {
        gsap.fromTo(
          el.children,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 100%",
            },
          }
        );
      });
    }
  }
};
