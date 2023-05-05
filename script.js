// Jeu Rush-Hour, créer par Magnin Julie et Cuinet Antoine, page js

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////   Front   ////////////////////////////////////////////////

// Bouton pour activer le son
const buttonAudio2 = document.getElementById('buttonAudio2');
buttonAudio2.classList.toggle("active")
let audio2 = new Audio();
let audio3 = new Audio();
let audio4 = new Audio();
let audio5 = new Audio();
audio2.src = 'click.mp3';
audio3.src = 'selection.wav';
audio4.src = 'falseSon.mp3';
audio5.src = 'deplacementSon.wav';
let isPaused2 = true;
// annimation son
buttonAudio2.addEventListener("click", function() { 
  buttonAudio2.classList.toggle("inactive");
});

buttonAudio2.addEventListener('click', function(){
  if(isPaused2){
    audio2.pause();
  }else{
    audio2.play();
  }
  isPaused2 = !isPaused2;
})

// son du bouton rush-hour
const refresh = document.querySelector(".refresh");
refresh.addEventListener("click", function(){
  if(isPaused2){
    audio2.play();
  }
});

// Bouton accueil
const ButtonAccueil = document.querySelector(".buttonAccueil");
const accueuil = document.querySelector(".accueil");
// son du bouton d'acceil
ButtonAccueil.addEventListener("click", function(){
  if(isPaused2){
    audio2.play();
  }
});
ButtonAccueil.addEventListener("click", acceuilActive);
function acceuilActive(){
    if (accueuil.style.display == "none") accueuil.style.display = "flex";
    else accueuil.style.display = "none";
}  

// Bouton parametre de musique
const ButtonParam = document.querySelector(".param");
const modal = document.querySelector(".modal");
ButtonParam.addEventListener("click", paramActive);
function paramActive(){
    if (modal.style.display == "flex") modal.style.display = "none";
    else modal.style.display = "flex";
}  
// son du bouton 
ButtonParam.addEventListener("click", function(){
  if(isPaused2){
    audio2.play();
  }
});

// Bouton pour activer la musique
const buttonAudio = document.getElementById('buttonAudio');
let audio1 = new Audio();
audio1.src = 'musique.mp3';
let isPaused = true;
let loopTime = 94800;
let intervalId = null;
// annimation musique
buttonAudio.addEventListener("click", function() { 
  buttonAudio.classList.toggle("active");
});

buttonAudio.addEventListener('click', function(){
  if(isPaused){
    intervalId = setInterval(doLoop, loopTime);
    audio1.play();
    audio1.currentTime = 0;
    // son du bouton 
  buttonAudio.addEventListener("click", function(){
    if(isPaused2){
      audio2.play();
    }
});
  }else{
    audio1.pause();
    // son du bouton 
  buttonAudio.addEventListener("click", function(){
    if(isPaused2){
      audio2.play();
    }
});
  }
  isPaused = !isPaused;
})
function doLoop(){
  audio1.currentTime = 0;  
}
// Bouton affichage levels
const ButtonLevels = document.querySelector(".levels");
const level = document.querySelector(".modal1");
ButtonLevels.addEventListener("click", levelsActive);
function levelsActive(){
    if (level.style.display == "flex") level.style.display = "none";
    else level.style.display = "flex";
}  
// son du bouton 
ButtonLevels.addEventListener("click", function(){
  if(isPaused2){
    audio2.play();
  }
});

// bouton et affichage de la page modale lors de la victoire
const buttonNext = document.getElementById('butonNextLevel');
buttonNext.addEventListener("click", buttonNextActive);
function buttonNextActive(){
  if(isPaused2){
    audio2.play();
  }
  win = false;
  modalWin.style.display = "none";
} 


// pour l'affichage du score actuel
const scoreDiv = document.getElementById("score");
// pour l'affichage du best score
const bestscore = document.getElementById("bestscore");
// bestscore.textContent = levels[currentLevel].bestScore;  // a mettre dans la fonction pour avoir le best score
const nbStars = document.getElementById("nbStars");

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////   Déclaration des sprites   //////////////////////////////////////

//voiture rouge
const redCarImage1 = new Image();
redCarImage1.src = "Car2Part1D.png";
const redCarImage2 = new Image();
redCarImage2.src = "Car2Part2D.png";
//voiture bleu horizontale
const blueCarImage1H = new Image();
blueCarImage1H.src = "Car1Part1D.png";
const blueCarImage2H = new Image();
blueCarImage2H.src = "Car1Part2D.png";
//voiture bleu verticale
const blueCarImage1V = new Image();
blueCarImage1V.src = "Car1Part1_90.png";
const blueCarImage2V = new Image();
blueCarImage2V.src = "Car1Part2_90.png";
// Camion vertical
const camion1V = new Image();
camion1V.src = "00.png";
const camion2V = new Image();
camion2V.src = "01.png";
const camion3V = new Image();
camion3V.src = "02.png";
// Camion horizontal
const camion1H = new Image();
camion1H.src = "00 copie.png";
const camion2H = new Image();
camion2H.src = "01 copie.png";
const camion3H = new Image();
camion3H.src = "02 copie.png";

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////   Début du code du jeu à proprement parler   ///////////////////////////

let canvas = document.getElementById("cvs");

// Dimensions du document et d'une case
var blockSize = 100;
var ctxWidth = 600;
var ctxHeight = 600;
var widthInBlocks = ctxWidth/blockSize;
var heightInBlocks = ctxHeight/blockSize;


// Déclaration des variable
let context = null;
let win=false;
let currentLevel = null;

// tableau contenant les différents levels contenant des instances de lv 
let levels= Array(9);
for(let i =0; i<levels.length; i++){
  levels[i]= {numLV :null, nbCoupMin:null, vTab:Array(), nbMouv:0, bestScore:null, completed:false};
};

// tableau (matrice) grille de jeu
let grild= Array(widthInBlocks);
for(let i =0; i<widthInBlocks; i++){
  grild[i]=Array(widthInBlocks);
  for(let j =0; j<widthInBlocks; j++){
    grild [i][j] = 0;
  };
};

// objet véhicule
function car(numV, orient, taille){  //pour orient, 0: horizontal et 1: vertical
  return {numV,orient,taille};
} 

let bufferCar = null; //retient le véhicule après le clic 


// objet position
function newPos(i, j){
  return {i, j};
}

let posClic = newPos(0, 0);



/// Note pour créer un lv:
/// Déclarer une nouvelle voiture en dehors de toute fonction
/// La placer dans la grille avec la fonction placementV
/// Déclarer le level (levels[].numLV et levels[].vTab[])

/// Dans le level en question:
///   afficherCases(grild, c);

/// pour le nom des vehicules:
/// c + numLv pour la voiture principale
/// cv + num voiture + numLv pour les voitures verticales
/// ch + num voiture + numLv pour les voitures horizontales

let c;
let cv1lv1;
let cv2lv1;
let cv3lv1;
let ch1lv1;
let ch2lv1;
let ch3lv1;

const caseLevel1 = document.querySelector(".lv1");
caseLevel1.addEventListener("click", function(){
  // son click
  if(isPaused2){
    audio2.play();
  }
  instanceLv1();
  currentLevel = 0;
  levels[currentLevel].nbMouv =0;
  scoreDiv.textContent = levels[currentLevel].nbMouv;
  bestscore.textContent = levels[currentLevel].bestScore;
});


let c2;

const caseLevel2 = document.querySelector(".lv2");
caseLevel2.addEventListener("click", function(){
  if(levels[0].completed){   // == false  /// rajoute ca dans le if pour voir et créer le niveau
    // son click
    if(isPaused2){
      audio2.play();
    }
    instanceLv2();
    currentLevel = 1;
    levels[currentLevel].nbMouv =0;
    scoreDiv.textContent = levels[currentLevel].nbMouv;
    bestscore.textContent = levels[currentLevel].bestScore;
  } else {
    if(isPaused2){
      audio4.play();
    }
  }
});


let c3;

const caseLevel3 = document.querySelector(".lv3");
caseLevel3.addEventListener("click", function(){
  if(levels[1].completed){   // == false  /// rajoute ca dans le if pour voir et créer le niveau
    // son click
    if(isPaused2){
      audio2.play();
    }
    instanceLv3();
    currentLevel = 2;
    levels[currentLevel].nbMouv =0;
    scoreDiv.textContent = levels[currentLevel].nbMouv;
    bestscore.textContent = levels[currentLevel].bestScore;
  } else {
    if(isPaused2){
      audio4.play();
    }
  }
});


let c4;

const caseLevel4 = document.querySelector(".lv4");
caseLevel4.addEventListener("click", function(){
  if(levels[2].completed){   // == false  /// rajoute ca dans le if pour voir et créer le niveau
    // son click
    if(isPaused2){
      audio2.play();
    }
    instanceLv4();
    currentLevel = 3;
    levels[currentLevel].nbMouv =0;
    scoreDiv.textContent = levels[currentLevel].nbMouv;
    bestscore.textContent = levels[currentLevel].bestScore;
  } else {
    if(isPaused2){
      audio4.play();
    }
  }
});


let c5;

const caseLevel5 = document.querySelector(".lv5");
caseLevel5.addEventListener("click", function(){
  if(levels[3].completed){   // == false  /// rajoute ca dans le if pour voir et créer le niveau
    // son click
    if(isPaused2){
      audio2.play();
    }
    instanceLv5();
    currentLevel = 4;
    levels[currentLevel].nbMouv =0;
    scoreDiv.textContent = levels[currentLevel].nbMouv;
    bestscore.textContent = levels[currentLevel].bestScore;
  } else {
    if(isPaused2){
      audio4.play();
    }
  }
});


let c6;

const caseLevel6 = document.querySelector(".lv6");
caseLevel6.addEventListener("click", function(){
  if(levels[4].completed){   // == false  /// rajoute ca dans le if pour voir et créer le niveau
    // son click
    if(isPaused2){
      audio2.play();
    }
    instanceLv6();
    currentLevel = 5;
    levels[currentLevel].nbMouv =0;
    scoreDiv.textContent = levels[currentLevel].nbMouv;
    bestscore.textContent = levels[currentLevel].bestScore;
  } else {
    if(isPaused2){
      audio4.play();
    }
  }
});


let c7;

const caseLevel7 = document.querySelector(".lv7");
caseLevel7.addEventListener("click", function(){
  if(levels[5].completed){   // == false  /// rajoute ca dans le if pour voir et créer le niveau
    // son click
    if(isPaused2){
      audio2.play();
    }
    instanceLv7();
    currentLevel = 6;
    levels[currentLevel].nbMouv =0;
    scoreDiv.textContent = levels[currentLevel].nbMouv;
    bestscore.textContent = levels[currentLevel].bestScore;
  } else {
    if(isPaused2){
      audio4.play();
    }
  }
});


let c8;

const caseLevel8 = document.querySelector(".lv8");
caseLevel8.addEventListener("click", function(){
  if(levels[6].completed){   // == false  /// rajoute ca dans le if pour voir et créer le niveau
    // son click
    if(isPaused2){
      audio2.play();
    }
    instanceLv8();
    currentLevel = 7;
    levels[currentLevel].nbMouv =0;
    scoreDiv.textContent = levels[currentLevel].nbMouv;
    bestscore.textContent = levels[currentLevel].bestScore;
  } else {
    if(isPaused2){
      audio4.play();
    }
  }
});


let c9;

const caseLevel9 = document.querySelector(".lv9");
caseLevel9.addEventListener("click", function(){
  if(levels[7].completed){ // == false  /// rajoute ca dans le if pour voir et créer le niveau
    // son click
    if(isPaused2){
      audio2.play();
    }
    instanceLv9();
    currentLevel = 8;
    levels[currentLevel].nbMouv =0;
    scoreDiv.textContent = levels[currentLevel].nbMouv;
    bestscore.textContent = levels[currentLevel].bestScore;
  } else {
    if(isPaused2){
      audio4.play();
    }
  }
});



function instanceLv1(){
  //////////////////////////////////////////////////////////////////////
  ///////////////////////   lv1 placement initial   ////////////////////
  // Réinitalisation de la grille
  reinitialisationGrille(grild);
  // Placement de la voiture rouge sur la grille
  c = car(1,0,2);
  placementV(grild, c, 0,2);
  // Placement d'une voiture verticale
  cv1lv1 = car(2,1,2);
  placementV(grild, cv1lv1, 4,1);
  // Placement d'une voiture horizontale sur la grille
  ch1lv1 = car(3,0,2);
  placementV(grild, ch1lv1, 4,0);
  // Placement d'un camion vertical sur la grille
  ch2lv1 = car(4,1,3);
  placementV(grild, ch2lv1, 3,2);
  // Placement d'un camion horizontal sur la grille
  cv2lv1 = car(5,0,3);
  placementV(grild, cv2lv1, 0, 0);
  cv3lv1 = car(6,1,2);
  placementV(grild, cv3lv1, 5,1);
  ch3lv1 = car(7,0,2);
  placementV(grild, ch3lv1, 3,5);

  // level 1
  levels[0].numLV = 1;
  levels[0].nbCoupMin = 5;
  levels[0].vTab[0] = null;
  levels[0].vTab[1] = c;
  levels[0].vTab[2] = cv1lv1;
  levels[0].vTab[3] = ch1lv1;
  levels[0].vTab[4] = ch2lv1;
  levels[0].vTab[5] = cv2lv1;
  levels[0].vTab[6] = cv3lv1;
  levels[0].vTab[7] = ch3lv1;
}

function instanceLv2(){
  ////////////////////////////////////////////////////////////////////
  /////////////////////   lv2 placement initial   ////////////////////
  // Réinitalisation de la grille
  reinitialisationGrille(grild);
  // Placement de la voiture rouge sur la grille
  c2 = car(1,0,2);
  placementV(grild, c2, 0,2);

  levels[1].numLV = 2; 
  levels[1].vTab[0] = null;
  levels[1].vTab[1] = c2;
}

function instanceLv3(){
  ////////////////////////////////////////////////////////////////////
  /////////////////////   lv3 placement initial   ////////////////////
  // Réinitalisation de la grille
  reinitialisationGrille(grild);
  // Placement de la voiture rouge sur la grille
  c3 = car(1,0,2);
  placementV(grild, c3, 0,2);

  levels[2].numLV = 3; 
  levels[2].vTab[0] = null;
  levels[2].vTab[1] = c3;
}

function instanceLv4(){
  ////////////////////////////////////////////////////////////////////
  /////////////////////   lv4 placement initial   ////////////////////
  // Réinitalisation de la grille
  reinitialisationGrille(grild);
  // Placement de la voiture rouge sur la grille
  c4 = car(1,0,2);
  placementV(grild, c4, 0,2);

  levels[3].numLV = 4; 
  levels[3].vTab[0] = null;
  levels[3].vTab[1] = c4;
}

function instanceLv5(){
  ////////////////////////////////////////////////////////////////////
  /////////////////////   lv5 placement initial   ////////////////////
  // Réinitalisation de la grille
  reinitialisationGrille(grild);
  // Placement de la voiture rouge sur la grille
  c5 = car(1,0,2);
  placementV(grild, c5, 0,2);

  levels[4].numLV = 5; 
  levels[4].vTab[0] = null;
  levels[4].vTab[1] = c5;
}

function instanceLv6(){
  ////////////////////////////////////////////////////////////////////
  /////////////////////   lv6 placement initial   ////////////////////
  // Réinitalisation de la grille
  reinitialisationGrille(grild);
  // Placement de la voiture rouge sur la grille
  c6 = car(1,0,2);
  placementV(grild, c6, 0,2);

  levels[5].numLV = 6; 
  levels[5].vTab[0] = null;
  levels[5].vTab[1] = c6;
}

function instanceLv7(){
  ////////////////////////////////////////////////////////////////////
  /////////////////////   lv7 placement initial   ////////////////////
  // Réinitalisation de la grille
  reinitialisationGrille(grild);
  // Placement de la voiture rouge sur la grille
  c7 = car(1,0,2);
  placementV(grild, c7, 0,2);

  levels[6].numLV = 7; 
  levels[6].vTab[0] = null;
  levels[6].vTab[1] = c7;
}

function instanceLv8(){
  ////////////////////////////////////////////////////////////////////
  /////////////////////   lv8 placement initial   ////////////////////
  // Réinitalisation de la grille
  reinitialisationGrille(grild);
  // Placement de la voiture rouge sur la grille
  c8 = car(1,0,2);
  placementV(grild, c8, 0,2);

  levels[7].numLV = 8; 
  levels[7].vTab[0] = null;
  levels[7].vTab[1] = c8;
}

function instanceLv9(){
  ////////////////////////////////////////////////////////////////////
  /////////////////////   lv9 placement initial   ////////////////////
  // Réinitalisation de la grille
  reinitialisationGrille(grild);
  // Placement de la voiture rouge sur la grille
  c9 = car(1,0,2);
  placementV(grild, c9, 0,2);

  levels[8].numLV = 9; 
  levels[8].vTab[0] = null;
  levels[8].vTab[1] = c9;
}




// Initialisation (appelée au chargement du corps du document <body onload="init">)    
function init() {
  // instanciation de la variable globale contenant le contexte
  context = document.getElementById("cvs").getContext("2d");
  context.width = document.getElementById("cvs").width = ctxWidth;
  context.height = document.getElementById("cvs").height = ctxHeight;

  // 2 écouteurs pour le clavier (appui/relâchement d'une touche)
  document.addEventListener("keydown", captureAppuiToucheClavier)
  // on associe au document un écouteur d'événements souris
  canvas.addEventListener("click", captureClicSouris)
  // --> ces événements vont appeler les fonctions captureXYZ définies après.

  boucleDeJeu()
}


// Fontion "boucleDeJeu()", comme son nom l'indique, créer la boucle du jeu
function boucleDeJeu() {
  // mise à jour de l'état du jeu
  update(Date.now());  

  // affichage de l'état du jeu
  render();

  // rappel de la boucle de jeu 
  requestAnimationFrame(boucleDeJeu);
}


// Fonction "update", met à jour le jeu 
function update(d) {

  // refresh
  const ButtonRefresh = document.querySelector(".refresh");
  ButtonRefresh.addEventListener("click", Refreshective);
  function Refreshective(){
    // Réinitalisation de la grille
    switch(currentLevel){
      case 0:
        instanceLv1();
        levels[currentLevel].nbMouv =0;
        scoreDiv.textContent = levels[currentLevel].nbMouv;
      break;
      case 1:
        instanceLv2();
        levels[currentLevel].nbMouv =0;
        scoreDiv.textContent = levels[currentLevel].nbMouv;
      break;
      case 2:
        instanceLv3();
        levels[currentLevel].nbMouv =0;
        scoreDiv.textContent = levels[currentLevel].nbMouv;
      break;
      case 3:
        instanceLv4();
        levels[currentLevel].nbMouv =0;
        scoreDiv.textContent = levels[currentLevel].nbMouv;
      break;
      case 4:
        instanceLv5();
        levels[currentLevel].nbMouv =0;
        scoreDiv.textContent = levels[currentLevel].nbMouv;
      break;
      case 5:
        instanceLv6();
        levels[currentLevel].nbMouv =0;
        scoreDiv.textContent = levels[currentLevel].nbMouv;
      break;
      case 6:
        instanceLv7();
        levels[currentLevel].nbMouv =0;
        scoreDiv.textContent = levels[currentLevel].nbMouv;
      break;
      case 7:
        instanceLv8();
        levels[currentLevel].nbMouv =0;
        scoreDiv.textContent = levels[currentLevel].nbMouv;
      break;
      case 8:
        instanceLv9();
        levels[currentLevel].nbMouv =0;
        scoreDiv.textContent = levels[currentLevel].nbMouv;
      break;
    }
  }

  // gagne
  isWin(win);
} 






// Fonction réalisant le rendu de l'état du jeu
function render() {
  ///////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 1  ///////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  if(currentLevel==0){
    // effacement de l'écran
    context.clearRect(0, 0, context.width, context.height);
    // Affichage des véhicules
    // Voiture principale
    afficherCases(grild, c);
    // // voiture horizontale1
    afficherCases(grild, cv1lv1); 
    // // voiture verticale1
    afficherCases(grild, ch1lv1);
    // // camion horizontal
    afficherCases(grild, ch2lv1);
    // // camion vertical
    afficherCases(grild, cv2lv1);
    afficherCases(grild, cv3lv1);
    afficherCases(grild, ch3lv1);
  }


  ///////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 2  ///////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  if(currentLevel==1){
    // effacement de l'écran
    context.clearRect(0, 0, context.width, context.height);
    // Voiture principale  
    afficherCases(grild, c2);
  }


  ///////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 3  ///////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  if(currentLevel==2){
    // effacement de l'écran
    context.clearRect(0, 0, context.width, context.height);
    // Voiture principale  
    afficherCases(grild, c3);
  }


  ///////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 4  ///////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  if(currentLevel==3){
    // effacement de l'écran
    context.clearRect(0, 0, context.width, context.height);
    // Voiture principale  
    afficherCases(grild, c4);
  }
  

  ///////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 5  ///////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  if(currentLevel==4){
    // effacement de l'écran
    context.clearRect(0, 0, context.width, context.height);
    // Voiture principale  
    afficherCases(grild, c5);
  }
  

  ///////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 6  ///////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  if(currentLevel==5){
    // effacement de l'écran
    context.clearRect(0, 0, context.width, context.height);
    // Voiture principale  
    afficherCases(grild, c6);
  }
 

  ///////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 7  ///////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  
  if(currentLevel==6){
    // effacement de l'écran
    context.clearRect(0, 0, context.width, context.height);
    // Voiture principale  
    afficherCases(grild, c7);
  }


  ///////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 8  ///////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  if(currentLevel==7){
    // effacement de l'écran
    context.clearRect(0, 0, context.width, context.height);
    // Voiture principale  
    afficherCases(grild, c8);
  }
  

  ///////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 9  ///////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  if(currentLevel==8){
    // effacement de l'écran
    context.clearRect(0, 0, context.width, context.height);
    // Voiture principale  
    afficherCases(grild, c9);
  }
}








//fonction qui place les voitures dans la grille à partir d'une case i et j, qui est la première case du véhicule, entrée en paramètres
//elle verifie si i et j sont bien compris entre 0 et 5 et si on peut bien placer le vehicule a l'endroit souhaite 
function placementV(grild,car,i,j){
  //i et j sont correct
  if((i>=0 && i<=5)&&(j>=0 && j<=5)){
    for(let k=0;k<car.taille;k++){
      if(car.orient==0){
        grild[i+k][j]=car.numV;
      } else {
        grild[i][j+k]=car.numV;
      }
    }
  }
}

// Toujours la position de la première case du véhicule
function rechercheVehicule(grild, car){
  for(let i = 0; i<widthInBlocks; i++){ 
    for(let j = 0; j<widthInBlocks; j++){
      if (grild[i][j]==car.numV) {
        // if(car.numV == 1) console.log(i,j);  //retourne bien les positions (0,2)
        return newPos(i,j);
      }
    };
  };
}


// Fonction pour réinitialiser la grille de jeu lors d'un changement de niveau
function reinitialisationGrille(grild){
  for(let i =0; i<widthInBlocks; i++){
    grild[i]=Array(widthInBlocks);
    for(let j =0; j<widthInBlocks; j++){
      grild [i][j] = 0;
    };
  };
}



// affiche les autre cases
function afficherCases(grild, c){
  ind = rechercheVehicule(grild, c);
  // console.log(ind);

  // affichage voiture principale (affichage spéciale car elle est rouge)
  if(c.orient==0 && c.taille==2 && c.numV == 1){
    //affichage première case
    context.drawImage(redCarImage1, ind.i * blockSize, ind.j * blockSize, blockSize, blockSize);
    //affichage seconde case
    if (grild[ind.i+1][ind.j]==c.numV){
      ind.i=ind.i+1;
      context.drawImage(redCarImage2, ind.i * blockSize, ind.j * blockSize, blockSize, blockSize);
    }
  }
  // si horizontale de taille 2
  if(c.orient==0 && c.taille==2 && c.numV != 1){
    //affichage première case
    context.drawImage(blueCarImage1H, ind.i * blockSize, ind.j * blockSize, blockSize, blockSize);
    //affichage seconde case
    if (grild[ind.i+1][ind.j]==c.numV){
      ind.i=ind.i+1;
      context.drawImage(blueCarImage2H, ind.i * blockSize, ind.j * blockSize, blockSize, blockSize);
    }
  } else if (c.orient==1 && c.taille==2){ // si vertical de taille 2
    //affichage première case
    context.drawImage(blueCarImage1V, ind.i * blockSize, ind.j * blockSize, blockSize, blockSize);
    //affichage seconde case
    if (grild[ind.i][ind.j+1]==c.numV){
      ind.j=ind.j+1;
      context.drawImage(blueCarImage2V, ind.i * blockSize, ind.j * blockSize, blockSize, blockSize);
    }
  }
  if(c.orient==0 && c.taille==3){ //pour un camion horizontal
    //affichage première case
    context.drawImage(camion1H, ind.i * blockSize, ind.j * blockSize, blockSize, blockSize);
    //affichage seconde case
    if (grild[ind.i+1][ind.j]==c.numV){
      ind.i=ind.i+1;
      context.drawImage(camion2H, ind.i * blockSize, ind.j * blockSize, blockSize, blockSize);
    }
    //affichage troisième case
    if (grild[ind.i+1][ind.j]==c.numV){
      ind.i=ind.i+1;
      context.drawImage(camion3H, ind.i * blockSize, ind.j * blockSize, blockSize, blockSize);
    }
  }
  if(c.orient==1 && c.taille==3){ //pour un camion vertical
    //affichage première case
    context.drawImage(camion1V, ind.i * blockSize, ind.j * blockSize, blockSize, blockSize);
    //affichage seconde case
    if (grild[ind.i][ind.j+1]==c.numV){
      ind.j=ind.j+1;
      context.drawImage(camion2V, ind.i * blockSize, ind.j * blockSize, blockSize, blockSize);
    }
    //affichage troisième case
    if (grild[ind.i][ind.j+1]==c.numV){
      ind.j=ind.j+1;
      context.drawImage(camion3V, ind.i * blockSize, ind.j * blockSize, blockSize, blockSize);
    }
  }
}



//regarde si le déplacement est possible et déplacer la voiture
//beaucoup de repetitions donc a essayer d'opti
function deplacementV(grild, car,x , y){
  indv = rechercheVehicule(grild, car);
  let temp; // variable auxiliaire
  
  if (car.orient==0){
    //gauche
    if(x==-1 && y==0){
      //déplacement impossible vers la gauche impossible
      if((indv.i-1)<0||grild[indv.i-1][indv.j]!=0){
        return false;
      } else {
        //echanger la place de la voiture
        temp=grild[indv.i-1][indv.j];
        grild[indv.i-1][indv.j]=grild[indv.i+(car.taille-1)][indv.j];
        grild[indv.i+(car.taille-1)][indv.j]=temp;
        if(isPaused2){
          audio5.play();
        }
      }
    } 
    //droite
    if (x==1 && y==0){
      if((indv.i+car.taille)>=widthInBlocks||grild[indv.i+car.taille][indv.j]!=0){
        return false;
      } else {
        //echanger la place de la voiture
        temp=grild[indv.i][indv.j];
        grild[indv.i][indv.j]=grild[indv.i+car.taille][indv.j];
        grild[indv.i+car.taille][indv.j]=temp;
        if(isPaused2){
          audio5.play();
        }
      }
    }
  } else {
    //haut
    if(x==0 && y==-1){
      //déplacement vers le haut impossible
      if((indv.j-1)<0||grild[indv.i][indv.j-1]!=0){
        return false;
      } else {
        //échanger la place de la voiture
        temp=grild[indv.i][indv.j+(car.taille-1)];
        grild[indv.i][indv.j+(car.taille-1)]=grild[indv.i][indv.j-1];
        grild[indv.i][indv.j-1]=temp;
        if(isPaused2){
          audio5.play();
        }
      }
    } 
    //bas
    if(x==0 && y==1){
      if((indv.j+car.taille)>=heightInBlocks||grild[indv.i][indv.j+car.taille]!=0){
        return false;
      } else {
        temp=grild[indv.i][indv.j];
        grild[indv.i][indv.j]=grild[indv.i][indv.j+car.taille];
        grild[indv.i][indv.j+car.taille]=temp;
        if(isPaused2){
          audio5.play();
        }
      }
    }
  }
}



// affiche un écran modal lors de la victoire
function isWin(win){
  // il faudra peut etre faire une seconde fonction qui appelle celle-ci lorsque win=true
  // if(levels[currentLevel].vTab[1] == ){
  //   win = true;
  // }

  
  // Affichage de la fenettre modale de la victoire
  const modalWin = document.querySelector(".modalWin");
  if(win){
    // affiche la fenetre modale
    modalWin.style.display = "flex"; 
    // permet l'affichage du meilleur score
    if(levels[currentLevel].bestScore==null || levels[currentLevel].bestScore>levels[currentLevel].nbMouv){
      levels[currentLevel].bestScore = levels[currentLevel].nbMouv;
    }
    calculNbEtoile()
    levels[currentLevel].completed = true;

    // affichage cadenas
    switch(currentLevel){
      case 0:
        caseLevel2.classList.toggle("active");
      break;
      case 1:
        caseLevel3.classList.toggle("active");
      break;
      case 2:
        caseLevel4.classList.toggle("active");
      break;
      case 3:
        caseLevel5.classList.toggle("active");
      break;
      case 4:
        caseLevel6.classList.toggle("active");
      break;
      case 5:
        caseLevel7.classList.toggle("active");
      break;
      case 6:
        caseLevel8.classList.toggle("active");
      break;
      case 7:
        caseLevel9.classList.toggle("active");
      break;
      case 8:
        caseLevel9.classList.toggle("active");  // jeu fini lorsque lv9 fini
      break;
    }
  }
}

// fonction qui calcule et affiche de nombre d'étoiles à la fin d'une partie
function calculNbEtoile(){
  if(levels[currentLevel].nbCoupMin == levels[currentLevel].nbMouv){
    nbStars.textContent = "3/3";
  } else if((levels[currentLevel].nbCoupMin)*(3/2) > levels[currentLevel].nbMouv){
    nbStars.textContent = "2/3";
  } else {
    nbStars.textContent = "1/3";
  }
}


// Fonction appelée lorsqu'une touche du clavier est appuyée
// Associée à l'événement "keyDown"
function captureAppuiToucheClavier(event) {
  switch(event.code){
    case "ArrowRight":
      deplacementV(grild, bufferCar, 1, 0);
        break;
    case "ArrowLeft":
      deplacementV(grild, bufferCar, -1, 0);
          break;
    case "ArrowUp":
      deplacementV(grild, bufferCar, 0, -1);
        break;
    case "ArrowDown":
      deplacementV(grild, bufferCar, 0, 1);
        break;
  }
}



//Fonction appelée lorsque la sourie est appuyée
// Associée à l'événement "click"
function captureClicSouris(event) {
  // calcul des coordonnées de la souris dans le canvas + conversion des clic en entier i: ligne et j: colonne
  if (event.target.id == "cvs") {
    posClic.i = Math.floor(event.offsetX/(blockSize)); 
    posClic.j = Math.floor(event.offsetY/(blockSize));
  }
  selectVehicule();
}

function selectVehicule(){
  let valeurCase=grild[posClic.i][posClic.j];
  if(valeurCase!=0){
    //on regarde dans le tableau vehicule par level la voiture associée à la valeur de la case est on retourne la voiture
    bufferCar = levels[currentLevel].vTab[valeurCase];
    levels[currentLevel].nbMouv +=1;
    scoreDiv.textContent = levels[currentLevel].nbMouv;
    if(isPaused2){
      audio3.play();
    }
  }
}