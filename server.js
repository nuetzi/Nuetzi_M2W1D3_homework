const express = require("express");
const app = express();

require('dotenv').config()
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log("Listening on port", port);
});


// ************* Greeting ************* //
app.get('/greeting/:name', (req, res) => {
	res.send('Hello, ' + req.params.name);
});


// ************* Tip Calculator ************* //
app.get('/tip/:total/:tipPercentage', (req, res) => {
    const tipAmount = req.params.tipPercentage * req.params.total / 100;
	res.send(`${tipAmount}`);
});