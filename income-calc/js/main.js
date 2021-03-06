/******/ (function () {
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
  //=================================================================================================

  document.addEventListener("DOMContentLoaded", function () {
    // MOBILE MENU ===================================================================================
    const body = document.querySelector("body");
    const header = document.querySelector(".header");
    const burger = header.querySelector(".burger");
    const headerNav = header.querySelector(".header-nav");

    burger.addEventListener("click", function () {
      this.classList.toggle("is-active");
      header.classList.toggle("is-active");
      headerNav.classList.toggle("is-active");

      if (!body.classList.contains("is-locked")) {
        bodyLock();
      } else {
        bodyUnlock();
      }
    });

    function bodyLock() {
      const paddingFixValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
      body.style.paddingRight = paddingFixValue;
      body.classList.add("is-locked");
    }

    function bodyUnlock() {
      body.style.paddingRight = "0px";
      body.classList.remove("is-locked");
    }

    // COUNTER ========================================================================================
    const animationTime = 45;
    const calcCounterItemHTML =
      '\n    <div class="calc-counter__item">\n      <ul>\n        <li class="pre-active"><span>9</span></li>\n        <li class="active"><span>0</span></li>\n        <li class="pre-active"><span>1</span></li>\n        <li><span>2</span></li>\n        <li><span>3</span></li>\n        <li><span>4</span></li>\n        <li><span>5</span></li>\n        <li><span>6</span></li>\n        <li><span>7</span></li>\n        <li><span>8</span></li>\n        <li><span>9</span></li>\n        <li><span>0</span></li>\n      </ul>\n    </div>\n  ';

    const calcCounterBodyBreakHTML = '<div class="break">,</div>';

    const calcTotalCounter = document.querySelector("#calcTotal");
    const calcPerDay = document.querySelector("#calcPerDay");
    const calcPerHour = document.querySelector("#calcPerHour");
    const calcPerMinute = document.querySelector("#calcPerMinute");
    const calcPerSecond = document.querySelector("#calcPerSecond");

    createCounter(calcTotalCounter, 10);
    createCounter(calcPerDay, 19);
    createCounter(calcPerHour, 19);
    createCounter(calcPerMinute, 19);
    createCounter(calcPerSecond, 19);

    function createCounter(counter, length) {
      const counterWidth = counter.offsetWidth;
      const x = counterWidth / 12.17;
      counter.style.fontSize = Math.round(x) + "px";
      const calcCounterBody = counter.querySelector(".calc-counter__body");

      for (let i = 0; i < length; i++) {
        if (i === 5) {
          calcCounterBody.insertAdjacentHTML("beforeend", calcCounterBodyBreakHTML);
        } else {
          calcCounterBody.insertAdjacentHTML("beforeend", calcCounterItemHTML);
        }
      }
    }

    function counterStart(currentCounter, investmentIncome) {
      const currentCounterLists = currentCounter.querySelectorAll("ul");
      const numbersArr = calcNumberToArr(investmentIncome, currentCounterLists.length);
      let timeoutQueue = 0;

      // ???????????????? ??????????????
      for (let i = currentCounterLists.length - 1; i >= 0; i--) {
        const finalIndex = +numbersArr[i] + 1;
        let startIndex = 0;

        currentCounterLists[i].querySelectorAll("li").forEach((el, index) => {
          if (el.classList.contains("active")) {
            startIndex = index;
          }
        });

        if (timeoutQueue < 10) {
          timeoutQueue = finalIndex * animationTime;
          requestAnimationFrame(() => {
            counterAnimationStart(currentCounterLists[i], startIndex, finalIndex);
          });
        } else {
          setTimeout(() => {
            requestAnimationFrame(() => {
              counterAnimationStart(currentCounterLists[i], startIndex, finalIndex);
            });
          }, timeoutQueue);
          timeoutQueue += finalIndex * animationTime;
        }
      }

      // ???? ?????????????? - ?????????????? 100%
      // currentCounterLists.forEach( (list, i) => {
      //   const finalIndex = +numbersArr[i] + 1;
      //   let startIndex = 0;

      //   list.querySelectorAll('li').forEach((el, i) => {
      //     if (el.classList.contains("active")) {
      //       startIndex = i;
      //     }
      //   });

      //   if(i === 0) {
      //     queue = finalIndex * animationTime;
      //     requestAnimationFrame(() => {counterAnimationStart(list, startIndex, finalIndex)});
      //   } else {
      //     setTimeout(() => {
      //       requestAnimationFrame(() => {counterAnimationStart(list, startIndex, finalIndex)});
      //     }, queue);
      //     queue += (finalIndex * animationTime);
      //   }
      // });
    }

    function counterAnimationStart(list, start, final) {
      let index = start;

      if (start < final) {
        const intervalRise = setInterval(() => {
          counterChangeAnimationStep(list, index);
          index++;
          if (index > final) {
            clearInterval(intervalRise);
          }
        }, animationTime);
      } else if (start > final) {
        const intervalFall = setInterval(() => {
          counterChangeAnimationStep(list, index);

          index--;
          if (index < final) {
            clearInterval(intervalFall);
          }
        }, animationTime);
      }
    }

    function counterChangeAnimationStep(list, index) {
      const items = list.querySelectorAll("li");
      const step = 100 / items.length;

      counterResetClasses(items);
      items[index].classList.add("active");
      items[index].previousElementSibling.classList.add("pre-active");
      items[index].nextElementSibling.classList.add("pre-active");
      list.style.transform = "translate3d(-50%, ".concat(index * step - (100 - step), "%, 0)");
    }

    function counterResetClasses(items) {
      items.forEach((el) => {
        el.classList.remove("active");
        el.classList.remove("pre-active");
      });
    }

    function calcNumberToArr(num, numLength) {
      const arr = num.toFixed(numLength - 5).split("");
      const emptySlots = numLength + 1 - arr.length;

      if (emptySlots) {
        for (let i = 0; i < emptySlots; i++) {
          arr.unshift(0);
        }
      }
      return arr.filter((item) => item !== ".");
    }

    // CALC ===========================================================================================
    const calcStart = document.querySelector("#calcStart");
    const calcInvestment = document.querySelector("#calcInvestment");
    const calcDuration = document.querySelector("#calcDuration");
    const calcRate = document.querySelector("#calcRate");
    const calcPeriod = document.querySelector("#calcPeriod");

    document.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        calcStart.click();
      }
    });

    calcDuration.addEventListener("focus", function () {
      const customSelect = this.nextElementSibling.querySelector(".custom-select");
      if (!customSelect.classList.contains("on")) {
        customSelect.click();
      }
    });

    calcStart.addEventListener("click", function () {
      const calcInvestmentVal = calcInvestment.value;
      const calcDurationVal = calcDuration.value;
      //const calcRateVal = calcRate.textContent.replace(/\D/gim, "");
      const calcRateVal = parseInt(calcRate.textContent);

      const calcPeriodVal = calcPeriod.value;

      if (calcInvestmentVal !== "" && calcDurationVal !== "") {
        let result = (calcInvestmentVal * calcRateVal) / 100;
        let resultPerDay;

        if (calcPeriodVal === "year") {
          result = result * calcDurationVal;
          resultPerDay = result / (calcDurationVal * 365);
        }

        if (calcPeriodVal === "month") {
          result = (result / 12) * calcDurationVal;
          resultPerDay = result / calcDurationVal / 30;
        }

        if (calcPeriodVal === "day") {
          result = (result / 365) * calcDurationVal;
          resultPerDay = result / calcDurationVal;
        }

        let resultPerHour = resultPerDay / 24;
        let resultPerMinute = resultPerHour / 60;
        let resultPerSecond = resultPerMinute / 60;

        if (result > 99999.9999) {
          counterStart(calcTotalCounter, 99999.9999);
          counterStart(calcPerDay, 99999.0);
          counterStart(calcPerHour, 99999.0);
          counterStart(calcPerMinute, 99999.0);
          counterStart(calcPerSecond, 99999.0);
          alert("?????????? ???????????? ?????????????? ????????????, ?????????? ?????????????????? ???????????????????? ???? ?? ????????????????.");
        } else {
          counterStart(calcTotalCounter, result);
          counterStart(calcPerDay, resultPerDay);
          counterStart(calcPerHour, resultPerHour);
          counterStart(calcPerMinute, resultPerMinute);
          counterStart(calcPerSecond, resultPerSecond);
        }
      }
    });

    // SELECT-CUSTOM ==================================================================================
    const selects = document.querySelectorAll("select[data-custom-select]");

    if (selects.length > 0) {
      initCustomSelect();

      document.addEventListener("click", function (e) {
        const target = e.target;

        if (target && target.closest("#calcDuration")) {
          return;
        }

        if (target && target.closest(".custom-select")) {
          const currentCustomSelect = target.closest(".custom-select");

          if (currentCustomSelect.classList.contains("on")) {
            customSelectClose(currentCustomSelect);
          } else {
            customSelectOpen(currentCustomSelect);
          }
        } else if (target && target.closest(".custom-select__option > span")) {
          const currentCustomOption = target.closest(".custom-select__option > span");
          const parent = currentCustomOption.closest(".custom-select__wrapper");
          const currentCustomSelect = parent.querySelector(".custom-select");
          const currentRealSelect = parent.querySelector("select");
          const currentCustomLabel = parent.querySelector(".custom-select__label");

          currentRealSelect.value = currentCustomOption.parentElement.dataset.value;
          currentCustomLabel.textContent = currentCustomOption.textContent;

          customSelectClose(currentCustomSelect);
        } else {
          const activeCustomSelect = document.querySelector(".custom-select.on");

          if (activeCustomSelect) {
            customSelectClose(activeCustomSelect);
          }
        }
      });
    }

    function initCustomSelect() {
      for (var i = 0; i < selects.length; i++) {
        const currentSelect = selects[i];
        const selectedOptionName = currentSelect.querySelector("option[selected]").textContent;
        const selectOptions = currentSelect.querySelectorAll("option");

        currentSelect.style.display = "none";

        var selectWrapper = document.createElement("div");
        selectWrapper.className = "custom-select__wrapper";
        currentSelect.after(selectWrapper);
        selectWrapper.appendChild(currentSelect);

        var customSelect = document.createElement("div");
        customSelect.className = "custom-select";
        customSelect.insertAdjacentHTML("afterbegin", '<span class="custom-select__label">' + selectedOptionName + "</span>");
        selectWrapper.appendChild(customSelect);

        var customSelectList = document.createElement("ul");
        customSelectList.className = "custom-select__list";
        customSelect.after(customSelectList);

        for (let j = 0; j < selectOptions.length; j++) {
          var customSelectOption = document.createElement("li");
          customSelectOption.className = "custom-select__option";
          customSelectOption.insertAdjacentHTML("afterbegin", "<span>" + selectOptions[j].textContent + "</span>");
          customSelectOption.dataset.value = selectOptions[j].value;
          customSelectList.appendChild(customSelectOption);
        }

        customSelectList.style.height = 0;
      }
    }

    function customSelectOpen(customSelect) {
      const currentCustomSelectList = customSelect.parentElement.querySelector(".custom-select__list");
      customSelect.classList.add("on");
      currentCustomSelectList.style.height = currentCustomSelectList.scrollHeight + "px";
    }

    function customSelectClose(customSelect) {
      const currentCustomSelectList = customSelect.parentElement.querySelector(".custom-select__list");
      customSelect.classList.remove("on");
      currentCustomSelectList.style.height = 0;
    }

    // DYNAMIC ADAPTIVE ===============================================================================
    // Andrikanych Yevhen 2020
    (function () {
      let originalPositions = [];
      let daElements = document.querySelectorAll("[data-da]");
      let daElementsArray = [];
      let daMatchMedia = [];
      //?????????????????? ??????????????
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
              //?????????????????? ???????????? ???????????????????????????? ??????????????
              originalPositions[number] = {
                parent: daElement.parentNode,
                index: indexInParent(daElement),
              };

              //?????????????????? ???????????? ??????????????????
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

        //?????????????? ?????????????? ?? ?????????? ??????????????????????
        for (let index = 0; index < daElementsArray.length; index++) {
          const el = daElementsArray[index];
          const daBreakpoint = el.breakpoint;
          const daType = el.type;

          daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
          daMatchMedia[index].addListener(dynamicAdapt);
        }
      }
      //???????????????? ??????????????
      function dynamicAdapt(e) {
        for (let index = 0; index < daElementsArray.length; index++) {
          const el = daElementsArray[index];
          const daElement = el.element;
          const daDestination = el.destination;
          const daPlace = el.place;
          const daBreakpoint = el.breakpoint;
          const daClassname = "_dynamic_adapt_" + daBreakpoint;

          if (daMatchMedia[index].matches) {
            //?????????????????????????? ????????????????
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
            //???????????????????? ???? ??????????
            if (daElement.classList.contains(daClassname)) {
              dynamicAdaptBack(daElement);
              daElement.classList.remove(daClassname);
            }
          }
        }
      }

      //?????????? ???????????????? ??????????????
      dynamicAdapt();

      //?????????????? ???????????????? ???? ??????????
      function dynamicAdaptBack(el) {
        const daIndex = el.getAttribute("data-da-index");
        const originalPlace = originalPositions[daIndex];
        const parentPlace = originalPlace["parent"];
        const indexPlace = originalPlace["index"];
        const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
        parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
      }
      //?????????????? ?????????????????? ?????????????? ???????????? ????????????????
      function indexInParent(el) {
        var children = Array.prototype.slice.call(el.parentNode.children);
        return children.indexOf(el);
      }
      //?????????????? ?????????????????? ?????????????? ???????????????? ?????????????????? ???????????? ????????????????
      function indexOfElements(parent, back) {
        const children = parent.children;
        const childrenArray = [];
        for (let i = 0; i < children.length; i++) {
          const childrenElement = children[i];
          if (back) {
            childrenArray.push(i);
          } else {
            //???????????????? ???????????????????????? ??????????????
            if (childrenElement.getAttribute("data-da") == null) {
              childrenArray.push(i);
            }
          }
        }
        return childrenArray;
      }
      //???????????????????? ??????????????
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
    })();
  });
  /******/
})();
