var MenuObservatoireView = function (data) {

    this.initialize = function() {
        this.$el = $('<div/>');
        //this.render();
    };

    this.render = function() {
        this.$el.html(this.template());
		//$('.badge-no-sync-obs', this.$el).html(Object.keys(data["observations-plongeurs-local.json"]).length);
		$('.badge-total-obs', this.$el).html(Object.keys(data["indice-paysager.json"]).length);
		$('.badge-sites-observations', this.$el).html(Object.keys(data["site-observation.json"]).length);
		$('.badge-ambassadeurs', this.$el).html(Object.keys(data["clubs-plongeurs.json"]).length);
        
        return this;
    };

    this.initialize();
}