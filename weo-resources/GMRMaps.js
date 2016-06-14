
var GMRMaps =
{
    BaseURL: "https://energyintel1.blob.core.windows.net/maps/",

    InitializeMaps: function (callback) {

        var regionalMapLocations = null;

        $('div[data-type=map]').each(function (key, value) {
            
            var mapType = $(this).data('maptype');
            var mapDataLink = GMRMaps.BaseURL + $(this).data('link');
            var mapSelector = this;
            
            if (mapType == 'air-temperature')
            {
                GMRMaps.drawAirTemperatureMap(mapSelector, GMRMaps.BaseURL + "states.json", callback);
            }
            
            $.getJSON(mapDataLink, function (locations) {
            
            switch (mapType) {
                    case 'northeast_region':
                        GMRMaps.drawNortheastRegionMap(mapSelector, locations);
                    break;
                    case 'southeast_region':
                        GMRMaps.drawSoutheastRegionMap(mapSelector, locations);
                    break;
            }
        });
        });
    },

    drawAirTemperatureMap: function (container, path, callback) {
        container.id = 'weatherMapWrapper';
        var options = {
            zoom: 4,
            zoomControl: false,
            disableDoubleClickZoom: true,
            scrollwheel: false,
            streetViewControl: false,
            center: new google.maps.LatLng(40, -100),
            mapTypeId: google.maps.MapTypeId.ROADMAP

        };

        var map;
        var mapLabel;

        
        container.innerHTML = '<div id="weatherHeader">' +
                                      '<div id="dropdown-wrapper">' +
                                        '<label for="t_vSelect"> Time: </label> <span id="tSelect"></span>' +
                                        '<span id="wxSelect"><label for="wx_vSelect"> Forecast: </label></span>' +
                                      '</div>' +
                                    '</div>' +
                                  '<div id="weatherMap"></div>';

        map = new google.maps.Map(document.getElementById("weatherMap"), options);


        map.data.loadGeoJson(path);

        map.data.setStyle(function (feature) {
            var color = 'darkgrey';
            if (feature.getProperty('isColorful')) {
                color = feature.getProperty('color');
            }
            return ({
                fillColor: color,
                fillOpacity: 0.1,
                strokeColor: color,
                strokeWeight: 2
            });
        });

        // Bounds for North America
        var strictBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(28, -127),
        new google.maps.LatLng(55, -55));

        map.data.addListener('click', function (event) {
            event.feature.setProperty('isColorful', true);
        });

        map.data.addListener('mouseover', function (event) {
            map.data.revertStyle();
            map.data.overrideStyle(event.feature, { strokeWeight: 3 });
            event.feature.setProperty('isColorful', true);
            event.feature.setProperty('fillOpacity', 0.5);

            var pos = event.feature.getProperty('position');
            mapLabel = new MapLabel({
                position: new google.maps.LatLng(pos.lat, pos.lon),
                map: map,
                fontSize: 20,
                align: 'left'
            });

            mapLabel.set('text', event.feature.getProperty('letter'));
        });

        map.data.addListener('mouseout', function (event) {
            map.data.revertStyle();
            event.feature.setProperty('isColorful', false);
            event.feature.setProperty('fillOpacity', 0.1);

            mapLabel.set('text', '');
        });

        // Listen for the dragend event
        google.maps.event.addListener(map, 'dragend', function () {
            if (strictBounds.contains(map.getCenter())) return;

            // We're out of bounds - Move the map back within the bounds
            var c = map.getCenter(),
                x = c.lng(),
                y = c.lat(),
                maxX = strictBounds.getNorthEast().lng(),
                maxY = strictBounds.getNorthEast().lat(),
                minX = strictBounds.getSouthWest().lng(),
                minY = strictBounds.getSouthWest().lat();

            if (x < minX) x = minX;
            if (x > maxX) x = maxX;
            if (y < minY) y = minY;
            if (y > maxY) y = maxY;

            map.setCenter(new google.maps.LatLng(y, x));
        });

        google.maps.event.addListenerOnce(map, 'tilesloaded', function () {
            if ($.isFunction(callback))
            {
                callback();
            }
        });

        var wxoverlay = new WXTiles();

        wxoverlay.addToMap(map);
        wxoverlay.addColorBar('small', 'horiz');

        $.getJSON(GMRMaps.BaseURL + "locations.json", function (labels) {
        $.each(labels, function (index, item) {
            mapLabel = new MapLabel({
                position: new google.maps.LatLng(item.Latitude, item.Longitude),
                map: map,
                fontSize: 10,
                align: 'left',
                text: item.Name.split(',')[0],
                optimized: false,
                zIndex: 5
            });
        });
        });

        document.getElementById('tSelect').appendChild(wxoverlay.getTSelect());
        document.getElementById('wxSelect').appendChild(wxoverlay.getVSelect());
    },

    drawNortheastRegionMap: function (container, locations) {

        GMRMaps.drawWeatherRegionMap(container, locations, 'Northeast US', GMRMaps.BaseURL + 'northeast_region.json', { lat: -74, lng: 43 }, { lat: -78, lng: 43 });
    },

    drawSoutheastRegionMap: function (container, locations) {

        GMRMaps.drawWeatherRegionMap(container, locations, 'Southeast US', GMRMaps.BaseURL + 'southeast_region.json', { lat: -85, lng: 33 }, { lat: -88, lng: 35 });
    },

    drawWeatherRegionMap: function (container, locations, label, geoJson, geoCenter, geoLabel) {

        $(container).html("");

        var layer = new ol.layer.Tile({
            preload: Infinity,
            source: new ol.source.MapQuest({ layer: 'osm' })
        });

        //var layer = new ol.layer.Tile({
        //    source: new ol.source.TileJSON({
        //        url: 'http://api.tiles.mapbox.com/v3/mapbox.geography-class.jsonp'
        //    })
        //});

        //var layer = new ol.layer.Tile({
        //    source: new ol.source.MapQuest({ layer: 'open' })
        //});

        //var layer = new ol.layer.Tile({
        //    source: new ol.source.OSM()
        //});

        var polygonLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                url: geoJson,
                format: new ol.format.GeoJSON()
            })
        });

        var map = new ol.Map({
            layers: [layer, polygonLayer],
            controls: [],
            target: container,
            interactions: ol.interaction.defaults({ mouseWheelZoom: false, doubleClickZoom: false }),
            view: new ol.View({
                center: ol.proj.fromLonLat([geoCenter.lat, geoCenter.lng]),
                zoom: 5
            })
        });

        var pos;


        $.each(locations, function (index, item) {

            pos = ol.proj.fromLonLat([item.Longitude, item.Latitude]);

            var gateDiv = document.createElement('div');
            gateDiv.className = 'gate-label';
            gateDiv.innerHTML = item.Name.split(',')[0] + ' ' + item.TempDiff + '&deg;';

            var gateLabel = new ol.Overlay({
                position: pos,
                element: gateDiv
            });
            map.addOverlay(gateLabel);

        });

        pos = ol.proj.fromLonLat([geoLabel.lat, geoLabel.lng]);

        var regionDiv = document.createElement('div');
        regionDiv.className = 'region-label';
        regionDiv.innerHTML = label;

        var regionLabel = new ol.Overlay({
            position: pos,
            element: regionDiv
        });

        map.addOverlay(regionLabel);
    }
}

//google.load("visualization", '1', { packages: ['corechart'] });


