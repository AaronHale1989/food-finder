import React from 'react';
import './foodrecognition.css';

const FoodRecognition = ({ imageUrl }) => {
	return(
		<div className='center ma'>
			<div className='absolute mt5'>
				<img alt="" src={imageUrl} width='500px' height='auto'/>
				<ul className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center' id='ingredients'></ul>
			</div>
		</div>


		);
}


export default FoodRecognition;