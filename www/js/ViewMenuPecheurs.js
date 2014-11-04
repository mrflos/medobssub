var MenuPecheursView = function (data) {
    this.initialize = function() {
        this.$el = $('<div/>').addClass('menu-pecheurs');
        //this.render();
    };

    this.render = function() {
        this.$el.html(this.template());
        $('.badge-pecheurs-sentinelles', this.$el).html(Object.keys(data["pecheurs-sentinelles.json"]).length);
		$('.badge-faune-flore', this.$el).html(Object.keys(data["observations-faune-flore.json"]).length);
		$('.badge-pollution', this.$el).html(Object.keys(data["observations-pollution.json"]).length);
		$('.badge-usages', this.$el).html(Object.keys(data["observations-usages.json"]).length);
        return this;
    };

    this.initialize();
}