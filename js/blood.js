/* Un objeto que representa a los zombies pisados. Recibe un sprite que tendra la
imagen que lo representa, indicando donde fue chocado el zombie por el jugador,
ademas de los parametros comunes x, y, ancho y alto */

var Sangre = function (sprite, x, y, ancho, alto) {
  this.sprite = sprite;
  this.x = x;
  this.y = y;
  this.ancho = ancho;
  this.alto = alto;
}
