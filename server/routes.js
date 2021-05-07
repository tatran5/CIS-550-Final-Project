const config = require('./db-config.js');
const mysql = require('mysql');
const e = require('cors');

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
		SELECT r.id, r.name, r.ratings, r.minutes, ic.num_ingredients AS ingredientsCount
		FROM valid_recipes r
		JOIN ingr_count ic ON r.id = ic.recipe_id
		WHERE name LIKE '%${name}%' 
		ORDER BY ${sortBy}
		LIMIT ${recipeCount};
	`


	if (sortBy === 'ratings') {
		query = `
		SELECT r.id, r.name, r.ratings, r.minutes, ic.num_ingredients AS ingredientsCount
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
	SELECT id, name, ratings
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
		SELECT id, name, minutes, total_fat, sugar, sodium, protein, ratings
		FROM valid_recipes
		ORDER BY minutes ASC
		LIMIT 10
	)
	SELECT id, name, minutes, ratings, (total_fat + sugar + sodium + protein) AS totalPDV
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
	SELECT id, name
	FROM valid_recipes
	ORDER BY RAND()
	LIMIT 1;
	`
	connection.query(query, (err, rows, fields) => {
		if (err) console.log(err);
		else res.json(rows);
	});
}

const restriction = (req, res) => {
	const { restriction, recipeCount, sortBy } = req.query

	let query = `
	WITH with_restriction AS (
		SELECT DISTINCT recipe_id
		FROM has_ingr HI JOIN ingr I ON HI.ingr_id = I.id
		WHERE I.name IN 
		(
			SELECT DISTINCT name
			FROM ingr
			WHERE is_${restriction} = 1
		)
	), rating_ratio AS (
		SELECT r.id, r.ratings / r.num_rating AS ratio
	FROM valid_recipes r
	ORDER BY ratio
	)
	SELECT r.ratings, r.id, r.name, r.n_ingredients AS includedIngredients, ic.num_ingredients AS ingredientsCount, rr.ratio, r.minutes
	FROM valid_recipes r
	JOIN ingr_count ic ON r.id = ic.recipe_id
	JOIN rating_ratio rr ON r.id = rr.id
	WHERE r.id NOT IN 
		( 
		SELECT * 
		FROM with_restriction 
		)
	ORDER BY ${sortBy}
	LIMIT ${recipeCount};	
	`
	if (sortBy === 'ratings') {
		query = `
		WITH with_restriction AS (
			SELECT DISTINCT recipe_id
			FROM has_ingr HI JOIN ingr I ON HI.ingr_id = I.id
			WHERE I.name IN 
			(
				SELECT DISTINCT name
				FROM ingr
				WHERE is_${restriction} = 1
			)
		), rating_ratio AS (
			SELECT r.id, r.ratings / r.num_rating AS ratio
		FROM valid_recipes r
		ORDER BY ratio
		)
		SELECT r.ratings, r.id, r.name, r.n_ingredients AS includedIngredients, ic.num_ingredients AS ingredientsCount, rr.ratio, r.minutes
		FROM valid_recipes r
		JOIN ingr_count ic ON r.id = ic.recipe_id
		JOIN rating_ratio rr ON r.id = rr.id
		WHERE r.id NOT IN 
			( 
			SELECT * 
			FROM with_restriction 
			)
		ORDER BY ${sortBy} DESC
		LIMIT ${recipeCount};	
		`
	}

	// Follow the examples in hw2 to return 
	connection.query(query, (err, rows, fields) => {
	  if (err) console.log(err);
	  else res.json(rows);
	});
}

const withFewIngredients = (req, res) => {
	const { recipeCount, sortBy } = req.query

	let query = `
	SELECT r.id, r.name, COUNT(*) AS ingredientsCount, r.ratings, r.minutes
	FROM valid_recipes r 
	JOIN has_ingr hi ON r.id = hi.recipe_id
	GROUP BY r.id 
	HAVING ingredientsCount <= 5
	ORDER BY ${sortBy}
	LIMIT ${recipeCount}
	`

	if (sortBy === 'ratings') {
		query = `
		SELECT r.id, r.name, COUNT(*) AS ingredientsCount, r.ratings, r.minutes
		FROM valid_recipes r 
		JOIN has_ingr hi ON r.id = hi.recipe_id
		GROUP BY r.id 
		HAVING ingredientsCount <= 5
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
		const ingredient0 = `%${ingredients[0]}%` ? ingredients[0] : ''
		const ingredient1 = `%${ingredients[1]}%` ? ingredients[1] : ''
		const ingredient2 = `%${ingredients[2]}%` ? ingredients[2] : ''
		query = `				
		WITH rec_with_ingr AS 
		(
			SELECT hi.recipe_id AS id, COUNT(*) AS num_ingr
			FROM has_ingr hi
			JOIN ingr i ON hi.ingr_id = i.id
			WHERE `
		
		let addedFirstIngr = false
		if (ingredient0) {
			query += `
			i.name LIKE '% ${ingredient0}%'
			OR i.name LIKE '${ingredient0}%' 
			`
			addedFirstIngr = true;
		}

		if (ingredient1) {
			query += `
			${addedFirstIngr? 'OR' : ''} i.name LIKE '% ${ingredient1}%'
			OR i.name LIKE '${ingredient1}%' 
			`
			addedFirstIngr = true;
		}

		if (ingredient2) {
			query += `
			${addedFirstIngr? 'OR' : ''} i.name LIKE '% ${ingredient2}%'
			OR i.name LIKE '${ingredient2}%' 
			`
			addedFirstIngr = true;
		}

		query += `
			GROUP BY hi.recipe_id
			), rating_ratio AS (
				SELECT r.id, r.ratings / r.num_rating AS ratio
			FROM valid_recipes r
			ORDER BY ratio
			)
			SELECT r.id, r.name, rwi.num_ingr AS includedIngredientsCount, ic.num_ingredients AS ingredientsCount, r.ratings, r.minutes
			FROM valid_recipes r
			JOIN ingr_count ic ON r.id = ic.recipe_id
			JOIN rec_with_ingr rwi ON r.id = rwi.id
			JOIN rating_ratio rr ON r.id = rr.id
			`

		if (sortBy === 'ratings' || sortBy === 'includedIngredientsCount') {
			query += `				
			ORDER BY ${sortBy} DESC
			LIMIT ${recipeCount};
			`
		} else {
			query += `				
			ORDER BY ${sortBy}
			LIMIT ${recipeCount};
			`
		}
	}

	connection.query(query, (err, rows, fields) => {
		if (err) console.log(err);
		else res.json(rows);
	});
}

const withNutritions = (req, res) => {
	const { nutritions, recipeCount, sortBy } = req.query
	console.log(nutritions) // array of strings
	console.log(recipeCount)
	console.log(sortBy)
	const maxSugar = nutritions[0]
	const maxSodium = nutritions[1]
	const maxProtein = nutritions[2]
	const maxSaturatedFat = nutritions[3]
	const maxTotalFat = nutritions[4]

	let query = `	
		WITH good_recipes AS (
			SELECT r.id, r.name, r.ratings, r.minutes
			FROM valid_recipes r
			WHERE r.total_fat <= '${maxTotalFat}' AND
				r.sugar <= '${maxSugar}' AND
					r.sodium <= '${maxSodium}' AND
					r.protein <= '${maxProtein}' AND
					r.saturated_fat <= '${maxSaturatedFat}'
		), rating_ratio AS (
			SELECT r.id, r.ratings / r.num_rating AS ratio
			FROM valid_recipes r
			ORDER BY ratio
		)
		SELECT gr.id, gr.name, rr.ratio, gr.minutes, ic.num_ingredients AS ingredientsCount
		FROM good_recipes gr
		JOIN ingr_count ic ON gr.id = ic.recipe_id
		JOIN rating_ratio rr ON gr.id = rr.id
		ORDER BY ${sortBy}
		LIMIT ${recipeCount};
	`

	if (sortBy === 'ratings') {
		query = `	
		WITH good_recipes AS (
			SELECT r.id, r.name, r.ratings, r.minutes
			FROM valid_recipes r
			WHERE r.total_fat <= '${maxTotalFat}' AND
				r.sugar <= '${maxSugar}' AND
					r.sodium <= '${maxSodium}' AND
					r.protein <= '${maxProtein}' AND
					r.saturated_fat <= '${maxSaturatedFat}'
		), rating_ratio AS (
			SELECT r.id, r.ratings / r.num_rating AS ratio
			FROM valid_recipes r
			ORDER BY ratio
		)
		SELECT gr.id, gr.name, rr.ratio, gr.minutes, ic.num_ingredients AS ingredientsCount
		FROM good_recipes gr
		JOIN ingr_count ic ON gr.id = ic.recipe_id
		JOIN rating_ratio rr ON gr.id = rr.id
		ORDER BY ${sortBy} DESC
		LIMIT ${recipeCount};
		`
	}

	connection.query(query, (err, rows, fields) => {
		if (err) console.log(err);
		else res.json(rows);
	});
}

const withoutIngredients = (req, res) => {
	const { ingredients, timeMax, recipeCount, sortBy } = req.query
	console.log(ingredients) // array of strings
	console.log(recipeCount)
	console.log(sortBy)

	let query = ''			
	if (ingredients) {
		// Have to do this to avoid situation where '' becomes '%%' inside the query, which may give no results back
		const ingredient0 = `${ingredients[0]}` ? ingredients[0] : ''
		const ingredient1 = `${ingredients[1]}` ? ingredients[1] : ''
		const ingredient2 = `${ingredients[2]}` ? ingredients[2] : ''
		console.log(ingredient0)
		query = `				
		WITH  rating_ratio AS (
			SELECT r.id, r.ratings / r.num_rating AS ratio
			FROM valid_recipes r
			ORDER BY ratio
			)
			SELECT r.id, r.ratings, r.name, rr.ratio, r.minutes, ic.num_ingredients AS ingredientsCount
			FROM valid_recipes r
			JOIN rating_ratio rr ON r.id = rr.id
			JOIN ingr_count ic ON rr.id = ic.recipe_id
			WHERE rr.id NOT IN 
			(
				SELECT DISTINCT r.id
				FROM valid_recipes r
				JOIN has_ingr hi ON r.id = hi.recipe_id
				JOIN ingr i ON hi.ingr_id = i.id
				WHERE `
		
		let addedFirstIngr = false
		if (ingredient0) {
			query += `
			i.name LIKE '% ${ingredient0}%'
			OR i.name LIKE '${ingredient0}%' 
			`
			addedFirstIngr = true;
		}

		if (ingredient1) {
			query += `
			${addedFirstIngr? 'OR' : ''} i.name LIKE '% ${ingredient1}%'
			OR i.name LIKE '${ingredient1}%' 
			`
			addedFirstIngr = true;
		}

		if (ingredient2) {
			query += `
			${addedFirstIngr? 'OR' : ''} i.name LIKE '% ${ingredient2}%'
			OR i.name LIKE '${ingredient2}%' 
			`
			addedFirstIngr = true;
		}

		if (sortBy === 'ratings') {
			query += `)				
			ORDER BY ${sortBy} DESC
			LIMIT ${recipeCount};
			`
		} else {
			query += `)				
			ORDER BY ${sortBy}
			LIMIT ${recipeCount};
			`
		}
	}

	connection.query(query, (err, rows, fields) => {
		console.log(query)
		if (err) console.log(err);
		else res.json(rows);
	});
}

module.exports = {
	commonIngredients: commonIngredients,
	getRecipes: getRecipes,
	getTopRecipes: getTopRecipes,
	lowestTimePDV: lowestTimePDV,
	lowestTimeSteps: lowestTimeSteps,
	randomRecipe: randomRecipe,
	restriction: restriction,
	withFewIngredients: withFewIngredients,
	withIngredients: withIngredients,
	withNutritions: withNutritions,
	withoutIngredients: withoutIngredients,

};