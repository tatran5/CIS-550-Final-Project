import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import NavBar from './helpers/NavBar'
import { formatStr } from "./helpers/Consts"
import '../style/Home.css'

const Home = () => {
	const history = useHistory()
	const [topRecipes, setTopRecipes] = useState([])
	const [randomRecipe, setRandomRecipe] = useState('')

	useEffect(() => {
		const getTopRecipes = () => {
			const cachedTopRecipes = JSON.parse(localStorage.getItem('topRecipes'))

			if (cachedTopRecipes) {
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
					localStorage.setItem('topRecipes',  JSON.stringify(data))
				})
				.catch(e => {
					console.log(e)
					return alert('Something went wrong while fetching result')
				})
		}
	
		const getRandomRecipe = () => {
			fetch('/random-recipe')
				.then(res => res.json())
				.then(data => {
					console.log(data)
					setRandomRecipe(data[0])
				})
				.catch(e => {
					console.log(e)
					alert(`Something went wrong when getting random recipe for 'Our picks'`)
				})
		}

		getTopRecipes()
		getRandomRecipe()
	}, [])
	
	return (
		<div className='Home'>
			<div className='title'>Find me recipes</div>
			<div className='recipes'>
				<div className='top-recipes container'> 
					<div className='column-header'>Top rated recipes</div>
						{ topRecipes.map((recipe, idx) => 
							<div className='recipe' key={idx}> 
								<a href={`https://www.food.com/recipe/${recipe.id}`} >{formatStr(recipe.name)}</a> 
							</div>) }
				</div>
				<div className='random-recipe container'> 
					<div className='column-header'>Our pick</div>
					<div className='recipe'>
						{randomRecipe ? <a href={`https://www.food.com/recipe/${randomRecipe.id}`} >{formatStr(randomRecipe.name)}</a> : <></> }
					</div>
				</div>
			</div>
		</div>)
}

export default Home;