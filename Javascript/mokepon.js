const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionSeleccionarReiniciar = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton-mascota');

const botonReiniciar = document.getElementById('boton-reiniciar');

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const spanMascotaJugador = document.getElementById('mascota-jugador');

const spanMascotaEnemigo = document.getElementById('mascota-enemigo');

const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');

const sectionMensajes = document.getElementById('resultado');
const ataqueDelJugador = document.getElementById('ataque-del-jugador');
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo');
const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const contenedorAtaques = document.getElementById('contenedorAtaques');

const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');

let mokepones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let inputHipodoge; 
let inputCapipego; 
let inputRatiqueya;
let mascotaJugador;
let mascotaJugadorObjeto;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let botonFuego;
let botonAgua;
let botonTierra;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasJugador = 3;
let vidasEnemigo = 3;
let lienzo = mapa.getContext('2d');
let intervalo;
let mapaBackground = new Image();
mapaBackground.scr = './Imagenes/mokemap.png'
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 600;

if(anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20;
}

alturaQueBuscamos = anchoDelMapa * 600 / 800;

mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, /* x = 10, y = 10 */){
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.ancho = 40;
        this.alto = 40;
        // this.x = x;
        // this.y = y;
        this.x = aleatorio(0, mapa.width - this.ancho);
        this.y = aleatorio(0, mapa.height - this.alto);
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa;
        this.velocidadX = 0;
        this.velocidadY = 0;
        this.fondo = new Image();
        this.fondo.src = '/Imagenes/mokemap.png'
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto, this.x, this.y, this.ancho, this.alto);
    }

}

let hipodoge = new Mokepon ('Hipodoge', '/Imagenes/mokepon_hipodoge_attack.png', 5, '/Imagenes/hipodoge_mini.png');
let capipepo = new Mokepon ('Capipepo', '/Imagenes/mokepon_capipepo_attack.png', 5, '/Imagenes/capipepo_mini.png');
let ratigueya = new Mokepon ('Ratigueya', '/Imagenes/mokepon_ratigueya_attack.png', 5, '/Imagenes/ratigueya_mini.png');

let hipodogeEnemigo = new Mokepon ('Hipodoge', '/Imagenes/mokepon_hipodoge_attack.png', 5, '/Imagenes/hipodoge_mini.png'/* , 80, 120 */);
let capipepoEnemigo = new Mokepon ('Capipepo', '/Imagenes/mokepon_capipepo_attack.png', 5, '/Imagenes/capipepo_mini.png'/* , 150, 95 */);
let ratigueyaEnemigo = new Mokepon ('Ratigueya', '/Imagenes/mokepon_ratigueya_attack.png', 5, '/Imagenes/ratigueya_mini.png'/* , 200, 190 */);

hipodoge.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🍀', id: 'boton-tierra'},
);

hipodogeEnemigo.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🍀', id: 'boton-tierra'},
);

capipepo.ataques.push(
    {nombre: '🍀', id: 'boton-tierra'},
    {nombre: '🍀', id: 'boton-tierra'},
    {nombre: '🍀', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},    
);

capipepoEnemigo.ataques.push(
    {nombre: '🍀', id: 'boton-tierra'},
    {nombre: '🍀', id: 'boton-tierra'},
    {nombre: '🍀', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},    
);

ratigueya.ataques.push(
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🍀', id: 'boton-tierra'},
);

ratigueyaEnemigo.ataques.push(
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🍀', id: 'boton-tierra'},
);

mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarJuego() {

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML +=  opcionDeMokepones;  

        inputHipodoge = document.getElementById('Hipodoge');
        inputCapipego = document.getElementById('Capipepo');
        inputRatiqueya = document.getElementById('Ratigueya');

    });
    
    sectionSeleccionarAtaque.style.display = 'none';
    sectionSeleccionarReiniciar.style.display = 'none';

    sectionVerMapa.style.display = 'none';

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);

    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarMascotaJugador() {
 
    sectionSeleccionarMascota.style.display = 'none';
   
    sectionVerMapa.style.display = 'flex';
 
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id;
        mascotaJugador = inputHipodoge.id;
    } else if (inputCapipego.checked) {
        spanMascotaJugador.innerHTML = inputCapipego.id;
        mascotaJugador = inputCapipego.id;
    } else if (inputRatiqueya.checked) {
        spanMascotaJugador.innerHTML = inputRatiqueya.id;
        mascotaJugador = inputRatiqueya.id;
    } else {
        alert("No seleccionaste a ninguna mascota")
        location.reload();
    }

    extraerAtaques(mascotaJugador);
    iniciarMapa();
    
}

function extraerAtaques(mascotaJugador) {
    let ataques;
    for (let i = 0; i < mokepones.length; i++) {
       if(mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
       }       
    }
    
    mostrarAtaques(ataques); 
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `<button id="${ataque.id}" class="boton-de-ataque BAtaque">${ataque.nombre}</button>`;
        // Renderizado de cada ataque del personajes
        contenedorAtaques.innerHTML += ataquesMokepon;
    })

    // Seleccionar botones luego de crearlos
    botonTierra = document.getElementById('boton-tierra');
    botonFuego = document.getElementById('boton-fuego');
    botonAgua = document.getElementById('boton-agua');
    botones = document.querySelectorAll('.BAtaque')

    console.log(botones)
}

function secuenciaAtaques() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent === '🔥'){
                ataqueJugador.push('FUEGO');
                console.log(ataqueJugador);
                boton.style.background = '#112f58';
                boton.disabled = true;
            } else if(e.target.textContent === '💧'){
                ataqueJugador.push('AGUA');
                console.log(ataqueJugador);
                boton.style.background = '#112f58';
                boton.disabled = true;
            } else{
                ataqueJugador.push('TIERRA');
                console.log(ataqueJugador);
                boton.style.background = '#112f58';
                boton.disabled = true;
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo(enemigo) {
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1);

    spanMascotaEnemigo.innerHTML = enemigo.nombre;
    ataquesMokeponEnemigo = enemigo.ataques;
    console.log(ataquesMokeponEnemigo);
    secuenciaAtaques();
}

function aleatorio(min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min);
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1 ) {
        ataqueEnemigo.push('FUEGO');
    } else if(ataqueAleatorio == 3 || ataqueAleatorio == 4 ) {
        ataqueEnemigo.push('AGUA');
    } else {
        ataqueEnemigo.push('TIERRA');
    }
    console.log(ataqueEnemigo);
    iniciarPelea();
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate();
    }
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador= ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index);
            crearMensaje("EMPATE");
        } else if(ataqueJugador[index] == 'FUEGO' && ataqueEnemigo[index] == 'TIERRA') {
            indexAmbosOponente(index, index);
            crearMensaje("GANASTE 🎉");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else if(ataqueJugador[index] == 'AGUA' && ataqueEnemigo[index] == 'FUEGO') {
            indexAmbosOponente(index, index);
            crearMensaje("GANASTE 🎉");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else if(ataqueJugador[index] == 'TIERRA' && ataqueEnemigo[index] == 'AGUA') {
            indexAmbosOponente(index, index);
            crearMensaje("GANASTE 🎉");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else {
            indexAmbosOponente(index, index);
            crearMensaje("PERDISTE");
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        }
    }

    revisarVidas();
    
}

function revisarVidas() {
    if (victoriasJugador == victoriasEnemigo) {
        crearMensajeFinal("EMPATE");
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES!!! Ganaste");
    } else {
        crearMensajeFinal("LO SIENTO! Perdiste");
    }
}

function crearMensaje(resultado) {

    //let notificacion = document.createElement('p');
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    //notificacion.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

    
    // sectionMensajes.appendChild(notificacion);
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);

    //let parrafo = document.createElement('p');
    //parrafo.innerHTML = 'Tú mascota atacó con ' + ataqueJugador + ', la mascota del enemigo atacó con ' + ataqueEnemigo + ' - ' + resultado;
    //sectionMensajes.appendChild(parrafo);
}

function crearMensajeFinal(resultadoFinal) {
 
    // let parrafo = document.createElement('p');
    sectionMensajes.innerHTML = resultadoFinal;

    // sectionMensajes.appendChild(parrafo);
    
    sectionSeleccionarReiniciar.style.display = 'block';
}

function reiniciarJuego() {
    location.reload();
}

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
    lienzo.clearRect(0, 0, mapa.width, mapa.height);  
    lienzo.drawImage(mascotaJugadorObjeto.fondo, 0, 0, mapa.width, mapa.height) 
/*     lienzo.drawImage(mascotaJugadorObjeto.mapaFoto, mascotaJugadorObjeto.x, mascotaJugadorObjeto.y, mascotaJugadorObjeto.ancho, mascotaJugadorObjeto.alto); */
    mascotaJugadorObjeto.pintarMokepon();
    hipodogeEnemigo.pintarMokepon();
    capipepoEnemigo.pintarMokepon();
    ratigueyaEnemigo.pintarMokepon();

    if(mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColision(hipodogeEnemigo);
        revisarColision(capipepoEnemigo);
        revisarColision(ratigueyaEnemigo);
    }
}

function moverDerecha() {
/*     capipepo.x = capipepo.x + 5;
    pintarPersonaje(); */
    mascotaJugadorObjeto.velocidadX = 5;
}

function moverIzquierda() {
/*     capipepo.x = capipepo.x - 5;
    pintarPersonaje(); */
    mascotaJugadorObjeto.velocidadX = -5;
}

function moverArriba() {
 /*    capipepo.y = capipepo.y - 5;
    pintarPersonaje(); */
    mascotaJugadorObjeto.velocidadY = -5;
}

function moverAbajo() {
/*     capipepo.y = capipepo.y + 5;
    pintarPersonaje(); */
    mascotaJugadorObjeto.velocidadY = 5;
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0;
    mascotaJugadorObjeto.velocidadY = 0;
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba();
            break;
        case 'ArrowDown':
            moverAbajo();
            break;
        case 'ArrowLeft':
            moverIzquierda();
            break;
        case 'ArrowRight':
            moverDerecha();
            break;
        default:
            break;
    }
}

function iniciarMapa() {
   // mapa.width = 400;
   // mapa.height = 300;
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50);
    window.addEventListener('keydown', sePresionoUnaTecla);
    window.addEventListener('keyup', detenerMovimiento);
    
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre) {
             return mokepones[i];
        }       
     }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x 

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y +mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(  // no hay colision
        abajoMascota < arribaEnemigo || 
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
        ) {
            return
    }
    detenerMovimiento()
    clearInterval(intervalo);
    console.log('se detecto una colison');
    sectionSeleccionarAtaque.style.display = 'flex';
    sectionVerMapa.style.display = 'none';
    seleccionarMascotaEnemigo(enemigo);
    //alert('Hay colision con '+ enemigo.nombre);
}

window.addEventListener('load', iniciarJuego);



