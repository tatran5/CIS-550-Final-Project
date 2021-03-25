import React from 'react'

const InputDropdown = ({ onSelectionChange, title, options }) => {
	return (
		<div className='InputDropdown'>
			<div className='input-title'>{title}</div>
			<select className='input dropdown' onChange={e => onSelectionChange(e.target.value)}>
				{options.map((option, i) => <option className='dropdown-option'>{option}</option>)}
			</select>
		</div>)
}

export default InputDropdown;