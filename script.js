// Jeu Rush-Hour, créer par Magnin Julie et Cuinet Antoine, page js

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
/// Front ///

// Bouton pour activer le son
const buttonAudio2 = document.getElementById('buttonAudio2');
buttonAudio2.classList.toggle("active")
let audio2=new Audio();
audio2.src= 'click.mp3';
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
  // audio1.addEventListener('playing', function(){
  //   console.log('click');
  // });
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
  // audio1.addEventListener('playing', function(){
  //   console.log('click');
  // });
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
/// déclaration des sprites ///

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
////////////////////////////////////////////////////////////////////////////////////////////////////
/// Début du code du jeux à proprement parler ///

// Dimentions du document et d'une case
var blockSize = 100;
var ctxWidth = 600;
var ctxHeight = 600;
var widthInBlocks = ctxWidth/blockSize;
var heightInBlocks = ctxHeight/blockSize;

// Déclaration des variable
let context = null;
let pos={i:0,j:0};
let levels= Array(9); //tableau contenant des instances de lv 
for(let i =0; i<levels.length; i++){
  let lv ={numLV :null, nbCoupMin:null, vTab:Array(10), nbMouv:0, bestScore:null};
  levels[i]= lv;
};

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
    // effacement de l'écran
    context.clearRect(0, 0, context.width, context.height);
  }
}


// Fonction réalisant le rendu de l'état du jeu
function render() {

  ///////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 1  ///////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  const caseLevel1 = document.querySelector(".lv1");
  caseLevel1.addEventListener("click", function(){
    // son click
    if(isPaused2){
      audio2.play();
    }
    // effacement de l'écran
    context.fillStyle = "red";
    context.clearRect(0, 0, context.width, context.height);

    // Placement de la voiture rouge sur la grille
    let c = car(1,0,2);
    placementV(grild, c, 0,2);

    // Placement d'une voiture verticale
    let cv1 = car(2,1,2);
    placementV(grild, cv1, 3,3);

    // Placement d'une voiture horizontale sur la grille
    let ch1 = car(3,0,2);
    placementV(grild, ch1, 4,1);

    // Placement d'un camion horizontal sur la grille
    let ch2 = car(4,1,3);
    placementV(grild, ch2, 5,3);

    // Placement d'un camion vertical sur la grille
    let cv2 = car(5,0,3);
    placementV(grild, cv2, 0, 0);

    // level 1
    levels[0].numLV = 1;
    levels[0].vTab[0] = c;
    levels[0].vTab[1] = cv1;
    levels[0].vTab[2] = ch1;
    levels[0].vTab[3] = ch2;
    levels[0].vTab[4] = cv2;

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
  });


  ///////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 2  ///////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  const caseLevel2 = document.querySelector(".lv2");
  caseLevel2.addEventListener("click", function(){
    // son click
    if(isPaused2){
      audio2.play();
    }
    // effacement de l'écran
    context.fillStyle = "red";
    context.clearRect(0, 0, context.width, context.height);
  
    // Placement de la voiture rouge sur la grille
    let c = car(1,0,2);
    placementV(grild, c, 0,2);

    // level 2
    levels[1].numLV = 2;
    levels[1].vTab[0] = c;

    // Voiture principale  
    let ind = rechercheVehicule(grild, c);
    afficherCases(grild, ind, c);
  });


  ///////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 3  ///////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  const caseLevel3 = document.querySelector(".lv3");
  caseLevel3.addEventListener("click", function(){
    // son click
    if(isPaused2){
      audio2.play();
    }
    // effacement de l'écran
    context.fillStyle = "red";
    context.clearRect(0, 0, context.width, context.height);
  
    // Placement de la voiture rouge sur la grille
    let c = car(1,0,2);
    placementV(grild, c, 0,2);

    // level 3
    levels[2].numLV = 3;
    levels[2].vTab[0] = c;

    // Voiture principale  
    let ind = rechercheVehicule(grild, c);
    afficherCases(grild, ind, c);
  });

  ///////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 4  ///////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  const caseLevel4 = document.querySelector(".lv4");
  caseLevel4.addEventListener("click", function(){
    // son click
    if(isPaused2){
      audio2.play();
    }
    // effacement de l'écran
    context.fillStyle = "red";
    context.clearRect(0, 0, context.width, context.height);
  
    // Placement de la voiture rouge sur la grille
    let c = car(1,0,2);
    placementV(grild, c, 0,2);

    // level 4
    levels[3].numLV = 4;
    levels[3].vTab[0] = c;

    // Voiture principale  
    let ind = rechercheVehicule(grild, c);
    afficherCases(grild, ind, c);
  });


  ///////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 5  ///////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  const caseLevel5 = document.querySelector(".lv5");
  caseLevel5.addEventListener("click", function(){
    // son click
    if(isPaused2){
      audio2.play();
    }
    // effacement de l'écran
    context.fillStyle = "red";
    context.clearRect(0, 0, context.width, context.height);
  
    // Placement de la voiture rouge sur la grille
    let c = car(1,0,2);
    placementV(grild, c, 0,2);

    // level 5
    levels[4].numLV = 5;
    levels[4].vTab[0] = c;

    // Voiture principale  
    let ind = rechercheVehicule(grild, c);
    afficherCases(grild, ind, c);
  });


  ///////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 6  ///////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  const caseLevel6 = document.querySelector(".lv6");
  caseLevel6.addEventListener("click", function(){
    // son click
    if(isPaused2){
      audio2.play();
    }
    // effacement de l'écran
    context.fillStyle = "red";
    context.clearRect(0, 0, context.width, context.height);
  
    // Placement de la voiture rouge sur la grille
    let c = car(1,0,2);
    placementV(grild, c, 0,2);

    // level 6
    levels[5].numLV = 6;
    levels[5].vTab[0] = c;

    // Voiture principale  
    let ind = rechercheVehicule(grild, c);
    afficherCases(grild, ind, c);
  });


  ///////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 7  ///////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  const caseLevel7 = document.querySelector(".lv7");
  caseLevel7.addEventListener("click", function(){
    // son click
    if(isPaused2){
      audio2.play();
    }
    // effacement de l'écran
    context.fillStyle = "red";
    context.clearRect(0, 0, context.width, context.height);
  
    // Placement de la voiture rouge sur la grille
    let c = car(1,0,2);
    placementV(grild, c, 0,2);

    // level 7
    levels[6].numLV = 7;
    levels[6].vTab[0] = c;

    // Voiture principale  
    let ind = rechercheVehicule(grild, c);
    afficherCases(grild, ind, c);
  });


  ///////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 8  ///////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  const caseLevel8 = document.querySelector(".lv8");
  caseLevel8.addEventListener("click", function(){
    // son click
    if(isPaused2){
      audio2.play();
    }
    // effacement de l'écran
    context.fillStyle = "red";
    context.clearRect(0, 0, context.width, context.height);
  
    // Placement de la voiture rouge sur la grille
    let c = car(1,0,2);
    placementV(grild, c, 0,2);

    // level 8
    levels[7].numLV = 8;
    levels[7].vTab[0] = c;

    // Voiture principale  
    let ind = rechercheVehicule(grild, c);
    afficherCases(grild, ind, c);
  });


  ///////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////  Level 9  ///////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  const caseLevel9 = document.querySelector(".lv9");
  caseLevel9.addEventListener("click", function(){
    // son click
    if(isPaused2){
      audio2.play();
    }
    // effacement de l'écran
    context.fillStyle = "red";
    context.clearRect(0, 0, context.width, context.height);
  
    // Placement de la voiture rouge sur la grille
    let c = car(1,0,2);
    placementV(grild, c, 0,2);

    // level 9
    levels[8].numLV = 9;
    levels[8].vTab[0] = c;

    // Voiture principale  
    let ind = rechercheVehicule(grild, c);
    afficherCases(grild, ind, c);
  });
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
        return {i,j};
      }
    };
  };
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
      indv.i+=(car.taille-1);
      if((indv.i+1)>=heightInBlocks||grild[indv.i+1][indv.j]!=0){
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
//à chaque relachement de la flèche nbMouv s'agrémente de 1 
function captureRelacheToucheClavier(event) {
  switch(event.code){
    case "ArrowRight":
        arrowRight=false;
        nbMouv +=1;
        break;
    case "ArrowLeft":
        arrowLeft=false;
        nbMouv +=1;
        break;
    case "ArrowUp":
        arrowUp=false;
        nbMouv +=1;
        break;
    case "ArrowDown":
        arrowDown=false;
        nbMouv +=1;
        break;
}
}

//Fonction appelée lorsque la sourie est appuyée
// Associée à l'événement "click"
function captureClicSouris(event) {
  // calcul des coordonnées de la souris dans le canvas + conversion des clic en entier i: ligne et j: colonne
  if (event.target.id == "cvs") {
    pos.i = Math.floor((event.pageX - event.target.offsetLeft)/(blockSize)); 
    pos.j = Math.floor((event.pageY - event.target.offsetTop)/(blockSize));
  }
  return pos;
  
  // let valeurCase=grild[ligne][colonne];
  // if(valeurCase!=0){
  //   //utiliser un while à la place du for
  //   //on regarde dans le tableau vehicule par level la voiture associée à la valeur de la case est on retourne la voiture
  //   //peut être mettre ce que je viens de faire dans une fonction à part
  //   for(let i=0;i<vTab.length;i++){
  //     if(vTab[i].numV==valeurCase){
  //       return vtab[i];
  //     }
  //   }
  // }
}