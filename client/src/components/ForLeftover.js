import React, { useState } from 'react'
import InputDropdown from './helpers/InputDropdown'
import InputText from './helpers/InputText'
import RecipeCard from './helpers/RecipeCard'
import { sortBy as sortByConsts, recipeCount as recipeCountConsts, separateInputString } from './helpers/Consts'
import '../style/ForLeftover.css'

const ForLeftover = () => {

	const [ingredients, setIngredients] = useState('')
	const [recipeCount, setRecipeCount] = useState(recipeCountConsts.options[0])
	const [sortBy, setSortBy] = useState(sortByConsts.options[0])
	const [recipes, setRecipes] = useState([])

	const fetchResults = () => {
		const separatedIngredients = separateInputString(ingredients)
		const params = new URLSearchParams()
		
		separatedIngredients.forEach(item => 
			params.append('ingredients[]', item))
		
		params.append('recipeCount', recipeCount)
		params.append('sortBy', sortBy)

		fetch('/ingredients?' + params)
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
		<div className='ForLeftover'>
			<div className='inputs'>
				<InputText
					name='ingredients'
					title={'Ingredients'}
					onInputChange={setIngredients}
					placeholder='Separate ingredients by comma...' />
				<InputDropdown name='recipe-count' title={recipeCountConsts.title}
					onSelectionChange={setRecipeCount} options={recipeCountConsts.options} />
				<InputDropdown name='sort-by' title={sortByConsts.title}
					onSelectionChange={setSortBy} options={sortByConsts.options} />
				<div className='button' onClick={e => fetchResults()}>Find</div>
			</div>
			<div className='results-container'>
				{recipes.map((recipe, i) =>
					<div key={`recipe-${i}`}>
						<RecipeCard
							name={recipe.name}
							cookingTime={recipe.time}
							ingredientCount={recipe.ingredientCount}
							stepCount={recipe.stepCount}
							rating={recipe.rating}
							ratingCount={recipe.ratingCount}
						/>
						<br />
					</div>
				)}
			</div>
		</div>
	)
}

export default ForLeftover;