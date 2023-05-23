import { backendURL } from "./config";

const getProducts = async(query, queryData, page) => {

  if(query === 'category'){
    const url = queryData == 'all' ? `${backendURL}/api/products?limit=6&page=${page}&sort=asc` : `${backendURL}/api/products?limit=6&page=${page}&query=category:${queryData}&sort=asc`
    let response = await fetch(url);
    response = response.json();
    return response;
  };
  
  if(query === 'productById'){
    const url = `${backendURL}/api/products/${queryData}`
    let response = await fetch(url);
    response = response.json();
    return response;
  };

}

const getUser = async() => {
  try {
    let response = await fetch(`${backendURL}/api/sessions/current`, {
      method: 'GET',
      credentials: 'include',
    })
    response = await response.json();
    return response.payload;

  } catch (error) {
    console.error('There was an error getUser', error);
    return;
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
    return response.payload;
  } catch (error) {
    console.error('There was an error emailLogin', error);
    return;
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
    return response.payload;
  } catch (error) {
    console.error('There was an error emailLogin', error);
    return;
  }
}

const logout = async() => {
  try {
    let response = await fetch(`${backendURL}/api/sessions/logout`, {
      method: 'GET',
      credentials: 'include',
    })
    response = await response.json();
    return response.payload;

  } catch (error) {
    console.error('There was an error logout', error);
    return;
  }
}

const addToCart = async(cid, pid, quantity) => {
  const url = `${backendURL}/api/carts/${cid}/product/${pid}/${quantity}`
  let response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
  })
  response = await response.json();
  console.log(response)
  return response;
}

const getCart = async(cartid) => {
  try {
    let response = await fetch(`${backendURL}/api/carts/${cartid}`, {
      method: 'GET',
      credentials: 'include',
    })
    response = await response.json();
    console.log(response)
    return response.payload;

  } catch (error) {
    console.error('There was an error getCart', error);
    return;
  }
}

const deleteCart = async(cartId) => {
  try {
    let response = await fetch(`${backendURL}/api/carts/${cartId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    response = await response.json();
    console.log(response)
    return response.payload;

  } catch (error) {
    console.error('There was an error deleteCart', error);
    return;
  }
}

const deleteProductFromCart = async(cartId, productId) => {
  try {
    let response = await fetch(`${backendURL}/api/carts/${cartId}/products/${productId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    response = await response.json();
    console.log(response)
    return response.payload;

  } catch (error) {
    console.error('There was an error deleteProductFromCart', error);
    return;
  }
}

export { getProducts, getUser, emailLogin, registerUser, logout, addToCart, getCart, deleteCart, deleteProductFromCart};