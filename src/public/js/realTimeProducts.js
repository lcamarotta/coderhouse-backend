const socket = io();
socket.on('productEvent', data => {
    const prodList = document.getElementById("prodList");
    prodList.innerHTML = '<p>Hello world! Dynamic product list:</p>'
    data.forEach(product => {
        prodList.innerHTML += `
        <ul>
            <p>*--------PRODUCT ID ${product.id}--------*</p>
            <li>Code: ${product.code}</li>
            <li>Title: ${product.title}</li>
            <li>Category: ${product.category}</li>
            <li>Description: ${product.description}</li>
            <li>Price: ${product.price}</li>
            <li>Stock: ${product.stock}</li>
            <li>Thumbnail: ${product.thumbnail}</li>
        </ul>
        <br>
    `
    });
})