import React, { useState } from 'react'
import ForLeftover from './ForLeftover'
import ForTimePDV from './ForTimePDV'
import ForTimeSteps from './ForTimeSteps'
import CommonIngredients from './CommonIngredients'

const ForLazyCooking = () => {
	const options = {
		NONE: 0,
		LEFOVER: 1,
		TIME_PDV: 2,
		TIME_STEPS: 3,
		COMMON_INGREDIENTS: 4,
		AT_MOST_5_INGREDIENTS: 5,
	}

	const [option, setOption] = useState(options.NONE)

	const getOptionContent = () => {
		switch(option) {
			default: 
				return <></>
			case options.NONE:
				return <></>
			case options.LEFOVER:
				return <ForLeftover />
			case options.TIME_PDV:
				return <ForTimePDV />	
			case options.TIME_STEPS:
				return <ForTimeSteps />	
			case options.COMMON_INGREDIENTS:
				return <CommonIngredients />
		}
	}

	return (
		<div className='ForLazyCooking'>
			<div className='title'>Recipes for lazy cooking</div>
			<div className='options'>
				<div className='for leftover' onClick={e => setOption(options.LEFOVER)}>Use leftover ingredients</div>
				<div className='for time-pdf' onClick={e => setOption(options.TIME_PDV)}>10 recipes for lowest cooking time & PDV</div>
				<div className='for time-steps' onClick={e => setOption(options.TIME_STEPS)}>Lowest cooking time & least steps</div>
				<div className='for common-ingredients' onClick={e => setOption(options.COMMON_INGREDIENTS)}>10 most common ingredients</div>
			</div>
			{ getOptionContent() }
		</div>
	)
}

export default ForLazyCooking;