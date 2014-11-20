var IndicePaysagerAddView = function (map, markers, connection) {

    this.initialize = function() {
        this.$el = $('<div/>');
        //this.render();
    };


    this.render = function() {
        this.$el.html(this.template());
        init_form_controls(this.$el, '#IndicePaysager', map, markers, connection);
        return this;
    };

    this.initialize();

}