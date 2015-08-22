angular.module('medobssub.controllers', [])

.controller('ItemCtrl', function(config, $sce, $scope, $ionicHistory, $stateParams, Entries) {
  $scope.rootUrl = config.rootUrl;
  Entries.get($stateParams.itemId).then(function(entry){
    $scope.entry = $sce.trustAsHtml(entry.html);
    var dom = document.createElement('div');
    dom.innerHTML = entry.html;
    var title = dom.querySelector("h1.BAZ_fiche_titre");
    $scope.title = title.innerHTML;
  });
})

.controller('FormCtrl', function(config, $sce, $scope, $ionicHistory, $stateParams, $compile, $timeout, Forms) {
    Forms.get($stateParams.formId).then(function(form){
      function htmlEntities(str) {
          return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      }
      function $ (selector, el) {
           if (!el) {el = document;}
           return el.querySelectorAll(selector);
      }
      $scope.title = 'Saisie : '+form.bn_label_nature;
      $scope.form = form;
      $scope.fileNameChanged = function(elem)  {
        var files = elem.files;
        
        var namesArr = [];
        for (var i=0; i<files.length; i++) {
           namesArr.push(files[i].name);
        }
        $scope.nameString = namesArr.join(' ,');
        $scope.$apply();
      };

      $scope.fullform = '';
      var rawform = '';
      angular.forEach(form.prepared, function(item, key) {
        if (item.type === 'html') {
          if (item.label.indexOf("hide-in-ionic") === -1) {
            rawform += item.label;
          }
        } else if (item.type === 'text' || item.type === 'date' || item.type === 'email' || item.type === 'url' || item.type === 'password' || item.type === 'number') {
          rawform += '<label class="item item-input item-stacked-label">'+
                        '<span class="input-label">'+item.label+'</span>'+
                        '<input type="'+item.type+'" name="'+item.id+'" '+item.attributes+' placeholder="'+htmlEntities(item.label)+'" ';
          if (item.required) {
            rawform += ' required';
          }
          rawform += '>'+
          '</label>';
        } else if (item.type === 'range') {
          rawform += '<div class="item item-divider">'+item.label+'</div>'+
          '<div class="item range range-positive">'+
            '<input type="range" name="'+item.id+'" '+item.attributes+' value="0" oninput="this.form.'+item.id+'number.value=this.value">'+
            '<output name="'+item.id+'number" class="icon">0</output>'+
          '</div>';
        } else if (item.type === 'file') {
          rawform += '<label class="item item-input item-stacked-label">'+
            '<span class="input-label">'+item.label+'</span>'+
            '<input style="display:none;" type="file" name="'+item.id+'" ng-model="'+item.id+'" ng-change="fileNameChanged(this)">'+
            '<p class="inut-filename"></p>'+
            '<div class="button button-block">Parcourir...</div>'+
          '</label>';
        } else if (item.type === 'textarea') {
          rawform += '<label class="item item-input item-stacked-label">'+
          '<span class="input-label">'+item.label+'</span>'+
          '<textarea name="'+item.id+'" '+item.attributes+' placeholder="'+htmlEntities(item.label)+'" ';
          if (item.required) {
            rawform += ' required';
          }
          rawform += '></textarea>'+
          '</label>';
        } else if (item.type === 'select') {
          rawform += '<label class="item item-input item-select">'+
            '<div class="input-label">'+item.label+'</div>'+
            '<select name="'+item.id+'" ';
          if (item.required) {
            rawform += ' required';
          }
          rawform += ' ng-model="item" ng-change="setVisible(\''+item.id+'\');">';
          if (!item.required) {
              //rawform += '<option value="choisir">choisir</option>';
          }
          angular.forEach(item.values.label, function(label, itemkey) {
            rawform += '<option value="'+itemkey+'">'+label+'</option>';
          });
          rawform += '</select>'+
          '</label>';         
        } else if (item.type === 'checkbox') {
          rawform += '<ul class="list">'+
            '<li>'+item.label+'</li>'+
            angular.forEach(item.values.label, function(label, itemkey) {
              rawform += '<li class="item item-checkbox">'+
                '<label class="checkbox">'+
                 '<input name="'+item.id+'['+key+']" type="checkbox">'+
                '</label>  '+label+'</li>';
            });
            rawform += '</ul>';
        } else if (item.type === 'map') {
          rawform += '<div class="map-wrapper">'+
              '<leaflet center="geoloccenter" width="100%" height="300px"></leaflet>'+
          '</div>';
        } else if (item.type === 'hidden') {      
          rawform += '<input type="'+item.type+'" name="'+item.id+'" value="'+item.values+'">';
        }
      });

      $scope.setVisible = function(val)  {
        console.log(this);
        // change the visible parts of the form
        var id = val.replace( "liste", "" );
        angular.forEach($("div[id^='" + id + "']"), function(dom, key) {
          dom.style = 'display:none';
        });
        angular.forEach($("div[id='" + id + '_' + this.item + "']"), function(dom, key) {
          dom.style = 'display:block';
        });
      }; 

      angular.extend($scope, {
          geoloccenter: {
            autoDiscover: true,
            zoom: 8
          },
          defaults: {
              tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
              scrollWheelZoom: false,
              maxZoom: 15
          }
      });

      $scope.fullform = rawform;

    });
})


.controller('ListCtrl', function(config, $scope, $stateParams, Entries) {
  if ($stateParams.formId === 'clubs') {
    $scope.url = 'clubs';
  } else  {
    $scope.url = '';
  }
  $scope.title = config.forms[$stateParams.formId].title;
  $scope.titlefield = config.forms[$stateParams.formId].titlefield;
  $scope.descriptionfield = config.forms[$stateParams.formId].descriptionfield;
  $scope.imagefield = config.forms[$stateParams.formId].imagefield;
  $scope.fillerimage = config.forms[$stateParams.formId].fillerimage;
  $scope.rootUrl = config.rootUrl;
  Entries.all($stateParams.formId).then(function(entries){
    $scope.entries = entries;
  });
})

.controller('MapCtrl', function(config, $scope, $stateParams, Entries, $http, $log, $ionicLoading, leafletData) {
  $scope.title = config.forms[$stateParams.formId].title;
  angular.extend($scope, {
      mapCenter: {
          lat: 42.0300364,
          lng: 6.9614337,
          zoom: 5
      },
      defaults: {
          tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          scrollWheelZoom: false,
          maxZoom: 15
      },
      markers : {},
      layers: {
        baselayers: {
            osm: {
                name: 'OpenStreetMap',
                url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                type: 'xyz',
                maxZoom: 15
            }
        },
        overlays: {
          MedObsSub: {
            name: "MedObs-Sub",
            type: "markercluster",
            visible: true
          }
        }
      }
  });
  var url = '';
  if ($stateParams.formId === 'sentinelle') {
    url = 'sentinelle';
  }
  Entries.all($stateParams.formId).then(function(entries) {
    var markers = {};
    angular.forEach(entries, function(value, key) {
      if (value.bf_latitude && value.bf_longitude) {
        markers[value.id_fiche] = {
          message: '<a href="#/tab/'+url+'item/'+value.id_fiche+'">Voir la fiche complète</a>',
          lat: parseFloat(value.bf_latitude),
          lng: parseFloat(value.bf_longitude),      
          layer: "MedObsSub",
          label: {
              message: value.bf_titre,
              options: {
                  noHide: true,
                  direction: 'auto'
              }
          }
        };
      }
    });
    angular.extend($scope, {
      markers: markers
    });
  });
})

.controller('AccountCtrl', function(config, $scope, $sce, $http, $location, $log, $localstorage, Entries) {
  $scope.user = JSON.parse($localstorage.get('user'));
  Entries.query('sentinelle','bf_mail='+encodeURIComponent($scope.user.email)).then(function(result) {
    var firstres = result[Object.keys(result)[0]];
    if (firstres) {
      Entries.get(firstres.id_fiche).then(function(entry){
        $scope.entry = $sce.trustAsHtml(entry.html);
      });
    } else {
      $scope.entry = 'Pas de fiche associée à votre Email.';
    }
  });

  Entries.query('','createur='+encodeURIComponent($scope.user.name)).then(function(result) {
      $scope.mesfiches = result;
  });

  // bouton de déconnexion
  $scope. handleLogoutBtnClick = function() {
    $http.post(config.rootUrl + '/wakka.php?wiki=ParametresUtilisateur/auth', {
      logout: 1
    }).success(function(resp) {
      $log.info(resp);
      $localstorage.set('user', '');
      $location.path("/login");
    }).error(function(resp) {
      $log.error(resp);
      $localstorage.set('user', '');
    });
  };
  
})

// fiche sentinelle
.controller('RegisterCtrl', function(config, $sce, $scope, Forms) {
    Forms.get('sentinelle').then(function(form){
      $scope.form = form;
      $scope.getRequired = function(val)  {
        if (val === true) {
          return 'required';
        } else {
          return '';
        }
      };
      $scope.getHtml = function(val)  {
        if (val.indexOf("not-in-phone-app") > -1) {
          return false;
        } else {
          return $sce.trustAsHtml(val);
        }
      };
      $scope.setVisible = function()  {
        // TODO : change the visible parts of the form
        console.log('change');
      };

      angular.extend($scope, {
          /*mapCenter: {
              lat: 42.0300364,
              lng: 6.9614337,
              zoom: 5
          },*/
          geoloccenter: {
            autoDiscover: true,
            zoom: 5
          },
          defaults: {
              tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
              scrollWheelZoom: false,
              maxZoom: 15
          }
      });

    });
    /*
    hélas le template bazar n'est pas adapté pour les mobiles
    Forms.getTemplate($stateParams.formId).then(function(form){
    $scope.form = $sce.trustAsHtml(form.html);
    var dom = document.createElement('div');
    dom.innerHTML = form.html;
    var title = dom.querySelector("h2.titre_type_fiche");
    $scope.title = title.innerHTML.replace(/&nbsp;/, '');
    });
    */
})

///////////////////////////////////////////////////////////////////////////////////////////////////
// service d'authentification sur le wiki 
.controller('WikiAuth', function($ionicLoading, $ionicHistory, $scope, $location, $localstorage, $log, config, $http, $ionicPopup) {
  $scope.autoInit = function () {
    $log.info('WikiAuth');
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple" class="spinner-stable"></ion-spinner><br>Connexion...'
    });
    if ($localstorage.get('user')) {
      $ionicLoading.hide();
      $location.path("/tab/home");
    } else {
      $ionicLoading.hide();
      $location.path("/login");
    }
  };
  $scope.loginInit = function () {
    if ($localstorage.get('user')) {
      $location.path("/tab/home");
    } else {
      $scope.handleLoginBtnClick = function(loginForm) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ripple" class="spinner-stable"></ion-spinner><br>Connexion...'
        });
        $http.post(config.rootUrl + '/wakka.php?wiki=ParametresUtilisateur/auth', {
          name: loginForm.email,
          password: loginForm.password,
          remember: 1
        }).success(function(resp) {
          $log.info(resp);
          $ionicLoading.hide();
          loginForm.email = '';
          loginForm.password = '';
          $localstorage.setObject('user', resp.user);
          $location.path("/tab/home");
        }).error(function(resp) {
          $log.error(resp);
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Erreur de connexion',
            template: resp.error
          });
        });
      };
    }
  };
});