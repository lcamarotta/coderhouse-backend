const socket = io();
socket.on('productEvent', data => {
    const prodList = document.getElementById("prodList");
    prodList.innerHTML = '<h1>Hello world! Dynamic product list:</h1> <br>'
    data.forEach(product => {
        prodList.innerHTML += `
        <ul>
            <p><b>*--------PRODUCT ID ${product._id}--------*</b></p>
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