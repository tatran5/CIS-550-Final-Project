import React from 'react'

const RecipeCard = ({name, cookingTime, ingredientCount, stepCount, rating, ratingCount}) => {
	// TODO. PLACEHOLDER ONLY
	// recipe = 'Easy Real Tonkotsu'
	// cookingTime = 40
	// stepCount = 4	
	// rating = 4.8
	// ratingCount = 1643	
	
	return (
		<div className='RecipeCard'>
			<div className='name'> {name} </div>
			<div className='cooking-time'>Cooking time: {cookingTime} min</div>
			<div className='step-count'>Number of steps: {stepCount}</div>
			<div className='ingredient-count'>Number of ingredients: {ingredientCount}</div>
			<div className='rating'>Rating: {rating}/5</div>
			<div className='rating-count'>Number of ratings: {ratingCount} min</div>
		</div>)
}

export default RecipeCard;