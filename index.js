// console.log('Hola Node');

const express = require('express');
const cors = require('cors');
const { response } = require('express');

const app = express();
app.use(express.static('public'))  
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

    actualizarPosicion(x, y) {
        this.x = x;
        this.y = y;
    }

    asignarAtaques(ataques) {
        this.ataques = ataques;
    }
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
    res.end();   // Respondemos algo en este caso un dato vacio
})

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || "";
    const x = req.body.x || 0;
    const y = req.body.y || 0;

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);

    if(jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y);
    }

    const enemigos = jugadores.filter((jugador) => jugadorId != jugador.id)       // filter es un metod de js que nos permite ejecutar sobre las listas con filtro, con esto vamos a devolver a todos los enemigos


    res.send({          //en expres.js solo puedes devolver un json no una lista
        enemigos
    }) 

})

app.post('/mokepon/:jugadorId/ataques', (req, res) => {
    const jugadorId = req.params.jugadorId || ""; 
    const ataques = req.body.ataques || [];   

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);  
    
    if(jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataques);
    }
    
    res.end();   
})

app.get("/mokepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""; 
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId)
    res.send({
        ataques: jugador.ataques || []
    })
})

app.listen(8080, () => {
    console.log('Servidor funcionando')
})