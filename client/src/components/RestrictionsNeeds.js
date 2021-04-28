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
import '../style/RestrictionsAndNeeds.css'

const RestrictionsNeeds = () => {
	const [restriction, setRestriction] = useState('')
	const [recipeCount, setRecipeCount] = useState(recipeCountConsts.options[0])
	const [sortBy, setSortBy] = useState(sortByConsts.options[0])
	const [recipes, setRecipes] = useState([])

	const fetchResults = () => {
		const params = new URLSearchParams()
		params.append('restriction', restriction)
		params.append('recipeCount', recipeCount)
		params.append('sortBy', matchCategoryWithDb(sortBy))

		fetch('/restriction?' + params)
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
		<div className='ExcludeIngredients'>
			<div className='inputs'>
				<InputText
					className='restriction'
					name='restriction'
					title={'Restriction'}
					onInputChange={setRestriction}
					placeholder='Enter restriction such as nuts, meat' />
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

export default RestrictionsNeeds;