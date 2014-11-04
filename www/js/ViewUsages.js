var UsagesView = function(Usages) {

    this.initialize = function() {
        this.$el = $('<div/>');
    };

    this.render = function() {
        this.$el.html(this.template(Usages));
        return this;
    };

    this.initialize();

}
