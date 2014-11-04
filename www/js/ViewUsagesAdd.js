var UsagesAddView = function () {

    this.initialize = function() {
        this.$el = $('<div/>');
        //this.render();
    };


    this.render = function() {
        this.$el.html(this.template());

        //affiche le nombre à coté du range
        $('input[type=range]', this.$el).on("change mousemove keypress", function() {
            $(this).next('.output-val').html($(this).val());
        });

        //permet de gerer des affichages conditionnels, en fonction de la liste choisie
        $("select[id^='liste']", this.$el).each( function() {
                var id = $(this).attr('id');
                id = id.replace("liste", ""); 
                $("div[id^='"+id+"']").hide();
                $("div[id='"+id+'_'+$(this).val()+"']").show();
        });
        $("select[id^='liste']", this.$el).change( function() {
                var id = $(this).attr('id');
                id = id.replace("liste", ""); 
                $("div[id^='"+id+"']").hide();
                $("div[id='"+id+'_'+$(this).val()+"']").show();
        });
        return this;
    };

    this.initialize();

}