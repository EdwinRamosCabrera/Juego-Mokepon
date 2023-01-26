const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionSeleccionarReiniciar = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton-mascota');
const botonTierra = document.getElementById('boton-tierra');
const botonFuego = document.getElementById('boton-fuego');
const botonAgua = document.getElementById('boton-agua');
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

let mokepones = [];
let ataqueJugador;
let ataqueEnemigo;
let opcionDeMokepones;
let inputHipodoge; 
let inputCapipego; 
let inputRatiqueya;
let mascotaJugador;
let vidasJugador = 3;
let vidasEnemigo = 3;

class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
    }
}

let hipodoge = new Mokepon ('Hipodoge', '/Imagenes/mokepon_hipodoge_attack.png', 5);
let capipepo = new Mokepon ('Capipepo', '/Imagenes/mokepon_capipepo_attack.png', 5);
let ratigueya = new Mokepon ('Ratigueya', '/Imagenes/mokepon_ratigueya_attack.png', 5);

hipodoge.ataques.push(
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

ratigueya.ataques.push(
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
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    botonFuego.addEventListener('click', ataqueFuego);
    botonAgua.addEventListener('click', ataqueAgua);   
    botonTierra.addEventListener('click', ataqueTierra);
    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarMascotaJugador() {
 
    sectionSeleccionarMascota.style.display = 'none';
    sectionSeleccionarAtaque.style.display = 'flex';

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
    }

    extraerAtaques(mascotaJugador);
    seleccionarMascotaEnemigo();
}

function extraerAtaques(mascotaJugador){
    let ataques;
    for (let i = 0; i < mokepones.length; i++) {
        
        
    }
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1);

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
}

function aleatorio(min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min);
}

function ataqueFuego() {
    ataqueJugador = 'FUEGO';
    ataqueAleatorioEnemigo();
}

function ataqueAgua() {
    ataqueJugador = 'AGUA';
    ataqueAleatorioEnemigo();
}

function ataqueTierra() {
    ataqueJugador = 'TIERRA';
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3);

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO';
    } else if(ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA';
    } else {
        ataqueEnemigo = 'TIERRA';
    }

    combate();
}

function combate() {


    if (ataqueJugador == ataqueEnemigo) {
        crearMensaje("EMPATE");
    } else if (ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') {
        crearMensaje("GANASTE 🎉");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') {
        crearMensaje('GANASTE 🎉');
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
        crearMensaje('GANASTE 🎉');
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else {
        crearMensaje('PERDISTE')
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
    }

    revisarVidas();
    
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("FELICITACIONES!!! Ganaste");
    } else if (vidasJugador == 0) {
        crearMensajeFinal("LO SIENTO! Perdiste");
    }
}

function crearMensaje(resultado) {

    //let notificacion = document.createElement('p');
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    //notificacion.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

    
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
    
    botonFuego.disabled = true;
    botonAgua.disabled = true;  
    botonTierra.disabled = true;
    
    sectionSeleccionarReiniciar.style.display = 'block';
}

function reiniciarJuego() {
    location.reload();
}

window.addEventListener('load', iniciarJuego);

/*
document.addEventListener('click', () => {
    alert("Selecionaste tu poder!!!")
})
*/