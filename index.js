const express = require('express')
const Contenedor = require('./contenedor')

const app = express()
const PORT = 8080
app.listen(process.env.PORT || PORT);

const productos = new Contenedor('products.json');
productos.init()

app.get('/productos', async (req, res) => {
	let lista = await productos.getAll();
	console.log(lista);
	res.send( JSON.parse(lista) );
});

app.get('/productoRandom', async (req, res) => {
    function randomId(min, max) {
			return Math.random() * (max - min) + min;
		}
	let idRandom = parseInt(randomId(0, productos.id))
	let randomProduct = await productos.getById(idRandom);
    res.send(randomProduct);
}); 