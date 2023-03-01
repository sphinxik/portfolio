// YANDEX MAP ======================================================================================
ymaps.ready(function () {
	var myMap = new ymaps.Map('map', {
		controls: ['fullscreenControl'],
		center: [55.838223, 37.476995],
		zoom: 17
	}),

		// управление зумом
		zoomControl = new ymaps.control.ZoomControl({
				options: {
					size: "large",
					position: {
						right: 10,
						top: 70
					}
				}
		});
			
		// иконка
		myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
		}, {
			preset: 'islands#redIcon',
			iconImageSize: [35, 40],
			iconImageOffset: [0, 0],
		});

		myMap.controls.add(zoomControl);
		myMap.geoObjects.add(myPlacemark);

		// отключаем зум скролом
		myMap.behaviors.disable('scrollZoom');
});
//==================================================================================================