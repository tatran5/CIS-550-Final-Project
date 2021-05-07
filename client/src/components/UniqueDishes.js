import React, { useState } from 'react'
import InputDropdown from './helpers/InputDropdown'
import RecipeCard from './helpers/RecipeCard'
import { 
	sortByWithIngredients as sortByConsts, 
	recipeCount as recipeCountConsts, 
	matchCategoryWithDb
} from './helpers/Consts'
import '../style/ForLeftover.css'

const UniqueDishes = () => {

	const [recipeCount, setRecipeCount] = useState(recipeCountConsts.options[0])
	const [sortBy, setSortBy] = useState(sortByConsts.options[0])
	const [recipes, setRecipes] = useState([])

	const fetchResults = () => {
		const params = new URLSearchParams()
		params.append('recipeCount', recipeCount)
		params.append('sortBy', matchCategoryWithDb(sortBy))
		console.log(sortBy)

		fetch('/unique?' + params)
			.then(res => {
				const json = res.json()
				return json
			})
			.then(data => {
				console.log(data)
				setRecipes(data)
			})
			.catch(e => {
				console.log(e)
				return alert('Something went wrong while fetching result')
			})
	}

	return (
		<div className='ForLeftover'>
			<div className='title'>Unique Dishes</div>
			<div className='inputs'>
				<InputDropdown name='recipe-count' title={recipeCountConsts.title}
					onSelectionChange={setRecipeCount} options={recipeCountConsts.options} />
				<InputDropdown name='sort-by' title={sortByConsts.title}
					onSelectionChange={setSortBy} options={sortByConsts.options} />
				<div className='button' onClick={e => fetchResults()}>Find</div>
			</div>
			<div className='results-container'>
				{recipes.map((recipe, i) =>
					<div key={`recipe-${i}`}>
						<RecipeCard recipe={recipe}/>
					</div>
				)}
			</div>
		</div>
	)
}

export default UniqueDishes;