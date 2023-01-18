class ProductManager {

  constructor() {
    this.products = []
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    let id

    if(this.products.find( product => product.code === code )){
      console.log('Error - code already exist\n')
      return
    }

    if(title === undefined || description === undefined || price === undefined || thumbnail === undefined || code === undefined || stock === undefined){
      console.log('Error - one or more fields missing\n')
      return
    }
    
    if (this.products.length === 0) {
      id = 1;
    } else {
      id = this.products[this.products.length - 1].id + 1;
    }
    
    const product = {
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
      id: id,
    }

    this.products.push(product)
    console.log('Success\n')
    return
  }

  getProducts() {
    return this.products
  }

  getProductsById(id) {
    const prodIndex = this.products.findIndex(product => product.id === id)
    if(prodIndex === -1) return 'Error - not found\n'
    return this.products[prodIndex]
  }
}
//::UNCOMMENT TO TEST::

// const myProductsManager = new ProductManager();

// console.log('Test 0 - should get empty array')
// console.log(myProductsManager.getProducts(), '\n')

// console.log('Test 1 - add product')
// myProductsManager.addProduct('Banana', 'Yellow', 20, 'thumbnail', 'afg6a541', 50)

// console.log('Test 2 - add product')
// myProductsManager.addProduct('Orange', 'Orange', 10, 'thumbnail', '6546a2d1', 10)

// console.log('Test 3 - add product')
// myProductsManager.addProduct('Anana', 'White', 90, 'thumbnail', 'hfg6d5as', 30)

// console.log('Test 4 - add product with same code')
// myProductsManager.addProduct('Apple', 'Green', 10, 'thumbnail', 'hfg6d5as', 70)

// console.log('Test 5 - add product missing info')
// myProductsManager.addProduct('Anana', 'White', 90)

// console.log('Test 6 - get prod by ID 22')
// console.log(myProductsManager.getProductsById(22))

// console.log('Test 7 - get prod by ID 2')
// console.log(myProductsManager.getProductsById(2),'\n')

// console.log('Test 8 - Get all products')
// console.log(myProductsManager.getProducts())

//::TEST::