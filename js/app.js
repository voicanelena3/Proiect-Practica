window.onload = function() {
    const mousePositionControl = new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        projection: 'EPSG:4326',
        className: 'custom-mouse-position',
        target: document.getElementById('mouse-position'),
        undefinedHTML: '&nbsp;'
    });

    const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        controls: ol.control.defaults.defaults().extend([
            new ol.control.FullScreen(),
            new ol.control.ScaleLine(),
            new ol.control.ZoomSlider(),
            new ol.control.Zoom(),
            mousePositionControl
        ]),
        view: new ol.View({
            center: ol.proj.fromLonLat([25.0, 46.0]),
            zoom: 7,
            minZoom: 3
        })
    });

    console.log("Harta și instrumentele de navigare au fost inițializate cu succes!");

    $('#search').on('keypress', function(e) {
        if (e.which === 13) {
            const query = $(this).val().trim();
            
            if (!query) {
                return;
            }

            const username = 'Contul_GeoNames';
            
            const geoNamesUrl = `https://secure.geonames.org/searchJSON?q=${encodeURIComponent(query)}&maxRows=1&username=Username`;

            $(this).css('opacity', '0.5');

            $.ajax({
                url: geoNamesUrl,
                method: 'GET',
                dataType: 'jsonp',
                success: function(data) {
                    if (data.geonames && data.geonames.length > 0) {
                        const location = data.geonames[0];
                        const lon = parseFloat(location.lng);
                        const lat = parseFloat(location.lat);

                        console.log(`Navigăm către: ${location.name} [${lon}, ${lat}]`);

                        map.getView().animate({
                            center: ol.proj.fromLonLat([lon, lat]),
                            zoom: 12,
                            duration: 1500,
                            easing: ol.easing.easeOut
                        });
                        
                        $('#search').val(''); 
                    } else {
                        alert("Locația nu a fost găsită în baza de date GeoNames.");
                    }
                },
                error: function(xhr, status, error) {
                    console.error("Eroare AJAX GeoNames: ", status, error);
                    alert("A apărut o eroare la comunicarea cu serverul GeoNames. Verifică consola pentru detalii.");
                },
                complete: function() {
                    $('#search').css('opacity', '1');
                }
            });
        }
    });
};