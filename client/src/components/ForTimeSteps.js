import React, { useEffect, useState } from 'react'
import InputDropdown from './helpers/InputDropdown'
import InputText from './helpers/InputText'
import RecipeCard from './helpers/RecipeCard'
import { sortBy as sortByConsts, recipeCount as recipeCountConsts } from './helpers/Consts'

const ForTimeSteps = () => {
	const [recipes, setRecipes] = useState([])


	const fetchResults = () => {
		fetch(`/lowest-time-steps`, { method: 'GET' })
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


	useEffect(() => {
		fetchResults()
	}, [])

	return (
		<div className='ForTimeSteps'>
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

export default ForTimeSteps;