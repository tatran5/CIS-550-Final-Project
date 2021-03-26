import React, { useEffect, useState } from 'react'
import InputDropdown from './InputDropdown'
import InputText from './InputText'
import { sortBy as sortByConsts, recipeCount as recipeCountConsts}  from './Consts.js'

const ForTimeSteps = () => {
	const fetchResults = () => {
		// TODDO
		let results = ['ts1', 'ts2', 'ts3']
		results = results.map((item, idx) => <div key={idx}>{item}</div>)
		return results
	}
	
	const [results] = useState(fetchResults())

	return (
		<div className='ForTimeSteps'>
			<div className='results-container'>
			{ results }
			</div>
		</div>
	)
}

export default ForTimeSteps;