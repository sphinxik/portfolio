// YANDEX MAP ======================================================================================
ymaps.ready(function () {
  var myMap = new ymaps.Map("completed-projects__map", {
      controls: ["fullscreenControl"],
      center: [56.09228, 36.911874],
      zoom: 9,
    }),
    zoomControl = new ymaps.control.ZoomControl({
      options: {
        size: "large",
        position: {
          right: 10,
          top: 70,
        },
      },
    });

  myPlacemark = new ymaps.Placemark(
    myMap.getCenter(),
    {
      iconContent: "Фабрика лестниц",
    },
    {
      preset: "islands#redStretchyIcon",
      iconImageSize: [35, 40],
      iconImageOffset: [0, 0],
      iconContentOffset: [15, 15],
    }
  );

  myMap.controls.add(zoomControl);
  myMap.geoObjects
    .add(myPlacemark)
    .add(
      new ymaps.Placemark(
        [56.311406, 36.789451],
        {
          balloonContent: "",
        },
        {
          preset: "islands#homeIcon",
          iconColor: "#E1BE78",
        }
      )
    )
    .add(
      new ymaps.Placemark(
        [56.237472, 36.841185],
        {
          balloonContent: "",
        },
        {
          preset: "islands#homeIcon",
          iconColor: "#E1BE78",
        }
      )
    )
    .add(
      new ymaps.Placemark(
        [56.232604, 36.965449],
        {
          balloonContent: "",
        },
        {
          preset: "islands#homeIcon",
          iconColor: "#E1BE78",
        }
      )
    )
    .add(
      new ymaps.Placemark(
        [56.176233, 37.057904],
        {
          balloonContent: "",
        },
        {
          preset: "islands#homeIcon",
          iconColor: "#E1BE78",
        }
      )
    )
    .add(
      new ymaps.Placemark(
        [56.127261, 36.855738],
        {
          balloonContent: "",
        },
        {
          preset: "islands#homeIcon",
          iconColor: "#E1BE78",
        }
      )
    )
    .add(
      new ymaps.Placemark(
        [56.09921, 36.971881],
        {
          balloonContent: "",
        },
        {
          preset: "islands#homeIcon",
          iconColor: "#E1BE78",
        }
      )
    )
    .add(
      new ymaps.Placemark(
        [56.09921, 36.971881],
        {
          balloonContent: "",
        },
        {
          preset: "islands#homeIcon",
          iconColor: "#E1BE78",
        }
      )
    )
    .add(
      new ymaps.Placemark(
        [56.039273, 36.903232],
        {
          balloonContent: "",
        },
        {
          preset: "islands#homeIcon",
          iconColor: "#E1BE78",
        }
      )
    )
    .add(
      new ymaps.Placemark(
        [56.019083, 36.996576],
        {
          balloonContent: "",
        },
        {
          preset: "islands#homeIcon",
          iconColor: "#E1BE78",
        }
      )
    )
    .add(
      new ymaps.Placemark(
        [55.914287, 36.860284],
        {
          balloonContent: "",
        },
        {
          preset: "islands#homeIcon",
          iconColor: "#E1BE78",
        }
      )
    )
    .add(
      new ymaps.Placemark(
        [55.848751, 37.187782],
        {
          balloonContent: "",
        },
        {
          preset: "islands#homeIcon",
          iconColor: "#E1BE78",
        }
      )
    )
    .add(
      new ymaps.Placemark(
        [56.039273, 36.903232],
        {
          balloonContent: "",
        },
        {
          preset: "islands#homeIcon",
          iconColor: "#E1BE78",
        }
      )
    )
    .add(
      new ymaps.Placemark(
        [56.092431, 36.801237],
        {
          balloonContent: "",
        },
        {
          preset: "islands#homeIcon",
          iconColor: "#E1BE78",
        }
      )
    )
    .add(
      new ymaps.Placemark(
        [55.96214, 37.275566],
        {
          balloonContent: "",
        },
        {
          preset: "islands#homeIcon",
          iconColor: "#E1BE78",
        }
      )
    );

  myMap.behaviors.disable("scrollZoom");
});

//=========================================================
ymaps.ready(function () {
  var myMap = new ymaps.Map("map", {
      controls: ["fullscreenControl"],
      center: [56.09228, 36.911874],
      zoom: 13,
    }),
    zoomControl = new ymaps.control.ZoomControl({
      options: {
        size: "large",
        position: {
          right: 10,
          top: 70,
        },
      },
    });

  myPlacemark = new ymaps.Placemark(
    myMap.getCenter(),
    {
      iconContent: "Фабрика лестниц",
    },
    {
      preset: "islands#redStretchyIcon",
      iconImageSize: [35, 40],
      iconImageOffset: [0, 0],
      iconContentOffset: [15, 15],
    }
  );

  myMap.controls.add(zoomControl);
  myMap.geoObjects.add(myPlacemark);

  myMap.behaviors.disable("scrollZoom");
});
//==================================================================================================
