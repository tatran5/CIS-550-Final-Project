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

/* ---- (Dashboard) ---- */
// The route localhost:8081/keywords is registered to the function
// routes.getTop20Keywords, specified in routes.js.
app.get('/keywords', routes.getTop20Keywords);


/* ---- Q1b (Dashboard) ---- */
app.get('/keywords/:keyword', routes.getTopMoviesWithKeyword);


/* ---- Q2 (Recommendations) ---- */
app.get('/recommendations/:movie', routes.getRecs);


/* ---- (Best Movies) ---- */
app.get('/decades', routes.getDecades);
app.get('/genres', routes.getGenres);


/* ---- Q3b (Best Movies) ---- */
app.get('/bestmovies/:decade/:genre', routes.bestMoviesPerDecadeGenre);

// FINAL PROJECT - ROUTES SORTED ALPHABETICALLY
app.get('/ingredients', routes.withIngredients)
app.get('/lowest-time-pdv', routes.lowestTimePDV)
app.get('/lowest-time-steps', routes.lowestTimeSteps)
app.get('/nutritions', routes.withNutritions)
app.get('/recipe', routes.getRecipes)
app.get('/restriction-and-needs', routes.restrictionAndNeeds)
app.get('/without-ingredients', routes.withoutIngredients)

app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});