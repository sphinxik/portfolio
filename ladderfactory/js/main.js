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

// Скролл к якорю =================================================================================
$(".menu-list a , .footer-menu__list a , .goto").on("click", function () {
  var el = $(this).attr("href").replace("#", ".");
  var offset = 0;

  $("body,html").animate({ scrollTop: $(el).offset().top + offset }, 800);
});

//=================================================================================================

// BURGER MENU ====================================================================================
$(".header-burger").on("click", function () {
  $(this).toggleClass("active");
  $(".menu").toggleClass("active");
  $("body").toggleClass("lock");
});
//=================================================================================================

// Закрываем меню после клика на его пункт ========================================================
$(".menu-list > li > a").on("click", function () {
  if ($(".menu").hasClass("active")) {
    $(".menu").removeClass("active");
    $(".header-burger").removeClass("active");
    $("body").removeClass("lock");
  }
});
//=================================================================================================

// WIN SCROLL =====================================================================================
$(window).on("scroll", function () {
  scrolledHeader();
});
// ================================================================================================

// HEADER SCROLLED ==============================================================================
function scrolledHeader() {
  var winScrl = $(window).scrollTop();

  if (winScrl > 50) {
    $(".header").addClass("scrolled");
    $(".header-inner").addClass("scrolled");
  } else {
    $(".header").removeClass("scrolled");
    $(".header-inner").removeClass("scrolled");
  }
}
scrolledHeader();
//=================================================================================================

// CHARTIST графики ===============================================================================
var graphics = document.querySelectorAll(".stats-graphic");

for (var i = 0; i < graphics.length; i++) {
  var dataYears = graphics[i].getAttribute("data-years");
  var dataYearsArray = dataYears.split(", ");
  var dataPrices = graphics[i].getAttribute("data-prices");
  var dataPricesArray = dataPrices.split(", ");

  var chart = new Chartist.Line(
    graphics[i],
    {
      labels: dataYearsArray,
      series: [dataPricesArray],
    },
    {
      lineSmooth: false,
      fullWidth: true,

      chartPadding: {
        right: 35,
      },
      axisY: {
        showLabel: false,
        offset: 30,
        labelOffset: {
          x: 0,
          y: 0,
        },
      },
      axisX: {
        labelOffset: {
          x: -13,
          y: 7,
        },
      },
      plugins: [Chartist.plugins.tooltip()],
    },
    [
      [
        "screen and (max-width: 480px)",
        {
          chartPadding: {
            right: 20,
          },
          axisY: {
            offset: 10,
          },
        },
      ],
    ]
  );
}

chart.on("created", function () {
  // слушаем наведение курсора на точки в графике
  $(".stats-graphic .ct-point").on("mouseenter", function (e) {
    var windowWidth = $(window).innerWidth();
    var val = $(this).attr("ct:value");
    var index = $(this).index();
    var year = $(this).closest(".stats-graphic").find(".ct-label");
    var currentTooltip = $(this).closest(".stats-graphic").find(".chartist-tooltip");
    var currentTooltipWidth = currentTooltip.outerWidth();

    $(this).addClass("active");

    var counter = 1;
    var currentYear;

    year.each(function () {
      if (counter === index) {
        $(this).addClass("active");
        currentYear = $(this).text();
      } else {
        $(this).removeClass("active");
      }
      counter++;
    });

    // настройки всплывающей подсказки на графике
    currentTooltip.html('<div class="stats-graphic__tooltip-header">' + currentYear + ' г.</div><div class="stats-graphic__tooltip-footer">' + val + " руб.</div>");
    currentTooltip.addClass("active");

    if (windowWidth - e.pageX < currentTooltipWidth / 2) {
      currentTooltip.removeClass("rightside");
      currentTooltip.addClass("leftside");
    } else if (e.pageX < currentTooltipWidth / 2) {
      currentTooltip.removeClass("leftside");
      currentTooltip.addClass("rightside");
    } else {
      currentTooltip.removeClass("leftside");
      currentTooltip.removeClass("rightside");
    }
  });

  // слушаем когда курсор покидает точку на графике
  $(".stats-graphic .ct-point").on("mouseleave", function () {
    $(".stats-graphic .ct-point").removeClass("active");
    $(".chartist-tooltip").removeClass("active");
    $(".stats-graphic .ct-label").removeClass("active");
  });

  // фиксит не большой баг с тултипом на тачскрине
  $(document).on("touchstart", function () {
    $(".stats-graphic .ct-point").removeClass("active");
    $(".stats-graphic .ct-label").removeClass("active");
    $(".chartist-tooltip.active").removeClass("active");
  });
});
//=================================================================================================

// YOUTUBE VIDEO ==================================================================================
// находим все блоки с классом видео
function findVideos() {
  var videos = document.querySelectorAll(".video");

  for (var i = 0; i < videos.length; i++) {
    setupVideo(videos[i]);
  }
}

// настройки видео
function setupVideo(video) {
  var link = video.querySelector(".video-link");
  var videoPlayer = video.querySelector(".video-player");
  var id = parseVideoURL(link);

  // слушаем клик по блоку .video
  video.addEventListener("click", function () {
    var iframe = createIframe(id);

    // при клике на новое видео - закрываются предыдущие
    var videoPlayers = document.querySelectorAll(".video-player");
    for (var j = 0; j < videoPlayers.length; j++) {
      videoPlayers[j].innerHTML = "";
    }

    // создаем текущий iFrame
    videoPlayer.appendChild(iframe);
  });

  // добавляем для правильного z-index если JS активен у пользователя
  // если JS выключен будет открывать видео напрямую с YouTube в новой вкладке
  video.classList.add("video--enabled");
}

// получаем ID нужного видео из атрибута HREF элемента с классом .video-link
function parseVideoURL(link) {
  var regexp = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/i;
  var url = link.href;
  var match = url.match(regexp);

  return match[1];
}

// создаем iFrame с опеределенными атрибутами
function createIframe(id) {
  var iframe = document.createElement("iframe");

  iframe.setAttribute("allowfullscreen", "");
  iframe.setAttribute("allow", "autoplay");
  iframe.setAttribute("src", generateURL(id));
  iframe.classList.add("video-iframe");

  return iframe;
}

// создаем ссылку на определенное видео для iFrame
function generateURL(id) {
  var query = "?start=28&rel=0&showinfo=0&autoplay=1";

  return "https://www.youtube.com/embed/" + id + query;
}

// запускаем функцию поиска .video
findVideos();
//=================================================================================================

// ВИДЕО БЛОК СМОТРЕТЬ ЕЩЕ ========================================================================
$(".about-content__btn").on("click", function (e) {
  e.preventDefault();
  if (!$(this).hasClass("active")) {
    $(this).addClass("active").text("Скрыть");
    $(".about-content__more").slideDown();
  } else {
    $(this).removeClass("active").text("Смотреть еще");
    $(".about-content__more").slideUp();
  }
});
//=================================================================================================

// ГАЛЕРЕЯ БЛОК СМОТРЕТЬ ЕЩЕ ========================================================================
$(".experience-galery__btn").on("click", function (e) {
  e.preventDefault();
  if (!$(this).hasClass("active")) {
    $(this).addClass("active").text("Скрыть");
    $(".experience-galery__more").slideDown();
    baguetteBox.run(".experience-galery");
  } else {
    $(this).removeClass("active").text("Смотреть еще");
    $(".experience-galery__more").slideUp();
  }
});
//=================================================================================================

// baguetteBox ====================================================================================
baguetteBox.run(".experience-galery");
//=================================================================================================

// FOOTER MENU SPOILER (mobile) ===================================================================
$(".footer-menu__title").on("click", function () {
  $(this).toggleClass("active");
  if ($(this).hasClass("active")) {
    $(".footer-menu__inner").slideDown();
  } else {
    $(".footer-menu__inner").slideUp();
  }
});

// фиксит баг при ресайзе окна браузера
$(window).on("resize", function () {
  if ($(window).width() > 576) {
    $(".footer-menu__inner").removeAttr("style");
    $(".footer-menu__title").removeClass("active");
  }
});
//=================================================================================================
// POPUP ==========================================================================================
var body = $("body");
var bodyLockPadding = $(".body-lock-padding"); //присваеваем этот класс всем элементам с position: fixed;
var popupLink = $(".popup-link");

var timeout = 800; // должен совпадать с длительностью анимации закрытия/открытия поп-апап в CSS
var unlock = true;

// отслеживаем клик по ссылке
popupLink.on("click", function (e) {
  e.preventDefault();
  var currentPopup = $(this).attr("href");

  popupOpen(currentPopup);
});

// открываем поп-ап
function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    $(".popup.open").removeClass("open"); // если поп-ап в поп-апе - закрываем 1й

    $(currentPopup).addClass("open");
    bodyLockPopup();
  }
}

// закрываем при клике по документу
$(".popup").on("mouseup", function (e) {
  var popupContent = $(this).find(".popup-content");

  if (!$(e.target).is(popupContent) && popupContent.has(e.target).length === 0) {
    popupClose();
  }
});

// закрываем при клике на крестик
$(".popup-close").on("click", function () {
  popupClose();
});

// закрываем при клике на ESC
$(document).on("keydown", function (e) {
  if (e.which == 27) {
    popupClose();
  }
});

// функция закрытия поп-апа
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
