const http = require('http');
const app = require('./app');

app.listen(8080, () => {
    console.log('Server started at http://localhost:8080/');
})
