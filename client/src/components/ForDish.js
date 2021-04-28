import React, { useState } from 'react'
import InputDropdown from './helpers/InputDropdown'
import InputText from './helpers/InputText'
import RecipeCard from './helpers/RecipeCard'
import {
	sortBy as sortByConsts,
	recipeCount as recipeCountConsts,
	matchCategoryWithDb
} from './helpers/Consts'
import '../style/ForDish.css'

const ForDish = () => {

	const [dishName, setDishName] = useState('')
	const [recipeCount, setRecipeCount] = useState(recipeCountConsts.options[0])
	const [sortBy, setSortBy] = useState(sortByConsts.options[0])
	const [recipes, setRecipes] = useState([])

	const fetchResults = () => {
		fetch(`/with-name?`
			+ new URLSearchParams({
				recipeCount: recipeCount,
				sortBy: matchCategoryWithDb(sortBy),
				name: dishName,
			}))
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
		<div className='ForDish'>
			<div className='title'> Recipes for a dish</div>
			<div className='inputs'>
				<InputText
					name='dish-name'
					title={'Dish name'}
					onInputChange={setDishName}
					placeholder='Enter the dish name here...' />
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

export default ForDish;