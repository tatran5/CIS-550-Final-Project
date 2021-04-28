import React from 'react'
import {formatStr} from './Consts'
import '../../style/RecipeCard.css'

const RecipeCard = ({
		name, 
		cookingTime, 
		ingredientCount,
		includedIngredientsCount,
		ratings, 
		ratingCount, 
		stepCount, 
		totalPDV, 
	}) => {

	return (
		<div className='RecipeCard'>
			<div className='name'> {formatStr(name)} </div>
			{ cookingTime? <div className='cooking-time'>Cooking time: {cookingTime} min</div> : <></> }
			{ ingredientCount? 	<div className='ingredient-count'>No. of ingredients: {ingredientCount}</div> : <></> }
			{ includedIngredientsCount? 	<div className='ingredient-count'>No. of input ingredients: {includedIngredientsCount}</div> : <></> }
			{ stepCount? <div className='step-count'>Number of steps: {stepCount}</div> : <></> }
			{ ratings? <div className='rating'>Rating: {String(ratings).substr(0, 3)}/5</div> : <></> }
			{ ratingCount? <div className='rating-count'>Number of ratings: {ratingCount} min</div> : <></>}
			{ totalPDV? <div className='total-pdv'>Total PDV: {totalPDV}</div> : <></> }
		</div>)
}

export default RecipeCard;