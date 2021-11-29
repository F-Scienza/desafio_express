const fs = require('fs');

class Contenedor {
	constructor(filename) {
		this.id = 0;
		this.file = filename;
		this.productList = [];
	}

	async init() {
		try {
			let data = await fs.promises.readFile(this.file);
			this.productList = JSON.parse(data);
			for (const element of this.productList) {
				if (element.id > this.id) this.id = element.id;
			}
		} catch (error) {
			console.log('Aun no hay archivo');
		}
		console.log(`inicio el archivo`);

	}

	async getAll() {
		let allProducts = JSON.stringify(this.productList);
		console.log('se ejecutó get all ');
		return allProducts
	}

	async save(object) {
		this.id++;
		object['id'] = this.id;
		this.productList.push(object);
		await this.write();
		return this.id;
	}

	async write() {
		let string = JSON.stringify(this.productList);
		await fs.promises.writeFile(this.file, string);
	}

	async deleteAll() {
		this.productList = [];
		await this.write();
	}

	async getById(searcheId) {
		this.productList[searcheId]
		console.log(`get by id ${searcheId+1}: ${JSON.stringify(this.productList[searcheId])}`);
		return this.productList[searcheId];
	}

	async deleteById(id) {
		this.productList = this.productList.filter(element => element.id != id);
	}
}
module.exports = Contenedor;
