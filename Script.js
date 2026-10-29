const peer = new Peer();
let localStream;

navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
    localStream = stream;
    document.getElementById('local-video').srcObject = stream;
});

peer.on('open', id => {
    document.getElementById('my-id').innerText = id;
});

peer.on('call', call => {
    call.answer(localStream);
    call.on('stream', stream => {
        document.getElementById('remote-video').srcObject = stream;
    });
});

document.getElementById('call-btn').addEventListener('click', () => {
    const friendId = document.getElementById('friend-id').value;
    const call = peer.call(friendId, localStream);
    call.on('stream', stream => {
        document.getElementById('remote-video').srcObject = stream;
    });
});
