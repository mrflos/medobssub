var PollutionMapView = function (Pollution, map, markers) {

    this.initialize = function() {
        this.$el = $('<div/>');
        //this.render();
    };


    this.render = function() {
        this.$el.html(this.template(Pollution));
        map.removeLayer(markers);
        markers = new L.FeatureGroup();
        $.each(Pollution, function(i, item){
            //console.log(item);
            if (item.bf_latitude !== '' && item.bf_longitude !== '') {
                var marker = new L.Marker (new L.LatLng(item.bf_latitude, item.bf_longitude)).bindPopup(new L.Popup({maxWidth:"1000"}).setContent('<a href="#Pollution/'+i+'">'+item.bf_titre+'</a>'));
                markers.addLayer(marker);
            }
        });
        map.addLayer(markers);
        return this;
    };

    this.initialize();
}