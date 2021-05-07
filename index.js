const bodyParser = require('body-parser');
const express = require('express');	
const path = require('path')
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

// app.use(cors(({credentials: true, origin: 'http://localhost:3000'})));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

// FINAL PROJECT - ROUTES SORTED ALPHABETICALLY
app.get('/common-ingredients', routes.commonIngredients)
app.get('/lowest-time-pdv', routes.lowestTimePDV)
app.get('/lowest-time-steps', routes.lowestTimeSteps)
app.get('/nutritions', routes.withNutritions)
app.get('/unique', routes.unique)
app.get('/random-recipe', routes.randomRecipe)
app.get('/restriction', routes.restriction)
app.get('/top-recipes', routes.getTopRecipes)
app.get('/without-ingredients', routes.withoutIngredients)
app.get('/with-few-ingredients', routes.withFewIngredients)
app.get('/with-ingredients', routes.withIngredients)
app.get('/with-name', routes.getRecipes)

app.use(express.static(path.join(__dirname, './client/build')));

// Every request to the back end will be send to react app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});


app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});