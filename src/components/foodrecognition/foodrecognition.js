import React from 'react';
import './foodrecognition.css';

const FoodRecognition = ({ imageUrl }) => {
	return(
		<div className='center ma'>
			<div className='absolute mt5'>
				<img alt="" src={imageUrl} width='500px' height='auto'/>
				<ul className='br3 ba b--black-10 mv4 mw6 shadow-5 ' id='ingredients'></ul>
			</div>
		</div>


		);
}


export default FoodRecognition;