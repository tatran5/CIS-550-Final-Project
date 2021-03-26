import React, { useState } from 'react'
import ForLeftover from './ForLeftover'
import ForTimePDV from './ForTimePDV'
import ForTimeSteps from './ForTimeSteps'

const ForLazyCooking = () => {
	const options = {
		NONE: 0,
		LEFOVER: 1,
		TIME_PDV: 2,
		TIME_STEPS: 3
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
		}
	}

	return (
		<div className='ForLazyCooking'>
			<div className='options'>
				<div className='for leftover' onClick={e => setOption(options.LEFOVER)}>Use leftover ingredients</div>
				<div className='for time-pdf' onClick={e => setOption(options.TIME_PDV)}>10 recipes for lowest cooking time & PDV</div>
				<div className='for time-steps' onClick={e => setOption(options.TIME_STEPS)}>Lowest cooking time & least steps</div>
				{ getOptionContent() }
			</div>
		</div>
	)
}

export default ForLazyCooking;