import React from 'react'

const InputText = ({ onInputChange, title, placeholder }) => {
	return (
		<div className='InputText'>
			<div className='input-title'>{title}</div>
			<input className='input-text' type='text' 
				placeholder={placeholder} onChange={e => onInputChange(e.target.value)}/>
		</div>)
}

export default InputText;