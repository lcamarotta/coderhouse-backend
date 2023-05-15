# 🤖  E-commerce back-end API
#### My project for the 'back-end' course of coderhouse.
This is a REST API with Node.js, Express and MongoDB I made to learn back-end programming.

## Endpoints:
#### Products

`` GET /api/products ``

Acepts the following params:
- limit='NUMBER'
- page='NUMBER'
- query='STRING':'STRING'
- sort='asc' or 'dsc' (will sort by price) \
Example: `` /api/products?limit=5&page=1&query=category:WORK&sort=asc ``

Returns an object containing mongoose-paginate-v2 data regarding pagination and an array of products as objects.

`` GET /api/products/:PRODUCT-ID ``
Search the database for a product with PRODUCT-ID and returns it as an object.

`` POST /api/products ``
Requires admin authentication. This endpoint allows uploading products to database.

`` PUT /api/products/:PRODUCT-ID ``
Requires admin authentication. This endpoint allows editing data of a product. Expects a JSON like above.

`` DELETE /api/products/:PRODUCT-ID ``
Requires admin authentication. Delete a product from database.

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
