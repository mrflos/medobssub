var SiteObservationAddView = function (map, markers, connection) {


    this.initialize = function() {
        this.$el = $('<div/>');
        //this.render();
    };


    this.render = function() {
        console.log('vue formulaire saisie site observation')
        this.$el.html(this.template());

        //carte
        var lat = $('#latitude', this.$el);
        var lng = $('#longitude', this.$el);

        function onLocationFound(position) {
            map.removeLayer(markers);
           
            markers = new L.FeatureGroup();
            var radius = position.coords.accuracy / 2;
            var marker = L.marker([position.coords.latitude, position.coords.longitude], {draggable: true});
            lat.val(position.coords.latitude);
            lng.val(position.coords.longitude);
            map.setView([position.coords.latitude,position.coords.longitude]);
            marker.bindPopup("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude + "<br>Vous êtes localisé dans un rayon de " + radius + " mètres autour de ce point.<br> Vous pouvez déplacer ce point pour le mettre au bon endroit").openPopup();

            marker.on('dragend', function(event) {
                    var markerdragged = event.target;  // you could also simply access the marker through the closure
                    var result = markerdragged.getLatLng();  // but using the passed event is cleaner
                    marker.bindPopup("Latitude: " + result.lat + "<br>Longitude: " + result.lng).openPopup();
                    lat.val(result.lat);
                    lng.val(result.lng);
            });

            markers.addLayer(marker);
            map.addLayer(markers);
        }

        function onLocationError(error) {
            console.log('Geolocation error code: '    + error.code    + '\n' +
                  'Geolocation error message: ' + error.message + '\n');

            map.removeLayer(markers);
            markers = new L.FeatureGroup();
            lat.val('43.28208');
            lng.val('5.34579');
            map.setView([43.28208, 5.34579]);
            var marker = L.marker([43.28208, 5.34579], {draggable: true});
            marker.bindPopup("Latitude: 43.28208<br>Longitude: , 5.34579<br>Vous n\'avez pas pu être localisé automatiquement.<br> Déplacez ce point pour le mettre au bon endroit").openPopup();

            marker.on('dragend', function(event) {
                    var markerdragged = event.target;  // you could also simply access the marker through the closure
                    var result = markerdragged.getLatLng();  // but using the passed event is cleaner
                    marker.bindPopup("Latitude: " + result.lat + "<br>Longitude: " + result.lng).openPopup();
                    lat.val(result.lat);
                    lng.val(result.lng);
            });
            markers.addLayer(marker);
            map.addLayer(markers);
        }
        var gps = navigator.geolocation.getCurrentPosition(onLocationFound, onLocationError, { enableHighAccuracy:true, timeout: 5000 });

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

        // validation
        //validation formulaire de saisie
        var inputsreq = $("#formulaire input[required=required], #formulaire select[required=required], #formulaire textarea[required=required]", this.$el).not('#formulaire input.bazar-date[required=required]', this.$el);

        //on change le look des champs obligatoires en cas de saisie dedans
        inputsreq.keypress(function(event) {
            if ( !($(this).val().length === 0 || $(this).val() === '' || $(this).val() === '0')) {
                $(this).removeClass('invalid');
            } else {
                atleastonefieldnotvalid = true;
                $(this).addClass('invalid');
            }
        });
        //on change le look des champs obligatoires en cas de changement de valeur
        inputsreq.change(function(event) {
            if ( !($(this).val().length === 0 || $(this).val() === '' || $(this).val() === '0')) {
                $(this).removeClass('invalid');
            } else {
                atleastonefieldnotvalid = true;
                $(this).addClass('invalid');
            }
        });


        $('.btn-save', this.$el).click(function() {
            var atleastonefieldnotvalid = false;
            var atleastonemailfieldnotvalid = false;
            var atleastoneurlfieldnotvalid = false;
            var atleastonecheckboxfieldnotvalid = false;
                    
            // il y a des champs requis, on teste la validite champs par champs
            if (inputsreq.length > 0) {     
                inputsreq.each(function() {
                    if ( !($(this).val().length === 0 || $(this).val() === '' || $(this).val() === '0')) {
                        $(this).removeClass('invalid');
                    } else {
                        atleastonefieldnotvalid = true;
                        $(this).addClass('invalid');
                    }
                });
            }
            
            // les dates
            $('#formulaire input.bazar-date[required=required]').each(function() {  
                if($(this).val()==='') {
                    atleastonefieldnotvalid = true;
                    $(this).addClass('invalid');        
                } else {
                    $(this).removeClass('invalid');
                }
            });

            // les emails
            $('#formulaire input[type=email]').each(function() {
                var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                var address = $(this).val();
                if(reg.test(address) == false && !(address === '' &&  $(this).attr('required') !== 'required')) {
                    atleastonemailfieldnotvalid = true;
                    $(this).addClass('invalid');        
                } else {
                    $(this).removeClass('invalid');
                }
            });
            
            // les urls
            $('#formulaire input[type=url]').each(function() {
                var reg = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                var url = $(this).val();
                if(reg.test(url) == false && !(url === '' &&  $(this).attr('required') !== 'required')) {
                    atleastoneurlfieldnotvalid = true;
                    $(this).addClass('invalid');
                } else {
                    $(this).removeClass('invalid');
                }
            });
            
            // les checkbox chk_required
            $('#formulaire fieldset.chk_required').each(function() {
                var nbchkbox = $(this).find(':checked');
                if(nbchkbox.length === 0) {
                    atleastonecheckboxfieldnotvalid = true;
                    $(this).addClass('invalid');
                } else {
                    $(this).removeClass('invalid');
                }
            });
            
            if (atleastonefieldnotvalid === true) {
                alert('Veuillez saisir tous les champs obligatoires (avec une asterisque rouge)');
                //on remonte en haut du formulaire
                $('html, body').animate({scrollTop: $("#formulaire .invalid").offset().top - 80}, 800);
            }
            else if (atleastonemailfieldnotvalid === true) {
                alert('L\'email saisi n\'est pas valide');
                //on remonte en haut du formulaire
                $('html, body').animate({scrollTop: $("#formulaire .invalid").offset().top - 80}, 800);
            }
            else if (atleastoneurlfieldnotvalid === true) {
                alert('L\'url saisie n\'est pas valide, elle doit commencer par http:// et ne pas contenir d\'espaces ou caracteres speciaux');
                //on remonte en haut du formulaire
                $('html, body').animate({scrollTop: $("#formulaire .invalid").offset().top - 80}, 800);
            }
            else if (atleastonecheckboxfieldnotvalid === true) {
                alert('Il faut cocher au moins une case a cocher');
                //on remonte en haut du formulaire
                $('html, body').animate({scrollTop: $("#formulaire .invalid").offset().top - 80}, 800);
            }
            else {
                var formObj = $(this).parents("form");
                var formURL = formObj.attr("action");
                var formData = new FormData(formObj[0]);
                $.ajax({
                    url: formURL,
                    type: 'POST',
                    data:  formData,
                    mimeType:"multipart/form-data",
                    contentType: false,
                    cache: false,
                    processData:false,
                    success: function(responsedata, textStatus, jqXHR) {
                        console.log(responsedata);
                        alert('Votre fiche a bien ete sauvee');
                        window.location.href= '#SiteObservation/'+responsedata.id_fiche;
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR, textStatus, errorThrown);
                    }         
                });
            }

            return false;
        });

        return this;
    };

    this.initialize();

}