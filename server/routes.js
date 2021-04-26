const config = require('./db-config.js');
const mysql = require('mysql');

config.connectionLimit = 10;
const connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

// FINAL PROJECT - ROUTES SORTED ALPHABETICALLY
const getRecipes = (req, res) => {
	console.log('Inside getRecipe')
	const { name, timeMax, recipeCount, sortBy } = req.query
	console.log(recipeCount)
	console.log(sortBy)

	const query = `SELECT name, ratings
	FROM recipe
	ORDER BY ratings DESC
	LIMIT 5;
	`
	console.log(query)
	// TODO: write query and return 
	// Follow the examples in hw2 to return 
	connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });

	// TODO: DELETE THIS ONCE DONE IMPLEMENTING QUERIES 
	// THIS IS PLACEHOLDER TO CHECK FETCH CALLS HERE
	/*
	const results = [
		{ name: 'ramen', times: '10', ingredientCount: 2, stepCount: 5, rating: 5, ratingCount: 20, time: 10 },
		{ name: 'fries', times: '20', ingredientCount: 1, stepCount: 4, rating: 2, ratingCount: 10, time: 20 }
	]
	res.json(results)
	*/
}

const getTopRecipes = (req, res) => {
	const query = `SELECT name, ratings
	FROM recipe
	ORDER BY ratings DESC
	LIMIT 5;
	`
	connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
}

const lowestTimePDV = (req, res) => {
	// TODO: write query and return 
	// Follow the examples in hw2 to return 
	// connection.query(query, (err, rows, fields) => {
	//   if (err) console.log(err);
	//   else res.json(results);
	// });

	// TODO: DELETE THIS ONCE DONE IMPLEMENTING QUERIES 
	// THIS IS PLACEHOLDER TO CHECK FETCH CALLS HERE
	const results = [
		{ name: 'ramen', times: '10', ingredientCount: 2, stepCount: 5, rating: 5, ratingCount: 20, time: 10 },
		{ name: 'fries', times: '20', ingredientCount: 1, stepCount: 4, rating: 2, ratingCount: 10, time: 20 }
	]
	res.json(results)
}

const lowestTimeSteps = (req, res) => {
	// TODO: write query and return 
	// Follow the examples in hw2 to return 
	// connection.query(query, (err, rows, fields) => {
	//   if (err) console.log(err);
	//   else res.json(results);
	// });

	// TODO: DELETE THIS ONCE DONE IMPLEMENTING QUERIES 
	// THIS IS PLACEHOLDER TO CHECK FETCH CALLS HERE
	const results = [
		{ name: 'ramen', times: '10', ingredientCount: 2, stepCount: 5, rating: 5, ratingCount: 20, time: 10 },
		{ name: 'fries', times: '20', ingredientCount: 1, stepCount: 4, rating: 2, ratingCount: 10, time: 20 }
	]
	res.json(results)
}

const restrictionAndNeeds = (req, res) => {
	const { restriction, nutritions, timeMax, recipeCount, sortBy } = req.query
	console.log(restriction)
	console.log(nutritions) // array of strings
	console.log(timeMax)
	console.log(recipeCount)
	console.log(sortBy)

	// TODO: write query and return 
	// Follow the examples in hw2 to return 
	// connection.query(query, (err, rows, fields) => {
	//   if (err) console.log(err);
	//   else res.json(results);
	// });

	// TODO: DELETE THIS ONCE DONE IMPLEMENTING QUERIES 
	// THIS IS PLACEHOLDER TO CHECK FETCH CALLS HERE
	const results = [
		{ name: 'ramen', times: '10', ingredientCount: 2, stepCount: 5, rating: 5, ratingCount: 20, time: 10 },
		{ name: 'fries', times: '20', ingredientCount: 1, stepCount: 4, rating: 2, ratingCount: 10, time: 20 }
	]
	res.json(results)
}

const withIngredients = (req, res) => {
	const { ingredients, recipeCount, sortBy } = req.query
	console.log(ingredients) // array of strings
	console.log(recipeCount)
	console.log(sortBy)

	const query = `WITH ingr_count AS
	(
		SELECT recipe_id, COUNT(*) AS num_ingredients
		FROM has_ingr
		GROUP BY recipe_id
	)
	SELECT r.name, r.ratings, r.minutes, ic.num_ingredients
	FROM recipe r
	JOIN ingr_count ic ON r.id = ic.recipe_id
	WHERE name LIKE '%${ingredients}%' 
	AND r.name NOT REGEXP '[0-9] [0-9]' 
	AND r.minutes > 0
	ORDER BY '${sortBy}'
	LIMIT '${recipeCount}';`

	// TODO: write query and return 
	// Follow the examples in hw2 to return 
	connection.query(query, (err, rows, fields) => {
		if (err) console.log(err);
		else res.json(results);
	});
}

const withNutritions = (req, res) => {
	const { nutritions, timeMax, recipeCount, sortBy } = req.query
	console.log(nutritions) // array of strings
	console.log(timeMax)
	console.log(recipeCount)
	console.log(sortBy)

	// TODO: write query and return 
	// Follow the examples in hw2 to return 
	// connection.query(query, (err, rows, fields) => {
	//   if (err) console.log(err);
	//   else res.json(results);
	// });

	// TODO: DELETE THIS ONCE DONE IMPLEMENTING QUERIES 
	// THIS IS PLACEHOLDER TO CHECK FETCH CALLS HERE
	const results = [
		{ name: 'ramen', times: '10', ingredientCount: 2, stepCount: 5, rating: 5, ratingCount: 20, time: 10 },
		{ name: 'fries', times: '20', ingredientCount: 1, stepCount: 4, rating: 2, ratingCount: 10, time: 20 }
	]
	res.json(results)
}

const withoutIngredients = (req, res) => {
	const { ingredients, timeMax, recipeCount, sortBy } = req.query
	console.log(ingredients) // array of strings
	console.log(recipeCount)
	console.log(sortBy)

	// TODO: write query and return 
	// Follow the examples in hw2 to return 
	// connection.query(query, (err, rows, fields) => {
	//   if (err) console.log(err);
	//   else res.json(results);
	// });

	// TODO: DELETE THIS ONCE DONE IMPLEMENTING QUERIES 
	// THIS IS PLACEHOLDER TO CHECK FETCH CALLS HERE
	const results = [
		{ name: 'ramen', times: '10', ingredientCount: 2, stepCount: 5, rating: 5, ratingCount: 20, time: 10 },
		{ name: 'fries', times: '20', ingredientCount: 1, stepCount: 4, rating: 2, ratingCount: 10, time: 20 }
	]
	res.json(results)
}

module.exports = {
	getRecipes: getRecipes,
	getTopRecipes: getTopRecipes,
	lowestTimePDV: lowestTimePDV,
	lowestTimeSteps: lowestTimeSteps,
	restrictionAndNeeds: restrictionAndNeeds,
	withIngredients: withIngredients,
	withNutritions: withNutritions,
	withoutIngredients: withoutIngredients,
};