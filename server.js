const express = require("express");
const app = express();

require('dotenv').config()
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log("Listening on port", port);
});


app.get('/greeting/:name', (req, res) => {
	res.send('Hello, ' + req.params.name);
});