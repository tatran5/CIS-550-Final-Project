const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

// FINAL PROJECT - ROUTES SORTED ALPHABETICALLY
app.get('/common-ingredients', routes.commonIngredients)
app.get('/ingredients', routes.withIngredients)
app.get('/lowest-time-pdv', routes.lowestTimePDV)
app.get('/lowest-time-steps', routes.lowestTimeSteps)
app.get('/nutritions', routes.withNutritions)
app.get('/random-recipe', routes.randomRecipe)
app.get('/recipe', routes.getRecipes)
app.get('/restriction-and-needs', routes.restrictionAndNeeds)
app.get('/top-recipes', routes.getTopRecipes)
app.get('/without-ingredients', routes.withoutIngredients)
app.get('/with-few-ingredients', routes.withFewIngredients)

app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});