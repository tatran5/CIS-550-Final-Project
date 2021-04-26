import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { formatRecipeName } from "./Consts"
import '../style/Home.css'

const Home = () => {
	const [topRecipes, setTopRecipes] = useState([])

	useEffect(() => {
		const getTopRecipes = () => {
			const cachedTopRecipes = JSON.parse(window.localStorage.getItem('topRecipes'))
			if (cachedTopRecipes) {
				console.log(cachedTopRecipes)
				console.log(typeof(cachedTopRecipes))
				cachedTopRecipes.forEach(recipe => console.log(recipe))
				setTopRecipes(cachedTopRecipes)
			}

			fetch('/top-recipes')
				.then(res => {
					const json = res.json()
					return json
				})
				.then(data => {
					console.log(data)
					setTopRecipes(data)
					 
					// Cache this to local storage since the results are static
					window.localStorage.setItem('topRecipes',  JSON.stringify(data))
				})
				.catch(e => {
					console.log(e)
					return alert('Something went wrong while fetching result')
				})
		}
	
		getTopRecipes();
	}, [])

	const getRandomRecipe = () => {
		// TODO. PLACEHOLDER HERE
		const recipe = 'Yemeni Chicken Matzo Ball Soup'
		return (<div className='recipe'>{recipe}</div>)
	}
	
	return (
		<div className='Home'>
			<div className='title'>Find me recipes</div>
			<div className='recipes'>
				<div className='top-recipes container'> 
					<div className='column-header'>Top rated recipes</div>
						{ topRecipes.map((recipe, idx) => 
							<div className='recipe' key={idx}>{formatRecipeName(recipe.name)}</div>) }
				</div>
				<div className='random-recipe container'> 
					<div className='column-header'>Our pick</div>
					{getRandomRecipe()}
				</div>
			</div>
		</div>)
}

export default Home;