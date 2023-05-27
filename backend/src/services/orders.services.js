import { createRepository, getByEmailRepository } from "../repository/orders.repository.js";
import { getByIdService as getProductByIdService, updateOneByIdService as updateOneProductByIdService } from "./products.services.js";
import { getByIdService as getByIdCartService, deleteByIdService as deleteByIdCartService } from "./carts.services.js";

const getByEmailService = async(email) => await getByEmailRepository(email);

const checkoutService = async(cartId, user) => {
    const cart = await getByIdCartService(cartId);
    const productsInStock = [];

    //check if there is enough stock for each product
    for (const cartItem of cart.products) {
        const thisProductInDB = await getProductByIdService(cartItem.product._id);
        const isProductInStock = Number(cartItem.quantity) <= Number(thisProductInDB[0].stock);
        if(isProductInStock) productsInStock.push(cartItem);  
    }

    //return -1 if all products are out of stock
    if(productsInStock.length == 0) return -1;

    //keep items out of stock in cart, remove others
    for (const product of productsInStock) {
        await deleteByIdCartService(cartId, product.product._id,);
    }

    //make order for products in stock
    const result = await createRepository( user.email, productsInStock );
    
    //update stocks
    for (const product of productsInStock) {
        const update = product.product;
        update.stock = update.stock - product.quantity;
        await updateOneProductByIdService(product.product._id, update);
    }
    console.log('RESULT OF CREATE ORDER SERVICE  ==  ', result);
    return result;
};

export {
    getByEmailService,
    checkoutService
}