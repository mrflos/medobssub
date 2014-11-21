// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

	// accelerre le touch pour en faire un clic
	window.addEventListener('load', function() {
	    new FastClick(document.body);
	}, false);

    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    
    MenuObservatoireView.prototype.template = Handlebars.compile($("#menu-observatoire-tpl").html());
    MenuPecheursView.prototype.template = Handlebars.compile($("#menu-pecheurs-tpl").html());
    
    IndicePaysagerView.prototype.template = Handlebars.compile($("#IndicePaysager-tpl").html());
    IndicePaysagerAddView.prototype.template = Handlebars.compile($("#IndicePaysager-add-tpl").html());
    IndicePaysagerListView.prototype.template = Handlebars.compile($("#IndicePaysager-list-tpl").html());
    
    ClubView.prototype.template = Handlebars.compile($("#Club-tpl").html());
    ClubListView.prototype.template = Handlebars.compile($("#Club-list-tpl").html());
    
    SiteObservationView.prototype.template = Handlebars.compile($("#SiteObservation-tpl").html());
    SiteObservationMapView.prototype.template = Handlebars.compile($("#SiteObservation-map-tpl").html());
    SiteObservationAddView.prototype.template = Handlebars.compile($("#SiteObservation-add-tpl").html());

    PecheursSentinellesView.prototype.template = Handlebars.compile($("#PecheursSentinelles-tpl").html());
    PecheursSentinellesMapView.prototype.template = Handlebars.compile($("#PecheursSentinelles-map-tpl").html());
    PecheursSentinellesAddView.prototype.template = Handlebars.compile($("#PecheursSentinelles-add-tpl").html());

    FauneFloreView.prototype.template = Handlebars.compile($("#FauneFlore-tpl").html());
    FauneFloreMapView.prototype.template = Handlebars.compile($("#FauneFlore-map-tpl").html());
    FauneFloreAddView.prototype.template = Handlebars.compile($("#FauneFlore-add-tpl").html());

    PollutionView.prototype.template = Handlebars.compile($("#Pollution-tpl").html());
    PollutionMapView.prototype.template = Handlebars.compile($("#Pollution-map-tpl").html());
    PollutionAddView.prototype.template = Handlebars.compile($("#Pollution-add-tpl").html());

    UsagesView.prototype.template = Handlebars.compile($("#Usages-tpl").html());
    UsagesMapView.prototype.template = Handlebars.compile($("#Usages-map-tpl").html());
    UsagesAddView.prototype.template = Handlebars.compile($("#Usages-add-tpl").html());

    /* ---------------------------------- Local Variables ---------------------------------- */
    var slider = new PageSlider($('body'));
    var store;

    // les sources pour la base de données.nom fichier sauvé, url service json
    var sources = [
	["clubs-plongeurs.json", "http://ecorem.fr/plongeurs-sentinelles/wakka.php?wiki=SaisIndice/json&form=30"],
	["indice-paysager.json", "http://ecorem.fr/plongeurs-sentinelles/wakka.php?wiki=SaisIndice/json&form=26"],
	["site-observation.json", "http://ecorem.fr/plongeurs-sentinelles/wakka.php?wiki=SaisIndice/json&form=27"],
	["pecheurs-sentinelles.json", "http://ecorem.fr/pecheurs-sentinelles/wakka.php?wiki=SaisIndice/json&form=25"],
	["observations-faune-flore.json", "http://ecorem.fr/pecheurs-sentinelles/wakka.php?wiki=SaisIndice/json&form=26"],
	["observations-pollution.json", "http://ecorem.fr/pecheurs-sentinelles/wakka.php?wiki=SaisIndice/json&form=27"],
	["observations-usages.json", "http://ecorem.fr/pecheurs-sentinelles/wakka.php?wiki=SaisIndice/json&form=28"]
    ];
    var data = new Array();


    /* --------------------------------- Event Registration -------------------------------- */
    document.addEventListener('deviceready', function () {

		// fenetres d'alerte plus belles
        if (navigator.notification) { 
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Mebobs-Sub", // title
                    'OK'        // buttonName
                );
            };
        }

		// on sauve dans les données de l'application
		store = cordova.file.dataDirectory;
		var i = 0;
		loadFile(sources[i]);
		//jQuery.each(sources, function(index, value) {
			//window.resolveLocalFileSystemURL(store + value[0], gotFile, downloadAsset(value));
			//window.resolveLocalFileSystemURL(store + value[0], gotFile);
		//});
		//window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);

		 /* ---------------------------------- Local Functions ---------------------------------- */

	    /*function onFileSystemSuccess(fileSystem) {
	        jQuery.each(sources, function(index, value) {
				window.resolveLocalFileSystemURL(store + value[0], readlocalfile(value), downloadAsset(value));
			});
	    }

	    function onFileSystemFail(evt) {
	        console.log(evt.target.error.code);
	    }*/
	    function loadFile(filetab) {
	    	console.log(filetab[0]);
	    	window.resolveLocalFileSystemURL(store + filetab[0], gotFile, downloadAsset(filetab));
	    }

	    function downloadAsset(tabsource) {
	    	if (hasConnection()) {
				var fileTransfer = new FileTransfer();
				fileTransfer.download(tabsource[1] + '&order=alphabetique&demand=entries&html=1', store + tabsource[0],
				function(entry) {
					console.log("Transfer "+ tabsource[1] + '&order=alphabetique&demand=entries&html=1' +" to "+store + tabsource[0] + " success!");
					window.resolveLocalFileSystemURL(store + tabsource[0], gotFile);
				},
				function(err) {
					console.log("Transfer "+ tabsource[1] + '&order=alphabetique&demand=entries&html=1' +" to "+store + tabsource[0] + " error..");
					console.dir(err);
				});
	    	}
		}


		function fail(e) {
			console.log("FileSystem Error");
			console.dir(e);
		}

		function gotFile(fileEntry) {
			console.log(fileEntry.name + " présent");
			fileEntry.file(function(file) {
				var reader = new FileReader();

				reader.onloadend = function(e) {
					data[fileEntry.name] = JSON.parse(this.result);
					i = i + 1;
					if (i<sources.length) {
						loadFile(sources[i]);
					}

				}

				reader.readAsText(file);
			});

		}

	    

		// page d'accueil
    	router.addRoute('', function() { slider.slidePage(new HomeView(data, checkConnection()).render().$el); });

    	// menus de navigation
	    router.addRoute('menu-observatoire', function() { slider.slidePage(new MenuObservatoireView(data).render().$el); });
		router.addRoute('menu-pecheurs', function() { slider.slidePage(new MenuPecheursView(data).render().$el); });

		// elements du menu observatoire
		// indice paysager
	    router.addRoute('IndicePaysager/:id', function(id) { 
        	slider.slidePage(new IndicePaysagerView(data["indice-paysager.json"][id]).render().$el);
        });
		router.addRoute('IndicePaysagerAdd', function() { 
			slider.slidePage(new IndicePaysagerAddView().render().$el); 
		});
		router.addRoute('IndicePaysagerList', function() { 
			slider.slidePage(new IndicePaysagerListView(data["indice-paysager.json"]).render().$el); 
		});
		// sites d'observation
		router.addRoute('SiteObservation/:id', function(id) { 
        	slider.slidePage(new SiteObservationView(data["site-observation.json"][id]).render().$el);
        });
		router.addRoute('SiteObservationMap', function() { 
			slider.slidePage(new SiteObservationMapView(data["site-observation.json"]).render().$el);
			initmap('#SiteObservation-map-content');
			
		});
		router.addRoute('SiteObservationAdd', function() { 
			slider.slidePage(new SiteObservationAddView().render().$el);
			initmap('#map');
		});
		router.addRoute('Club/:id', function(id) { slider.slidePage(new ClubView(data["clubs-plongeurs.json"][id]).render().$el); });
		router.addRoute('ClubsAmbassadeursList', function() { slider.slidePage(new ClubListView(data["clubs-plongeurs.json"]).render().$el); });
	    
	    // elements du menu pecheurs sentinelles
	    // pecheurs sentinelles
	    router.addRoute('PecheursSentinelles/:id', function(id) { 
        	slider.slidePage(new PecheursSentinellesView(data["pecheurs-sentinelles.json"][id]).render().$el);
        });
		router.addRoute('PecheursSentinellesMap', function() { 
			slider.slidePage(new PecheursSentinellesMapView(data["pecheurs-sentinelles.json"]).render().$el);
			initmap('#PecheursSentinelles-map-content');
		});
		router.addRoute('PecheursSentinellesAdd', function() { 
			slider.slidePage(new PecheursSentinellesAddView().render().$el); 
			initmap('#map');
		});

		// observations faune flore
	    router.addRoute('FauneFlore/:id', function(id) { 
        	slider.slidePage(new FauneFloreView(data["observations-faune-flore.json"][id]).render().$el);
        });
		router.addRoute('FauneFloreMap', function() { 
			slider.slidePage(new FauneFloreMapView(data["observations-faune-flore.json"]).render().$el);
			initmap('#FauneFlore-map-content');
		});
		router.addRoute('FauneFloreAdd', function() { 
			slider.slidePage(new FauneFloreAddView().render().$el); 
			initmap('#map');
		});

		// observations pollution
	    router.addRoute('Pollution/:id', function(id) { 
        	slider.slidePage(new PollutionView(data["observations-pollution.json"][id]).render().$el);
        });
		router.addRoute('PollutionMap', function() { 
			slider.slidePage(new PollutionMapView(data["observations-pollution.json"]).render().$el);
			initmap('#Pollution-map-content');
		});
		router.addRoute('PollutionAdd', function() { 
			slider.slidePage(new PollutionAddView().render().$el);
			initmap('#map');
		});

		// observations usages
	    router.addRoute('Usages/:id', function(id) { 
        	slider.slidePage(new UsagesView(data["observations-usages.json"][id]).render().$el);
        });
		router.addRoute('UsagesMap', function() { 
			slider.slidePage(new UsagesMapView(data["observations-usages.json"]).render().$el);
			initmap('#Usages-map-content');
		});
		router.addRoute('UsagesAdd', function() { 
			slider.slidePage(new UsagesAddView().render().$el);
			initmap('#map');
		});

	    // C'EST PARTI !!
	    router.start();

    }, false);

}());




