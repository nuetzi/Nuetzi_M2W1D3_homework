const express = require('express');
const app = express();

require('dotenv').config()
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log('Listening on port', port);
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


// ************* Magic 8 Ball ************* //
app.get('/magic/:question', (req, res) => {
    const responseArray = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely","You may rely on it", "As I see it yes", "Most likely", "Outlook good","Yes", "Signs point to yes", "Reply hazy try again", "Ask again later","Better not tell you now", "Cannot predict now", "Concentrate and ask again","Don't count on it", "My reply is no", "My sources say no","Outlook not so good", "Very doubtful"];
    const adjustedQuestion = req.params.question.split("%20").join(" ");
    const responseChoice = Math.floor(Math.random() * responseArray.length);
    res.send(adjustedQuestion + '? <br>' + responseArray[responseChoice]);
});