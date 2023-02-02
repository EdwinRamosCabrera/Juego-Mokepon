// console.log('Hola Node');

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const jugadores = [];

class Jugador {
    constructor (id) {
        this.id = id;
    }

    asignarMokepon(mokepon){
        this.mokepon = mokepon
    };
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

app.get('/unirse', (req, res ) => {
    const id = `${Math.random()}`;  
    
    const jugador = new Jugador(id);

    jugadores.push(jugador);

    res.setHeader("Access-Control-Allow-Origin", "*" )

    res.send(id);
})

app.post('/mokepon/:jugadorId', (req, res) => {
    const jugadorId = req.params.jugadorId || ""; // con req tambien puedo traer el body, los headers, params Sino llega se esta colocando una cadena vacia
    const nombre = req.body.mokepon || "";    // solicitamos información del body sobre la variable mokepon
    const mokepon = new Mokepon(nombre);
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);  // findIndex es una funcion que recibe otra funcion para buscar algo, si lo encuentra devuelve un numero positivo que es su posicion y si no devuelve un -1
    
    if(jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon);
    }
    
    console.log(jugadores);
    console.log(jugadorId);
    res.end();
})

app.listen(8080, () => {
    console.log('Servidor funcionando')
})