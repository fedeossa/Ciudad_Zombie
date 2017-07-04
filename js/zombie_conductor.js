/* Para insipirarte para la implementacion del ZombieConductor podes usar
al ZombieCaminante de ejemplo. Tene en cuenta que tendra algunas diferencias.
Por ejemplo, la cantidad parametros que recibe su constructor. En ZombieConductor
no son exactamente los mismos parametros que en el objeto Enemigo, a diferencia
del ZombieCaminante que eran los mismos. */

var ZombieConductor = function(sprite, x, y, ancho, alto, velocidad, rangoMov, dir) {
  /* Cnstructor a partir de Enemigo */
  Enemigo.call(this, sprite, x, y, ancho, alto, velocidad, rangoMov);
  this.dir = dir;
}
ZombieConductor.prototype = Object.create(Enemigo.prototype);
ZombieConductor.prototype.constructor = ZombieConductor;

ZombieConductor.prototype.mover = function(){
  if (this.dir == "h") {
    this.x -= this.velocidad;
    /* En esta parte lo que hacemos es invertir la direccion horizontal si
    toca uno de sus limites, modificando su velocidad. Si multiplicamos por -1 la
    velocidad lo que estamos haciendo es invertir su direccion.*/
    if ((this.x < this.rangoMov.desdeX) || (this.x > this.rangoMov.hastaX)){
      this.velocidad *= -1;
    }
    // Si sobrepasa el rangoY, lo manda al centro entre ambos rangos
    if ((this.y < this.rangoMov.desdeY) || (this.y > this.rangoMov.hastaY)) {
      this.y = this.rangoMov.desdeY + (this.rangoMov.hastaY - this.rangoMov.desdeY)/2;
    }
  } else if(this.dir == "v") {
    //Sino, hace otro movimiento
    this.y += this.velocidad;
    /* En esta parte lo que hacemos es invertir la direccion vertical si
    toca uno de sus limites, modificando su velocidad. Si multiplicamos por -1 la
    velocidad lo que estamos haciendo es invertir su direccion.*/
    if ((this.y < this.rangoMov.desdeY) || (this.y > this.rangoMov.hastaY)){
      this.velocidad *= -1;
    }
    // Si sobrepasa el rangoY, lo manda al centro entre ambos rangos
    if ((this.x < this.rangoMov.desdeX) || (this.x > this.rangoMov.hastaX)) {
      this.x = this.rangoMov.desdeX + (this.rangoMov.hastaX - this.rangoMov.desdeX)/2;
    }
  }
}

ZombieConductor.prototype.atacar = function(jugador) {
  jugador.perderVida(jugador.vidas);
}
