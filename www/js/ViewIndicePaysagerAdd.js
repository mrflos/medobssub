var IndicePaysagerAddView = function () {

    this.initialize = function() {
        this.$el = $('<div/>');
        //this.render();
    };


    this.render = function() {
        this.$el.html(this.template());
        init_form_controls(this.$el, '#IndicePaysager');
        return this;
    };

    this.initialize();

}