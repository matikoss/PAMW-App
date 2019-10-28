const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const userDatabase = {
    users: [
        {
            id: '1',
            username: 'testowyUzytkownik',
            email: 'testowy@mail.com',
            password: 'testowe123'
        }
    ]
}

app.get('/', (request, response) => {
    response.json(userDatabase.users);
})

app.post('/register', (request, response) => {
    const { username, email, password } = request.body;
    let found = false;
    userDatabase.users.forEach(user => {
        if (user.username === username || user.email === email) {
            found = true;
            response.json({wasAdded: false});
        }
    })
    if (!found) {
        userDatabase.users.push({
            id: userDatabase.users.length + 1,
            username: username,
            email: email,
            password: password
        })
        response.json({wasAdded: true});
    }
})

app.listen(3000, () => {
    console.log("pamw-app-server is running on port 3000");
})