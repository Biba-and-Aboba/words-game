const socket = io();


const label = document.querySelector('#word'),
    joinGame = document.querySelector('.join-game'),
    onlineUsers = document.querySelector('#onlineUsers'),
    alertMessage = document.querySelector('#alertMessage');

if(window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

joinGame.addEventListener('submit', (event) => {
    event.preventDefault();

    const word = event.target.inputWord.value;
    socket.emit('word', (word));
    event.target.inputWord.value = '';

});

socket.on ('msg', (word) => {
    label.innerText = word;
});

socket.on('activeUsers', (users) => {
    onlineUsers.innerHTML = users.map(user => `<li>${user.name}(${user.score})</li>`).join(', ');
});

socket.on('alert', (name) => {
    console.log('disconnect on client');
    alertMessage.textContent = `${name} покинул игру`;
});