var PollutionView = function(Pollution) {

    this.initialize = function() {
        this.$el = $('<div/>');
    };

    this.render = function() {
        this.$el.html(this.template(Pollution));
        return this;
    };

    this.initialize();

}
