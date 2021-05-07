import React, { useEffect, useState } from 'react'
import InputDropdown from './helpers/InputDropdown'
import RecipeCard from './helpers/RecipeCard'
import { 
	sortByWithIngredients as sortByConsts, 
	recipeCount as recipeCountConsts, 
	matchCategoryWithDb
} from './helpers/Consts'
import '../style/ForLeftover.css'

const UniqueDishes = () => {
	const [recipes, setRecipes] = useState([])

	useEffect(() => {
		const fetchResults = () => {
			fetch('/unique')
				.then(res => {
					const json = res.json()
					return json
				})
				.then(data => {
					setRecipes(data)
					localStorage.setItem('uniqueRecipes', JSON.stringify(data))
				})
				.catch(e => {
					console.log(e)
					return alert('Something went wrong while fetching result')
				})
		}

		const uniqueDishes = JSON.parse(localStorage.getItem('uniqueRecipes'))
		if (uniqueDishes) {
			setRecipes(uniqueDishes)
		} else {
			fetchResults()
		}
	}, [])
	
	return (
		<div className='ForLeftover'>
			<div className='title'>Unique Dishes</div>
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