import React, { useState } from 'react'
import InputDropdown from './InputDropdown'
import InputText from './InputText'
import { sortBy as sortByConsts, recipeCount as recipeCountConsts}  from './Consts.js'

const ForLeftover = () => {

	const [ingredients, setIngredients] = useState('')
	const [recipeCount, setRecipeCount] = useState(sortByConsts.options[0])
	const [sortBy, setSortBy] = useState(recipeCountConsts.options[0])
	const [find, setFind] = useState(false)
	const [results, setResults] = useState(<></>)

	const submitQueries = () => {
		console.log(ingredients)
		// Process input ingredients from a string with commas
		const separateIngredients = ingredients.split(',') // separate incredients by comma
			.map(item => item.trim()) // get rid of white space
			.filter(item => item !== '') // get rid of emptry string

		console.log('separateIngredients')
		console.log(separateIngredients)

		// TODO: fetch here
		
		
		// PLACEHOLDER
		setResults(['r1', 'r2', 'r3'].map((val, idx) => <div key={idx}>{val}</div>))
	}

	return (
		<div className='ForLeftover'>
			<div className='title'> Recipes for a dish</div>
			<div className='inputs'>
				<InputText className='ingredients' title={'Ingredients'}
					onInputChange={setIngredients} placeholder='Separate ingredients by comma...'/>
				<InputDropdown className='recipe-count' title={recipeCountConsts.title}
					onSelectionChange={setRecipeCount} options={recipeCountConsts.options}/>
				<InputDropdown className='sort-by' title={sortByConsts.title}
					onSelectionChange={setSortBy} options={sortByConsts.options}/>
				<div className='button' onClick={e => submitQueries()}>Find</div>
			</div>
			<div className='results-container'>
				{ results }
			</div>
		</div>
	)
}

export default ForLeftover;