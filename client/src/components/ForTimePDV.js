import React, { useEffect, useLayoutEffect, useState } from 'react'
import InputDropdown from './helpers/InputDropdown'
import InputText from './helpers/InputText'
import RecipeCard from './helpers/RecipeCard'
import { sortBy as sortByConsts, recipeCount as recipeCountConsts } from './helpers/Consts.js'

const ForTimePDV = () => {
	const [recipes, setRecipes] = useState([])

	useEffect(() => {
		const fetchResults = () => {
			fetch(`/lowest-time-pdv`, { method: 'GET' })
				.then(res => {
					const json = res.json()
					return json
				})
				.then(data => {
					setRecipes(data)
					localStorage.setItem('timePDV', JSON.stringify(data))
				})
				.catch(e => {
					console.log(e)
					return alert('Something went wrong while fetching result')
				})
		}

		const cachedTimePDV = JSON.parse(localStorage.getItem('timePDV'))
		if (cachedTimePDV) {
			setRecipes(cachedTimePDV)
		} else {
			fetchResults()
		}
	}, [])

	return (
		<div className='ForTimePDV'>
			<div className='results-container'>
				{recipes.map((recipe, i) =>
					<div key={`recipe-${i}`}>
						<RecipeCard recipe={recipe}/>
						<br />
					</div>
				)}
			</div>
		</div>
	)
}

export default ForTimePDV;