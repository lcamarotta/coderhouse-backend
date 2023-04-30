# 🤖  E-commerce back-end API
#### My project for the 'back-end' course of coderhouse.
This is a REST API with Node.js, Express and MongoDB I made to learn back-end programming. \
It is intended to work as the back-end for an ecommerce single page aplication I made [here](https://github.com/lcamarotta/ecommerce-react_app).

## Endpoints:
#### Products

`` GET /api/products ``

Acepts the following params:
- limit='NUMBER'
- page='NUMBER'
- query='STRING':'STRING'
- sort='asc' or 'dsc' (will sort by price)

Returns an object containing mongoose-paginate-v2 data regarding pagination and an array of products as objects.
Example: `` /api/products?limit=5&page=1&query=category:WORK&sort=asc ``

`` GET /api/products/:PRODUCT-ID ``

Search the database for a product with PRODUCT-ID and returns it as an object.

`` POST /api/products ``

This endpoint allows uploading products to database. Expects a JSON as follows

````
{
    "thumbnail": ["testString-1", "testString-2"],
    "category": "CAT-1",
    "price": 1000,  
    "stock": 100,
    "code": "AA001",
    "description": "Description A1B2C3",
    "title": "ProductTitle"
}
````

`` PUT /api/products/:PRODUCT-ID `` \
`` DELETE /api/products/:PRODUCT-ID `` \
#### User's cart
`` GET /api/carts/:cid `` \
`` POST /api/carts/:cid/product/:PRODUCT-ID `` \
`` PUT /api/carts/:cid `` \
`` PUT /api/carts/:cid/products/:PRODUCT-ID `` \
`` DELETE /api/carts/:cid `` \
`` DELETE /api/carts/:cid/products/:PRODUCT-ID ``

## How to run

#### Requirements

- Node.js
- NPM

```
/* First, Install the needed dependencies */
npm install

/* Then run */
npm start

```
`` Author - Lucas Camarotta - ``
