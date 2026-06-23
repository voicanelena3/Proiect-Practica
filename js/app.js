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
            mousePositionControl
        ]),
        view: new ol.View({
            center: ol.proj.fromLonLat([25.0, 46.0]),
            zoom: 6.5,
            minZoom: 3,
        })
    });

    console.log("Harta și instrumentele de navigare au fost inițializate cu succes!");

   $('#search').on('keypress', function(e) {
        if (e.which === 13) {
            const query = $(this).val().trim();
            
            if (!query) {
                return;
            }
            
            const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;

            $(this).css('opacity', '0.5');

            $.ajax({
                url: nominatimUrl,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    if (data && data.length > 0) {
                        const location = data[0];
                        const lon = parseFloat(location.lon);
                        const lat = parseFloat(location.lat);

                        console.log(`Navigăm către: ${location.display_name} [${lon}, ${lat}]`);

                        map.getView().animate({
                            center: ol.proj.fromLonLat([lon, lat]),
                            zoom: 12,
                            duration: 1500,
                            easing: ol.easing.easeOut
                        });
                        
                        $('#search').val(''); 
                    } else {
                        alert("Locația nu a fost găsită.");
                    }
                },
                error: function(xhr, status, error) {
                    console.error("Eroare căutare: ", status, error);
                    alert("A apărut o eroare la căutarea locației.");
                },
                complete: function() {
                    $('#search').css('opacity', '1');
                }
            });
        }
    });
};