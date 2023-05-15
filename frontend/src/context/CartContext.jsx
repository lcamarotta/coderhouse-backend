import { createContext, useState } from "react";
import { addToCart as addToCartAPI } from "../utils/fetchAPI";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {

  const[cartList, setCartList] = useState([])
  const[userCart, setUserCart] = useState()

  const addToCart = ( quantity, product ) => {
    addToCartAPI(userCart._id, product._id, quantity);
  }

  // const totalProducts = () => {
  //   let productsQty = 0
  //   cartList.map( product => productsQty = product.qty + productsQty )
  //   return productsQty
  // }
  
  // const thisProductTotalPrice = (product) => {
  //   return product.qty * product.price
  // }

  // const totalPrice = () => {
  //   let total = 0
  //   cartList.map( product => total = thisProductTotalPrice(product) + total )
  //   return total
  // }

  // const deleteAll = () => {
  //   setCartList([])
  // }
  
  // const deleteProduct = (product) => {
  //   setCartList(cartList.filter(listProduct => listProduct.id != product.id))
  // }

  // const checkout = () => {
  //   let order = {
  //     buyer: {
  //       name: "FakeName",
  //       email: "fake@email.com",
  //       phone: "12341234"
  //     },
  //     total: totalPrice(),
  //     products: cartList.map(  
  //       product => ({
  //         id: product.id,
  //         title: product.title,
  //         price: product.price,
  //         qty: product.qty
  //       })
  //     ),
  //     date: serverTimestamp()
  //   }

  //   const sendOrder = async() => {
  //     const orderRef = doc(collection(db, "orders"))
  //     await setDoc(orderRef, order)
  //     return orderRef
  //   }
  //   sendOrder()
  //     .then(result => {
  //       setOrderID(result.id)
  //       cartList.forEach(async(product) => {
  //         const productRef = doc(db, "products", product.id)
  //         await updateDoc(productRef, {
  //           stock: increment(-product.qty)
  //         })
  //       })
  //       deleteAll()
  //     })
  //     .catch(err => console.log(err))
  // }

  return (
    // <CartContext.Provider value={{ cartList, orderID, addToCart, totalProducts, thisProductTotalPrice, totalPrice, deleteAll, deleteProduct, checkout }}>
    <CartContext.Provider value={{ cartList, addToCart }}>
      { children }
    </CartContext.Provider>
  )
}

export default CartContextProvider;