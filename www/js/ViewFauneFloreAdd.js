var FauneFloreAddView = function (map, markers, connection) {

    this.initialize = function() {
        this.$el = $('<div/>');
        //this.render();
    };


    this.render = function() {
        this.$el.html(this.template());

        //carte
        var lat = $('#latitude', this.$el);
        var lng = $('#longitude', this.$el);

        function onLocationFound(position) {
            map.removeLayer(markers);
           
            markers = new L.FeatureGroup();
            var radius = position.coords.accuracy / 2;
            var marker = L.marker([position.coords.latitude, position.coords.longitude], {draggable: true});
            lat.val(position.coords.latitude);
            lng.val(position.coords.longitude);
            map.setView([position.coords.latitude,position.coords.longitude]);
            marker.bindPopup("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude + "<br>Vous êtes localisé dans un rayon de " + radius + " mètres autour de ce point.<br> Vous pouvez déplacer ce point pour le mettre au bon endroit").openPopup();

            marker.on('dragend', function(event) {
                    var markerdragged = event.target;  // you could also simply access the marker through the closure
                    var result = markerdragged.getLatLng();  // but using the passed event is cleaner
                    marker.bindPopup("Latitude: " + result.lat + "<br>Longitude: " + result.lng).openPopup();
                    lat.val(result.lat);
                    lng.val(result.lng);
            });

            markers.addLayer(marker);
            map.addLayer(markers);
        }

        function onLocationError(error) {
            console.log('Geolocation error code: '    + error.code    + '\n' +
                  'Geolocation error message: ' + error.message + '\n');

            map.removeLayer(markers);
            markers = new L.FeatureGroup();
            lat.val('43.28208');
            lng.val('5.34579');
            map.setView([43.28208, 5.34579]);
            var marker = L.marker([43.28208, 5.34579], {draggable: true});
            marker.bindPopup("Latitude: 43.28208<br>Longitude: , 5.34579<br>Vous n\'avez pas pu être localisé automatiquement.<br> Déplacez ce point pour le mettre au bon endroit").openPopup();

            marker.on('dragend', function(event) {
                    var markerdragged = event.target;  // you could also simply access the marker through the closure
                    var result = markerdragged.getLatLng();  // but using the passed event is cleaner
                    marker.bindPopup("Latitude: " + result.lat + "<br>Longitude: " + result.lng).openPopup();
                    lat.val(result.lat);
                    lng.val(result.lng);
            });
            markers.addLayer(marker);
            map.addLayer(markers);
        }
        var gps = navigator.geolocation.getCurrentPosition(onLocationFound, onLocationError, { enableHighAccuracy:true, timeout: 5000 });

        //affiche le nombre à coté du range
        $('input[type=range]', this.$el).on("change mousemove keypress", function() {
            $(this).next('.output-val').html($(this).val());
        });

        //permet de gerer des affichages conditionnels, en fonction de la liste choisie
        $("select[id^='liste']", this.$el).each( function() {
                var id = $(this).attr('id');
                id = id.replace("liste", ""); 
                $("div[id^='"+id+"']").hide();
                $("div[id='"+id+'_'+$(this).val()+"']").show();
        });
        $("select[id^='liste']", this.$el).change( function() {
                var id = $(this).attr('id');
                id = id.replace("liste", ""); 
                $("div[id^='"+id+"']").hide();
                $("div[id='"+id+'_'+$(this).val()+"']").show();
        });
        return this;
    };

    this.initialize();

}