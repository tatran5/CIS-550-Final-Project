import React from 'react'
import '../../style/NavBar.css'

const NavBar = () => {
	return (
		<div className='NavBar'>
			<a className='nav home' href="/">Home</a>
			<div className='page-listing'>Find recipes for:</div>
			<a className='nav for' href="/for-a-dish">a dish</a>
			<a className='nav for' href="/for-unique-dishes">unique dishes</a>
			<a className='nav for' href="/for-lazy-cooking">lazy cooking</a>
			<a className='nav for' href="/for-restrictions-and-needs">restrictions & needs</a>
		</div>)
}

export default NavBar;