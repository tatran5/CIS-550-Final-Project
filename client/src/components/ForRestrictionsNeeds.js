import React, { useState } from 'react'
import ExcludeIngredients from './ExcludeIngredients'
import NutritionalNeeds from './NutritionalNeeds'
import RestrictionsNeeds from './RestrictionsNeeds'

const ForRestrictionsNeeds = () => {
	const options = {
		NONE: 0,
		EXCLUDE_INGREDIENTS: 1,
		NUTRITION: 2,
		RESTRICTION_NEEDS: 3
	}

	const [option, setOption] = useState(options.NONE)

	const getOptionContent = () => {
		switch(option) {
			default: 
				return <></>
			case options.NONE:
				return <></>
			case options.EXCLUDE_INGREDIENTS:
				return <ExcludeIngredients />
			case options.NUTRITION:
				return <NutritionalNeeds />	
			case options.RESTRICTION_NEEDS:
				return <RestrictionsNeeds />	
		}
	}

	return (
		<div className='ForRestrictionsNeeds'>
				<div className='title'> Recipes for restrictions & needs</div>
				<div className='options'>
				<div className='for exclude-ingredients' onClick={e => setOption(options.EXCLUDE_INGREDIENTS)}>Exclude ingredients</div>
				<div className='for nutritional-needs' onClick={e => setOption(options.NUTRITION)}>Nutritional needs</div>
				<div className='for restriction-and-needs' onClick={e => setOption(options.RESTRICTION_NEEDS)}>Restriction & needs</div>
			</div>
			{ getOptionContent() }
		</div>)
}

export default ForRestrictionsNeeds;