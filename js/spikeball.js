
var spikeball = function(sprite, x, y, ancho, alto, velocidad, rangoMov,num) {
  /* Completar constructor a partir de Enemigo */
  Enemigo.call(this, sprite, x, y, ancho, alto, velocidad, rangoMov);
  //var para determinar el movimiento de la bola
  this.num = num;
}
spikeball.prototype = Object.create(Enemigo.prototype);
spikeball.prototype.constructor = spikeball;

//funcion para mover la bola de pinchos
spikeball.prototype.mover = function(){
// variable para definir la direccion del movimiento, movimiento en x e y
  var movX;
  var movY;
  if (this.num < 0.5) {
    movX = (+this.velocidad/2);
    movY = (+this.velocidad/2);
  }
  if (this.num >= 0.5){
    movX = (+this.velocidad/2);
    movY = (-this.velocidad/2);
  }
//cheque que sea un movimiento valido sino inivierte la direccion del movimiento
 if (Juego.chequearColisionesSpike(this, movX + this.x, movY + this.y)){
   this.x = (this.x + movX);
   this.y = (this.y + movY);
 } else {
   this.velocidad *= -1;
   this.num = Math.random();
 }
};
//ataque a jugador
spikeball.prototype.atacar = function(jugador) {
  jugador.perderVida(10);
}
