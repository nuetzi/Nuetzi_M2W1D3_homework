const express = require('express');
const app = express();

require('dotenv').config()
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('Listening on port', port);
});

const fs = require('fs');
app.engine('homework3', (filePath, options, callback) => {              // Define the view engine called homework2
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);
    const rendered = content.toString()
      .replace('#title#', '<title>' + options.title + ' Bottles of Liquid</title>')
      .replace('#content#','<div>'+ options.content + ' bottles of liquid on the shelf</div>')
      .replace('#next#', '<a href=/' + options.next + '>Take one down, and do the thing</a>')
    return callback(null, rendered);
  });
});
app.set('views', './views');
app.set('view engine', 'homework3');

let bottleArray = [];                   // Create an array for our bottles of liquid page
for (let i=0; i<100; i++) {             // values range from 0 to 99
  bottleArray.push(i);
};


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
    const adjustedQuestion = req.params.question.split("%20").join(" ");
    const responseArray = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely","You may rely on it", "As I see it yes", "Most likely", "Outlook good","Yes", "Signs point to yes", "Reply hazy try again", "Ask again later","Better not tell you now", "Cannot predict now", "Concentrate and ask again","Don't count on it", "My reply is no", "My sources say no","Outlook not so good", "Very doubtful"];
    const responseChoice = Math.floor(Math.random() * responseArray.length);
    res.send(adjustedQuestion + '? <br>' + responseArray[responseChoice]);
});


// ************* The Worst Song Ever ************* //
/*
- On the home page (`get "/"`), users should see:
  - "99 Bottles of beer on the wall"
  - a link that says "take one down, pass it around"
  - this should link to `/98`, where the number represents the number of bottles left.
- When a number is given in the url (`get "/:number_of_bottles"`), users should see:
  - The number of bottles of beer on the wall (i.e. `98 Bottles of beer on the wall.`)
  - a link to "take one down, pass it around", where the href is number of bottles in the parameter minus 1.
- If there are 0 bottles left, do not show a link to "take one down"
  - Add a link to start over, which directs the user back to the home page.
*/

app.get('/', (req, res) => {
  res.render('template',
    {
        title: `${bottleArray[99]}`,
        content: `${bottleArray[99]}`,
        next: `${bottleArray[98]}`
    });
});

app.get('/:numberOfBottles', (req, res) => {
  if (req.params.numberOfBottles < 100 && req.params.numberOfBottles > 0) {
    res.render('template',
    {
        title: `${bottleArray[req.params.numberOfBottles]}`,
        content: `${bottleArray[req.params.numberOfBottles]}`,
        next: `${bottleArray[req.params.numberOfBottles - 1]}`
    });
  } else if (req.params.numberOfBottles == 0) {
    res.render('template',
    {
        title: `${bottleArray[req.params.numberOfBottles]}`,
        content: `${bottleArray[req.params.numberOfBottles]}`,
        next: `${bottleArray[99]}`
    });
  }
  else {
    res.send('Invalid request');
  };
});