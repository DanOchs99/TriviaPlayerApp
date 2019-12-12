const pinTextbox = document.getElementById('pinTextbox');
const joinButton = document.getElementById('joinButton');
const nameTextbox = document.getElementById('nameTextbox');
const submitButton = document.getElementById('submitButton');
const statusLabel = document.getElementById('statusLabel');
const a1 = document.getElementById('a1');
const a2 = document.getElementById('a2');
const a3 = document.getElementById('a3');
const a4 = document.getElementById('a4');

let pin = '';
let gameRef = {};
let playerRef = {};
// TODO: playerObj needs dynamic initialization based on number of questions
let playerObj = {'name': '', '0': -1, '1': -1, '2': -1, '3': -1, '4': -1, '5': -1, '6': -1, '7': -1, '8': -1, '9': -1};
let qindex = -1;

joinButton.addEventListener('click', ()=>{
    // player trying to join game
    pin = pinTextbox.value;
    let exists = false;
    gameRef = firebase.database().ref('games/'+pin);
    gameRef.once('value', (snapshot) => {
        exists = (snapshot.val() !== null );
        if (exists) {
            let status = snapshot.val().question.text;
            if (status=='JOINING') {
                pinTextbox.style.display = 'none';
                joinButton.style.display = 'none';
                nameTextbox.style.display = 'inline-block';
                submitButton.style.display = 'inline-block';
                statusLabel.innerHTML = 'Enter name and press submit';
            }
            else {
                statusLabel.innerHTML = 'Game not available to join. try again...';
            }
        }
        else {
            statusLabel.innerHTML = 'Bad Pin! try again...';
        }    
    });
});

submitButton.addEventListener('click', ()=>{
    // player name submission
    if (nameTextbox.value.length == 0) {
        playerObj.name = 'anonymous';
    }
    else {
        playerObj.name = nameTextbox.value;
    }
    playerRef = gameRef.child('players').push(playerObj);
    nameTextbox.style.display = 'none';
    submitButton.style.display = 'none';
    a1.style.display = 'inline-block';
    a2.style.display = 'inline-block';
    a3.style.display = 'inline-block';
    a4.style.display = 'inline-block';

    // set a question listener
    gameRef.child('question').on('value', (snapshot) => {updateQ(snapshot)});
});

function updateQ(snapshot) {
    statusLabel.innerHTML = snapshot.val().text;
    qindex = snapshot.val().qindex;
}

a1.addEventListener('click', () => {
    if (qindex != -1) {
        playerObj[(qindex).toString()] = 1;
        playerRef.set(playerObj);
    }
});

a2.addEventListener('click', () => {
    if (qindex != -1) {
        playerObj[(qindex).toString()] = 2;
        playerRef.set(playerObj);
    }
});

a3.addEventListener('click', () => {
    if (qindex != -1) {
        playerObj[(qindex).toString()] = 3;
        playerRef.set(playerObj);
    }
});

a4.addEventListener('click', () => {
    if (qindex != -1) {
        playerObj[(qindex).toString()] = 4;
        playerRef.set(playerObj);
    }
});