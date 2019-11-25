const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const app = express();

app.get('/', (request, response) => {
    response.send("File server")
})


app.listen(3001, () => {
    console.log("pamw-app-server-files is running on port 3001")
})