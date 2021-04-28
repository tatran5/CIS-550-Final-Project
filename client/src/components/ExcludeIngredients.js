import React, { useState } from 'react'
import InputDropdown from './helpers/InputDropdown'
import InputText from './helpers/InputText'
import RecipeCard from './helpers/RecipeCard'
import { 
	sortBy as sortByConsts, 
	recipeCount as recipeCountConsts,
	matchCategoryWithDb } from './helpers/Consts'
import '../style/ForDish.css'

const ExcludeIngredients = () => {

	const [ingredients, setIngredients] = useState('')
	const [recipeCount, setRecipeCount] = useState(recipeCountConsts.options[0])
	const [sortBy, setSortBy] = useState(sortByConsts.options[0])
	const [recipes, setRecipes] = useState([])

	// Process input ingredients from a string with commas
	const separateIngredients = (ingredients) =>
		ingredients.split(',') // separate incredients by comma
			.map(item => item.trim()) // get rid of white space
			.filter(item => item !== '') // get rid of emptry string

	const fetchResults = () => {
		const separatedIngredients = separateIngredients(ingredients)
		const params = new URLSearchParams()

		separatedIngredients.forEach(item =>
			params.append('ingredients[]', item))

		params.append('recipeCount', recipeCount)
		params.append('sortBy', matchCategoryWithDb(sortBy))

		fetch('/without-ingredients?' + params)
			.then(res => {
				const json = res.json()
				return json
			})
			.then(data => {
				setRecipes(data)
			})
			.catch(e => {
				console.log(e)
				return alert('Something went wrong while fetching result')
			})
	}

	return (
		<div className='ExcludeIngredients'>
			<div className='inputs'>
				<InputText
					name='ingredients'
					title={'Ingredients to exclude'}
					onInputChange={setIngredients}
					placeholder='Input up to 3 ingredients and separate them by comma...' />
				<InputDropdown
					name='recipe-count'
					title={recipeCountConsts.title}
					onSelectionChange={setRecipeCount}
					options={recipeCountConsts.options} />
				<InputDropdown
					name='sort-by'
					title={sortByConsts.title}
					onSelectionChange={setSortBy}
					options={sortByConsts.options} />
				<div className='button' onClick={e => fetchResults()}>Find</div>
			</div>
			<div className='results-container'>
				{recipes.map((recipe, i) =>
					<div key={`recipe-${i}`}>
						<RecipeCard
							name={recipe.name}
							cookingTime={recipe.minutes}
							ingredientCount={recipe.ingredientsCount}
							stepCount={recipe.stepCount}
							rating={recipe.ratings}
							ratingCount={recipe.ratingCount}
						/>
						<br />
					</div>
				)}
			</div>
		</div>
	)
}

export default ExcludeIngredients;