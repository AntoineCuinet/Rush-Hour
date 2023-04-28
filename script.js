// Jeu Rush-Hour, créer par Magnin Julie et Cuinet Antoine, page js

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
/// Front ///

// Bouton parametre de son
const ButtonParam = document.querySelector(".param");
const modal = document.querySelector(".modal");
ButtonParam.addEventListener("click", paramActive);
function paramActive(){
    if (modal.style.display == "flex") modal.style.display = "none";
    else modal.style.display = "flex";
}  
// Bouton pour activer la musique
const buttonAudio = document.getElementById('buttonAudio');
let audio1 = new Audio();
audio1.src = 'taxi.mp3';
let isPaused = true;
// annimation musique
buttonAudio.addEventListener("click", function() { 
  buttonAudio.classList.toggle("active");
});

buttonAudio.addEventListener('click', function(){
  if(isPaused){
    audio1.play();
  }else{
    audio1.pause();
  }
  isPaused = !isPaused;
  audio1.addEventListener('playing', function(){
    console.log('click');
  });
})

// Bouton affichage levels
const ButtonLevels = document.querySelector(".levels");
const level = document.querySelector(".modal1");
ButtonLevels.addEventListener("click", levelsActive);
function levelsActive(){
    if (level.style.display == "flex") level.style.display = "none";
    else level.style.display = "flex";
}  

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
const redCarImage = new Image();
redCarImage.src = "redCarIm.png";

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



// Placement de la voiture rouge sur la grille
let c = car(1,0,2);
grild [0][2] = c.numV;
grild [1][2] = c.numV;




// Fonction qui créer une voiture
function Car(body){
  
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
  let ind = rechercheVehicule(grild, c);
  drawBlock(ind);
  afficherCaseApres(grild, ind, c);
}


// fontion qui dessine un block sur la grille
function drawBlock(pos){
  var x = pos.i * blockSize;
  var y = pos.j * blockSize;
  // context.fillRect(x,y,blockSize,blockSize);
  context.drawImage(redCarImage, x, y, blockSize, blockSize);

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
function afficherCaseApres(grild, ind, c){
  if(c.orient==0){
    if (grild[ind.i+1][ind.j]==c.numV){
      ind.i=ind.i+1;
      drawBlock(ind);
    }
  } else {

  }
}


// Fonction appelée lorsqu'une touche du clavier est appuyée
// Associée à l'événement "keyDown"
function captureAppuiToucheClavier(event) {
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