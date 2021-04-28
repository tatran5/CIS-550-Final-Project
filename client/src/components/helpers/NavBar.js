import React from 'react'
import '../../style/NavBar.css'

const NavBar = () => {
	return (
		<div className='NavBar'>
			<a className='nav home' href="/">Home</a>
			<div className='page-listing'>Find recipes:</div>
			<a className='nav for' href="/for-a-dish">for a dish</a>
			<a className='nav for' href="/for-lazy-cooking">for lazy cooking</a>
			<a className='nav for' href="/for-restrictions-and-needs">for restrictions & needs</a>
		</div>)
}

export default NavBar;