import { createContext, useState } from "react";
import { addToCart as addToCartAPI, getCart as getCartAPI, deleteCart as deleteCartAPI, deleteProductFromCart as deleteProductFromCartAPI } from "../utils/fetchAPI";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {

  const[cartProducts, setCartProducts] = useState([])
  const[userCartId, setUserCartId] = useState(null)

  const setCartFromAPI = async( cartId ) => {
    const userCart = await getCartAPI(cartId)
    const productList = [];
    userCart.products.forEach(product => {
      productList.push(product)
    });
    setCartProducts(productList);
    setUserCartId(cartId)
    return;
  }

  const addToCart = async( quantity, product ) => {
    await addToCartAPI(userCartId, product._id, quantity);
    await setCartFromAPI(userCartId);
  }

  const totalProducts = () => {
    let productsQuantity = 0
    cartProducts.map( product => productsQuantity = product.quantity + productsQuantity )
    return productsQuantity
  }
  
  const thisProductTotalPrice = (item) => {
    return item.quantity * item.product.price;
  }

  const totalPrice = () => {
    let total = 0
    cartProducts.map( product => total = thisProductTotalPrice(product) + total )
    return total
  }

  const deleteAll = async() => {
    await deleteCartAPI(userCartId);
    await setCartFromAPI(userCartId);
  }
  
  const deleteProduct = async(product) => {
    await deleteProductFromCartAPI(userCartId, product.product._id);
    await setCartFromAPI(userCartId);
  }
  
  const checkout = () => {
    return false
  }//to do

  return (
    <CartContext.Provider value={{ cartProducts, setCartFromAPI, addToCart, deleteAll, deleteProduct, thisProductTotalPrice, totalProducts, totalPrice, checkout }}>
      { children }
    </CartContext.Provider>
  )
}

export default CartContextProvider;