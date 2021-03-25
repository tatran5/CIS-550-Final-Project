import React, { useEffect } from 'react'
import NavBar from './NavBar'

const Home = () => {
	

	const getTopRecipes = () => {
		// TODO. PLACEHOLDER HERE
		const recipes = ['Salmon coconut soup', 'Chocolate buttermilk pie', 'Yuzu kosho deviled eggs']

		return (
			<> 
				{ recipes.map((recipe, idx) => <div className='recipe' key={idx}>{recipe}</div>) }
			</>
		)
	}

	const getRandomRecipe = () => {
		// TODO. PLACEHOLDER HERE
		const recipe = 'Yemeni Chicken Matzo Ball Soup'
		return (<div className='recipe'>{recipe}</div>)
	}
	
	return (
		<div className='Home'>
			<NavBar />
			<div className='title'>Find me recipes</div>
			<div className='recipes'>
				<div className='top-recipes container'> 
					<div className='column header'>Top rated recipes</div>
					{getTopRecipes()}
				</div>
				<div className='random-recipe container'> 
					<div className='column header'>Our pick</div>
					{getRandomRecipe()}
				</div>
			</div>
		</div>)
}

export default Home;