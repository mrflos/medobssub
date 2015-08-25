angular.module('medobssub.services', [])

.factory('config', function() {
  return {
    wikis : { // tableau des urls vers les wikis associés (sans wakka.php, pour afficher les images relatives)
      medobs : 'http://ecorem.fr/medobssub'
      //medobs : 'http://yeswiki.dev'
    }, 
    authwiki : 'medobs', // wiki qui servira pour l'authenfication de l'application
    forms : {
      clubs : { 
        form : 4, // id du formulaire bazar
        title : 'Clubs ambassadeurs',  // titre pour la vue 
        titlefield : 'bf_titre',  // champs titre dans la fiche 
        descriptionfield : 'bf_ville', // champs description dans la fiche 
        imagefield : 'imagebf_photo', // champs image dans la fiche 
        fillerimage : 'img/plongeur.png', // image par défaut si pas d'image trouvée
        wikisource : 'medobs', // id du wiki associé
      },
      sites : { 
        form : 8, // id du formulaire bazar
        title : 'Sites d\'observation',  // titre pour la vue 
        titlefield : 'bf_titre',  // champs titre dans la fiche 
        descriptionfield : 'bf_decriptif', // champs description dans la fiche 
        imagefield : 'imagebf_image1', // champs image dans la fiche
        fillerimage : '', // image par défaut si pas d'image trouvée
        wikisource : 'medobs', // id du wiki associé
      },
      sentinelle : { 
        form : 1, // id du formulaire bazar
        title : 'Sentinelle',  // titre pour la vue 
        titlefield : 'bf_titre',  // champs titre dans la fiche 
        descriptionfield : 'bf_club', // champs description dans la fiche 
        imagefield : 'imagebf_image', // champs image dans la fiche 
        fillerimage : 'img/fisherman.png', // image par défaut si pas d'image trouvée
        wikisource : 'medobs', // id du wiki associé
      },
      especes : {
        form : 2, // id du formulaire bazar
        title : 'Espèces exotique',  // titre pour la vue 
        titlefield : 'bf_titre',  // champs titre dans la fiche 
        descriptionfield : '', // champs description dans la fiche 
        imagefield : '', // champs image dans la fiche 
        fillerimage : '', // image par défaut si pas d'image trouvée
        wikisource : 'medobs', // id du wiki associé
      },
      biodiversite : {
        form : 3, // id du formulaire bazar
        title : 'Biodiversité',  // titre pour la vue 
        titlefield : 'bf_titre',  // champs titre dans la fiche 
        descriptionfield : '', // champs description dans la fiche 
        imagefield : '', // champs image dans la fiche 
        fillerimage : '', // image par défaut si pas d'image trouvée
        wikisource : 'medobs', // id du wiki associé
      },
      usages : { 
        form : 5, // id du formulaire bazar
        title : 'Usages',  // titre pour la vue 
        titlefield : 'bf_titre',  // champs titre dans la fiche 
        descriptionfield : '', // champs description dans la fiche 
        imagefield : '', // champs image dans la fiche 
        fillerimage : '', // image par défaut si pas d'image trouvée
        wikisource : 'medobs', // id du wiki associé
      },
      pollution : { 
        form : 6, // id du formulaire bazar
        title : 'Pollution',  // titre pour la vue 
        titlefield : 'bf_titre',  // champs titre dans la fiche 
        descriptionfield : '', // champs description dans la fiche 
        imagefield : '', // champs image dans la fiche 
        fillerimage : '', // image par défaut si pas d'image trouvée
        wikisource : 'medobs', // id du wiki associé
      },
      indice : { 
        form : 7, // id du formulaire bazar
        title : 'Indice paysager',  // titre pour la vue 
        titlefield : 'bf_titre',  // champs titre dans la fiche 
        descriptionfield : 'bf_remarques', // champs description dans la fiche 
        imagefield : 'bf_image1', // champs image dans la fiche 
        fillerimage : 'img/observation.png', // image par défaut si pas d'image trouvée
        wikisource : 'medobs', // id du wiki associé
      }
    }
  };
})

// stocke les données dans le local storage pour s'en souvenir apres avoir quitté l'application
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  };
}])

// service pour gérer le fileApi pour l'upload de fichier
.service('FileInputService', function ($q) {

    this.readFileAsync = function (file) {
        var deferred = $q.defer(),
        fileReader = new FileReader(),
        fileName = file.name,
        fileType = file.type,
        fileSize = file.size;
        lastModified = file.lastModified;
        lastModifiedDate = file.lastModifiedDate;
        fileReader.readAsDataURL(file);

        //console.log(file.name, file.type);
        /*Reference: Other options*/
        //fileReader.readAsText(file);
        //fileReader.readAsBinaryString(file);
        //fileReader.readAsArrayBuffer(file);

        fileReader.onload = function (e) {
            deferred.resolve(e.target.result);
        };
        return deferred.promise;
    };
})

// service pour les formulaires sur le serveur
.factory('Forms', function(config, $http, $ionicLoading, $log) {
  return {
    all: function() {
      $ionicLoading.show({
        template: '<ion-spinner icon="ripple" class="spinner-stable"></ion-spinner><br> Récupération des données...'
      });
      // Get the entry list from the server
      return $http.get(config.wikis[config.forms[idform].wikisource] + '/wakka.php?wiki=BazaR/json&demand=forms', {cache: true}).then(function(resp) {
        $ionicLoading.hide();
        //$log.info(resp.data);
        return resp.data;
      }, function(error) {
        $ionicLoading.hide();
        $log.error(error);
        return error;
      });
    },
    remove: function(idform) {
      //todo entries.splice(entries.indexOf(idform), 1);
    },
    get: function(idform) {
      $ionicLoading.show({
        template: '<ion-spinner icon="ripple" class="spinner-stable"></ion-spinner><br> Récupération des données...'
      });
      // Get the item from the server
      return $http.get(config.wikis[config.forms[idform].wikisource] + '/wakka.php?wiki=BazaR/json&demand=forms&form='+config.forms[idform].form, {cache: true}).then(function(resp) {
        $ionicLoading.hide();
        //$log.info(resp.data);
        return resp.data[config.forms[idform].form];
      }, function(error) {
        $ionicLoading.hide();
        $log.error(error);
        return error;
      });
    },
    post: function(data, url) {
      console.log(data);
      $ionicLoading.show({
        template: '<ion-spinner icon="ripple" class="spinner-stable"></ion-spinner><br> Sauvegarde des données...'
      });
      return $http.post(url, data).then(function(resp) {
        $ionicLoading.hide();
        //$log.info(resp.data);
        return resp.data;
      }, function(error) {
        $ionicLoading.hide();
        $log.error(error);
        return error;
      });
    },
    getTemplate: function(idform) {
      $ionicLoading.show({
        template: '<ion-spinner icon="ripple" class="spinner-stable"></ion-spinner><br> Récupération des données...'
      });
      // Get the item from the server
      return $http.get(config.wikis[config.forms[idform].wikisource] + '/wakka.php?wiki=BazaR/json&demand=template&form='+config.forms[idform].form, {cache: true}).then(function(resp) {
        $ionicLoading.hide();
        //$log.info(resp.data);
        return resp.data;
      }, function(error) {
        $ionicLoading.hide();
        $log.error(error);
        return error;
      });
    }
  };
})

// service pour les fiches sur le serveur
.factory('Entries', function(config, $http, $ionicLoading, $log) {
  return {
    all: function(idform) {
      $ionicLoading.show({
        template: '<ion-spinner icon="ripple" class="spinner-stable"></ion-spinner><br> Récupération des données...'
      });
      // Get the entry list from the server
      return $http.get(config.wikis[config.forms[idform].wikisource] + '/wakka.php?wiki=BazaR/json&demand=entries&form='+config.forms[idform].form, {cache: true}).then(function(resp) {
        $ionicLoading.hide();
        //$log.info(resp.data);
        return resp.data;
      }, function(error) {
        $ionicLoading.hide();
        $log.error(error);
        return error;
      });
    },
    remove: function(idfiche) {
      //todo entries.splice(entries.indexOf(idfiche), 1);
    },
    get: function(idfiche, idform) {
      $ionicLoading.show({
        template: '<ion-spinner icon="ripple" class="spinner-stable"></ion-spinner><br> Récupération des données...'
      });
      // Get the item from the server
      return $http.get(config.wikis[config.forms[idform].wikisource] + '/wakka.php?wiki=BazaR/json&demand=entry&id_fiche='+idfiche+'&html=1', {cache: true}).then(function(resp) {
        $ionicLoading.hide();
        //$log.info(resp.data);
        return resp.data;
      }, function(error) {
        $ionicLoading.hide();
        $log.error(error);
        return error;
      });
    },
    query: function(idform, query) {
      $ionicLoading.show({
        template: '<ion-spinner icon="ripple" class="spinner-stable"></ion-spinner><br> Récupération des données...'
      });
      var form = '';
      if (idform) {
        form = '&form='+config.forms[idform].form;
      } 
      // Get the entry list from the server
      return $http.get(config.wikis[config.forms[idform].wikisource] + '/wakka.php?wiki=BazaR/json&demand=entries'+form+'&query='+query, {cache: true}).then(function(resp) {
        $ionicLoading.hide();
        //$log.info(resp.data);
        return resp.data;
      }, function(error) {
        $ionicLoading.hide();
        $log.error(error);
        return error;
      });
    }
  };
});