// Jeu Rush-Hour, créé par Magnin Julie et Cuinet Antoine, page js






////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////   Récupérations des clics pour affichage des fenêtres modales   ////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Déclarations des audios
let isPaused = true;
let isPaused2 = true;
let loopTime = 94800; // temps de la musique afin de la faire tourner en boucle
let intervalId = null;
let auxMusic = Array(9); // son lorsqu'une partie est gagnée
let audio1 = new Audio();
let audio2 = new Audio();
let audio3 = new Audio();
let audio4 = new Audio();
let audio5 = new Audio();
let audio6 = new Audio();
audio1.src = 'musique.mp3';
audio2.src = 'click.mp3';
audio3.src = 'selection.wav';
audio4.src = 'falseSon.mp3';
audio5.src = 'deplacementSon.wav';
audio6.src = 'son6.wav';


// Bouton pour activer et désactiver le son
const buttonAudio2 = document.getElementById('buttonAudio2');
buttonAudio2.classList.toggle("active")
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

// Bouton pour activer et désactiver la musique
const buttonAudio = document.getElementById('buttonAudio');
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

// Bouton d'accueil (bouton "jouer")
const ButtonAccueil = document.querySelector(".buttonAccueil");
const accueuil = document.querySelector(".accueil");
ButtonAccueil.addEventListener("click", function(){
  if(isPaused2){
    audio2.play();
  }
});
// Affiche le jeu lorsque le bouton est cliqué
ButtonAccueil.addEventListener("click", acceuilActive);
function acceuilActive(){
    if (accueuil.style.display == "none") accueuil.style.display = "flex";
    else accueuil.style.display = "none";
}  

// Bouton des parametres de musiques
const ButtonParam = document.querySelector(".param");
const modal = document.querySelector(".modal");
ButtonParam.addEventListener("click", paramActive);
function paramActive(){
    if (modal.style.display == "flex") modal.style.display = "none";
    else modal.style.display = "flex";
}  
ButtonParam.addEventListener("click", function(){
  if(isPaused2){
    audio2.play();
  }
});

// Bonton refresh
const refresh = document.querySelector(".refresh");
refresh.addEventListener("click", function(){
  if(isPaused2){
    audio2.play();
  }
});

// Bouton d'affichage des levels
const ButtonLevels = document.querySelector(".levels");
const level = document.querySelector(".modal1");
ButtonLevels.addEventListener("click", levelsActive);
function levelsActive(){
    if (level.style.display == "flex") level.style.display = "none";
    else level.style.display = "flex";
}  
ButtonLevels.addEventListener("click", function(){
  if(isPaused2){
    audio2.play();
  }
});

// bouton et affichage de la page modale lors de la victoire
const modalWin = document.querySelector(".modalWin");
const buttonNext = document.getElementById('butonNextLevel');
buttonNext.addEventListener("click", buttonNextActive);
function buttonNextActive(){
  modalWin.style.display = "none";
  win = false; 
  winAux[currentLevel] = true;
  if(isPaused2){
    audio2.play();
  }
  // affichage cadenas
  switch(currentLevel){
    case 0:
      caseLevel2.classList.add("active");
    break;
    case 1:
      caseLevel3.classList.add("active");
    break;
    case 2:
      caseLevel4.classList.add("active");
    break;
    case 3:
      caseLevel5.classList.add("active");
    break;
    case 4:
      caseLevel6.classList.add("active");
    break;
    case 5:
      caseLevel7.classList.add("active");
    break;
    case 6:
      caseLevel8.classList.add("active");
    break;
    case 7:
      caseLevel9.classList.add("active");
    break;
    case 8:
      caseLevel9.classList.add("active");  // jeu fini lorsque lv9 fini
    break;
  }
  if (level.style.display == "flex") level.style.display = "none";
    else level.style.display = "flex"; 
} 


////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////   Déclaration des sprites   //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//voiture rouge : voiture principale
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


////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// Déclaration des variables, constantes et objets ///////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////


let canvas = document.getElementById("cvs");
// pour l'affichage du score actuel
const scoreDiv = document.getElementById("score");
// pour l'affichage du best score
const bestscore = document.getElementById("bestscore");
// pour l'affichage du nombre d'étoiles
const nbStars1 = document.getElementsByClassName("nbStars1");


// Dimensions du document et d'une case
var blockSize = 100;
var ctxWidth = 600;
var ctxHeight = 600;
var widthInBlocks = ctxWidth/blockSize;
var heightInBlocks = ctxHeight/blockSize;


// Déclaration des variables
let context = null;
let currentLevel = null;
let win=false;
let winAux = Array(9);

// tableau contenant les différents levels contenant des instances de lv 
let levels= Array(9);
for(let i =0; i<levels.length; i++){
  levels[i]= {numLV :null, nbCoupMin:null, vTab:Array(), nbMouv:0, bestScore:null, stars:null, completed:false};
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

//variable retenant le véhicule sélectionné après le clic 
let bufferCar = null; 


// objet position
function newPos(i, j){
  return {i, j};
}

let posClic = newPos(0, 0);



////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////   initialisations des levels   /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//déclaration des variables du level 1
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
  winAux[currentLevel] = false;
  auxMusic[currentLevel] = true;
  levels[currentLevel].nbMouv =0;
  afficherEtoiles(currentLevel);
  scoreDiv.textContent = levels[currentLevel].nbMouv;
  bestscore.textContent = levels[currentLevel].bestScore;
});

//déclaration des variables du level 2
let c2;  
let cv1lv2;
let cv2lv2;
let ch1lv2;
let ch2lv2;
let ch3lv2;


const caseLevel2 = document.querySelector(".lv2");
caseLevel2.addEventListener("click", function(){
  if(levels[0].completed){  
    // son click
    if(isPaused2){
      audio2.play();
    }
    instanceLv2();
    currentLevel = 1;
    winAux[currentLevel] = false;
    auxMusic[currentLevel] = true;
    levels[currentLevel].nbMouv =0;
    afficherEtoiles(currentLevel);
    scoreDiv.textContent = levels[currentLevel].nbMouv;
    bestscore.textContent = levels[currentLevel].bestScore;
  } else {
    if(isPaused2){
      audio4.play();
    }
  }
});

//déclaration des variables du level 3
let c3;
let cv1lv3;
let cv2lv3;
let cv3lv3;
let cv4lv3
let ch1lv3;
let ch2lv3;
let ch3lv3;
let ch4lv3;

const caseLevel3 = document.querySelector(".lv3");
caseLevel3.addEventListener("click", function(){
  if(levels[1].completed){   
    // son click
    if(isPaused2){
      audio2.play();
    }
    instanceLv3();
    currentLevel = 2;
    winAux[currentLevel] = false;
    auxMusic[currentLevel] = true;
    levels[currentLevel].nbMouv =0;
    afficherEtoiles(currentLevel);
    scoreDiv.textContent = levels[currentLevel].nbMouv;
    bestscore.textContent = levels[currentLevel].bestScore;
  } else {
    if(isPaused2){
      audio4.play();
    }
  }
});

//déclaration des variables du level 4
let c4;
let cv1lv4;
let cv2lv4;
let cv3lv4;
let cv4lv4;
let cv5lv4;
let ch1lv4;
let ch2lv4;

const caseLevel4 = document.querySelector(".lv4");
caseLevel4.addEventListener("click", function(){
  if(levels[2].completed){   
    // son click
    if(isPaused2){
      audio2.play();
    }
    instanceLv4();
    currentLevel = 3;
    winAux[currentLevel] = false;
    auxMusic[currentLevel] = true;
    levels[currentLevel].nbMouv =0;
    afficherEtoiles(currentLevel);
    scoreDiv.textContent = levels[currentLevel].nbMouv;
    bestscore.textContent = levels[currentLevel].bestScore;
  } else {
    if(isPaused2){
      audio4.play();
    }
  }
});

//déclaration des variables du level 5
let c5;
let cv1lv5;
let cv2lv5;
let cv3lv5;
let cv4lv5;
let ch1lv5;
let ch2lv5;
let ch3lv5;

const caseLevel5 = document.querySelector(".lv5");
caseLevel5.addEventListener("click", function(){
  if(levels[3].completed){   
    // son click
    if(isPaused2){
      audio2.play();
    }
    instanceLv5();
    currentLevel = 4;
    winAux[currentLevel] = false;
    auxMusic[currentLevel] = true;
    levels[currentLevel].nbMouv =0;
    afficherEtoiles(currentLevel);
    scoreDiv.textContent = levels[currentLevel].nbMouv;
    bestscore.textContent = levels[currentLevel].bestScore;
  } else {
    if(isPaused2){
      audio4.play();
    }
  }
});

//déclaration des variables du level 6
let c6;
let cv1lv6;
let cv2lv6;
let cv3lv6;
let cv4lv6;
let cv5lv6;
let ch1lv6;
let ch2lv6;
let ch3lv6;

const caseLevel6 = document.querySelector(".lv6");
caseLevel6.addEventListener("click", function(){
  if(levels[4].completed){   
    // son click
    if(isPaused2){
      audio2.play();
    }
    instanceLv6();
    currentLevel = 5;
    winAux[currentLevel] = false;
    auxMusic[currentLevel] = true;
    levels[currentLevel].nbMouv =0;
    afficherEtoiles(currentLevel);
    scoreDiv.textContent = levels[currentLevel].nbMouv;
    bestscore.textContent = levels[currentLevel].bestScore;
  } else {
    if(isPaused2){
      audio4.play();
    }
  }
});

//déclaration des variables du level 7
let c7;
let cv1lv7;
let cv2lv7;
let cv3lv7;
let cv4lv7;
let cv5lv7;
let cv6lv7;
let cv7lv7;
let ch1lv7;
let ch2lv7;
let ch3lv7;
let ch4lv7;

const caseLevel7 = document.querySelector(".lv7");
caseLevel7.addEventListener("click", function(){
  if(levels[5].completed){   
    // son click
    if(isPaused2){
      audio2.play();
    }
    instanceLv7();
    currentLevel = 6;
    winAux[currentLevel] = false;
    auxMusic[currentLevel] = true;
    levels[currentLevel].nbMouv =0;
    afficherEtoiles(currentLevel);
    scoreDiv.textContent = levels[currentLevel].nbMouv;
    bestscore.textContent = levels[currentLevel].bestScore;
  } else {
    if(isPaused2){
      audio4.play();
    }
  }
});

//déclaration des variables du level 8
let c8;
let cv1lv8;
let cv2lv8;
let cv3lv8;
let cv4lv8;
let cv5lv8;
let cv6lv8;
let ch1lv8;
let ch2lv8;
let ch3lv8;

const caseLevel8 = document.querySelector(".lv8");
caseLevel8.addEventListener("click", function(){
  if(levels[6].completed){   
    // son click
    if(isPaused2){
      audio2.play();
    }
    instanceLv8();
    currentLevel = 7;
    winAux[currentLevel] = false;
    auxMusic[currentLevel] = true;
    levels[currentLevel].nbMouv =0;
    afficherEtoiles(currentLevel);
    scoreDiv.textContent = levels[currentLevel].nbMouv;
    bestscore.textContent = levels[currentLevel].bestScore;
  } else {
    if(isPaused2){
      audio4.play();
    }
  }
});

//déclaration des variables du level 9
let c9;
let cv1lv9;
let cv2lv9;
let cv3lv9;
let cv4lv9;
let cv5lv9;
let cv6lv9;
let ch1lv9;
let ch2lv9;
let ch3lv9;
let ch4lv9;

const caseLevel9 = document.querySelector(".lv9");
caseLevel9.addEventListener("click", function(){
  if(levels[7].completed){ 
    // son click
    if(isPaused2){
      audio2.play();
    }
    instanceLv9();
    currentLevel = 8;
    winAux[currentLevel] = false;
    auxMusic[currentLevel] = true;
    levels[currentLevel].nbMouv =0;
    afficherEtoiles(currentLevel);
    scoreDiv.textContent = levels[currentLevel].nbMouv;
    bestscore.textContent = levels[currentLevel].bestScore;
  } else {
    if(isPaused2){
      audio4.play();
    }
  }
});


//////////////////////////////////////////////////////////////////////////////
///////////////////////////  Instance des levels  ////////////////////////////
//////////////////////////////////////////////////////////////////////////////


function instanceLv1(){
  //////////////////////////////////////////////////////////////////////
  ///////////////////////   lv1 placement initial   ////////////////////
  // Réinitalisation de la grille
  reinitialisationGrille(grild);
  // Placement de la voiture rouge sur la grille
  c = car(1,0,2);
  placementV(grild, c, 0,2);
  // Placement des autres véhicules 
  cv1lv1 = car(2,1,2);
  placementV(grild, cv1lv1, 4,1);
  ch1lv1 = car(3,0,2);
  placementV(grild, ch1lv1, 4,0);
  ch2lv1 = car(4,1,3);
  placementV(grild, ch2lv1, 3,2);
  cv2lv1 = car(5,0,3);
  placementV(grild, cv2lv1, 0, 0);
  cv3lv1 = car(6,1,2);
  placementV(grild, cv3lv1, 5,1);
  ch3lv1 = car(7,0,2);
  placementV(grild, ch3lv1, 3,5);

  // initialisation du tableau de véhicules du level 1
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
  // Placement des autres véhicules 
  cv1lv2 = car(2,1,2);
  placementV(grild,cv1lv2,5,1);
  cv2lv2 = car(3,1,3);
  placementV(grild,cv2lv2,2,2);
  ch1lv2 = car(4,0,2);
  placementV(grild,ch1lv2,0,0);
  ch2lv2 = car(5,0,3);
  placementV(grild, ch2lv2,3,0);
  ch3lv2 = car(6,0,2);
  placementV(grild, ch3lv2,4,3);

  // initialisation du tableau de véhicules du level 2
  levels[1].numLV = 2; 
  levels[1].nbCoupMin=4;
  levels[1].vTab[0] = null;
  levels[1].vTab[1] = c2;
  levels[1].vTab[2] = cv1lv2;
  levels[1].vTab[3] = cv2lv2;
  levels[1].vTab[4] = ch1lv2;
  levels[1].vTab[5] = ch2lv2;
  levels[1].vTab[6] = ch3lv2;
}

function instanceLv3(){
  ////////////////////////////////////////////////////////////////////
  /////////////////////   lv3 placement initial   ////////////////////
  // Réinitalisation de la grille
  reinitialisationGrille(grild);
  // Placement de la voiture rouge sur la grille
  c3 = car(1,0,2);
  placementV(grild, c3, 0,2);
  // Placement des autres véhicules 
  cv1lv3 = car(2,1,2);
  placementV(grild,cv1lv3,1,0);
  cv2lv3 = car(3,1,3);
  placementV(grild, cv2lv3,5,0);
  cv3lv3 = car(4,1,2);
  placementV(grild, cv3lv3,3,2);
  cv4lv3 = car(5,1,2);
  placementV(grild, cv4lv3,4,4);
  ch1lv3 = car(6,0,3);
  placementV(grild,ch1lv3,2,0);
  ch2lv3 = car(7,0,2);
  placementV(grild,ch2lv3,3,1);
  ch3lv3 = car(8,0,2);
  placementV(grild, ch3lv3,4,3);
  ch4lv3 = car(9,0,3);
  placementV(grild, ch4lv3,1,4);

  // initialisation du tableau de véhicules du level 3
  levels[2].numLV = 3; 
  levels[2].nbCoupMin = 5;
  levels[2].vTab[0] = null;
  levels[2].vTab[1] = c3;
  levels[2].vTab[2] = cv1lv3;
  levels[2].vTab[3] = cv2lv3;
  levels[2].vTab[4] = cv3lv3;
  levels[2].vTab[5] = cv4lv3;
  levels[2].vTab[6] = ch1lv3;
  levels[2].vTab[7] = ch2lv3;
  levels[2].vTab[8] = ch3lv3;
  levels[2].vTab[9] = ch4lv3;
}

function instanceLv4(){
  ////////////////////////////////////////////////////////////////////
  /////////////////////   lv4 placement initial   ////////////////////
  // Réinitalisation de la grille
  reinitialisationGrille(grild);
  // Placement de la voiture rouge sur la grille
  c4 = car(1,0,2);
  placementV(grild, c4, 0,2);
  // Placement des autres véhicules 
  cv1lv4 = car(2,1,2);
  placementV(grild,cv1lv4,1,0);
  cv2lv4 = car(3,1,3);
  placementV(grild,cv2lv4,5,0);
  cv3lv4 = car(4,1,2);
  placementV(grild,cv3lv4,0,4);
  cv4lv4 = car(5,1,2);
  placementV(grild,cv4lv4,2,4);
  cv5lv4 = car(6,1,3);
  placementV(grild,cv5lv4,3,3);
  ch1lv4 = car(7,0,2);
  placementV(grild,ch1lv4,3,0);
  ch2lv4 = car(8,0,2);
  placementV(grild,ch2lv4,4,5);

  // initialisation du tableau de véhicules du level 4
  levels[3].numLV = 4; 
  levels[3].nbCoupMin = 6;
  levels[3].vTab[0] = null;
  levels[3].vTab[1] = c4;
  levels[3].vTab[2] = cv1lv4;
  levels[3].vTab[3] = cv2lv4;
  levels[3].vTab[4] = cv3lv4;
  levels[3].vTab[5] = cv4lv4;
  levels[3].vTab[6] = cv5lv4;
  levels[3].vTab[7] = ch1lv4;
  levels[3].vTab[8] = ch2lv4;
  

}

function instanceLv5(){
  ////////////////////////////////////////////////////////////////////
  /////////////////////   lv5 placement initial   ////////////////////
  // Réinitalisation de la grille
  reinitialisationGrille(grild);
  // Placement de la voiture rouge sur la grille
  c5 = car(1,0,2);
  placementV(grild, c5, 0,2);
  // Placement des autres véhicules 
  cv1lv5 = car(2,1,3);
  placementV(grild,cv1lv5,5,0);
  cv2lv5 = car(3,1,2);
  placementV(grild,cv2lv5,0,4);
  cv3lv5 = car(4,1,2);
  placementV(grild,cv3lv5,2,3);
  cv4lv5 = car(5,1,3);
  placementV(grild,cv4lv5,3,3);
  ch1lv5 = car(6,0,2);
  placementV(grild,ch1lv5,2,0);
  ch2lv5 = car(7,0,2);
  placementV(grild,ch2lv5,4,3);
  ch3lv5 = car(8,0,2);
  placementV(grild,ch3lv5,4,5);

  // initialisation du tableau de véhicules du level 5
  levels[4].numLV = 5; 
  levels[4].nbCoupMin = 9;
  levels[4].vTab[0] = null;
  levels[4].vTab[1] = c5;
  levels[4].vTab[2] = cv1lv5;
  levels[4].vTab[3] = cv2lv5;
  levels[4].vTab[4] = cv3lv5;
  levels[4].vTab[5] = cv4lv5;
  levels[4].vTab[6] = ch1lv5;
  levels[4].vTab[7] = ch2lv5;
  levels[4].vTab[8] = ch3lv5;
}

function instanceLv6(){
  ////////////////////////////////////////////////////////////////////
  /////////////////////   lv6 placement initial   ////////////////////
  // Réinitalisation de la grille
  reinitialisationGrille(grild);
  // Placement de la voiture rouge sur la grille
  c6 = car(1,0,2);
  placementV(grild, c6, 0,2);
  // Placement des autres véhicules 
  cv1lv6 = car(2,1,2);
  placementV(grild,cv1lv6,2,0);
  cv2lv6 = car(3,1,2);
  placementV(grild,cv2lv6,2,2);
  cv3lv6 = car(4,1,3);
  placementV(grild,cv3lv6,3,1);
  cv4lv6 = car(5,1,3);
  placementV(grild,cv4lv6,5,1);
  cv5lv6 = car(6,1,2);
  placementV(grild,cv5lv6,0,4);
  ch1lv6 = car(7,0,2);
  placementV(grild,ch1lv6,4,0);
  ch2lv6 = car(8,0,2);
  placementV(grild,ch2lv6,2,4);
  ch3lv6 = car(9,0,3);
  placementV(grild,ch3lv6,3,5);
  
  // initialisation du tableau de véhicules du level 6
  levels[5].numLV = 6; 
  levels[5].nbCoupMin = 12;
  levels[5].vTab[0] = null;
  levels[5].vTab[1] = c6;
  levels[5].vTab[2] = cv1lv6;
  levels[5].vTab[3] = cv2lv6;
  levels[5].vTab[4] = cv3lv6;
  levels[5].vTab[5] = cv4lv6;
  levels[5].vTab[6] = cv5lv6;
  levels[5].vTab[7] = ch1lv6;
  levels[5].vTab[8] = ch2lv6;
  levels[5].vTab[9] = ch3lv6;
}

function instanceLv7(){
  ////////////////////////////////////////////////////////////////////
  /////////////////////   lv7 placement initial   ////////////////////
  // Réinitalisation de la grille
  reinitialisationGrille(grild);
  // Placement de la voiture rouge sur la grille
  c7 = car(1,0,2);
  placementV(grild,c7, 0,2);
  // Placement des autres véhicules 
  cv1lv7 = car(2,1,2);
  placementV(grild,cv1lv7,1,0);
  cv2lv7 = car(3,1,2);
  placementV(grild,cv2lv7,5,1);
  cv3lv7 = car(4,1,3);
  placementV(grild,cv3lv7,4,2);
  cv4lv7 = car(5,1,2);
  placementV(grild,cv4lv7,1,3);
  cv5lv7 = car(6,1,2);
  placementV(grild,cv5lv7,2,3);
  cv6lv7 = car(7,1,3);
  placementV(grild,cv6lv7,3,3);
  cv7lv7 = car(8,1,2);
  placementV(grild,cv7lv7,5,3);
  ch1lv7 = car(9,0,2);
  placementV(grild,ch1lv7,2,0);
  ch2lv7 = car(10,0,2);
  placementV(grild,ch2lv7,4,0);
  ch3lv7 = car(11,0,2);
  placementV(grild,ch3lv7,3,1);
  ch4lv7 = car(12,0,2);
  placementV(grild,ch4lv7,4,5);

  // initialisation du tableau de véhicules du level 7
  levels[6].numLV = 7; 
  levels[6].nbCoupMin = 10;
  levels[6].vTab[0] = null;
  levels[6].vTab[1] = c7;
  levels[6].vTab[2] = cv1lv7;
  levels[6].vTab[3] = cv2lv7;
  levels[6].vTab[4] = cv3lv7;
  levels[6].vTab[5] = cv4lv7;
  levels[6].vTab[6] = cv5lv7;
  levels[6].vTab[7] = cv6lv7;
  levels[6].vTab[8] = cv7lv7;
  levels[6].vTab[9] = ch1lv7;
  levels[6].vTab[10] = ch2lv7;
  levels[6].vTab[11] = ch3lv7;
  levels[6].vTab[12] = ch4lv7;
}

function instanceLv8(){
  ////////////////////////////////////////////////////////////////////
  /////////////////////   lv8 placement initial   ////////////////////
  // Réinitalisation de la grille
  reinitialisationGrille(grild);
  // Placement de la voiture rouge sur la grille
  c8 = car(1,0,2);
  placementV(grild,c8, 0,2);
  // Placement des autres véhicules 
  cv1lv8 = car(2,1,2);
  placementV(grild,cv1lv8,2,0);
  cv2lv8 = car(3,1,3);
  placementV(grild,cv2lv8,3,1);
  cv3lv8 = car(4,1,2);
  placementV(grild,cv3lv8,4,1);
  cv4lv8 = car(5,1,2);
  placementV(grild,cv4lv8,5,1);
  cv5lv8 = car(6,1,2);
  placementV(grild,cv5lv8,4,3);
  cv6lv8 = car(7,1,2);
  placementV(grild,cv6lv8,0,4);
  ch1lv8 = car(8,0,3);
  placementV(grild,ch1lv8,3,0);
  ch2lv8 = car(9,0,3);
  placementV(grild,ch2lv8,0,3);
  ch3lv8 = car(10,0,2);
  placementV(grild, ch3lv8,3,5);
  
  // initialisation du tableau de véhicules du level 8
  levels[7].numLV = 8; 
  levels[7].nbCoupMin = 16;
  levels[7].vTab[0] = null;
  levels[7].vTab[1] = c8;
  levels[7].vTab[2] = cv1lv8;
  levels[7].vTab[3] = cv2lv8;
  levels[7].vTab[4] = cv3lv8;
  levels[7].vTab[5] = cv4lv8;
  levels[7].vTab[6] = cv5lv8;
  levels[7].vTab[7] = cv6lv8;
  levels[7].vTab[8] = ch1lv8;
  levels[7].vTab[9] = ch2lv8;
  levels[7].vTab[10] = ch3lv8;
}

function instanceLv9(){
  ////////////////////////////////////////////////////////////////////
  /////////////////////   lv9 placement initial   ////////////////////
  // Réinitalisation de la grille
  reinitialisationGrille(grild);
  // Placement de la voiture rouge sur la grille
  c9 = car(1,0,2);
  placementV(grild, c9, 0,2);
  // Placement des autres véhicules 
  cv1lv9 = car(2,1,2);
  placementV(grild,cv1lv9,0,0);
  cv2lv9 = car(3,1,3);
  placementV(grild,cv2lv9,5,0);
  cv3lv9 = car(4,1,3);
  placementV(grild,cv3lv9,2,1);
  cv4lv9 = car(5,1,2);
  placementV(grild,cv4lv9,3,1);
  cv5lv9 = car(6,1,2);
  placementV(grild,cv5lv9,3,3);
  cv6lv9 = car(7,1,2);
  placementV(grild,cv6lv9,4,4);
  ch1lv9 = car(8,0,3);
  placementV(grild,ch1lv9,1,0);
  ch2lv9 = car(9,0,2);
  placementV(grild,ch2lv9,4,3);
  ch3lv9 = car(10,0,2);
  placementV(grild,ch3lv9,1,4);
  ch4lv9 = car(11,0,3);
  placementV(grild,ch4lv9,1,5);

  // initialisation du tableau de véhicules du level 9
  levels[8].numLV = 9; 
  levels[8].nbCoupMin = 21;
  levels[8].vTab[0] = null;
  levels[8].vTab[1] = c9;
  levels[8].vTab[2] = cv1lv9;
  levels[8].vTab[3] = cv2lv9;
  levels[8].vTab[4] = cv3lv9;
  levels[8].vTab[5] = cv4lv9;
  levels[8].vTab[6] = cv5lv9;
  levels[8].vTab[7] = cv6lv9;
  levels[8].vTab[8] = ch1lv9;
  levels[8].vTab[9] = ch2lv9;
  levels[8].vTab[10] = ch3lv9;
  levels[8].vTab[11] = ch4lv9;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////   Fonctions d'initialisations du jeu   //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
  ButtonRefresh.addEventListener("click", Refreshactive);
  function Refreshactive(){
    // Réinitialisation de la grille
    switch(currentLevel){
      case 0:
        instanceLv1();
        remiseAZero();
      break;
      case 1:
        instanceLv2();
        remiseAZero();
      break;
      case 2:
        instanceLv3();
        remiseAZero();
      break;
      case 3:
        instanceLv4();
        remiseAZero();
      break;
      case 4:
        instanceLv5();
        remiseAZero();
      break;
      case 5:
        instanceLv6();
        remiseAZero();
      break;
      case 6:
        instanceLv7();
        remiseAZero();
      break;
      case 7:
        instanceLv8();
        remiseAZero();
      break;
      case 8:
        instanceLv9();
        remiseAZero();
      break;
    }
  }
  // fonction qui vérifie si le joueur à gagner à chaque passage dans la boucle 
  isWin();
} 



// Fonction réalisant le rendu de l'état du jeu en fonction du niveau choisi
function render() {
  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 1  //////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
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


  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 2  //////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  if(currentLevel==1){
    // effacement de l'écran
    context.clearRect(0, 0, context.width, context.height);
    // Voiture principale  
    afficherCases(grild, c2);
    //voiture verticale
    afficherCases(grild,cv1lv2);
    //voiture horizontale
    afficherCases(grild,ch1lv2);
    afficherCases(grild,ch3lv2);
    //camion vertical
    afficherCases(grild,cv2lv2);
    //camion horizontal
    afficherCases(grild, ch2lv2);
    
  }


  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 3  //////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  if(currentLevel==2){
    // effacement de l'écran
    context.clearRect(0, 0, context.width, context.height);
    // Voiture principale  
    afficherCases(grild, c3);
    //voiture verticale
    afficherCases(grild,cv1lv3);
    afficherCases(grild,cv3lv3);
    afficherCases(grild,cv4lv3);
    //voiture horizontale
    afficherCases(grild,ch2lv3);
    afficherCases(grild,ch3lv3);
    //camion vertical
    afficherCases(grild,cv2lv3);
    //camion horizontal
    afficherCases(grild,ch1lv3);
    afficherCases(grild,ch4lv3);
  }


  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 4  //////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  if(currentLevel==3){
    // effacement de l'écran
    context.clearRect(0, 0, context.width, context.height);
    // Voiture principale  
    afficherCases(grild, c4);
    //voiture verticale
    afficherCases(grild,cv1lv4);
    afficherCases(grild,cv3lv4);
    afficherCases(grild,cv4lv4);
    //voiture horizontale
    afficherCases(grild,ch1lv4);
    afficherCases(grild,ch2lv4);
    //camion vertical 
    afficherCases(grild,cv2lv4);
    afficherCases(grild,cv5lv4);

  }
  

  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 5  //////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  if(currentLevel==4){
    // effacement de l'écran
    context.clearRect(0, 0, context.width, context.height);
    // Voiture principale  
    afficherCases(grild, c5);
    //voiture verticale
    afficherCases(grild,cv2lv5);
    afficherCases(grild,cv3lv5);
    //voiture horizontale
    afficherCases(grild,ch1lv5);
    afficherCases(grild,ch2lv5);
    afficherCases(grild,ch3lv5);
    //camion vertical 
    afficherCases(grild,cv1lv5);
    afficherCases(grild,cv4lv5);
  
  }
  

  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 6  //////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  if(currentLevel==5){
    // effacement de l'écran
    context.clearRect(0, 0, context.width, context.height);
    // Voiture principale  
    afficherCases(grild, c6);
    //voiture verticale
    afficherCases(grild,cv1lv6);
    afficherCases(grild,cv2lv6);
    afficherCases(grild,cv5lv6);
    //voiture horizontale
    afficherCases(grild,ch1lv6);
    afficherCases(grild,ch2lv6);
    //camion vertical 
    afficherCases(grild,cv3lv6);
    afficherCases(grild,cv4lv6);
    //camion horizontal
    afficherCases(grild,ch3lv6);
  }
 

  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 7  //////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  
  if(currentLevel==6){
    // effacement de l'écran
    context.clearRect(0, 0, context.width, context.height);
    // Voiture principale  
    afficherCases(grild, c7);
    //voiture verticale
    afficherCases(grild,cv1lv7);
    afficherCases(grild,cv2lv7);
    afficherCases(grild,cv4lv7);
    afficherCases(grild,cv5lv7);
    afficherCases(grild,cv7lv7);
    //voiture horizontale
    afficherCases(grild,ch1lv7);
    afficherCases(grild,ch2lv7);
    afficherCases(grild,ch3lv7);
    afficherCases(grild,ch4lv7);
    //camion vertical 
    afficherCases(grild,cv3lv7);
    afficherCases(grild,cv6lv7);
  }


  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 8  //////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  if(currentLevel==7){
    // effacement de l'écran
    context.clearRect(0, 0, context.width, context.height);
    // Voiture principale  
    afficherCases(grild, c8);
    //voiture verticale
    afficherCases(grild,cv1lv8);
    afficherCases(grild,cv3lv8);
    afficherCases(grild,cv4lv8);
    afficherCases(grild,cv5lv8);
    afficherCases(grild,cv6lv8);
    //voiture horizontale
    afficherCases(grild,ch3lv8);
    //camion vertical 
    afficherCases(grild,cv2lv8);
    //camion horizontal
    afficherCases(grild,ch1lv8);
    afficherCases(grild,ch2lv8);
  }
  

  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 9  //////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  if(currentLevel==8){
    // effacement de l'écran
    context.clearRect(0, 0, context.width, context.height);
    // Voiture principale  
    afficherCases(grild, c9);
    //voiture verticale
    afficherCases(grild,cv1lv9);
    afficherCases(grild,cv4lv9);
    afficherCases(grild,cv5lv9);
    afficherCases(grild,cv6lv9);
    //voiture horizontale
    afficherCases(grild,ch3lv9);
    afficherCases(grild,ch2lv9);
    //camion vertical 
    afficherCases(grild,cv2lv9);
    afficherCases(grild,cv3lv9);
    //camion horizontal
    afficherCases(grild,ch1lv9);
    afficherCases(grild,ch4lv9);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////   Fonctions utiles   ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//fonction de remise à zéro 
function remiseAZero(){
  levels[currentLevel].nbMouv =0;
  scoreDiv.textContent = levels[currentLevel].nbMouv;
}

//fonction qui place un véhicule dans la grille à partir d'une case définie par i et j, 
// correspondant à la première case du véhicule. 
function placementV(grild,car,i,j){
  //verification de i et de j 
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

//fonction qui retourne la position i et j de la première case d'un véhicule 
function rechercheVehicule(grild, car){
  for(let i = 0; i<widthInBlocks; i++){ 
    for(let j = 0; j<widthInBlocks; j++){
      if (grild[i][j]==car.numV) {
        return newPos(i,j);
      }
    };
  };
}

//fonction qui réinitialise la grille de jeu lors d'un changement de niveau
function reinitialisationGrille(grild){
  for(let i =0; i<widthInBlocks; i++){
    grild[i]=Array(widthInBlocks);
    for(let j =0; j<widthInBlocks; j++){
      grild [i][j] = 0;
    };
  };
}

//fonction d'affichage des véhicules : utilisation de sprites
function afficherCases(grild, c){
  ind = rechercheVehicule(grild, c);

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

//Fonction de déplacement d'une voiture dans la grille à partir de vecteur directionnel (x,y)
// (défini en fonction de l'appui des flèches du clavier)
//La fonction regarde si le déplacement est possible et dans ce cas, 
// elle déplace le véhicule dans la grille
function deplacementV(grild, car,x , y){
  indv = rechercheVehicule(grild, car);
  let temp; 
  
  if (car.orient==0){
    //fleche gauche
    if(x==-1 && y==0){
      if((indv.i-1)<0||grild[indv.i-1][indv.j]!=0){
        return false;
      } else {
        temp=grild[indv.i-1][indv.j];
        grild[indv.i-1][indv.j]=grild[indv.i+(car.taille-1)][indv.j];
        grild[indv.i+(car.taille-1)][indv.j]=temp;
        if(isPaused2){
          audio5.play();
        }
      }
    } 
    //fleche droite
    if (x==1 && y==0){
      if((indv.i+car.taille)>=widthInBlocks||grild[indv.i+car.taille][indv.j]!=0){
        return false;
      } else {
        temp=grild[indv.i][indv.j];
        grild[indv.i][indv.j]=grild[indv.i+car.taille][indv.j];
        grild[indv.i+car.taille][indv.j]=temp;
        if(isPaused2){
          audio5.play();
        }
      }
    }
  } else {
    //fleche haut
    if(x==0 && y==-1){
      if((indv.j-1)<0||grild[indv.i][indv.j-1]!=0){
        return false;
      } else {
        temp=grild[indv.i][indv.j+(car.taille-1)];
        grild[indv.i][indv.j+(car.taille-1)]=grild[indv.i][indv.j-1];
        grild[indv.i][indv.j-1]=temp;
        if(isPaused2){
          audio5.play();
        }
      }
    } 
    //fleche bas
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

// Fonction qui détermine quand le joueur à gagner
// Le joueur gagne lorsque la voiture est sur la case devant la sortie  
//    affiche un écran modal lors de la victoire
function isWin(){
  // Affichage de la fenetre modale de la victoire
  if(win){
    // Affiche la fenetre modale
    modalWin.style.display = "flex"; 
    // Permet l'affichage du meilleur score
    if(levels[currentLevel].bestScore==null || levels[currentLevel].bestScore>levels[currentLevel].nbMouv){
      levels[currentLevel].bestScore = levels[currentLevel].nbMouv;
    }
    levels[currentLevel].completed = true; 
    bestscore.textContent = levels[currentLevel].bestScore;
    calculNbEtoile();
    afficherEtoiles(currentLevel);
  }
  if(grild[5][2] == 1 && winAux[currentLevel] == false){ 
    win = true;
    if(isPaused2 && auxMusic[currentLevel]){ 
      audio6.play();
      auxMusic[currentLevel] = false;
    }
  }
}

// Fonction qui calcule et affiche le nombre d'étoiles à la fin d'une partie
function calculNbEtoile(){
  if(levels[currentLevel].nbCoupMin >= levels[currentLevel].nbMouv){
    levels[currentLevel].stars = 3;
    afficherEtoiles(currentLevel);
  } else if((levels[currentLevel].nbCoupMin)*(3/2) > levels[currentLevel].nbMouv){
    levels[currentLevel].stars = 2;
    afficherEtoiles(currentLevel);
  } else {
    levels[currentLevel].stars = 1;
    afficherEtoiles(currentLevel);
  }
}

//fonction qui affiche les étoiles lorsqu'un level est terminé
function afficherEtoiles(currentLevel){
  for(let i = 0; i < nbStars1.length; i++){
    switch(levels[currentLevel].stars){
      case 1:
        nbStars1[i].src = "sprite1Etoile.png";
      break;
      case 2:
        nbStars1[i].src = "sprite2Etoile.png";
      break;
      case 3:
        nbStars1[i].src = "sprite3Etoile.png";
      break;
      default:
        nbStars1[i].src = "";
    }
  }
}

// Fonction appelée lorsqu'une touche du clavier est appuyée
//    associée à l'événement "keyDown"
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

// Fonction appelée lorsque la souris est appuyée
//    associée à l'événement "click"
function captureClicSouris(event) {
  // Calcul des coordonnées de la souris dans le canvas + conversion des clic en 
  //    entier i: ligne et j: colonne
  if (event.target.id == "cvs") {
    posClic.i = Math.floor(event.offsetX/(blockSize)); 
    posClic.j = Math.floor(event.offsetY/(blockSize));
  }
  selectVehicule();
}

// Fonction qui sélectionne le véhicule lorsqu'on clique dessus
function selectVehicule(){
  let valeurCase=grild[posClic.i][posClic.j];
  if(valeurCase!=0){
    // On regarde dans le tableau vehicule par level la voiture associée à la valeur 
    //    de la case et on retourne la voiture
    bufferCar = levels[currentLevel].vTab[valeurCase];
    levels[currentLevel].nbMouv +=1;
    scoreDiv.textContent = levels[currentLevel].nbMouv;
    if(isPaused2){
      audio3.play();
    }
  }
}