"use strict";

document.addEventListener('DOMContentLoaded', function () {

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
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    }
  };

  if (isMobile.any()) {
    document.body.classList.add('_touchscreen');
  } else {
    document.body.classList.add('_desktop');
  }
  //=================================================================================================

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
      document.querySelector('body').classList.add('webp');
    } else {
      document.querySelector('body').classList.add('no-webp');
    }
  });
  //=================================================================================================

  // FORM-SEND ======================================================================================
  async function formSend(form) {
    const formData = new FormData(form);
    const res = await fetch('mail.php', {
      method: 'POST',
      body: formData
    });

    return res;
  }
  //=================================================================================================

  // IMASK ==========================================================================================
  const telInputs = document.querySelectorAll('.popup-form__input[type="tel"]');
  const maskOptions = {
    mask: '+{7} (000) 000-00-00'
  };

  telInputs.forEach(input => {
    const mask = IMask(input, maskOptions);

    input.addEventListener('focusout', function () {
      if (!mask.masked.isComplete) {
        mask.value = '';
      }
    });
  });
  //=================================================================================================

  // MOBILE MENU ====================================================================================
  const body = document.querySelector('body');
  const burger = document.querySelector('.heder-burger');
  const footer = document.querySelector('.footer');

  burger.addEventListener('click', function () {
    if (!this.classList.contains('is-active')) {
      openMobileMenu();
    } else {
      closeMobileMenu();
    }
  });

  function openMobileMenu() {
    burger.classList.add('is-active');
    footer.classList.add('is-active');
    body.classList.add('is-locked--by-menu');
  }

  function closeMobileMenu() {
    burger.classList.remove('is-active');
    footer.classList.remove('is-active');
    body.classList.remove('is-locked--by-menu');
  }
  //=================================================================================================

  // QUIZ ===========================================================================================
  const quiz = document.querySelector('.quiz');
  const quizSteps = quiz.querySelectorAll('.quiz-step');
  const quizCurrentStepNumber = quiz.querySelector('.quiz-counter__current');
  const quizBtnBack = quiz.querySelector('.quiz__btn-back');
  const quizBtnNext = quiz.querySelectorAll('.quiz__btn-next');

  const quizRadioInputs = quiz.querySelectorAll('input[type="radio"]');
  const quizInputs = quiz.querySelectorAll('input[type="text"]');

  const quizTitles = Array.from(quiz.querySelector('.quiz-title').children);
  const quizFormErrorMsg = document.querySelector('.quiz-form__error');

  quizStartupSettings();

  // изначальные настройки квиза
  function quizStartupSettings() {
    quizBtnBack.hidden = true;

    quizStepCounter();
    quiz.querySelector('.quiz-counter__total').textContent = quizSteps.length;

    toggleQuizTitle(0);
  }

  // показываем нужный тайтл, а остальные прячем
  function toggleQuizTitle(titleNumber = 0) {
    quizTitles.forEach(item => item.hidden = true);
    quizTitles[titleNumber].hidden = false;
  }

  // счетчик квиза
  function quizStepCounter(stepNumber = 1) {
    quizCurrentStepNumber.textContent = stepNumber;
  }

  // проверяем количество "корректных" ответов
  function checkQuizAnswers() {
    for (let input of quizRadioInputs) {
      if (input.checked === true) {
        if (!input.hasAttribute('data-quiz-approve')) {
          toggleQuizTitle(2);
          break;
        } else {
          toggleQuizTitle(1);
        }
      }
    }
  }

  // заполненность текстовых инпутов
  quizInputs.forEach(input => {
    input.addEventListener('input', validateQuizStep);
  });

  // валидация инпутов текущего шага квиза
  function validateQuizStep() {
    const currentStep = quiz.querySelector('.quiz-step.is-active');
    const currentInputs = currentStep.querySelectorAll('input');
    let error = 0;

    currentInputs.forEach(input => {
      if (input.getAttribute('type') === 'text' ||
        input.getAttribute('type') === 'tel' ||
        input.getAttribute('type') === 'email') {
        if (input.value === '') {
          error++;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }

        toggleQuizBtnNextAndPressEnter(input);
      }

      if (input.getAttribute('type') === 'checkbox') {
        if (input.checked === false) {
          error++;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      }
    });

    toggleQuizErrorMsg(error);
    return error;
  }

  // показываем/прячем кнопку next и надпись press-enter
  function toggleQuizBtnNextAndPressEnter(input) {
    const currentNextBtn = input.parentElement.querySelector('.quiz__btn-next');
    const currentPressEnterBlock = input.parentElement.querySelector('.press-enter');

    if (input.value === '') {
      if (currentNextBtn) {
        currentNextBtn.classList.remove('is-active');
      }
      if (currentPressEnterBlock) {
        currentPressEnterBlock.classList.remove('is-active');
      }
    } else {
      if (currentNextBtn) {
        currentNextBtn.classList.add('is-active');
      }
      if (currentPressEnterBlock) {
        currentPressEnterBlock.classList.add('is-active');
      }
    }
  }

  // показываем/прячем предупреждение о заполнении инпута
  function toggleQuizErrorMsg(err) {
    if (err === 0) {
      quizFormErrorMsg.classList.remove('is-active');
    } else {
      quizFormErrorMsg.classList.add('is-active');
    }
  }

  // меняем шаг квиза
  function changeQuizStep(e) {
    setTimeout(() => {
      const currentStep = quiz.querySelector('.quiz-step.is-active');
      let nextStep = currentStep.nextElementSibling;

      if (e.target === quizBtnBack || e.target.closest('.quiz__btn-back')) {
        nextStep = currentStep.previousElementSibling;
      }

      if (nextStep) {
        currentStep.classList.remove('is-active');
        nextStep.classList.add('is-active');
        checkQuizPosition();

        if (nextStep.hasAttribute('data-quiz-contacts')) {
          checkQuizAnswers();
        } else {
          toggleQuizTitle(0);
        }
      }

      toggleQuizErrorMsg(0);
    }, 300);
  }

  // проверяем на каком квиз шаге
  function checkQuizPosition() {
    quizSteps.forEach((step, index) => {
      if (step.classList.contains('is-active')) {
        if (index === 0) {
          quizBtnBack.hidden = true;
        } else {
          quizBtnBack.hidden = false;
        }

        quizStepCounter(index + 1);
      }
    });
  }

  // помечаем не выбранные варианты ответов на текущем шаге
  function markUncheckedAnswers(currentStep) {
    const inputs = currentStep.querySelectorAll('input[type="radio"]');

    inputs.forEach(input => {
      input.classList.remove('is-unchecked');

      if (input.checked === false) {
        input.classList.add('is-unchecked');
      }
    });
  }

  // шаг назад
  quizBtnBack.addEventListener('click', changeQuizStep);

  // шаг вперед (клик по кнопке)
  quizBtnNext.forEach(btn => {
    btn.addEventListener('click', function (e) {
      let error = validateQuizStep();

      if (error === 0) {
        changeQuizStep(e);
      }
    });
  });

  // шаг вперед (при выборе ответа)
  quizRadioInputs.forEach(input => {
    input.addEventListener('click', function (e) {
      if (this.checked) {
        markUncheckedAnswers(quiz.querySelector('.quiz-step.is-active'));
        changeQuizStep(e);
      }
    });
  });

  // шаг вперед (при клике на Enter)
  document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const currentStep = quiz.querySelector('.quiz-step.is-active');
      const currentBtnNext = currentStep.querySelector('.quiz__btn-next');
      let error = validateQuizStep();

      if (error === 0 && currentBtnNext) {
        currentBtnNext.click();
      }
    }
  });

  // отправка данных квиза
  quiz.addEventListener('submit', function (e) {
    e.preventDefault();
    const quizNavigation = quiz.querySelector('.quiz-navigation');
    const quizSteps = quiz.querySelector('.quiz-steps');
    const quizFinal = quiz.querySelector('.quiz-final');
    const quizFormBtnSubmit = this.querySelector('button[type="submit"]');
    let error = validateQuizStep();

    if (error === 0) {
      quizFormBtnSubmit.disabled = true;

      formSend(this).then(res => {
        if (res.ok) {
          quizNavigation.innerHTML = 'Отлично!';
          quizSteps.hidden = true;
          quizFinal.classList.add('is-active');
        } else {
          quizNavigation.innerHTML = 'Ошибка...';
          quizSteps.hidden = true;
          quizFinal.innerHTML = 'В процессе отправки данных произошла ошибка. Попробуйте пожалуйста снова.';
          quizFinal.classList.add('is-active');
        }
      }).finally(() => {
        this.reset();
        quizFormBtnSubmit.disabled = false;
      });
    }
  });
  //=================================================================================================

  // POPUP-FORMs ====================================================================================
  const popupForms = document.querySelectorAll('.popup-form');

  popupForms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const thankYou = document.querySelector('#popup-thanks');
      const formBtnSubmit = this.querySelector('button[type="submit"]');
      const error = popupFormValidate(this);

      if (error === 0) {
        formSend(this).then(res => {
          if (res.ok) {
            thankYou.querySelector('.popup-text').textContent = 'Спасибо! Мы перезвоним Вам в ближайшее время.';
            popupOpen(thankYou);
          } else {
            thankYou.querySelector('.popup-text').textContent = 'В процессе отправки данных произошла ошибка. Попробуйте пожалуйста снова.';
            popupOpen(thankYou);
          }
        }).finally(() => {
          this.reset();
          formBtnSubmit.disabled = false;
          setTimeout(() => {
            popupClose(thankYou);
          }, 3000);
        });
      }
    });
  });

  function popupFormValidate(form) {
    const inputs = form.querySelectorAll('input');
    let error = 0;

    inputs.forEach(input => {
      if (input.getAttribute('type') === 'checkbox') {
        if (input.checked === false) {
          error++;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      } else {
        if (input.value === '') {
          error++;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      }
    });

    return error;
  }
  //=================================================================================================

  // POPUPs =========================================================================================
  const paddingFix = document.querySelectorAll('.padding-fix');
  const popupOpenBtn = document.querySelectorAll('[data-popup-open]');
  const popupCloseBtn = document.querySelectorAll('[data-popup-close]');

  const timeout = 400; // ОБЯЗАТЕЛЬНО должен совпадать с длительностью анимации в CSS
  let unlock = true;

  // открываем поп-ап
  if (popupOpenBtn.length > 0) {
    for (let i = 0; i < popupOpenBtn.length; i++) {

      popupOpenBtn[i].addEventListener('click', function (e) {
        e.preventDefault();
        const popupName = this.dataset.popupOpen;
        const currentPopup = document.getElementById(popupName);

        if (currentPopup) {
          popupOpen(currentPopup);
        }
      });
    }
  }

  // закрываем поп-ап приклике на data-popup-close
  if (popupCloseBtn.length > 0) {
    for (let i = 0; i < popupCloseBtn.length; i++) {
      const el = popupCloseBtn[i];

      el.addEventListener('click', function (e) {
        e.preventDefault();
        popupClose(this.closest('.popup'));
      });
    }
  }

  // функция открытия поп-апа
  function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
      const popupActive = document.querySelector('.popup.is-open');

      closeMobileMenu();

      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }

      currentPopup.classList.add('is-open');
      currentPopup.addEventListener('click', function (e) {
        // закрываем поп-ап при клике мимо .popup-content
        if (!e.target.closest('.popup-content')) {
          popupClose(e.target.closest('.popup'));
        }
      });
    }
  }

  // функция закрытия поп-апа
  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
      popupActive.classList.remove('is-open');

      if (doUnlock) {
        bodyUnlock();
      }
    }
  }

  // закрываем поп-ап при нажатии ESC
  document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
      const popupActive = document.querySelector('.popup.is-open');

      if (popupActive) {
        popupClose(popupActive);
      }
    }
  });

  // блокируем BODY при открытом поп-апе
  function bodyLock() {
    const paddingFixValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (paddingFix.length > 0) {
      for (let i = 0; i < paddingFix.length; i++) {
        const el = paddingFix[i];

        el.style.paddingRight = paddingFixValue;
      }
    }

    body.style.paddingRight = paddingFixValue;
    body.classList.add('is-locked');

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  // снимаем блокировку с BODY
  function bodyUnlock() {
    setTimeout(() => {
      if (paddingFix.length > 0) {
        for (let i = 0; i < paddingFix.length; i++) {
          const el = paddingFix[i];

          el.style.paddingRight = '0px';
        }
      }

      body.style.paddingRight = '0px';
      body.classList.remove('is-locked');
    }, timeout);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  // полифилы для поддержки старых браузеров
  (function () {
    if (!Element.prototype.closest) {
      Element.prototype.closest = function (css) {
        var node = this;
        while (node) {
          if (node.matches(css)) {
            return node;
          } else {
            node = node.parentElement;
          }
        }
        return null;
      };
    }
  })();

  (function () {
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
    }
  })();
});