var PecheursSentinellesView = function(PecheursSentinelles) {

    this.initialize = function() {
        this.$el = $('<div/>');
    };

    this.render = function() {
        this.$el.html(this.template(PecheursSentinelles));
        return this;
    };

    this.initialize();

}
