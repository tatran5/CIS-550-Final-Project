import React, { useState } from 'react'
import InputDropdown from './helpers/InputDropdown'
import InputText from './helpers/InputText'
import RecipeCard from './helpers/RecipeCard'
import { 
	sortByWithIngredients as sortByConsts, 
	recipeCount as recipeCountConsts, 
	matchCategoryWithDb,
	separateInputString 
} from './helpers/Consts'
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
		params.append('sortBy', matchCategoryWithDb(sortBy))
		console.log(sortBy)

		fetch('/with-ingredients?' + params)
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
					placeholder='Input up to 3 ingredients and separate them by comma...' />
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
							cookingTime={recipe.minutes}
							ingredientCount={recipe.ingredientsCount}
							includedIngredientsCount={recipe.includedIngredientsCount}
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

export default ForLeftover;