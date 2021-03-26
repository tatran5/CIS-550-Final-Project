import React, { useState } from 'react'
import InputDropdown from './InputDropdown'
import InputText from './InputText'
import { sortBy as sortByConsts, recipeCount as recipeCountConsts, cookingTime}  from './Consts.js'
import '../style/ForDish.css'

const ExcludeIngredients = () => {

	const [ingredients, setIngredients] = useState('')
	const [recipeCount, setRecipeCount] = useState(sortByConsts.options[0])
	const [sortBy, setSortBy] = useState(recipeCountConsts.options[0])
	const [find, setFind] = useState(false)
	const [results, setResults] = useState(<></>)

	const findResults = () => {
		console.log(ingredients)
		// Process input ingredients from a string with commas
		const separateIngredients = ingredients.split(',') // separate incredients by comma
			.map(item => item.trim()) // get rid of white space
			.filter(item => item !== '') // get rid of emptry string

		console.log('separateIngredients')
		console.log(separateIngredients)

		// TODO: fetch here
		
		
		// PLACEHOLDER
		setResults(['ei1', 'ei2', 'ei3'].map((val, idx) => <div key={idx}>{val}</div>))
	}

	return (
		<div className='ExcludeIngredients'>
			<div className='inputs'>
				<InputText name='ingredients' title={'Ingredients to exclude'}
					onInputChange={setIngredients} placeholder='Separate ingredients by comma...'/>
				<InputDropdown name='recipe-count' title={recipeCountConsts.title}
					onSelectionChange={setRecipeCount} options={recipeCountConsts.options}/>
				<InputDropdown name='sort-by' title={sortByConsts.title}
					onSelectionChange={setSortBy} options={sortByConsts.options}/>
				<div className='button' onClick={e => findResults()}>Find</div>
			</div>
			<div className='results-container'>
				{ results }
			</div>
		</div>
	)
}

export default ExcludeIngredients;