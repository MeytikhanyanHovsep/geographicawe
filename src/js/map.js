ymaps.ready(init);

function init() {

    // Координаты БЦ Россия (Волгоградский проспект, 26с1)
    const officeCoords = [55.725146, 37.677553];

    const myMap = new ymaps.Map("map", {
        center: officeCoords,
        zoom: 16,
        // 1. controls: [] — полностью удаляет поиск, кнопки зума и пробки
        controls: []
    }, {
        // 2. suppressMapOpenBlock — скрывает кнопку "Открыть в Яндекс Картах"
        suppressMapOpenBlock: true,
        // 3. suppressObsoleteBrowserNotifier — скрывает уведомления о браузере
        suppressObsoleteBrowserNotifier: true
    });

    // Создаем метку для офиса 807
    const myPlacemark = new ymaps.Placemark(officeCoords, {
        balloonContent: '<strong>БЦ Россия</strong><br>Волгоградский проспект, 26с1, офис 807'
    }, {
        // Черная круглая метка, как на ваших примерах выше
        preset: 'islands#blackDotIcon',
        iconColor: '#000000'
    });

    myMap.geoObjects.add(myPlacemark);

    // Чтобы карта всегда была по центру при изменении размера окна (адаптив)
    window.addEventListener('resize', () => {
        myMap.container.fitToViewport();
        myMap.setCenter(officeCoords);
    });
}