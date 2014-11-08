var IndicePaysagerAddView = function (map, markers, connection) {

    this.initialize = function() {
        this.$el = $('<div/>');
        //this.render();
    };


    this.render = function() {
        this.$el.html(this.template());

        //va cliquer sur la bonne tabulation dans le formulaire
        $('.navigation-control .btn', this.$el).on("touchend", function() {
            var parentdiv = $('#formulaire');
            parentdiv.find('.segmented-control .control-item').removeClass('active');
            parentdiv.find('.control-item[href="'+$(this).attr('href')+'"]').addClass('active');
            parentdiv.find('.control-content').removeClass('active'); 
            $($(this).attr('href')).addClass('active');
            document.getElementById("formulaire").scrollTop = 0; // marche pas TODO : trouver un moyen de remonter
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