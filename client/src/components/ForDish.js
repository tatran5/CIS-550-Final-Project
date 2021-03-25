import React, { useState } from 'react'
import InputDropdown from './InputDropdown'
import InputText from './InputText'
import { sortBy as sortByConsts, recipeCount as recipeCountConsts}  from './Consts.js'

const ForDish = () => {

	const [dishName, setDishName] = useState('')
	const [cookTime, setCookTime] = useState('')
	const [recipeCount, setRecipeCount] = useState(sortByConsts.options[0])
	const [sortBy, setSortBy] = useState(recipeCountConsts.options[0])

	const findResults = () => {
		// TODO: Fetch call to back end here
		// PLACEHOLDER
	}

	return (
		<div className='ForDish'>
			<div className='title'> Recipes for a dish</div>
			<div className='inputs'>
				<InputText className='dish-name' title={'Dish name'}
					onInputChange={setDishName} placeholder='Enter the dishname here...'/>
				<InputText className='cooking-time' title={'Cooking time at most'}
					onInputChange={setCookTime} placeholder='Enter in minutes...'/>
				<InputDropdown className='recipe-count' title={recipeCountConsts.title}
					onSelectionChange={setRecipeCount} options={recipeCountConsts.options}/>
				<InputDropdown className='sort-by' title={sortByConsts.title}
					onSelectionChange={setSortBy} options={sortByConsts.options}/>
				<div className='button' onClick={findResults()}>Find</div>
			</div>
		</div>
	)
}

export default ForDish;