
jQuery(document).ready($ => {
    $('.search-btn').on('click', () => {
        event.stopPropagation();
        event.preventDefault();
        event.returnValue = false;

        const long = $('#longitute').val()
        const lat = $('#latitude').val()
        const distance = $('#distance').val()
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/scooters?lat=${lat}&long=${long}&distance=${distance}`,
            processData: false,
            contentType: false,
            success(response) {
                const myLayer = L.mapbox.featureLayer().addTo(map);
                response.features.forEach(el => {
                    el.properties = {
                        'marker-color': '#3bb2d0',
                        'marker-size': 'large',
                        'marker-symbol': 'rocket',
                    }
                })
                myLayer.setGeoJSON(response.features);
                // map.scrollWheelZoom.disable();
            },
            error(error) {
                console.log("Errorr =>>>>>>>>>", error);
            },
        })
    });
})