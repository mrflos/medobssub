var FauneFloreAddView = function (map, markers, connection) {

    this.initialize = function() {
        this.$el = $('<div/>');
        //this.render();
    };

    this.render = function() {
        this.$el.html(this.template());
        init_form_controls(this.$el, '#FauneFlore', map, markers, connection);
        return this;
    };

    this.initialize();

}