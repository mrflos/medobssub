var FauneFloreView = function(FauneFlore) {

    this.initialize = function() {
        this.$el = $('<div/>');
    };

    this.render = function() {
        this.$el.html(this.template(FauneFlore));
        return this;
    };

    this.initialize();

}
