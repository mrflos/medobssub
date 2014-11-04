var IndicePaysagerListView = function (IndicePaysager) {

    this.initialize = function() {
        this.$el = $('<div/>');
        //this.render();
    };

    this.render = function() {
        this.$el.html(this.template(IndicePaysager));
        return this;
    };

    this.initialize();
}