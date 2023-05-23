import { backendURL, devMode } from "./config";

const getProducts = async(query, queryData, page) => {
  try {
    if(query === 'category'){
      const url = queryData == 'all' ? `${backendURL}/api/products?limit=6&page=${page}&sort=asc` : `${backendURL}/api/products?limit=6&page=${page}&query=category:${queryData}&sort=asc`
      let response = await fetch(url);
      response = await response.json();
      if(devMode) console.log('getProductsAPI response:', response);
      return response;
    };
    
    if(query === 'productById'){
      const url = `${backendURL}/api/products/${queryData}`
      let response = await fetch(url);
      response = await response.json();
      if(devMode) console.log('getProductsAPI response:', response);
      return response;
    };
  } catch (error) {
    console.error('There was an error getProducts API', error);
    return -1;
  }
}

const getUser = async() => {
  try {
    let response = await fetch(`${backendURL}/api/sessions/current`, {
      method: 'GET',
      credentials: 'include',
    })
    response = await response.json();
    if(devMode) console.log('getUserAPI response:', response);
    return response.payload;

  } catch (error) {
    console.error('There was an error getUser API', error);
    return -1;
  }
}

const emailLogin = async(formData) => {
  try {
    let response = await fetch(`${backendURL}/api/sessions/login`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    
    })
    if (!response.ok) return response;
    response = await response.json();
    if(devMode) console.log('loginAPI response:', response);
    return response.payload;
  } catch (error) {
    console.error('There was an error emailLogin API', error);
    return -1;
  }
}

const registerUser = async(formData) => {
  try {
    let response = await fetch(`${backendURL}/api/sessions/register`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    
    })
    if (!response.ok) return response;
    response = await response.json();
    if(devMode) console.log('registerUser API response:', response);
    return response.payload;
  } catch (error) {
    console.error('There was an error registerUser API', error);
    return -1;
  }
}

const logout = async() => {
  try {
    let response = await fetch(`${backendURL}/api/sessions/logout`, {
      method: 'GET',
      credentials: 'include',
    })
    response = await response.json();
    if(devMode) console.log('logoutAPI response:', response);
    return response.payload;

  } catch (error) {
    console.error('There was an error logout API', error);
    return -1;
  }
}

const addToCart = async(cid, pid, quantity) => {
try {
  const url = `${backendURL}/api/carts/${cid}/product/${pid}/${quantity}`
  let response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
  })
  response = await response.json();
  if(devMode) console.log('addToCartAPI response:', response);
  return response;
} catch (error) {
  console.error('There was an error addToCart API', error);
  return -1;
}
}

const getCart = async(cartid) => {
  try {
    let response = await fetch(`${backendURL}/api/carts/${cartid}`, {
      method: 'GET',
      credentials: 'include',
    })
    response = await response.json();
    if(devMode) console.log('getCartaAPI response:', response);
    return response.payload;

  } catch (error) {
    console.error('There was an error getCart API', error);
    return -1;
  }
}

const deleteCart = async(cartId) => {
  try {
    let response = await fetch(`${backendURL}/api/carts/${cartId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    response = await response.json();
    if(devMode) console.log('deleteCartAPI response:', response);
    return response.payload;

  } catch (error) {
    console.error('There was an error deleteCart API', error);
    return -1;
  }
}

const deleteProductFromCart = async(cartId, productId) => {
  try {
    let response = await fetch(`${backendURL}/api/carts/${cartId}/products/${productId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    response = await response.json();
    if(devMode) console.log('deleteProdFromCartAPI response:', response);
    return response.payload;

  } catch (error) {
    console.error('There was an error deleteProductFromCart API', error);
    return -1;
  }
}

const checkout = async(cartId) => {
  try {
    let response = await fetch(`${backendURL}/api/carts/${cartId}/checkout`, {
      method: 'GET',
      credentials: 'include',
    })
    response = await response.json();
    if(devMode) console.log('checkoutAPI response:', response);
    return response.payload;

  } catch (error) {
    console.error('There was an error checkout API', error);
    return -1;
  }
}

export { getProducts, getUser, emailLogin, registerUser, logout, addToCart, getCart, deleteCart, deleteProductFromCart, checkout };