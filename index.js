const express = require('express');
const bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

var db = new sqlite3.Database('users.db', (err) => {
    err ? console.log(err.message) : console.log("connected to db")
});

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)");
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send(`
        <form action='/adduser' method='post'>
            <input type='text' name='name' placeholder='Enter Username'>
            <button type='submit'>Login</button>
        </form>

        <form action='/CtoF' method='post'>
            <label>Temperature in C<label>
            <input type='text' name='name'>
            <button type='submit'>Submit</button>
        </form>
        <form action='/FtoC' method='post'>
            <label>Temperature in F<label>
            <input type='text' name='name'>
            <button type='submit'>Submit</button>
        </form>
    `);
});

app.post('/adduser', (req, res) => {
    var name = req.body.name;
    db.run("INSERT INTO users (name) VALUES (?)", [name], (err) => {
        err ? console.error(err) && res.status(500).send("Error adding users") : res.send("User added successfully");
    });
});

db.all(`SELECT name FROM users`, [], (err, rows) => {
    err ? console.log(err.message) : rows.forEach((row) => {console.log(row)});
  });
  

app.post('/CtoF', (req, res) => {
    const number = req.body.name;

    let final = number * 9/5 + 32

    res.send(`${final}`);
})

app.post('/FtoC', (req, res) => {
    const number = req.body.name;

    let final = (number - 32) * (5/9)

    res.send(`${final}`);
})

app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})