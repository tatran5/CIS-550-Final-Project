import React, { useEffect, useLayoutEffect, useState } from 'react'
import InputDropdown from './InputDropdown'
import InputText from './InputText'
import RecipeCard from './RecipeCard'
import { sortBy as sortByConsts, recipeCount as recipeCountConsts } from './Consts.js'

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
						<RecipeCard
							name={recipe.name}
							cookingTime={recipe.minutes}
							totalPDV={recipe.totalPDV}
						/>
						<br />
					</div>
				)}
			</div>
		</div>
	)
}

export default ForTimePDV;