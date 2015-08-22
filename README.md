#MedObs-Sub

Application pour smartphone basée sur [Ionic Framework](http://ionicframework.com) permettant de voir et enregistrer des observations pour [le projet MedObs-Sub](http://ecorem.fr/medobssub)

## Installation des outils nécéssaires

#### Pour windows :

 - **git** : gestionnaire de version pour récupérer et versionner le code de github 
 - **nodejs** language de programmation en javascript pouvant être utilisé coté serveur 
 - **android sdk** : bibliothèques de développement pour android
 - **apache cordova** : ensemble de bibliothèque pour transformer une appli html en appli smartphone
 - **ionic framework** : 
 *Astuce : http://visualstudio.com/ : editeur de code de chez microsoft : possibilité d'installer directement ces outils, il ne manquera plus que Ionic Framework*

Une fois tout installé, ouvrir le terminal windows, et lancer pour installer ionic : 
```bash
npm install -g cordova ionic 
```

## Récupérer le code source sur github
[Dépot officiel de l'application sur Github](https://github.com/mrflos/medobssub)

#### Première récupération
*On peut changer Developpements pour tout autre dossier qui vous convient.*
Dans le terminal :
```bash
cd Developpements
git clone git@github.com:mrflos/medobssub.git 
```

#### Récupérer les mises à jour
Dans le terminal :
```bash
cd Developpements\medobssub
git pull #récupération des modifications au serveur github
```

#### Modifier le code et proposer des améliorations
*Il faut avoir un compte chez github pour faire des modifications.*

Faire vos modifications puis dans le terminal :
```bash
cd Developpements\medobssub
git add -A #prise en compte des nouveaux fichiers
git commit -am 'message qui explique mes modifications' #sauvegarde sur le dépot local des modifications
git push origin #envoi des modifications au serveur github
```
**Il vaut mieux s'y connaitre avec git car ces commandes ne sont pas les seules, et il y a énormément de possibilités**
[Documentation complète de Git en francais](http://www.git-scm.com/book/fr/v2)
[Un article d'aide sur Git](http://www.miximum.fr/enfin-comprendre-git.html)


## Utilisation de Ionic Framework
[Documentation complète de Ionic Framework](http://ionicframework.com/docs)

#### Finalisation de l'installation et mise à jour
On va mettre à jour ionic, et préciser si on travaille sur une appli android ou ios
Dans le terminal :
```bash
cd Developpements\medobssub
npm install #on installe/met à jour les bibliothèques nodejs
ionic lib update #on met à jour ionic
ionic platform android #pour ajouter android
ionic platform ios #pour ajouter ios (nécessite un mac avec xcode d'installé)

```

#### Développer sur sa machine et visualiser les changements dans son navigateur
Dans le terminal :
```bash
cd Developpements\medobssub
ionic serve --lab
```
*Les modifications du code seront automatiquement envoyés au navigateur qui sera rechargé*

#### Tester l'application sur son smartphone
**Votre smartphone doit être en mode Développeur et connecté par USB à votre ordinateur**
Dans le terminal :
```bash
cd Developpements\medobssub
ionic run
```

#### Créer un fichier apk pour android
Dans le terminal :
```bash
cd Developpements\medobssub
ionic build --release
```
*Le fichier sera disponible*

## Dossiers et fichiers utiles
*todo*

## Mise à jour des dépots d'applications
*Il est nécessaire d'avoir un compte développeur google et/ou apple pour déposer des applications, et ca coute de l'argent...*
#### Google play
*todo*

#### Apple
*todo*
