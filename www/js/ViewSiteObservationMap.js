var SiteObservationMapView = function (IndicePaysager, map, markers, hasconnection) {

    this.initialize = function() {
        this.$el = $('<div/>');
        //this.render();
    };


    this.render = function() {
        this.$el.html(this.template(IndicePaysager));
        if (hasconnection) {
            map.removeLayer(markers);
            markers = new L.FeatureGroup();
            $.each(IndicePaysager, function(i, item){
                //console.log(item);
                if (item.bf_latitude !== '' && item.bf_longitude !== '') {
                    var marker = new L.Marker (new L.LatLng(item.bf_latitude, item.bf_longitude)).bindPopup(new L.Popup({maxWidth:"1000"}).setContent('<a href="#SiteObservation/'+i+'">'+item.bf_titre+'</a>'));
                    markers.addLayer(marker);
                }
            });
            map.addLayer(markers);             
        }
        return this;
    };

    this.initialize();
}