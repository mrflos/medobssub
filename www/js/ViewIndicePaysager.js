var IndicePaysagerView = function(Indice) {

    this.initialize = function() {
        this.$el = $('<div/>');
    };

    this.render = function() {
        this.$el.html(this.template(Indice));
		/*this.$el.find('.obs-title').html(Indice['bf_titre']);
	    this.$el.find('.BAZ_rubrique').each(function() {
	    	var id = $(this).data('id');
	    	if (Indice[id.toString()]) {
   				$(this).find('.entry-value').html(Indice[id.toString()]);
	    	}
	    	else {
	    		$(this).hide();
	    	}
   		});*/
        return this;
    };

    this.initialize();

}
