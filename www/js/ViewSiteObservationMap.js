var SiteObservationMapView = function (IndicePaysager) {

    this.initialize = function() {
        this.$el = $('<div/>');
        //this.render();
    };


    this.render = function() {
        this.$el.html(this.template(IndicePaysager));
        if (hasConnection()) {
            markers.clearLayers();
            $.each(IndicePaysager, function(i, item){
                //console.log(item);
                if (typeof item.bf_latitude !== "undefined" && item.bf_latitude !== '' && typeof item.bf_longitude !== "undefined" && item.bf_longitude !== '') {
                    var marker = new L.Marker (new L.LatLng(item.bf_latitude, item.bf_longitude)).bindPopup(new L.Popup({maxWidth:"1000"}).setContent('<a href="#SiteObservation/'+i+'">'+item.bf_titre+'</a>'));
                    markers.addLayer(marker);
                }
            });          
        }
        return this;
    };

    this.initialize();
}