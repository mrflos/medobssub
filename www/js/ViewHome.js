var HomeView = function (data, connection) {

    this.initialize = function() {      
        this.$el = $('<div/>');
        //this.render();
    };

    this.render = function() {
        this.$el.html(this.template());

        // addition de toutes les données synchronisées
        var nbdonnees = 0;
        for (var name in data) { 
            nbdonnees =  nbdonnees + Object.keys(data[name]).length;
        }

        // affichage en bas de la page d'accueil
        var footerinfo = 'Données synchronisées:' + nbdonnees + '<br>Connexion:' + connection;
        $('.updated-text', this.$el).html(footerinfo);
        return this;
    };

    this.initialize();
}