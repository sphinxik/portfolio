// YANDEX MAP ======================================================================================
ymaps.ready(function () {
  var myMap = new ymaps.Map("map", {
      controls: ["fullscreenControl"],
      center: [55.829593, 37.371164],
      zoom: 17,
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

  (MyIconContentLayout = ymaps.templateLayoutFactory.createClass('<div class="map-marker__info">$[properties.iconContent]</div>')),
    (myPlacemark = new ymaps.Placemark(
      myMap.getCenter(),
      {
        iconContent: "Волоколамское шоссе, 142",
      },
      {
        preset: "islands#redIcon",
        iconImageSize: [35, 40],
        iconImageOffset: [0, 0],
        iconContentOffset: [15, 15],
        iconContentLayout: MyIconContentLayout,
      }
    ));

  myMap.controls.add(zoomControl);
  myMap.geoObjects.add(myPlacemark);

  myMap.behaviors.disable("scrollZoom");
});
//==================================================================================================
