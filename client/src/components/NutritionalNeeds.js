import React, { useState } from 'react'
import InputDropdown from './InputDropdown'
import InputText from './InputText'
import { sortBy as sortByConsts, recipeCount as recipeCountConsts, cookingTime, separateInputString}  from './Consts.js'
import '../style/NutritionalNeeds.css'

const NutritionalNeeds = () => {

	const [nutritions, setNutritions] = useState('')
	const [recipeCount, setRecipeCount] = useState(sortByConsts.options[0])
	const [sortBy, setSortBy] = useState(recipeCountConsts.options[0])
	const [find, setFind] = useState(false)
	const [results, setResults] = useState(<></>)

	const findResults = () => {
		const separateNutritions = separateInputString(nutritions)

		console.log(separateNutritions)
		// TODO: fetch here
		
		
		// PLACEHOLDER
		setResults(['nn1', 'nn2', 'nn3'].map((val, idx) => <div key={idx}>{val}</div>))
	}

	return (
		<div className='NutritionalNeeds'>
			<div className='inputs'>
				<InputText name='nutritions' title={'Nutritions to include'}
					onInputChange={setNutritions} placeholder='Separate nutritions by comma...'/>
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

export default NutritionalNeeds;