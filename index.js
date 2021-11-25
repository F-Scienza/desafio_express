//  Realizar un proyecto de servidor basado en node.js 
//  que utilice el módulo express e implemente los siguientes
//  endpoints en el puerto 8080:
//      Ruta get '/productos' que devuelva un array con 
//      todos los productos disponibles en el servidor
//      Ruta get '/productoRandom' que devuelva un producto 
//      elegido al azar entre todos los productos disponibles
//  Incluir un archivo de texto 'productos.txt' 
//  y utilizar la clase Contenedor del desafío anterior para
//  acceder a los datos persistidos del servidor.
const express = require('express')
const Contenedor = require('./contenedor')

const app = express()
const PORT = 8080
app.listen(process.env.PORT || PORT);

const productos = new Contenedor('products.json');

let lista = productos.init();

let lista2 =  productos.getAll()

console.log(lista);
console.log(lista2);


app.get('/productos', (req, res)=>{
    res.send({msj: lista})
})

app.get('/productoRandom', (req, res) => {
    function randomId(min, max) {
			return Math.random() * (max - min) + min;
		}
    let idRandom = parseInt(randomId(0,productos.id))
    let randomProduct = productos.getById(idRandom);
    
    res.send({ randomProduct })
}); 