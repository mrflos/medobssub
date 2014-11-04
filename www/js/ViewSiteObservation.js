var SiteObservationView = function(Site) {

    this.initialize = function() {
        this.$el = $('<div/>');
    };

    this.render = function() {
        this.$el.html(this.template(Site));
        return this;
    };

    this.initialize();

}
