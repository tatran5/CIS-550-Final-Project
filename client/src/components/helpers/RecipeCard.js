import React from 'react'
import {formatStr} from './Consts'
import '../../style/RecipeCard.css'

const RecipeCard = ({
		name, 
		cookingTime, 
		ingredientCount,
		rating, 
		ratingCount, 
		stepCount, 
		totalPDV, 
	}) => {
	
	return (
		<div className='RecipeCard'>
			<div className='name'> {formatStr(name)} </div>
			{ cookingTime? <div className='cooking-time'>Cooking time: {cookingTime} min</div> : <></> }
			{ ingredientCount? 	<div className='ingredient-count'>Number of ingredients: {ingredientCount}</div> : <></> }
			{ stepCount? <div className='step-count'>Number of steps: {stepCount}</div> : <></> }
			{ rating? <div className='rating'>Rating: {rating}/5</div> : <></> }
			{ ratingCount? <div className='rating-count'>Number of ratings: {ratingCount} min</div> : <></>}
			{ totalPDV? <div className='total-pdv'>Total PDV: {totalPDV}</div> : <></> }
		</div>)
}

export default RecipeCard;