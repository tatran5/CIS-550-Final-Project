const config = require('./db-config.js');
const mysql = require('mysql');

config.connectionLimit = 10;
const connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

// FINAL PROJECT - ROUTES SORTED ALPHABETICALLY

const commonIngredients = (req, res) => {
	const query = `
	SELECT i.name, COUNT(*) as count
	FROM valid_recipes r
	JOIN has_ingr hi ON r.id = hi.recipe_id
	JOIN ingr i ON hi.ingr_id = i.id 
	GROUP BY i.id 
	ORDER BY count DESC
	LIMIT 10;
	`
	connection.query(query, (err, rows, fields) => {
		if (err) console.log(err);
		else res.json(rows);
	});
}

const getRecipes = (req, res) => {
	const { name, recipeCount, sortBy } = req.query
	console.log('callinggggg')
	console.log(req.query)
	console.log(name)
	console.log(recipeCount)

	console.log(sortBy)
	let query = `
		SELECT r.name, r.ratings, r.minutes, ic.num_ingredients AS ingredientsCount
		FROM valid_recipes r
		JOIN ingr_count ic ON r.id = ic.recipe_id
		WHERE name LIKE '%${name}%' 
		ORDER BY ${sortBy}
		LIMIT ${recipeCount};
	`


	if (sortBy === 'ratings') {
		query = `
		SELECT r.name, r.ratings, r.minutes, ic.num_ingredients AS ingredientsCount
		FROM valid_recipes r
		JOIN ingr_count ic ON r.id = ic.recipe_id
		WHERE name LIKE '%${name}%' 
		ORDER BY ${sortBy} DESC
		LIMIT ${recipeCount};
	`
	}

	connection.query(query, (err, rows, fields) => {
		if (err) console.log(err);
		else res.json(rows);
	});
}

const getTopRecipes = (req, res) => {
	const query = `
	SELECT name, ratings
	FROM valid_recipes
	ORDER BY ratings DESC
	LIMIT 5;
	`
	connection.query(query, (err, rows, fields) => {
		if (err) console.log(err);
		else res.json(rows);
	});
}

const lowestTimePDV = (req, res) => {
	const query = `
	WITH min_minutes AS 
	(
		SELECT name, minutes, total_fat, sugar, sodium, protein
		FROM valid_recipes
		ORDER BY minutes ASC
		LIMIT 10
	)
	SELECT name, minutes, (total_fat + sugar + sodium + protein) AS totalPDV
	FROM min_minutes
	WHERE (total_fat + sugar + sodium + protein) > 0
	ORDER BY totalPDV ASC;
	`
	connection.query(query, (err, rows, fields) => {
		if (err) console.log(err);
		else res.json(rows);
	});
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

const randomRecipe = (req, res) => {
	console.log('randomRecipe called')
	const query = `
	SELECT name
	FROM valid_recipes
	ORDER BY RAND()
	LIMIT 1;
	`
	connection.query(query, (err, rows, fields) => {
		if (err) console.log(err);
		else res.json(rows);
	});
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

const withFewIngredients = (req, res) => {
	const { recipeCount, sortBy } = req.query

	let query = `
	SELECT r.name, COUNT(*) AS ingredientCount, r.ratings, r.minutes
	FROM valid_recipes r 
	JOIN has_ingr hi ON r.id = hi.recipe_id
	GROUP BY r.id 
	HAVING ingredientCount <= 5
	ORDER BY ${sortBy}
	LIMIT ${recipeCount}
	`

	if (sortBy === 'ratings') {
		query = `
		SELECT r.name, COUNT(*) AS ingredientCount, r.ratings, r.minutes
		FROM valid_recipes r 
		JOIN has_ingr hi ON r.id = hi.recipe_id
		GROUP BY r.id 
		HAVING ingredientCount <= 5
		ORDER BY ${sortBy} DESC
		LIMIT ${recipeCount}
		`
	}

	// TODO: write query and return 
	// Follow the examples in hw2 to return 
	connection.query(query, (err, rows, fields) => {
		if (err) console.log(err);
		else res.json(rows);
	});
}

const withIngredients = (req, res) => {
	const { ingredients, recipeCount, sortBy } = req.query
	console.log(ingredients) // array of strings
	console.log(recipeCount)
	console.log(sortBy)

	let query = ''			
	if (ingredients) {
		const ingredient0 = ingredients[0] ? ingredients[0] : ''
		const ingredient1 = ingredients[1] ? ingredients[1] : ''
		const ingredient2 = ingredients[2] ? ingredients[2] : ''
		query = `				
		WITH rec_with_ingr AS 
		(
			SELECT hi.recipe_id AS id, COUNT(*) AS num_ingr
			FROM has_ingr hi
			JOIN ingr i ON hi.ingr_id = i.id
			WHERE i.name LIKE '%${ingredient0}%' OR '%${ingredient1}%' OR '%${ingredient2}%'
			GROUP BY hi.recipe_id
		)
		SELECT DISTINCT r.name, rwi.num_ingr AS includedIngredientsCount, ic.num_ingredients AS ingredientsCount, r.ratings, r.minutes
		FROM valid_recipes r
		JOIN ingr_count ic ON r.id = ic.recipe_id
		JOIN rec_with_ingr rwi ON r.id = rwi.id
		ORDER BY ${sortBy}
		LIMIT ${recipeCount};
		`

		if (sortBy === 'ratings' || sortBy === 'includedIngredientsCount') {
			query = `				
			WITH rec_with_ingr AS 
			(
				SELECT hi.recipe_id AS id, COUNT(*) AS num_ingr
				FROM has_ingr hi
				JOIN ingr i ON hi.ingr_id = i.id
				WHERE i.name LIKE '%${ingredient0}%' OR '%${ingredient1}%' OR '%${ingredient2}%'
				GROUP BY hi.recipe_id
			)
			SELECT DISTINCT r.name, rwi.num_ingr AS includedIngredientsCount, ic.num_ingredients AS ingredientsCount, r.ratings, r.minutes
			FROM valid_recipes r
			JOIN ingr_count ic ON r.id = ic.recipe_id
			JOIN rec_with_ingr rwi ON r.id = rwi.id
			ORDER BY ${sortBy} DESC
			LIMIT ${recipeCount};
			`
		}

	}

	// TODO: write query and return 
	// Follow the examples in hw2 to return 
	connection.query(query, (err, rows, fields) => {
		if (err) console.log(err);
		else res.json(rows);
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
	connection.query(query, (err, rows, fields) => {
		console.log(query);
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
	commonIngredients: commonIngredients,
	getRecipes: getRecipes,
	getTopRecipes: getTopRecipes,
	lowestTimePDV: lowestTimePDV,
	lowestTimeSteps: lowestTimeSteps,
	randomRecipe: randomRecipe,
	restrictionAndNeeds: restrictionAndNeeds,
	withFewIngredients: withFewIngredients,
	withIngredients: withIngredients,
	withNutritions: withNutritions,
	withoutIngredients: withoutIngredients,
};