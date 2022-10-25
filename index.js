const express = require('express');
const cors = require('cors');
const fs = require('fs')
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors());




app.get('/user/all', (req, res) => {
    const { limit } = req.query;
    console.log(limit)
    fs.readFile('./data.json', (err, data) => {
        if (data) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(data);
            res.end()
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