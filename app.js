const express = require('express');
const app = express();

let users = [
    { id: 1, name: 'Ryu', age: 32, originPlace: 'Japón' },
    { id: 2, name: 'Chun-Li', age: 29, originPlace: 'China' },
    { id: 3, name: 'Guile', age: 35, originPlace: 'Estados Unidos' },
    { id: 4, name: 'Dhalsim', age: 45, originPlace: 'India' },
    { id: 5, name: 'Blanka', age: 32, originPlace: 'Brasil' },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//R (todos)

app.get('/', (req, res) => {
    res.send(`
    <h1>Lista de usuarios</h1>
    <ul>
    ${users
      .map((user) => `<li>ID: ${user.id}, Nombre: ${user.name}, Edad: ${user.age}, Lugar de procedencia: ${user.originPlace}</li>`)
      .join('')}
    </ul>
    <a href='/users'>usuarios json</a>
    `);
});


app.get('/users', (req, res) => {
    res.json(users);
});

//C
app.post('/users', (req, res) => {
    const newUser = {
      id: users.length + 1,
      name: req.body.name,
      age: req.body.age,
      originPlace: req.body.originPlace,
    };
    users.push(newUser);
    res.redirect('/');
});

//R (por nombre)
app.get('/users/:name', (req, res) => {
    const userName = req.params.name;
    const user = users.find(user => user.name === userName);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('user not found');
    }
});

//U (por nombre)
app.put('/users/:name', (req, res) => {
    const userName = req.params.name;
    const userIndex = users.findIndex(user => user.name === userName);
    if (userIndex >= 0) {
        users[userIndex] = req.body;
        res.send(users[userIndex]);
    } else {
        res.status(404).send('user not found');
    }
});

//D (por nombre)
app.delete('/users/:name', (req, res) => {
    const userName = req.params.name;
    users = users.filter(user => user.name !== userName);
    res.send(users);
});

app.listen(3000, () => {
    console.log('Express está escuchando en el puerto 3000');
});
