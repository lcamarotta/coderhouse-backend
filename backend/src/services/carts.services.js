import { mail_purchase_ticket } from "./mailer.services.js";
import { getByIdService as getProductByIdService, updateOneByIdService as updateOneProductByIdService } from "./products.services.js";
import { isProductInCartRepository, getByIdRepository, updateRepository, deleteAllRepository, deleteByIdRepository, createCartRepository, createPurchaseRepository, getPurchaseByEmailRepository } from "../repository/carts.repository.js";
import CustomError from "./errors/CustomError.js";
import EErrors from "./errors/enums.js";
import { getUserService } from "./sessions.services.js";

const createCartService = async() => await createCartRepository();

const isProductInCartService = async(cid, pid) => await isProductInCartRepository(cid, pid);

const getByIdService = async(cid) => await getByIdRepository(cid);

const updateService = async(cid, pid, quantity, user) => {
    const storedUser = await getUserService(user.email);
    if(!storedUser || storedUser.role == undefined) throw CustomError.createError(EErrors.FORBIDDEN, 'Bad User Role')
    if(storedUser.role == 'premium'){
        const storedProduct = await getProductByIdService(pid);
        if(storedProduct[0].owner == storedUser.email) throw CustomError.createError(EErrors.FORBIDDEN, 'You can not add your own products to cart');
    }
    return await updateRepository(cid, pid, quantity);
}

const updateManyService = async(cid, array, user) => {
    const result = [];
    for (const product of array) {
        result.push(await updateService(cid, product.productId, product.quantity, user));
    }
    return result;
};

const deleteAllService = async(cid) => await deleteAllRepository(cid);

const deleteByIdService = async(cid, pid) => await deleteByIdRepository(cid, pid);

const getPurchaseByEmailService = async(email) => await getPurchaseByEmailRepository(email);

const purchaseService = async(cid, user) => {
    const cart = await getByIdService(cid);
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
        await deleteByIdService(cid, product.product._id,);
    }

    //make order for products in stock
    const result = await createPurchaseRepository( user.email, productsInStock );
    
    //mail user
    mail_purchase_ticket(user.email, result) //async

    //update stocks
    for (const product of productsInStock) {
        const update = product.product;
        update.stock = update.stock - product.quantity;
        await updateOneProductByIdService(product.product._id, update);
    }
    
    return result;
};

export {
    createCartService,
    isProductInCartService,
    getByIdService,
    updateService,
    updateManyService,
    deleteAllService,
    deleteByIdService,
    getPurchaseByEmailService,
    purchaseService
}