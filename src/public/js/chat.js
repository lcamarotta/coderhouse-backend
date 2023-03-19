const socket = io();

let user;
const inputBox = document.getElementById('inputBox');
const messagesLog = document.getElementById('messagesLog');

Swal.fire({
    title: 'Identificate',
    input: 'text',
    text: 'Ingresa el usuario para identificarte en el chat',
    inputValidator: (value) => {
        return !value && "Necesitas escribir un nombre de usuario";
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
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
        messagesLog.innerHTML += `<p>${message.user} says: ${message.message}</p>`
    });
});