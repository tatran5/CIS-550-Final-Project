import React, { useEffect, useState } from 'react'
import {formatStr} from './helpers/Consts'
import '../style/CommonIngredients.css'

const CommonIngredients = () => {
	const [ ingredients, setIngredients ] = useState([])

	useEffect(() => {
		const cachedIngredients = JSON.parse(localStorage.getItem('commonIngredients'))
		if (cachedIngredients) {
			console.log(cachedIngredients)
			setIngredients(cachedIngredients)
		} else {
			fetch(`/common-ingredients`)
			.then(res => res.json())
			.then(data => {
				localStorage.setItem('commonIngredients', JSON.stringify(data))
				setIngredients(data)
				console.log(data)
			})
		}
	}, [])

	return  <div className='results-container'>
		{ ingredients.map((ingredient, idx) => 
			<div className='ingredient-card' key={`common-ingredient-${idx}`}>
				<div className='name'>{formatStr(ingredient.name)}</div>
				<div className='recipe-count' >No. of recipes using this: {ingredient.count}</div>
			</div>
		)}
	</div>
}

export default CommonIngredients