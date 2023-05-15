const baseUrl = 'http://localhost:8080';

const getProducts = async(query, queryData, page) => {

  if(query === 'category'){
    const url = queryData == 'all' ? `${baseUrl}/api/products?limit=6&page=${page}&sort=asc` : `${baseUrl}/api/products?limit=6&page=${page}&query=category:${queryData}&sort=asc`
    let response = await fetch(url);
    response = response.json();
    return response;
  };
  
  if(query === 'productById'){
    const url = `${baseUrl}/api/products/${queryData}`
    let response = await fetch(url);
    response = response.json();
    return response;
  };

}

const addToCart = async(cid, pid, quantity) => {
  const url = `${baseUrl}/${cid}/product/${pid}/${quantity}`
  let response = await fetch(url, {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    body: JSON.stringify({}), // body data type must match "Content-Type" header
  });
  response = response.json();
  console.log(response)
  return response;
}

const getUser = async() => {
  try {
    let response = await fetch(`${baseUrl}/api/sessions/current`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Cookie': 'session-id',
      },
    })
    if (!response.ok) return response;
    response = await response.json();
    console.log('consolelog getUser',response);
    return response.payload;
  } catch (error) {
    console.error('There was an error getUser', error);
    return;
  }
}

const emailLogin = async(formData) => {
  try {
    let response = await fetch(`${baseUrl}/api/sessions/login`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    
    })
    if (!response.ok) return response;
    response = await response.json();
    console.log(response.payload);
    return response.payload;
  } catch (error) {
    console.error('There was an error emailLogin', error);
    return;
  }
}

export { getProducts, addToCart, getUser, emailLogin };