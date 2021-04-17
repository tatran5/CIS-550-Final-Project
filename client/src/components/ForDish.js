import React, { useState } from 'react'
import InputDropdown from './InputDropdown'
import InputText from './InputText'
import RecipeCard from './RecipeCard'
import { sortBy as sortByConsts, recipeCount as recipeCountConsts, cookingTime } from './Consts.js'
import '../style/ForDish.css'

const ForDish = () => {

	const [dishName, setDishName] = useState('')
	const [cookTime, setCookTime] = useState('')
	const [recipeCount, setRecipeCount] = useState(recipeCountConsts.options[0])
	const [sortBy, setSortBy] = useState(sortByConsts.options[0])
	const [recipes, setRecipes] = useState([])

	const fetchResults = () => {
		fetch(`/recipes?'` + new URLSearchParams({
			name: dishName,
			timeMax: cookTime,
			recipeCount: recipeCount,
			sortBy: sortBy
		}))
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
		<div className='ForDish'>
			<div className='title'> Recipes for a dish</div>
			<div className='inputs'>
				<InputText
					name='dish-name'
					title={'Dish name'}
					onInputChange={setDishName}
					placeholder='Enter the dish name here...' />
				<InputText
					name='cooking-time'
					title={cookingTime.title}
					onInputChange={setCookTime}
					placeholder='Enter in minutes...' />
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
			<div className='results'>
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

export default ForDish;