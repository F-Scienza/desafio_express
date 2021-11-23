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
			console.log('Last ID: ', this.id);
		} catch (error) {
			console.log('Aun no hay archivo');
		}
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

	async getAll() {
		let allProducts = this.productList;
		return allProducts;
	}

	async deleteAll() {
		this.productList = [];
		await this.write();
	}

	async getById(id) {
		this.productList.map();
	}

	async deleteById(id) {
		this.productList = this.productList.filter(element => element.id != id);
	}
}
module.exports = Contenedor;