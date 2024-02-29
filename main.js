class ProductManager {
    constructor() {
        this.products = []
    }

    generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
    }

    getProducts() {
        return this.products
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        if (this.products.some(product => product.code === code)) {
            throw new Error('Error: Código de producto repetido.')
        }

        const id = this.generateUniqueId()

        const newProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }

        this.products.push(newProduct)

        return id
    }

    getProductById(productId) {
        const product = this.products.find(product => product.id === productId)
        if (!product) {
            throw new Error('Error: Producto no encontrado.')
        }

        return product
    }
}

const productManagerInstance = new ProductManager()

let productId

try {
    productId = productManagerInstance.addProduct({
        title: 'producto prueba',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'abc123',
        stock: 25,
    })

    console.log(productManagerInstance.getProducts())

    // Intentar agregar un producto con el mismo código debería lanzar un error
    const productIdDuplicate = productManagerInstance.addProduct({
        title: 'producto prueba duplicado',
        description: 'Este es otro producto prueba',
        price: 250,
        thumbnail: 'Otra imagen',
        code: 'abc123',
        stock: 15,
    })
} catch (error) {
    console.error(error.message)
}

try {
    // Intentar obtener un producto con un ID inexistente debería lanzar un error
    const nonExistentProductId = 'id_que_no_existe'
    const productNotFound = productManagerInstance.getProductById(nonExistentProductId)
} catch (error) {
    console.error(error.message)
}

try {
    // Obtener un producto por ID debería funcionar correctamente
    const existingProduct = productManagerInstance.getProductById(productId)
    console.log(existingProduct)
} catch (error) {
    console.error(error.message)
}