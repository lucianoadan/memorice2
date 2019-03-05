// filas * cols debe ser par
const filas = 4;
const columnas = 4;
const base_url = 'http://localhost/memorice2/';

var cartas = [];

var intentos = 0;
var jugada1 = "";
var jugada2 = "";
var identificadorJ1 = "";
var identificadorJ2 = "";
var pares = null;
var jugando = false; //
var celdas = filas * columnas;



function iniciarJuego () {	
  var dato = document.getElementById("juego");
  dato.style.opacity = 1;

  pares = new Set([]);

  cartas = new Array( 
  {nombre: '1', seleccion: false}, {nombre: '2', seleccion: false}, 
  {nombre: '3', seleccion: false}, {nombre: '4', seleccion: false}, 
  {nombre: '5', seleccion: false}, {nombre: '6', seleccion: false}, 
  {nombre: '7', seleccion: false}, {nombre: '8', seleccion: false}, 
  {nombre: '1', seleccion: false}, {nombre: '2', seleccion: false}, 
  {nombre: '3', seleccion: false}, {nombre: '4', seleccion: false}, 
  {nombre: '5', seleccion: false}, {nombre: '6', seleccion: false}, 
  {nombre: '7', seleccion: false}, {nombre: '8', seleccion: false} );

  cargarImagenes();

  cartas.sort(function() {return Math.random() - 0.5});
  for ( var i = 0 ; i < celdas ; i++ ) {
    var carta = cartas[i].nombre;
    var dato = document.getElementById( i.toString() );
    dato.dataset.valor = carta;
  }
  on();
};

function resetearJuego () {
  cartas.sort(function() {return Math.random() - 0.5});
  for ( var i = 0 ; i < celdas ; i++ ) {
    var carta = cartas[i].nombre;
    var dato = document.getElementById( i.toString() );
    dato.dataset.valor = carta;
    // colorCambio( i, 'black', '?');
    tapar(i);
  }	
}

function girarCarta () {
  if (!jugando)
      return;

  var evento = window.event;

  jugada2 = evento.target.dataset.valor;
  identificadorJ2 = evento.target.id;

  if(pares.has(identificadorJ2))
    return;

  if ( jugada1 !== "" ) {

    if ( jugada1 === jugada2 && identificadorJ1 !== identificadorJ2 && cartas[parseInt(identificadorJ2)].seleccion != true &&  cartas[parseInt(identificadorJ1)].seleccion != true) {
      
      cartas[parseInt(identificadorJ1)].seleccion = true;
      cartas[parseInt(identificadorJ2)].seleccion = true;

      // control de pares
      pares.add(identificadorJ1);
      pares.add(identificadorJ2);

      //colorCambio(identificadorJ2, "blue", jugada2);
      descubrir(identificadorJ2);
      vaciar();
      comprobar();
    }else if(identificadorJ1 !== identificadorJ2){
      var self = this;
      setTimeout(function(){
        // colorCambio(self.identificadorJ1, "black", "?")
        // colorCambio(self.identificadorJ2, "black", "?")
        tapar(self.identificadorJ1);
        tapar(self.identificadorJ2);
        vaciar()
      },200); 

      //colorCambio(identificadorJ2, "blue", jugada2);
      descubrir(identificadorJ2);
    }
  } else if(jugada2 !== "valor") {

    //colorCambio(identificadorJ2, "blue", jugada2);
    descubrir(identificadorJ2);

    jugada1 = jugada2;
    identificadorJ1 = identificadorJ2;
  }
};

function vaciar ()  {
  jugada1 = "";	
  jugada2 = "";	

  identificadorJ1 = "";
  identificadorJ2 = "";
}

/*
function colorCambio (posicion, color, contenido) {
  var ficha = document.getElementById(posicion.toString());

  ficha.style.backgroundColor = color;
  ficha.innerHTML = contenido;
}	
*/

function comprobar () {
  var aciertos = 0;
  for( var i = 0 ; i < celdas ; i++ ){
    if ( cartas[i].seleccion == true ) {
      aciertos ++;
    }

  }

  if(aciertos == celdas){
    document.getElementById("juego").innerHTML = "GANASTE";
  }
}

function resetearJuego () {
			cartas.sort(function() { return Math.random() - 0.5});
			for ( var i = 0; i < celdas ; i++ ) {
				var carta = cartas[i].nombre;
				var dato = document.getElementById( i.toString() );
				dato.dataset.valor = carta;
				// colorCambio(i, 'black', '?');
        tapar(i);
			}
		};

var imagenes = heredoc(function () {/*
camaro-190x100.jpg
cavalier-190x100.jpg
colorado-190x100.jpg
cruze-turbo-190x100.jpg
dmax-190x100.jpg
equinox-190x100.jpg
n300-190x100.jpg
onix190x100.jpg
sail-190x100.jpg
silverado190x100.jpg
spark-activ-190x100.jpg
spark-gt-190x100.jpg
spin-activ-190x100.jpg
spin-II-190x100.jpg
suburban-190x100.jpg
tahoe-190x100.jpg
tracker-190x100.jpg
*/}).split("\n");

// Multiline Function String - Nate Ferrero - Public Domain
function heredoc(fn) {
  return fn.toString().match(/\/\*\s*([\s\S]*?)\s*\*\//m)[1];
};

function cargarImagenes(){
  var mitad = celdas/2;

  for(var i=0; i< mitad; i++){
    cartas[i].imagen = imagenes[i];
    cartas[i+mitad].imagen = imagenes[i];
  }
}

// descubre ficha, mostrando imagen
function descubrir(id){
  console.log('Descubro: '+id);
  document.getElementById(id.toString()).src = base_url + "imagenes/autos/" + cartas[id].imagen;
}

// tapa la ficha, colocando el '?'
function tapar(id){
  console.log('Tapando.. '+id);
  document.getElementById(id.toString()).src = base_url + "imagenes/q0.jpeg";
}

function on(){
  jugando = true;
}

function off(){
  jugando = false;
}