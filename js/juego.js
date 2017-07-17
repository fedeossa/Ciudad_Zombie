/* El objeto Juego sera el encargado del control de todo el resto de los Objetos
existentes.
Le dara ordenes al Dibujante para que dibuje entidades en la pantalla. Cargara
el mapa, chequeara colisiones entre los objetos y actualizara sus movimientos
y ataques. Gran parte de su implementacion esta hecha, pero hay espacios con el
texto COMPLETAR que deben completarse segun lo indique la consigna.

El objeto Juego contiene mucho codigo. Tomate tu tiempo para leerlo tranquilo
y entender que es lo que hace en cada una de sus partes. */

var Juego = {
  // Aca se configura el tamanio del canvas del juego
  anchoCanvas: 961,
  altoCanvas: 577,
  jugador: Jugador,
  vidasInicial: Jugador.vidas,
  // Indica si el jugador gano
  ganador: false,
  // Variable para mostrar o no las instrucciones al principio.
  estaJugando: true,
  pausa: false,

  obstaculosCarretera: [
    /*Aca se van a agregar los obstaculos visibles. Tenemos una valla horizontal
    de ejemplo, pero podras agregar muchos mas. */
    new Obstaculo('imagenes/valla_horizontal.png', 120, 120, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 150, 120, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 70, 430, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 470, 360, 30, 30, 1),
    new Obstaculo('imagenes/valla_vertical.png', 400, 480, 30, 30, 1),
    new Obstaculo('imagenes/valla_vertical.png', 400, 450, 30, 30, 1),
    new Obstaculo("imagenes/auto_verde_abajo.png", 180, 260, 15, 30, 1),
    new Obstaculo("imagenes/auto_verde_abajo.png", 870, 370, 15, 30, 1),
    new Obstaculo("imagenes/bache.png", 150, 280, 30, 30, 1),
    new Obstaculo("imagenes/bache.png", 300, 400, 30, 30, 1),
    new Obstaculo("imagenes/bache.png", 550, 70, 30, 30, 1),
    new Obstaculo("imagenes/bache.png", 850, 420, 30, 30, 1),
    //// Obstaculos que agregan vida
    new Obstaculo('imagenes/shield.png', 120, 40, 15, 17, -5),
    new Obstaculo('imagenes/shield.png', 870, 405, 15, 17, -5)
  ],
  /* Estos son los bordes con los que se puede chocar, por ejemplo, la vereda.
   Ya estan ubicados en sus lugares correspondientes. Ya aparecen en el mapa, ya
   que son invisibles. No tenes que preocuparte por ellos.*/
  bordes: [
    // // Bordes
    new Obstaculo('', 0, 5, 961, 18, 0),
    new Obstaculo('', 0, 559, 961, 18, 0),
    new Obstaculo('', 0, 5, 18, 572, 0),
    new Obstaculo('', 943, 5, 18, 572, 0),
    // Veredas
    new Obstaculo('', 18, 23, 51, 536, 2),
    new Obstaculo('', 69, 507, 690, 52, 2),
    new Obstaculo('', 587, 147, 173, 360, 2),
    new Obstaculo('', 346, 147, 241, 52, 2),
    new Obstaculo('', 196, 267, 263, 112, 2),
    new Obstaculo('', 196, 23, 83, 244, 2),
    new Obstaculo('', 279, 23, 664, 56, 2),
    new Obstaculo('', 887, 79, 56, 480, 2)
  ],
  // Los enemigos se agregaran en este arreglo.
  enemigos: [
//ZombieCaminante
    new ZombieCaminante("imagenes/zombie1.png",20,200,10,10,1,{desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557},0),
    new ZombieCaminante("imagenes/zombie1.png",20,200,10,10,1,{desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557},0),
    new ZombieCaminante("imagenes/zombie2.png",80,80,10,10,1,{desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557},0),
    new ZombieCaminante("imagenes/zombie2.png",100,200,10,10,1,{desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557},0),
    new ZombieCaminante("imagenes/zombie3.png",850,500,10,10,1,{desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557},0),
    new ZombieCaminante("imagenes/zombie3.png",880,530,10,10,1,{desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557},0),
    new ZombieCaminante("imagenes/zombie4.png",350,80,10,10,1,{desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557},0),
    new ZombieCaminante("imagenes/zombie4.png",400,90,10,10,1,{desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557},0),
//ZombieConductor
    new ZombieConductor("imagenes/tren_vertical.png",644,0,30,90,8,{desdeX: 614, hastaX: 674, desdeY: 0, hastaY: 577},"v"),
    new ZombieConductor("imagenes/tren_vertical.png",678,0,30,90,12,{desdeX: 648, hastaX: 708, desdeY: 0, hastaY: 577},"v"),
    new ZombieConductor("imagenes/tren_horizontal.png",400,322,90,30,12,{desdeX: 0, hastaX: 961, desdeY: 292, hastaY: 352},"h"),
//spikeball
    new spikeball("imagenes/spikeball.png",260,430,16,16,2,{desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557},0),
    new spikeball("imagenes/spikeball.png",460,130,16,16,2,{desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557},0)
  ],
  //Zombies atropellados
  manchaSangre: [
    //aca se van a push los zombies pisados..
  ]
}

/* Se cargan los recursos de las imagenes, para tener un facil acceso
a ellos. No hace falta comprender esta parte. Pero si queres agregar tus propies
imagenes tendras que poner su ruta en la lista para que pueda ser precargada como
todas las demas. */
Juego.iniciarRecursos = function() {
  Resources.load([
    'imagenes/mapa.png',
    'imagenes/mensaje_gameover.png',
    "imagenes/Mensaje1.png",
    "imagenes/Mensaje2.png",
    'imagenes/Splash.png',
    'imagenes/bache.png',
    'imagenes/tren_horizontal.png',
    'imagenes/tren_vertical.png',
    'imagenes/valla_horizontal.png',
    'imagenes/valla_vertical.png',
    'imagenes/zombie1.png',
    'imagenes/zombie2.png',
    'imagenes/zombie3.png',
    'imagenes/zombie4.png',
    'imagenes/auto_rojo_abajo.png',
    'imagenes/auto_rojo_arriba.png',
    'imagenes/auto_rojo_derecha.png',
    'imagenes/auto_rojo_izquierda.png',
    'imagenes/auto_verde_abajo.png',
    'imagenes/auto_verde_derecha.png',
    ////////// extras
    "imagenes/blood.png",
    "imagenes/shield.png",
    "imagenes/spikeball.png"
  ]);
  Resources.onReady(this.comenzar.bind(Juego));
};

// Agrega los bordes de las veredas a los obstaculos de la carretera
Juego.obstaculos = function() {
  return this.obstaculosCarretera.concat(this.bordes);
};

Juego.comenzar = function() {
  // Inicializar el canvas del juego
  Dibujante.inicializarCanvas(this.anchoCanvas, this.altoCanvas);
  /* El bucle principal del juego se llamara continuamente para actualizar
  los movimientos y el pintado de la pantalla. Sera el encargado de calcular los
  ataques, colisiones, etc*/
  this.dibujarInstrucciones();
  setTimeout(function(){Juego.buclePrincipal();},2000);
};

//Declaro la variable animation para poder detener el juego luego de muerto o cuando gano
var idAnimation;

Juego.buclePrincipal = function() {
  if(Juego.pausa) {
    setTimeout(Juego.buclePrincipal,1000);
    return;
  };
  var self = Juego;
  // Con update se actualiza la logica del juego, tanto ataques como movimientos
  self.update();
  // Funcion que dibuja por cada fotograma a los objetos en pantalla.
  self.dibujar();
  // Esto es una forma de llamar a la funcion Juego.buclePrincipal() repetidas veces
  idAnimation = window.requestAnimationFrame(function(){self.buclePrincipal()});
  // Esto es para frezar el juego cuando ganamos o perdemos
  if (self.ganoJuego() || self.terminoJuego() == !self.estaJugando) {
  window.cancelAnimationFrame(idAnimation);
  }
};

Juego.update = function() {
  this.calcularAtaques();
  this.moverEnemigos();
  this.estaJugando = false;
}
// Captura las teclas y si coincide con alguna de las flechas tiene que
// hacer que el jugador principal se mueva
Juego.capturarMovimiento = function(tecla) {
  var movX = 0;
  var movY = 0;
  var velocidad = this.jugador.velocidad;

  // El movimiento esta determinado por la velocidad del jugador
  if (tecla == 'izq') {
    movX = -velocidad;
  }
  if (tecla == 'arriba') {
    movY = -velocidad;
  }
  if (tecla == 'der') {
    movX = velocidad;
  }
  if (tecla == 'abajo') {
    movY = velocidad;
  }
  // Si se puede mover hacia esa posicion hay que hacer efectivo este movimiento
  if (this.chequearColisiones(movX + this.jugador.x, movY + this.jugador.y)) {
    /* Aca tiene que estar la logica para mover al jugador invocando alguno
    de sus metodos  */
    Jugador.mover(movX,movY);
  }
};

Juego.dibujar = function() {
  // Borrar el fotograma actual
  Dibujante.borrarAreaDeJuego();
  //Se pinta la imagen de fondo segun el estado del juego
  this.dibujarFondo();
  /* Aca hay que agregar la logica para poder dibujar al jugador principal
  utilizando al dibujante y los metodos que nos brinda.
  "Dibujante dibuja al jugador" */
  Dibujante.dibujarEntidad(Jugador);
  // Se recorren los obstaculos de la carretera pintandolos
  this.obstaculosCarretera.forEach(function(obstaculo) {
    Dibujante.dibujarEntidad(obstaculo);
  });
  // Se recorren los enemigos pintandolos
  this.enemigos.forEach(function(enemigo) {
    Dibujante.dibujarEntidad(enemigo);
  });
  // Se dibuja los Zombies chocados
  this.manchaSangre.forEach(function(sangreZombie) {
    Dibujante.dibujarEntidad(sangreZombie);
  });

  // El dibujante dibuja las vidas del jugador
  var tamanio = this.anchoCanvas / this.vidasInicial;
  Dibujante.dibujarRectangulo('white', 0, 0, this.anchoCanvas, 8);
  for (var i = 0; i < this.jugador.vidas; i++) {
    var x = tamanio * i
    Dibujante.dibujarRectangulo('red', x, 0, tamanio, 8);
  }
  //El dibunate escribe la cuenta de cuantos zombie hemos pisado
  if (Juego.manchaSangre.length >= 1) {
    Dibujante.escribir("Zombie Kills = " + Juego.manchaSangre.length, 250,50,"20px Arial")
  }
  // Indica llegada
  Dibujante.dibujarRectangulo('green', 760, 540, 126, 8);
};

/* Recorre los enemigos haciendo que se muevan. De la misma forma que hicimos
un recorrido por los enemigos para dibujarlos en pantalla ahora habra que hacer
una funcionalidad similar pero para que se muevan.*/
Juego.moverEnemigos = function() {
  this.enemigos.forEach(function(enemigo){
    enemigo.mover();
  })
};
//Movimiento spikeball
Juego.chequearColisionesSpike = function(spike,x, y) {
  var puedeMoverse = true
  this.obstaculos().forEach(function(obstaculo) {
    if (this.intersecan(obstaculo, spike, x, y)) {
      puedeMoverse = false
    }
  }, this)
  return puedeMoverse
};


/* Recorre los enemigos para ver cual esta colisionando con el jugador
Si colisiona empieza el ataque el zombie, si no, deja de atacar.
Para chequear las colisiones estudiar el metodo posicionValida. Alli
se ven las colisiones con los obstaculos. En este caso sera con los zombies. */
Juego.calcularAtaques = function() {
  this.enemigos.forEach(function(enemigo) {
    if (this.intersecan(enemigo, this.jugador, this.jugador.x, this.jugador.y)) {
      enemigo.comenzarAtaque(this.jugador);
      /* Si el enemigo colisiona debe empezar su ataque */
    } else {
      enemigo.dejarDeAtacar();
      /* Sino, debe dejar de atacar */
    }
  }, this);
};



/* Aca se chequea si el jugador se peude mover a la posicion destino.
 Es decir, que no haya obstaculos que se interpongan. De ser asi, no podra moverse */
Juego.chequearColisiones = function(x, y) {
  var puedeMoverse = true
  this.obstaculos().forEach(function(obstaculo) {
    if (this.intersecan(obstaculo, this.jugador, x, y)) {
      /*obstaculo choca al jugador*/
      obstaculo.chocar(this.jugador);
      puedeMoverse = false
    }
  }, this)
  return puedeMoverse
};

/* Este metodo chequea si los elementos 1 y 2 si cruzan en x e y
 x e y representan la coordenada a la cual se quiere mover el elemento2 */
Juego.intersecan = function(elemento1, elemento2, x, y) {
  var izquierda1 = elemento1.x
  var derecha1 = izquierda1 + elemento1.ancho
  var techo1 = elemento1.y
  var piso1 = techo1 + elemento1.alto
  var izquierda2 = x
  var derecha2 = izquierda2 + elemento2.ancho
  var techo2 = y
  var piso2 = y + elemento2.alto

  return ((piso1 >= techo2) && (techo1 <= piso2) &&
    (derecha1 >= izquierda2) && (izquierda1 <= derecha2))
};

// Muestras las instrucciones al iniciar va variando al azar entre los 2 mensajesIniciales
Juego.dibujarInstrucciones = function() {
  var mensajesIniciales = ['imagenes/Mensaje1.png','imagenes/Mensaje2.png']
  var imagenInicial;
  if (Math.random() <= 0.5) {
    imagenInicial = mensajesIniciales[0];
  } else {imagenInicial = mensajesIniciales[1];}
  Dibujante.dibujarImagen(imagenInicial, 0, 5, this.anchoCanvas, this.altoCanvas);
};

Juego.dibujarFondo = function() {
  // Si se termino el juego hay que mostrar el mensaje de game over de fondo
  if (this.terminoJuego() == !this.estaJugando) {
    Dibujante.dibujarImagen('imagenes/mensaje_gameover.png', 0, 5, this.anchoCanvas, this.altoCanvas);
    document.getElementById('reiniciar').style.visibility = 'visible';
  }

  // Si se gano el juego hay que mostrar el mensaje de ganoJuego de fondo
  else if (this.ganoJuego()) {
    Dibujante.escribir("¡Ganaste!",550,400,"50px Arial");
    Dibujante.dibujarImagen('imagenes/Splash.png', 190, 113, 500, 203);
    document.getElementById('reiniciar').style.visibility = 'visible';
  } else {
    Dibujante.dibujarImagen('imagenes/mapa.png', 0, 5, this.anchoCanvas, this.altoCanvas);
  }
};

Juego.terminoJuego = function() {
  return this.jugador.vidas <= 0;
};

/* Se gana el juego si se sobre pasa cierto altura y */
Juego.ganoJuego = function() {
  return (this.jugador.y + this.jugador.alto) > 530;
};

Juego.iniciarRecursos();

//funcion para pausar el juego
Juego.pausar = function(tecla) {
  //pausa
  if (tecla == "p") {
    Juego.pausa = true;
  } else {
    Juego.pausa = false;
  }
}

// Activa las lecturas del teclado al presionar teclas
// Documentacion: https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener
document.addEventListener('keydown', function(e) {
  var allowedKeys = {
    37: 'izq',
    38: 'arriba',
    39: 'der',
    40: 'abajo',
    80: "p"
  };
  Juego.pausar(allowedKeys[e.keyCode])
  Juego.capturarMovimiento(allowedKeys[e.keyCode]);
});
