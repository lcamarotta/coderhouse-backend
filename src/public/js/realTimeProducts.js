const socket = io();
socket.on('productEvent', data => {
    const prodList = document.getElementById("prodList");
    data.forEach(product => {
        prodList.innerHTML += `<li>Code: ${product.code}</li>`
    });
    // prodList.innerHTML = `
    //     <p>*--------PRODUCT ID ${data.id}--------*</p>
    //     <li>Code: ${data.code}</li>
    //     <li>Title: ${data.title}</li>
    //     <li>Categpry: ${data.category}</li>
    //     <li>Description:${data.description}</li>
    //     <li>Price: ${data.price}</li>
    //     <li>Stock: ${data.stock}</li>
    //     <li>Thumbnail: ${data.thumbnail}</li>
    //     `
})