function init_form_controls(form, exiturl) {
    //carte
    var lat = $('#latitude', form);
    var lng = $('#longitude', form);
    markers.clearLayers();

    function onLocationFound(position) {

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
    }

    function onLocationError(error) {
        console.log('Geolocation error code: '    + error.code    + '\n' +
              'Geolocation error message: ' + error.message + '\n');
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
    }
    var gps = navigator.geolocation.getCurrentPosition(onLocationFound, onLocationError, {timeout: 4000 });

    //va cliquer sur la bonne tabulation dans le formulaire
    $('.navigation-control .btn', form).on("touchend", function() {
        var parentdiv = $('#formulaire', form);
        parentdiv.find('.segmented-control .control-item').removeClass('active');
        parentdiv.find('.control-item[href="'+$(this).attr('href')+'"]').addClass('active');
        parentdiv.find('.control-content').removeClass('active'); 
        $($(this).attr('href')).addClass('active');
        document.getElementById("formulaire").scrollTop = 0; // marche pas TODO : trouver un moyen de remonter
    });

    //affiche le nombre à coté du range
    $('input[type=range]', form).on("change mousemove keypress", function() {
        $(this).next('.output-val').html($(this).val());
    });

    //permet de gerer des affichages conditionnels, en fonction de la liste choisie
    $("select[id^='liste']", form).each( function() {
            var id = $(this).attr('id');
            id = id.replace("liste", ""); 
            $("div[id^='"+id+"']").hide();
            $("div[id='"+id+'_'+$(this).val()+"']").show();
    });
    $("select[id^='liste']", form).change( function() {
            var id = $(this).attr('id');
            id = id.replace("liste", ""); 
            $("div[id^='"+id+"']").hide();
            $("div[id='"+id+'_'+$(this).val()+"']").show();
    });

    // validation
    //validation formulaire de saisie
    var inputsreq = $("input[required=required], select[required=required], textarea[required=required]", form).not('input.bazar-date[required=required]', form);

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


    $('.btn-save', form).click(function() {
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
        $('input.bazar-date[required=required]', form).each(function() {  
            if($(this).val()==='') {
                atleastonefieldnotvalid = true;
                $(this).addClass('invalid');        
            } else {
                $(this).removeClass('invalid');
            }
        });

        // les emails
        $('input[type=email]', form).each(function() {
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
        $('input[type=url]', form).each(function() {
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
        $('fieldset.chk_required', form).each(function() {
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
            $('html, body').animate({scrollTop: $(".invalid", form).offset().top - 80}, 800);
        }
        else if (atleastonemailfieldnotvalid === true) {
            alert('L\'email saisi n\'est pas valide');
            //on remonte en haut du formulaire
            $('html, body').animate({scrollTop: $(".invalid", form).offset().top - 80}, 800);
        }
        else if (atleastoneurlfieldnotvalid === true) {
            alert('L\'url saisie n\'est pas valide, elle doit commencer par http:// et ne pas contenir d\'espaces ou caracteres speciaux');
            //on remonte en haut du formulaire
            $('html, body').animate({scrollTop: $(".invalid", form).offset().top - 80}, 800);
        }
        else if (atleastonecheckboxfieldnotvalid === true) {
            alert('Il faut cocher au moins une case a cocher');
            //on remonte en haut du formulaire
            $('html, body').animate({scrollTop: $(".invalid", form).offset().top - 80}, 800);
        }
        else {
            var customtitle = $('input[type=hidden][id=bf_titre]');
            if (customtitle) {
                var newtitle = customtitle.val();
                $.each(newtitle.match(/\#\#(.+?)\#\#/g), function( index, value ) {
                    newtitle = newtitle.replace(value,$('#'+value.replace(/\#/g,'')).val());
                });
                customtitle.val(newtitle);
            }
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
                    alert('Votre fiche a bien été sauvée');
                    window.location.href= exiturl+'/'+responsedata.id_fiche;
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR, textStatus, errorThrown);
                }         
            });
        }

        return false;
    });
}