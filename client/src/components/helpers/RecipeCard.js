import React from 'react'
import {formatStr} from './Consts'
import '../../style/RecipeCard.css'

const RecipeCard = ({ recipe }) => {

	return (
		<div className='RecipeCard'>
			<div className='name'><a href={`https://www.food.com/recipe/${recipe.id}`}>{formatStr(recipe.name)}</a></div>
			{ recipe.minutes? <div className='cooking-time'>Cooking time: {recipe.minutes} min</div> : <></> }
			{ recipe.ingredientsCount? 	<div className='ingredient-count'>No. of ingredients: {recipe.ingredientsCount}</div> : <></> }
			{ recipe.includedIngredientsCount? 	<div className='ingredient-count'>No. of input ingredients: {recipe.includedIngredientsCount}</div> : <></> }
			{ recipe.stepCount? <div className='step-count'>Number of steps: {recipe.stepCount}</div> : <></> }
			{ recipe.ratings? <div className='rating'>Ratings: {String(recipe.ratings).substr(0, 3)}/5</div> : <></> }
			{ recipe.ratingsCount? <div className='rating-count'>Number of ratings: {recipe.ratingsCount} min</div> : <></>}
			{ recipe.totalPDV? <div className='total-pdv'>Total PDV: {recipe.totalPDV}</div> : <></> }
		</div>)
}

export default RecipeCard;