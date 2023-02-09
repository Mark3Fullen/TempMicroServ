const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send(`
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