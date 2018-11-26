const URL = "https://test-users-api.herokuapp.com/";
const USERS_CONTAINER = document.querySelector(".users");


document.querySelector('#get-users').onclick = getUsers;
document.querySelector('#clear-users').onclick = clearUsers;
document.querySelector('#send-user').onclick = sendUser;

function getUsers() {
    fetch(URL + 'users')
        .then((response) => response.json())
        .then((result) => renderUsers(result.data))
        .catch((error) => console.error(error));
}

function renderUsers(users) {
    clearUsers();
    for (const user of users) {
        renderUser(user);
    }
}

function renderUser(user) {
    console.log(user);
    const card = document.createElement('div');
    card.className = 'user';
    card.innerHTML = `Name: ${user.name} <br\>Age: ${user.age}`;
    USERS_CONTAINER.append(card);
}

function clearUsers() {
    USERS_CONTAINER.innerHTML = '';
}

function sendUser() {
    const user = {
        name: document.querySelector('#user-name').value,
        age: parseInt(document.querySelector('#user-age').value)
    };

    if (isNaN(user.age) || user.name === '')
        throw new Error('Invalid user inputs');

    fetch(URL + 'users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            renderUser(result.data);
        })
        .catch((error) => console.error(error));
}

/*
fetch(URL + 'users', {
    method: 'POST',
    body: JSON.stringify({name: 'aaa', age: 13}),
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
})
    .then((response) => response.json())
    .then((result) => console.log(result.data))
    .catch((error) => console.error(error));*/
