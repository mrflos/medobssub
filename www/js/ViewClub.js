var ClubView = function(Club) {

    this.initialize = function() {
        this.$el = $('<div/>');
    };

    this.render = function() {
        this.$el.html(this.template(Club));

        return this;
    };

    this.initialize();

}
