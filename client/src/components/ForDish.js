import React, { useState } from 'react'
import InputDropdown from './InputDropdown'
import InputText from './InputText'
import { sortBy as sortByConsts, recipeCount as recipeCountConsts, cookingTime}  from './Consts.js'
import '../style/ForDish.css'

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
				<InputText name='dish-name' title={'Dish name'}
					onInputChange={setDishName} placeholder='Enter the dish name here...'/>
				<InputText name='cooking-time' title={cookingTime.title}
					onInputChange={setCookTime} placeholder='Enter in minutes...'/>
				<InputDropdown name='recipe-count' title={recipeCountConsts.title}
					onSelectionChange={setRecipeCount} options={recipeCountConsts.options}/>
				<InputDropdown name='sort-by' title={sortByConsts.title}
					onSelectionChange={setSortBy} options={sortByConsts.options}/>
				<div className='button' onClick={findResults()}>Find</div>
			</div>
		</div>
	)
}

export default ForDish;