import React, { useState } from 'react'
import InputDropdown from './InputDropdown'
import InputText from './InputText'
import { sortBy as sortByConsts, recipeCount as recipeCountConsts}  from './Consts.js'

const ForLeftover = () => {

	const [ingredients, setIngredients] = useState('')
	const [recipeCount, setRecipeCount] = useState(sortByConsts.options[0])
	const [sortBy, setSortBy] = useState(recipeCountConsts.options[0])
	const [find, setFind] = useState(false)
	
	const getResults = () => {
		// TODO: fetch here
		console.log('getting results')
		return ['r1', 'r2', 'r3'].map((val, idx) => <div key={idx}>{val}</div>)
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
				<div className='button' onClick={e => setFind(true)}>Find</div>
			</div>
			<div className='results-container'>
				{ find ? getResults() : <></>}
			</div>
		</div>
	)
}

export default ForLeftover;