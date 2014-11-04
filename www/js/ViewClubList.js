var ClubListView = function (Clubs) {

    this.initialize = function() {
        this.$el = $('<div/>');
        this.render();
    };

    this.render = function() {
        this.$el.html(this.template(Clubs));
        return this;
    };

    this.initialize();
}