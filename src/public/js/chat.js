const socket = io();

let user;
const inputBox = document.getElementById('inputBox');
const messagesBox = document.getElementById('messagesBox');

Swal.fire({
    title: 'Authenticate',
    input: 'text',
    text: 'Input your email',
    inputValidator: (value) => {
        return !value && "You need to authenticate with a valid email";
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
    socket.emit('authenticated', user);
});

inputBox.addEventListener('keyup', evt => {
    if(evt.key === 'Enter') {
        if(inputBox.value.trim().length>0) {
            socket.emit('newMessage', {
                user,
                message: inputBox.value
            });
            inputBox.value = '';
        }
    }
});

socket.on('messagesLog', data => {
    data.forEach(message => {
        messagesBox.innerHTML += `<p><b>${message.user}</b> says: ${message.message}</p>`
    });
});