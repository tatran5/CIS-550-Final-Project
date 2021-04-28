import React from 'react'
import '../../style/InputText.css'

const InputText = ({ name, onInputChange, title, placeholder }) => {
	
	return (
		<div className={`input-container ${name}`}>
			<div className='input-title'>{title}</div>
			<input 
				className='input-text' 
				type='text' 
				placeholder={placeholder} 
				onChange={e => onInputChange(e.target.value)}/>
		</div>)
}

export default InputText;