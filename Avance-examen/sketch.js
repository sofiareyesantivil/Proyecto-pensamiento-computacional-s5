let fondo1;
let fondo2;
let tam1 = 800;
let tam2 = 800;
let tam3 = 620;

let comequesito;
let comefrutilla;
let tam5= 800;

let fruta2;
let f1;
let quesito2;
let flecha1;
let flecha2;

let tam4 = 180;

let gif1;
let gif2;
let portada;
let fruta;

let gifActual;

let x;
let y;

let xFruta;
let yFruta;

let detenido = false;
let iniciado = false;

// CONTROL
let mostrarFlecha = false;
let mostrarSP = false;

// FINAL
let yFondo2Final;

let mostrarFruta2 = false;
let mostrarF1 = false;
let mostrarQuesito2 = false;

let mostrarComequesito = false;
let mostrarComeFrutilla = false;

// 🎬 MODO CINE
let modoComequesito = false;
let modoComeFrutilla = false;

// HOVER
let hoverF1 = false;
let hoverQueso = false;

// 🔥 NUEVO: Arreglo para los sabores
let sabores = [];


function volverAFruta2() {
  modoComequesito = false;
  mostrarComequesito = false;

  mostrarSP = true;
  mostrarFruta2 = true;
  mostrarF1 = true;
  mostrarQuesito2 = true;

  sabores = [];
}


function preload() {
  gif1 = loadImage("gif/Parte-01-REMY.gif");
  gif2 = loadImage("gif/Parte-02-REMY.gif");

  portada = loadImage("img/portada.png");

  fruta = loadImage("img/potefruta01-1.png");
  fruta2 = loadImage("img/potefruta02.png");
  f1 = loadImage("img/frutilla2.png");
  quesito2 = loadImage("img/quesito2.png");

  fondo1 = loadImage("img/fondo01.png");
  fondo2 = loadImage("img/mantel.jpg");

  flecha1 = loadImage("img/flecha1.png");
  flecha2 = loadImage("img/flecha2.png");

  comequesito = loadImage("gif/remy01-comequesito.gif");
  comefrutilla = loadImage("gif/remy01-comefrutilla.gif");
}

function setup() {
  createCanvas(800, 800);
  imageMode(CORNER);
  resetAnimacion();
}

function resetAnimacion() {

  x = width;
  y = 0;

  gifActual = gif1;

  xFruta = -300;
  yFruta = height / 2;

  detenido = false;

  mostrarFlecha = false;

  mostrarFruta2 = false;
  mostrarF1 = false;
  mostrarQuesito2 = false;

  mostrarComequesito = false;
  mostrarComeFrutilla = false;

  modoComequesito = false;

  yFondo2Final = height;

  gif1.setFrame(0);
  gif2.setFrame(0);
  
  // Limpiar destellos al reiniciar
  sabores = [];
}

function draw() {

  background(220);

  if (modoComeFrutilla){
     background(0);

  // GIF centrado
  image(comefrutilla, 0, 0, tam5, tam5);

  // Flecha para volver
  image(flecha2, 20, 620, tam4, tam4);

  return;
  }
  
  // 🖤 MODO CINE QUESITO (PRIORIDAD MÁXIMA)
  if (modoComequesito) {

    background(0);

    // Dibujamos el gif de Remy comiendo
    image(comequesito, 0, 0, tam5, tam5);

    //flecha 2 (ir hacia atras)
    image(flecha2, 20, 620, tam4, tam4);



    
    // 🔥 EFECTO SINESTESIA RATATOUILLE 🔥
    // 1. Crear formas mientras se mantiene presionado el click
    if (mouseIsPressed) {
      let nuevoSabor = {
        posX: mouseX + random(-30, 30),
        posY: mouseY + random(-30, 30),
        color: random(360),
        tam: random(10, 60),
        tipo: int(random(2)),
        alfa: 1
      };
      sabores.push(nuevoSabor);
    }

    // 2. Dibujar y animar todas las formas sobre el GIF
    push(); 
    colorMode(HSB, 360, 100, 100, 1);
    
    for (let i = sabores.length - 1; i >= 0; i--) {
      let s = sabores[i];

      if (s.tipo === 0) {
        noStroke();
        fill(s.color, 80, 100, s.alfa);
        circle(s.posX, s.posY, s.tam);
      } else {
        noFill();
        stroke(s.color, 80, 100, s.alfa);
        strokeWeight(4);
        circle(s.posX, s.posY, s.tam * 1.5);
      }

      s.alfa -= 0.02;   // Desvanecimiento
      s.posY -= 0.5;    // Flotan hacia arriba levemente

      // Eliminar de la memoria cuando desaparecen
      if (s.alfa <= 0) {
        sabores.splice(i, 1);
      }
    }
    pop();

    return; // Sale del draw para no dibujar el resto de la escena
  }



  

  // PORTADA
  if (!iniciado) {
    image(portada, 0, 0, width, height);
    return;
  }

  // ESCENA BASE
  image(fondo1, 0, 0, tam1, tam1);
  image(fondo2, 0, 400, tam2, tam2);

  image(gifActual, x, y, 800, 800);

  if (!detenido) {
    x -= 6;
  }

  let centro = (width - 800) / 2;

  if (x <= centro) {
    x = centro;
    detenido = true;
  }

  image(fruta, 80, 130, tam3, tam3);

  // FLECHA
  if (gifActual === gif2) {
    if (gif2.getCurrentFrame() >= gif2.numFrames() - 10) {
      mostrarFlecha = true;
    }
  }

  if (mostrarFlecha) {
    image(flecha1, 620, 620, tam4, tam4);
  }



  // FONDO FINAL
  if (mostrarSP) {

    if (yFondo2Final > 0) {
      yFondo2Final -= 8;
    }

    image(fondo2, 0, yFondo2Final, width, height);

    if (yFondo2Final <= 0) {
      mostrarFruta2 = true;
      mostrarF1 = true;
      mostrarQuesito2 = true;
    }

    if (mostrarFruta2) {
      image(fruta2, 0, 0, width, height);
    }

    // 🍓 FRUTILLA
    if (mostrarF1) {

      let f1X = 10;
      let f1Y = 10;
      let f1Size = 250;

      hoverF1 =
        mouseX >= f1X &&
        mouseX <= f1X + f1Size &&
        mouseY >= f1Y &&
        mouseY <= f1Y + f1Size;

      let sizeF1 = hoverF1 ? 280 : 250;

      image(f1, f1X, f1Y, sizeF1, sizeF1);

      if (mostrarComeFrutilla) {
        image(comefrutilla, 300, 300, 250, 250);
      }
    }

    // 🧀 QUESO
    if (mostrarQuesito2) {

      let quesoX = width - 260;
      let quesoY = 10;
      let quesoSize = 250;

      hoverQueso =
        mouseX >= quesoX &&
        mouseX <= quesoX + quesoSize &&
        mouseY >= quesoY &&
        mouseY <= quesoY + quesoSize;

      let sizeQ = hoverQueso ? 280 : 250;

      image(quesito2, quesoX, quesoY, sizeQ, sizeQ);

      if (mostrarComequesito) {
        // En tu código original dibujabas aquí el gif "comequesito", 
        // pero ahora "modoComequesito" se hace cargo en la parte superior del draw().
      }
    }

    return;
  }
  
}

function keyPressed() {
  if (key === " ") {
    iniciado = true;
    resetAnimacion();
  }
}

function mousePressed() {


  // ⬅ BOTÓN VOLVER DESDE EL GIF COMEQUESITO
if (modoComequesito || modoComeFrutilla) {

  if (
    mouseX >= 20 &&
    mouseX <= 20 + tam4 &&
    mouseY >= 620 &&
    mouseY <= 620 + tam4
  ) {

    modoComequesito = false;
    modoComeFrutilla = false;

    mostrarComequesito = false;
    mostrarComeFrutilla = false;

    // Mantener visible la pantalla de fruta2
    mostrarSP = true;
    mostrarFruta2 = true;
    mostrarF1 = true;
    mostrarQuesito2 = true;

    // Limpiar los efectos de colores
    sabores = [];

    return;
  }
}



  ///////////
  

  if (iniciado && gifActual !== gif2) {
    gifActual = gif2;
    gif2.setFrame(0);
    return;
  }

  if (mostrarFlecha) {

    if (
      mouseX >= 620 &&
      mouseX <= 620 + tam4 &&
      mouseY >= 620 &&
      mouseY <= 620 + tam4
    ) {
      mostrarSP = true;
    }
  }

  // 🧀 CLICK QUESO (ACTIVA MODO CINE)
  if (mostrarQuesito2) {

    let quesoX = width - 260;
    let quesoY = 10;
    let quesoSize = 250;

    if (
      mouseX >= quesoX &&
      mouseX <= quesoX + quesoSize &&
      mouseY >= quesoY &&
      mouseY <= quesoY + quesoSize
    ) {
      mostrarComequesito = true;
      modoComequesito = true;
    }
  }

  // 🍓 CLICK FRUTILLA
  if (mostrarF1) {

    let f1X = 10;
    let f1Y = 10;
    let f1Size = 250;

    if (
      mouseX >= f1X &&
      mouseX <= f1X + f1Size &&
      mouseY >= f1Y &&
      mouseY <= f1Y + f1Size
    ) {
      mostrarComeFrutilla = true;
      modoComeFrutilla = true;
    }
  }
}