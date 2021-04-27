import React, { useEffect, useState } from 'react'
import {
	formatStr,
	recipeCount as recipeCountConsts,
	sortBy as sortByConsts,
	matchCategoryWithDb
} from './helpers/Consts'
import './helpers/RecipeCard'
import '../style/CommonIngredients.css'
import RecipeCard from './helpers/RecipeCard'
import InputDropdown from './helpers/InputDropdown'

const FewIngredients = () => {
	const [recipes, setRecipes] = useState([])
	const [recipeCount, setRecipeCount] = useState(recipeCountConsts.options[0])
	const [sortBy, setSortBy] = useState(sortByConsts.options[0])


	const fetchResults = () => {
		fetch(`/with-few-ingredients?` 
			+ new URLSearchParams({
				recipeCount: recipeCount,
				sortBy: matchCategoryWithDb(sortBy)
			})
		)
			.then(res => res.json())
			.then(data => {
				setRecipes(data)
			})
	}

	return (
		<div className='FewIngredients'>
			<div className='inputs'>
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
				<div className='button' onClick={_ => fetchResults()}>Find</div>
			</div>
			<div className='results-container'>
				{recipes.map((recipe, idx) => <RecipeCard
					key={`few-ingredients-${idx}`}
					name={recipe.name}
					ingredientCount={recipe.count}
					rating={recipe.ratings}
					cookingTime={recipe.minutes}
				/>)}
			</div>
		</div>
	)
}

export default FewIngredients