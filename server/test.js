const express = require('express');
const app = express();
const port = 3000;

// root endpoint 
app.get('/', (res, req) => {
    res.send('Hello world');
});

app.listen(port, () => {
    console.log('Express app listing on port ' + port)
});

app.listen('/')