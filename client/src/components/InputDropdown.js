import React from 'react'
import '../style/InputDropdown.css'

const InputDropdown = ({ name, onSelectionChange, title, options }) => {

	return (
		<div className={`input-container ${name}`}>
			<div className='input-title'>{title}</div>
			<div className='select'>
				<select className='input dropdown' onChange={e => onSelectionChange(e.target.value)}>
					{options.map((option, i) => 
						<option className='dropdown-option' key={`${name}-${i}`}>{option}</option>)}
				</select>				
			</div>		
		</div>)
}

export default InputDropdown;