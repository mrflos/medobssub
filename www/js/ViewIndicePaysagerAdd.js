var IndicePaysagerAddView = function (map, markers, connection) {

    this.initialize = function() {
        this.$el = $('<div/>');
        //this.render();
    };


    this.render = function() {
        this.$el.html(this.template());

        //va cliquer sur la bonne tabulation dans le formulaire
        $('.navigation-control .btn', this.$el).on("touchend click", function() {
            //$('#form-obs .control-content, #form-obs .tab-item').removeClass('active');
            $(this).parents('.saisie-obs-card').prev().find('.control-item[href="'+$(this).attr('href')+'"]').trigger('touchend').trigger('click');
            //.addClass('active');
            //$($(this).attr('href')).addClass('active');

            return false;
        });

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