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
let playerObj = {};
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
                playerObj = {'name': 'zzz'};
                for (let i = 0; i < snapshot.val().question.num; i++) {
                    let key = i.toString();
                    playerObj[key] = [0, -1];
                }
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

    a1.style.display = 'none';
    a2.style.display = 'none';
    a3.style.display = 'none';
    a4.style.display = 'none';
    a1.style.backgroundColor = 'steelblue';
    a2.style.backgroundColor = 'steelblue';
    a3.style.backgroundColor = 'steelblue';
    a4.style.backgroundColor = 'steelblue';

    // set a question listener
    gameRef.child('question').on('value', (snapshot) => {updateQ(snapshot)});
});

function updateQ(snapshot) {
    
    if (snapshot.val().text == 'JOINING') {
        statusLabel.innerHTML = 'Waiting for game to start...';
        qindex = -1;
    }
    else if (snapshot.val().text == 'GAME_OVER') {
        statusLabel.innerHTML = snapshot.val().text;
        qindex = -1;
        a1.style.display = 'none';
        a2.style.display = 'none';
        a3.style.display = 'none';
        a4.style.display = 'none';
    }
    else {
        statusLabel.innerHTML = snapshot.val().text;
        qindex = snapshot.val().num;
        // turn on the correct number of buttons
        if (snapshot.val().ans == 2) {
            a1.style.backgroundColor = 'steelblue';
            a2.style.backgroundColor = 'steelblue';
            a3.style.backgroundColor = 'steelblue';
            a4.style.backgroundColor = 'steelblue';
            a1.style.display = 'inline-block';
            a2.style.display = 'inline-block';
            a3.style.display = 'none';
            a4.style.display = 'none';
        }
        if (snapshot.val().ans == 3) {
            a1.style.backgroundColor = 'steelblue';
            a2.style.backgroundColor = 'steelblue';
            a3.style.backgroundColor = 'steelblue';
            a4.style.backgroundColor = 'steelblue';
            a1.style.display = 'inline-block';
            a2.style.display = 'inline-block';
            a3.style.display = 'inline-block';
            a4.style.display = 'none';
        }
        if (snapshot.val().ans == 4) {
            a1.style.backgroundColor = 'steelblue';
            a2.style.backgroundColor = 'steelblue';
            a3.style.backgroundColor = 'steelblue';
            a4.style.backgroundColor = 'steelblue';
            a1.style.display = 'inline-block';
            a2.style.display = 'inline-block';
            a3.style.display = 'inline-block';
            a4.style.display = 'inline-block';
        }
    }
}

// THESE NOW NEED TO CREATE A RESPONSE OBJECT AND POST IT

a1.addEventListener('click', (ev) => {
    if (qindex != -1) {
        // create a response object
        let response = {'p': playerRef.key, 'q': qindex, 'r': 0};

        // record this response in the responses list
        gameRef.child('responses').push(response);

        // response entered - disable the buttons
        ev.target.style.backgroundColor = 'red';

        //let buttons = answers.children;
        //for (let i=0; i<buttons.length; i++) {
        //    buttons[i].firstChild.disabled = 'true';
        //}
    }
});

a2.addEventListener('click', (ev) => {
    if (qindex != -1) {
        // create a response object
        let response = {'p': playerRef.key, 'q': qindex, 'r': 1};

        // record this response in the responses list
        gameRef.child('responses').push(response);

        // response entered - disable the buttons
        ev.target.style.backgroundColor = 'red';

        //let buttons = answers.children;
        //for (let i=0; i<buttons.length; i++) {
        //    buttons[i].firstChild.disabled = 'true';
        //}
    }
});

a3.addEventListener('click', (ev) => {
    if (qindex != -1) {
        // create a response object
        let response = {'p': playerRef.key, 'q': qindex, 'r': 2};

        // record this response in the responses list
        gameRef.child('responses').push(response);

        // response entered - disable the buttons
        ev.target.style.backgroundColor = 'red';

        //let buttons = answers.children;
        //for (let i=0; i<buttons.length; i++) {
        //    buttons[i].firstChild.disabled = 'true';
        //}
    }
});

a4.addEventListener('click', (ev) => {
    if (qindex != -1) {
        // create a response object
        let response = {'p': playerRef.key, 'q': qindex, 'r': 3};

        // record this response in the responses list
        gameRef.child('responses').push(response);

        // response entered - disable the buttons
        ev.target.style.backgroundColor = 'red';

        //let buttons = answers.children;
        //for (let i=0; i<buttons.length; i++) {
        //    buttons[i].firstChild.disabled = 'true';
        //}
    }
});