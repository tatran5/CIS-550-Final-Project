import React, { useLayoutEffect, useState } from 'react'
import InputDropdown from './InputDropdown'
import InputText from './InputText'
import { sortBy as sortByConsts, recipeCount as recipeCountConsts}  from './Consts.js'

const ForTimePDV = () => {
	const fetchResults = () => {
		// TODDO
		let results = ['pdv1', 'pdv2', 'pdv3']
		results = results.map((item, idx) => <div key={idx}>{item}</div>)
		return results
	}

	const [results] = useState(fetchResults())

	return (
		<div className='ForTimePDV'>
			<div className='results-container'>
			{ results }
			</div>
		</div>
	)
}

export default ForTimePDV;