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
  var webP = new Image();
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
  // BODY LOCK/UNLOCK ===============================================================================
  const body = document.querySelector("body");
  const paddingFix = document.querySelectorAll(".padding-fix");

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
    setTimeout(() => {
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

  // LANGUAGE MENU ==================================================================================
  const headerLanguageTrigger = document.querySelector(".header-language__trigger");

  headerLanguageTrigger.addEventListener("click", function () {
    this.classList.toggle("is-active");
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".header-language__trigger")) {
      headerLanguageTrigger.classList.remove("is-active");
    }
  });

  // THEME TRIGGER ==================================================================================
  const headerThemeTrigger = document.querySelector(".header-theme__trigger");

  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    const themeTypeLS = localStorage.getItem("ikc-theme");

    if (themeTypeLS) {
      document.documentElement.className = themeTypeLS;

      switch (themeTypeLS) {
        case "_light-theme":
          headerThemeTrigger.classList.add("is-active");
          break;
        case "_dark-theme":
          headerThemeTrigger.classList.remove("is-active");
          break;
      }
    } else {
      setTheme("_dark-theme");
    }
  }

  headerThemeTrigger.addEventListener("click", function () {
    this.classList.toggle("is-active");
    toggleTheme();
  });

  function toggleTheme() {
    if (localStorage.getItem("ikc-theme") === "_dark-theme") {
      setTheme("_light-theme");
    } else {
      setTheme("_dark-theme");
    }
  }

  function setTheme(themeName) {
    localStorage.setItem("ikc-theme", themeName);
    document.documentElement.className = themeName;
  }

  // FORMS ==========================================================================================
  // CONTACTS FORM
  const contactsForm = document.querySelector(".contacts-form");
  const contactsFormFields = contactsForm.querySelectorAll(".contacts-form__input, .contacts-form__textarea");

  contactsFormFields.forEach((field) => {
    field.addEventListener("input", function () {
      if (this.value !== "") {
        this.classList.add("is-valid");
      } else {
        this.classList.remove("is-valid");
      }
    });
  });

  contactsForm.addEventListener("submit", formSend);

  // SEND FORM
  async function formSend(e) {
    e.preventDefault();
    const form = e.target;
    const error = formValidate(form);
    const formData = new FormData(form);

    if (error === 0) {
      form.classList.remove("_err");
      form.classList.add("is-sending");

      const response = await fetch("mail.php", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        form.classList.remove("is-sending");
        form.reset();
        showFormResultPopup("#popup-thanks");
      } else {
        form.classList.remove("is-sending");
        showFormResultPopup("#popup-error");
      }
    } else {
      form.classList.add("_err");
    }
  }

  function showFormResultPopup(popupId) {
    const popup = document.querySelector(popupId);

    popupOpen(popup);
    setTimeout(() => {
      popupClose(popup);
    }, 5000);
  }

  // VALIDATE FORM
  function formValidate(form) {
    const formRequiredFields = form.querySelectorAll("._req");
    let error = 0;

    formRequiredFields.forEach((field) => {
      formRemoveError(field);

      if (field.getAttribute("name") === "email") {
        if (emailValidation(field)) {
          formAddError(field);
          error++;
        }
      } else if (field.getAttribute("type") === "checkbox" && field.checked === false) {
        formAddError(field);
        error++;
      } else {
        if (field.value === "") {
          formAddError(field);
          error++;
        }
      }
    });

    return error;
  }

  function formAddError(field) {
    field.classList.add("_err");
  }

  function formRemoveError(field) {
    field.classList.remove("_err");
  }

  function emailValidation(field) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(field.value);
  }

  // POPUP ==========================================================================================
  const popupOpenBtn = document.querySelectorAll("[data-popup-open]");
  const popupCloseBtn = document.querySelectorAll("[data-popup-close]");

  const timeout = 800; // ОБЯЗАТЕЛЬНО должен совпадать с длительностью анимации в CSS
  let unlock = true;

  if (popupOpenBtn.length > 0) {
    for (let i = 0; i < popupOpenBtn.length; i++) {
      popupOpenBtn[i].addEventListener("click", function (e) {
        e.preventDefault();
        const popupName = this.dataset.popupOpen;
        const currentPopup = document.getElementById(popupName);

        if (currentPopup) {
          popupOpen(currentPopup);
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

  function popupClose(popupActive, doUnlock = true) {
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
});
