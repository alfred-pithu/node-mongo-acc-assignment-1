const express = require('express');
const cors = require('cors');
const fs = require('fs')
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors());

// POST /user/save Save a random user
app.post('/user/save', (req, res) => {
    const inputUser = req.body;
    fs.readFile('./data.json', (err, data) => {
        if (data) {
            const parsedData = JSON.parse(data);
            parsedData.push(inputUser);
            const stringified = JSON.stringify(parsedData)
            fs.writeFile('./data.json', stringified, (err) => {
                if (err) {
                    res.send('Error Occured')
                }
            })
        }
    })
    res.end()
})




// A list of random users GET /user/all
app.get('/user/random', (req, res) => {
    fs.readFile('./data.json', (err, data) => {
        if (data) {
            const parseData = JSON.parse(data);
            const randomNumber = Math.floor(Math.random() * parseData.length - 1 + 1) + 1;
            const randomData = parseData.find((person) => person.id === randomNumber);
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.write(JSON.stringify(randomData))
            res.end()
        }
        else if (err) {
            res.send('Error Occured')
        }
    })
})



// A list of random users GET /user/all
app.get('/user/all', (req, res) => {
    const { limit } = req.query;
    const limitNumber = Number(limit)
    fs.readFile('./data.json', (err, data) => {
        if (data) {
            const parsedData = JSON.parse(data)
            if (limitNumber > parsedData.length) {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write('<h3>Etto gula data nai to bhai</h3>')
                res.end();
            }
            else {
                const limitedData = parsedData.slice(0, limitNumber);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(limitedData));
                res.end()
            }

        }
        else if (err) {
            res.write('Error occured')
            res.end();
        }
    })
})






app.get('/', (req, res) => {
    res.send('Server went brrrrrrrrr')
})

app.listen(port, () => {
    console.log('Server Running Successfully on PORT', port);
})