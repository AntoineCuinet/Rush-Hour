// Jeu Rush-Hour, créer par Magnin Julie et Cuinet Antoine, page js

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
/// Front ///

// Bouton pour activer le son
const buttonAudio2 = document.getElementById('buttonAudio2');
let audio2=new Audio();
audio2.src= 'click.mp3';
let isPaused2 = false;
// annimation son
buttonAudio2.addEventListener("click", function() { 
  buttonAudio2.classList.toggle("active");
});

buttonAudio2.addEventListener('click', function(){
  if(isPaused2){
    audio2.pause();
  }else{
    audio2.play();
  }
  isPaused2 = !isPaused2;
  audio1.addEventListener('playing', function(){
    console.log('click');
  });
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
  audio1.addEventListener('playing', function(){
    console.log('click');
  });
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

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
/// Début du code du jeux à proprement parler ///

// Déclaration des variable
let context = null;
// Dimentions du document et d'une case
var blockSize = 100;
var ctxWidth = 600;
var ctxHeight = 600;
var widthInBlocks = ctxWidth/blockSize;
var heightInBlocks = ctxHeight/blockSize;

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



let pos={i:0,j:0};
let levels=[]; //tableau contenant des instances de lv 
let lv ={numLV :null, nbCoupMin:null, 'vTab':[], nbMouv:0, bestScore:null, 'carTab' : [] };
let grild= Array(widthInBlocks);
for(let i =0; i<widthInBlocks; i++){
  grild[i]=Array(widthInBlocks);
  for(let j =0; j<widthInBlocks; j++){
    grild [i][j] = 0;
  };
};
let win=false;
function car(numV, orient, taille){
  return {numV,orient, taille};
} //pour orient 0 : horizontal et 1 : vertical



// Placement de la voiture rouge sur la grille
let c = car(1,0,2);
grild [0][2] = c.numV;
grild [1][2] = c.numV;

// Placement d'une voiture verticale
let cv1 = car(2,1,2);
grild[3][3] = cv1.numV;
grild[3][4] = cv1.numV;

// Placement d'une voiture horizontale sur la grille
let ch1 = car(3,0,2);
grild [4][1] = ch1.numV;
grild [5][1] = ch1.numV;

// Placement d'un camion horizontal sur la grille
let ch2 = car(4,1,3);
grild [5][3] = ch2.numV;
grild [5][4] = ch2.numV;
grild [5][5] = ch2.numV; 

// Placement d'un camion vertical sur la grille
let cv2 = car(5,0,3);
grild [0][0] = cv2.numV;
grild [1][0] = cv2.numV;
grild [2][0] = cv2.numV;

//fonction qui place les voitures dans la grille à partir d'une case i et j, qui est la première case du véhicule, entrée en paramètres
//elle verifie si i et j sont bien compris entre 0 et 5 et si on peut bien placer le vehicule a l'endroit souhaite 
function placementV(grild,car,i,j){
  //i et j sont correct
  if((i>=0 && i<=5)&&(j>=0 && j<=5)){
    for(let k=0;k<car.taille;k++){
      if(car.orient==0){
        grild[i][j+k]=car.numV;
      } else {
        grild[i+k][j]=car.numV;
      }
    }
  }
}


// Initialisation (appelée au chargement du corps du document <body onload="init">)    
function init() {
  // instanciation de la variable globale contenant le contexte
  context = document.getElementById("cvs").getContext("2d");
  context.width = document.getElementById("cvs").width = ctxWidth;
  context.height = document.getElementById("cvs").height = ctxHeight;

  // 2 écouteurs pour le clavier (appui/relâchement d'une touche)
  document.addEventListener("keydown", captureAppuiToucheClavier)
  document.addEventListener("keyup", captureRelacheToucheClavier)
  // on associe au document un écouteur d'événements souris
  document.addEventListener("click", captureClicSouris)
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
    // a faire
  }
}


// Fonction réalisant le rendu de l'état du jeu
function render() {
  // effacement de l'écran
  context.fillStyle = "red";
  context.clearRect(0, 0, context.width, context.height);

  //affichage des véhicules

  // Voiture principale  
  let ind = rechercheVehicule(grild, c);
  afficherCases(grild, ind, c);

  // voiture horizontale1
  let indcv1 = rechercheVehicule(grild, cv1);
  afficherCases(grild, indcv1, cv1);

  // voiture verticale1
  let indch1 = rechercheVehicule(grild, ch1);
  afficherCases(grild, indch1, ch1);

  // camion horizontal
  let indch2 = rechercheVehicule(grild, ch2);
  afficherCases(grild, indch2, ch2);
  // camion vertical
  let indcv2 = rechercheVehicule(grild, cv2);
  afficherCases(grild, indcv2, cv2);
}

// Toujours la position de la première case du véhicule
function rechercheVehicule(grild, car){
  for(let i = 0; i<widthInBlocks; i++){
    for(let j = 0; j<widthInBlocks; j++){
      if (grild[i][j]==car.numV) {
        return {i,j};
      }
    };
  };
  console.log(grild, car);
}


// affiche les autre cases
function afficherCases(grild, ind, c){
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
function deplacementV(grild, car){
  let indv=rechercheVehicule(grild,car);
  let temp;
  
  if (car.orient==0){
    if(arrowLeft){
      //déplacement impossible vers la gauche impossible
      if((indv.j-1)<0||grild[indv.i][indv.j-1]!=0){
        return false
      } else {
        //echanger la place de la voiture
        for(let k=0;k<car.taille;k++){
          temp=grild[indv.i][indv.j+k-1];
          grild[indv.i][indv.j+k-1]=grild[indv.i][indv.j+k];
          grild[indv.i][indv.j+k]=temp;
        }
      }
    } 
    if (arrowRight){
      indv.j+=(car.taille-1);
      if((indv.j+1)>=widthInBlocks||grild[indv.i][indv.j+1]){
        return false;
      } else {
        temp=grild[indv.i][ind.j-k+1];
        grild[indv.i][indv.j-k+1]=grild[indv.i][indv.j-k];
        grild[indv.i][indv.j-k]=temp;
      }
    }
  } else {
    if(arrowUp){
      //déplacement vers le haut impossible
      if((indv.i-1)<0||grild[indv.i-1][indv.j]!=0){
        return false
      } else {
        //échanger la place de la voiture
        for(let k=0;k<car.taille;k++){
          temp=grild[indv.i+k-1][indv.j];
          grild[indv.i+k-1][indv.j]=grild[indv.i+k][indv.j];
          grild[indv.i+k][indv.j]=temp;
        }
      }
    } 
    if(arrowDown){
      ind.i+=(car.taille-1);
      if((ind.i+1)>=heightInBlocks||grild[indv.i+1][indv.j]!=0){
        return false;
      } else {
        temp=grild[indv.i-k+1][ind.j];
        grild[indv.i-k+1][indv.j]=grild[indv.i-k][indv.j];
        grild[indv.i-k][indv.j]=temp;
      }
    }
  }
  


}



let arrowLeft=false;
let arrowRight=false;
let arrowUp=false;
let arrowDown=false;
// Fonction appelée lorsqu'une touche du clavier est appuyée
// Associée à l'événement "keyDown"
function captureAppuiToucheClavier(event) {
  switch(event.code){
    case "ArrowRight":
        arrowRight=true;
        break;
    case "ArrowLeft":
        arrowLeft=true;
          break;
    case "ArrowUp":
        arrowUp=true;
        break;
    case "ArrowDown":
        arrowDown=true;
        break;
  }
}

// Fonction appelée lorsqu'une touche du clavier est relâchée
// Associée à l'événement "keyUp"
function captureRelacheToucheClavier(event) {
}

//Fonction appelée lorsqu'une touche du clavier est relâchée
// Associée à l'événement "click"
function captureClicSouris(event) {
  // calcul des coordonnées de la souris dans le canvas
  if (event.target.id == "cvs") {
    clic.x = event.pageX - event.target.offsetLeft;
    clic.y = event.pageY - event.target.offsetTop;
  }
}